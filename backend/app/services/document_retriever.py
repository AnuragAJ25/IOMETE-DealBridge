import logging
import re
from dataclasses import dataclass
from pathlib import Path
from typing import List, Optional

from backend.app.core.config import settings

logger = logging.getLogger(__name__)


@dataclass
class DocumentSection:
    filename: str
    section_title: str
    content: str
    source_ref: str
    score: float = 0.0


class DocumentRetrieverService:
    """Simple keyword and text-matching document retrieval service for IOMETE official documentation."""

    def __init__(self, docs_dir: Optional[Path] = None):
        self.docs_dir = docs_dir or settings.KNOWLEDGE_BASE_DIR
        self.sections: List[DocumentSection] = []
        self._load_documents()

    def _load_documents(self) -> None:
        """Scan knowledge_base/iomete_docs directory and parse Markdown / text files into sections."""
        self.sections = []
        if not self.docs_dir.exists():
            logger.warning(f"Knowledge base directory does not exist: {self.docs_dir}")
            return

        doc_files = list(self.docs_dir.glob("*.md")) + list(self.docs_dir.glob("*.txt"))
        for file_path in doc_files:
            try:
                text = file_path.read_text(encoding="utf-8")
                parsed_sections = self._parse_file_sections(file_path.name, text)
                self.sections.extend(parsed_sections)
            except Exception as e:
                logger.error(f"Error reading documentation file {file_path.name}: {e}")

        logger.info(f"Loaded {len(self.sections)} document sections from {len(doc_files)} files.")

    def _parse_file_sections(self, filename: str, content: str) -> List[DocumentSection]:
        """Split a Markdown or text document into logical sections based on headings."""
        sections: List[DocumentSection] = []
        # Split on markdown headings: ## or #
        heading_pattern = re.compile(r"^(#{1,3}\s+.+)$", re.MULTILINE)
        splits = heading_pattern.split(content)

        if len(splits) <= 1:
            # No headings found, treat whole document as one section
            clean_content = content.strip()
            if clean_content:
                sections.append(
                    DocumentSection(
                        filename=filename,
                        section_title="Full Document",
                        content=clean_content,
                        source_ref=f"{filename} > General",
                    )
                )
            return sections

        # First segment before any heading (if any)
        current_title = "Overview"
        first_segment = splits[0].strip()
        if first_segment:
            sections.append(
                DocumentSection(
                    filename=filename,
                    section_title=current_title,
                    content=first_segment,
                    source_ref=f"{filename} > {current_title}",
                )
            )

        # Iterate over heading and body pairs
        for i in range(1, len(splits), 2):
            heading = splits[i].strip().lstrip("#").strip()
            body = splits[i + 1].strip() if i + 1 < len(splits) else ""
            if heading and body:
                sections.append(
                    DocumentSection(
                        filename=filename,
                        section_title=heading,
                        content=body,
                        source_ref=f"{filename} > {heading}",
                    )
                )

        return sections

    def search(self, query: str, top_k: int = 3, min_matches: int = 1) -> List[DocumentSection]:
        """Search documentation sections using keyword matching and frequency scoring."""
        if not self.sections or not query.strip():
            return []

        # Tokenize query into unique terms (lowercase, alphanumeric, len > 2)
        query_terms = set(re.findall(r"\b[a-zA-Z0-9_-]{3,}\b", query.lower()))
        # Filter common non-informative stopwords
        stopwords = {
            "the", "and", "for", "with", "that", "this", "from", "are", "can",
            "how", "what", "does", "our", "your", "have", "not", "but", "all",
            "any", "about", "will", "would", "could", "should", "tell", "explain",
        }
        keywords = query_terms - stopwords
        if not keywords:
            keywords = query_terms

        scored_sections: List[DocumentSection] = []
        for sec in self.sections:
            title_text = sec.section_title.lower()
            content_text = sec.content.lower()

            match_count = 0
            score = 0.0

            for kw in keywords:
                # Title matches have high weight
                if kw in title_text:
                    match_count += 1
                    score += 5.0
                # Content occurrences
                count = content_text.count(kw)
                if count > 0:
                    match_count += 1
                    score += min(count, 5) * 1.0

            if match_count >= min_matches and score > 0:
                scored_sections.append(
                    DocumentSection(
                        filename=sec.filename,
                        section_title=sec.section_title,
                        content=sec.content,
                        source_ref=sec.source_ref,
                        score=score,
                    )
                )

        # Sort descending by score
        scored_sections.sort(key=lambda s: s.score, reverse=True)
        return scored_sections[:top_k]

    def format_context_for_prompt(self, sections: List[DocumentSection]) -> str:
        """Format retrieved sections into clean markdown context with preserved source citations."""
        if not sections:
            return "NO OFFICIAL DOCUMENTATION FOUND FOR THIS QUERY."

        parts = []
        for sec in sections:
            parts.append(
                f"### Source: [{sec.filename}] — Section: {sec.section_title}\n{sec.content}\n"
            )
        return "\n".join(parts)

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
