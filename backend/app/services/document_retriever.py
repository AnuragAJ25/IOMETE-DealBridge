import argparse
import json
import logging
import math
import os
import re
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

import yaml

from backend.app.core.config import settings

logger = logging.getLogger(__name__)


@dataclass
class DocumentSection:
    filename: str
    section_title: str
    content: str
    source_ref: str
    source_url: str = "https://iomete.com/docs"
    category: str = "Documentation"
    tags: List[str] = field(default_factory=list)
    doc_title: str = "IOMETE Documentation"
    embedding: Optional[List[float]] = None
    score: float = 0.0


class DocumentRetrieverService:
    """Enterprise RAG Retriever for official IOMETE documentation.
    
    Supports:
    - Frontmatter extraction (title, category, source_url, tags)
    - Semantic heading and sub-section chunking
    - Local vector cache (embeddings_cache.json)
    - Hybrid retrieval: Cosine similarity on embeddings + BM25 keyword matching
    - Graceful fallback to keyword scoring if embedding model is offline
    """

    def __init__(self, docs_dir: Optional[Path] = None, cache_file: Optional[Path] = None):
        self.docs_dir = docs_dir or settings.KNOWLEDGE_BASE_DIR
        self.cache_file = cache_file or (self.docs_dir.parent / "embeddings_cache.json")
        self.sections: List[DocumentSection] = []
        self._load_documents()
        self._load_cached_embeddings()

    def _extract_frontmatter(self, text: str) -> Tuple[Dict[str, Any], str]:
        """Extract YAML frontmatter if present at the top of markdown file."""
        if text.startswith("---"):
            parts = text.split("---", 2)
            if len(parts) >= 3:
                try:
                    metadata = yaml.safe_load(parts[1]) or {}
                    body = parts[2].strip()
                    return metadata, body
                except Exception as e:
                    logger.warning(f"Error parsing frontmatter: {e}")
        return {}, text

    def _load_documents(self) -> None:
        """Scan knowledge_base/iomete_docs directory and parse Markdown files into sections."""
        self.sections = []
        if not self.docs_dir.exists():
            logger.warning(f"Knowledge base directory does not exist: {self.docs_dir}")
            return

        doc_files = sorted(list(self.docs_dir.glob("*.md")) + list(self.docs_dir.glob("*.txt")))
        for file_path in doc_files:
            try:
                text = file_path.read_text(encoding="utf-8")
                metadata, body = self._extract_frontmatter(text)
                parsed_sections = self._parse_file_sections(file_path.name, body, metadata)
                self.sections.extend(parsed_sections)
            except Exception as e:
                logger.error(f"Error reading documentation file {file_path.name}: {e}")

        logger.info(f"Loaded {len(self.sections)} document sections from {len(doc_files)} files.")

    def _parse_file_sections(self, filename: str, content: str, metadata: Dict[str, Any]) -> List[DocumentSection]:
        """Split a Markdown document into logical sections based on # and ## headings."""
        sections: List[DocumentSection] = []
        doc_title = metadata.get("title", filename.replace("_", " ").replace(".md", "").title())
        category = metadata.get("category", "General")
        source_url = metadata.get("source_url", "https://iomete.com/docs")
        tags = metadata.get("tags", [])

        # Split on markdown headings: ## or # or ###
        heading_pattern = re.compile(r"^(#{1,3}\s+.+)$", re.MULTILINE)
        splits = heading_pattern.split(content)

        if len(splits) <= 1:
            clean_content = content.strip()
            if clean_content:
                sections.append(
                    DocumentSection(
                        filename=filename,
                        section_title=doc_title,
                        content=clean_content,
                        source_ref=f"{filename} > {doc_title}",
                        source_url=source_url,
                        category=category,
                        tags=tags,
                        doc_title=doc_title,
                    )
                )
            return sections

        # First segment before any heading (if any)
        first_segment = splits[0].strip()
        if first_segment:
            sections.append(
                DocumentSection(
                    filename=filename,
                    section_title=f"{doc_title} Overview",
                    content=first_segment,
                    source_ref=f"{filename} > Overview",
                    source_url=source_url,
                    category=category,
                    tags=tags,
                    doc_title=doc_title,
                )
            )

        for i in range(1, len(splits), 2):
            raw_heading = splits[i].strip()
            heading = raw_heading.lstrip("#").strip()
            body = splits[i + 1].strip() if i + 1 < len(splits) else ""
            if heading and body:
                # Strip "Section: " prefix if present for clean title
                clean_heading = re.sub(r"^Section:\s*", "", heading)
                sections.append(
                    DocumentSection(
                        filename=filename,
                        section_title=clean_heading,
                        content=body,
                        source_ref=f"{filename} > {clean_heading}",
                        source_url=source_url,
                        category=category,
                        tags=tags,
                        doc_title=doc_title,
                    )
                )

        return sections

    def _section_key(self, sec: DocumentSection) -> str:
        return f"{sec.filename}::{sec.section_title}"

    def _load_cached_embeddings(self) -> None:
        """Load vector embeddings from local cache if available."""
        if not self.cache_file.exists():
            return

        try:
            with open(self.cache_file, "r", encoding="utf-8") as f:
                cache_data = json.load(f)

            loaded_count = 0
            for sec in self.sections:
                key = self._section_key(sec)
                if key in cache_data:
                    sec.embedding = cache_data[key]
                    loaded_count += 1

            logger.info(f"Loaded {loaded_count} cached embeddings from {self.cache_file.name}")
        except Exception as e:
            logger.warning(f"Could not load embeddings cache: {e}")

    def save_cached_embeddings(self) -> None:
        """Save computed embeddings to local cache file."""
        cache_data = {}
        for sec in self.sections:
            if sec.embedding:
                cache_data[self._section_key(sec)] = sec.embedding

        try:
            self.cache_file.parent.mkdir(parents=True, exist_ok=True)
            with open(self.cache_file, "w", encoding="utf-8") as f:
                json.dump(cache_data, f)
            logger.info(f"Saved {len(cache_data)} embeddings to {self.cache_file}")
        except Exception as e:
            logger.error(f"Error saving embeddings cache: {e}")

    def index_embeddings(self, force: bool = False) -> int:
        """Generate embeddings for all sections missing embeddings using Gemini embedding API."""
        from backend.app.ai.gemini import gemini_service

        if not gemini_service.is_configured():
            logger.warning("Gemini service is not configured; skipping embedding generation.")
            return 0

        updated = 0
        for sec in self.sections:
            if sec.embedding and not force:
                continue

            # Combine title + tags + content for rich semantic embedding
            text_to_embed = f"{sec.doc_title} - {sec.section_title}\nCategory: {sec.category}\nTags: {', '.join(sec.tags)}\n{sec.content}"
            try:
                emb = gemini_service.embed_text(text_to_embed[:2000])
                if emb:
                    sec.embedding = emb
                    updated += 1
            except Exception as e:
                logger.error(f"Failed to embed section {sec.source_ref}: {e}")

        if updated > 0:
            self.save_cached_embeddings()

        logger.info(f"Generated embeddings for {updated} sections.")
        return updated

    @staticmethod
    def _cosine_similarity(vec_a: List[float], vec_b: List[float]) -> float:
        """Compute cosine similarity between two float vectors."""
        if not vec_a or not vec_b or len(vec_a) != len(vec_b):
            return 0.0
        dot_product = sum(a * b for a, b in zip(vec_a, vec_b))
        norm_a = math.sqrt(sum(a * a for a in vec_a))
        norm_b = math.sqrt(sum(b * b for b in vec_b))
        if norm_a == 0.0 or norm_b == 0.0:
            return 0.0
        return dot_product / (norm_a * norm_b)

    def _keyword_search(self, query: str) -> Dict[str, float]:
        """Compute keyword match scores across sections."""
        query_terms = set(re.findall(r"\b[a-zA-Z0-9_-]{2,}\b", query.lower()))
        stopwords = {
            "the", "and", "for", "with", "that", "this", "from", "are", "can",
            "how", "what", "does", "our", "your", "have", "not", "but", "all",
            "any", "about", "will", "would", "could", "should", "tell", "explain",
            "please", "give", "show", "kya", "hai", "kaise", "hoga", "mein", "hum",
        }
        keywords = query_terms - stopwords
        if not keywords:
            keywords = query_terms

        scores: Dict[str, float] = {}
        for sec in self.sections:
            key = self._section_key(sec)
            title_text = f"{sec.doc_title} {sec.section_title} {' '.join(sec.tags)}".lower()
            content_text = sec.content.lower()

            score = 0.0
            for kw in keywords:
                # Exact matches in title or tags get high priority
                if kw in title_text:
                    score += 4.0
                count = content_text.count(kw)
                if count > 0:
                    score += min(count, 5) * 1.0

            if score > 0:
                scores[key] = score

        return scores

    def search(self, query: str, top_k: int = 4, min_score: float = 0.1) -> List[DocumentSection]:
        """Hybrid search combining semantic vector cosine similarity and keyword relevance."""
        if not self.sections or not query.strip():
            return []

        # 1. Compute keyword scores
        keyword_scores = self._keyword_search(query)
        max_kw = max(keyword_scores.values()) if keyword_scores else 1.0

        # 2. Compute vector similarity if query embedding is available
        query_embedding: Optional[List[float]] = None
        has_vectors = any(sec.embedding is not None for sec in self.sections)

        if has_vectors:
            try:
                from backend.app.ai.gemini import gemini_service
                if gemini_service.is_configured():
                    query_embedding = gemini_service.embed_text(query[:1000])
            except Exception as e:
                logger.debug(f"Could not generate query embedding: {e}")

        scored_results: List[Tuple[DocumentSection, float]] = []

        for sec in self.sections:
            key = self._section_key(sec)
            kw_norm = (keyword_scores.get(key, 0.0) / max_kw) if max_kw > 0 else 0.0

            if query_embedding and sec.embedding:
                vec_sim = self._cosine_similarity(query_embedding, sec.embedding)
                # Hybrid blend: 60% semantic similarity + 40% keyword precision
                combined_score = (0.60 * max(0.0, vec_sim)) + (0.40 * kw_norm)
            else:
                # Fallback to pure keyword score
                combined_score = kw_norm

            if combined_score >= min_score or (key in keyword_scores and keyword_scores[key] >= 2.0):
                scored_results.append((sec, combined_score))

        # Sort descending by score
        scored_results.sort(key=lambda item: item[1], reverse=True)

        selected: List[DocumentSection] = []
        for sec, score in scored_results[:top_k]:
            result_sec = DocumentSection(
                filename=sec.filename,
                section_title=sec.section_title,
                content=sec.content,
                source_ref=sec.source_ref,
                source_url=sec.source_url,
                category=sec.category,
                tags=sec.tags,
                doc_title=sec.doc_title,
                embedding=sec.embedding,
                score=score,
            )
            selected.append(result_sec)

        return selected

    def format_context_for_prompt(self, sections: List[DocumentSection]) -> str:
        """Format retrieved sections into rich markdown context with preserved source URLs."""
        if not sections:
            return "NO OFFICIAL DOCUMENTATION FOUND FOR THIS QUERY."

        parts = []
        for sec in sections:
            parts.append(
                f"### Document: {sec.doc_title} | Section: {sec.section_title}\n"
                f"Source File: `{sec.filename}` | Category: {sec.category} | URL: {sec.source_url}\n"
                f"Content:\n{sec.content}\n"
            )
        return "\n---\n".join(parts)

    def get_indexed_count(self) -> int:
        """Return the number of parsed document sections."""
        return len(self.sections)

    def get_file_count(self) -> int:
        """Return count of document files in knowledge base directory."""
        if not self.docs_dir.exists():
            return 0
        return len(list(self.docs_dir.glob("*.md")) + list(self.docs_dir.glob("*.txt")))


# Singleton instance for application reuse
document_retriever = DocumentRetrieverService()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="IOMETE Documentation Retriever CLI")
    parser.add_argument("--reindex", action="store_true", help="Reindex and compute embeddings for all documents")
    parser.add_argument("--query", type=str, default=None, help="Test search with a query string")
    args = parser.parse_args()

    logging.basicConfig(level=logging.INFO)
    retriever = DocumentRetrieverService()
    print(f"Loaded {retriever.get_indexed_count()} sections from {retriever.get_file_count()} files.")

    if args.reindex:
        print("Computing embeddings via Gemini API...")
        count = retriever.index_embeddings(force=True)
        print(f"Successfully indexed {count} sections into local cache.")

    if args.query:
        print(f"\nSearching for: '{args.query}'")
        results = retriever.search(args.query, top_k=3)
        for r in results:
            print(f"- [{r.score:.3f}] {r.doc_title} > {r.section_title} ({r.source_url})")
