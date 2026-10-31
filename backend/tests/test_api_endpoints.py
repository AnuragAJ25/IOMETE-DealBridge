"""Tests for request validation, missing API key handling, Gemini error handling, and response structure."""

import sys
from pathlib import Path
from unittest.mock import AsyncMock, patch, MagicMock

sys.path.insert(0, str(Path(__file__).resolve().parent.parent.parent))

from fastapi.testclient import TestClient
from backend.app.main import app
from backend.app.ai.gemini import GeminiServiceError
from backend.app.schemas.product_explainer import ProductExplainerResponse
from backend.app.schemas.sales_call_prep import SalesCallPrepResponse
from backend.app.schemas.demo_personalizer import DemoPersonalizerResponse
from backend.app.schemas.security_assistant import SecurityAssistantResponse
from backend.app.schemas.meeting_summary import MeetingSummaryResponse

client = TestClient(app)


# ────────────────────────────────────────────
# Request Validation Tests
# ────────────────────────────────────────────


class TestRequestValidation:
    """Verify that missing or malformed request fields return 422 Unprocessable Entity."""

    def test_product_explainer_missing_required_fields(self):
        """POST /api/ai/product-explainer with empty body → 422."""
        response = client.post("/api/ai/product-explainer", json={})
        assert response.status_code == 422

    def test_product_explainer_missing_topic(self):
        """POST with buyer_role but no topic → 422."""
        response = client.post(
            "/api/ai/product-explainer",
            json={"buyer_role": "CTO"},
        )
        assert response.status_code == 422

    def test_sales_call_prep_missing_required_fields(self):
        """POST /api/ai/sales-call-prep with empty body → 422."""
        response = client.post("/api/ai/sales-call-prep", json={})
        assert response.status_code == 422

    def test_demo_personalizer_missing_required_fields(self):
        """POST /api/ai/demo-personalizer with empty body → 422."""
        response = client.post("/api/ai/demo-personalizer", json={})
        assert response.status_code == 422

    def test_security_assistant_missing_question(self):
        """POST /api/ai/security-assistant without question → 422."""
        response = client.post("/api/ai/security-assistant", json={})
        assert response.status_code == 422

    def test_meeting_summary_missing_required_fields(self):
        """POST /api/ai/meeting-summary with empty body → 422."""
        response = client.post("/api/ai/meeting-summary", json={})
        assert response.status_code == 422


# ────────────────────────────────────────────
# Missing API Key Handling Tests
# ────────────────────────────────────────────


class TestMissingApiKey:
    """Verify that requests fail gracefully with 503 when GEMINI_API_KEY is not configured."""

    @patch("backend.app.api.routes.product_explainer.gemini_service")
    @patch("backend.app.api.routes.product_explainer.document_retriever")
    def test_product_explainer_no_api_key(self, mock_doc, mock_gem):
        mock_doc.search.return_value = []
        mock_doc.format_context_for_prompt.return_value = "No docs"
        mock_gem.generate_structured = AsyncMock(
            side_effect=GeminiServiceError(
                message="Google Gemini API key is not configured on the backend server.",
                status_code=503,
            )
        )
        response = client.post(
            "/api/ai/product-explainer",
            json={
                "buyer_role": "CTO",
                "topic": "Decoupled Compute and Storage",
            },
        )
        assert response.status_code == 503
        assert "API key" in response.json()["detail"]

    @patch("backend.app.api.routes.security_assistant.gemini_service")
    @patch("backend.app.api.routes.security_assistant.document_retriever")
    def test_security_assistant_no_api_key(self, mock_doc, mock_gem):
        mock_section = MagicMock()
        mock_section.source_ref = "security.md > Overview"
        mock_doc.search.return_value = [mock_section]
        mock_doc.format_context_for_prompt.return_value = "Some context"
        mock_gem.generate_structured = AsyncMock(
            side_effect=GeminiServiceError(
                message="Google Gemini API key is not configured on the backend server.",
                status_code=503,
            )
        )
        response = client.post(
            "/api/ai/security-assistant",
            json={"question": "Is IOMETE SOC 2 certified?"},
        )
        assert response.status_code == 503


# ────────────────────────────────────────────
# Gemini Service Error Handling Tests
# ────────────────────────────────────────────


class TestGeminiErrorHandling:
    """Verify graceful handling of Gemini API errors (502 gateway errors)."""

    @patch("backend.app.api.routes.sales_call_prep.gemini_service")
    @patch("backend.app.api.routes.sales_call_prep.document_retriever")
    def test_sales_call_prep_gemini_502(self, mock_doc, mock_gem):
        mock_doc.search.return_value = []
        mock_doc.format_context_for_prompt.return_value = "No docs"
        mock_gem.generate_structured = AsyncMock(
            side_effect=GeminiServiceError(
                message="Gemini API call failed: rate limit exceeded",
                status_code=502,
            )
        )
        response = client.post(
            "/api/ai/sales-call-prep",
            json={
                "company_name": "Test Corp",
                "industry": "FinTech",
                "buyer_role": "VP Data",
                "known_challenges": ["Cost overrun"],
                "meeting_objective": "Secure PoC",
            },
        )
        assert response.status_code == 502
        assert "rate limit" in response.json()["detail"]

    @patch("backend.app.api.routes.demo_personalizer.gemini_service")
    @patch("backend.app.api.routes.demo_personalizer.document_retriever")
    def test_demo_personalizer_gemini_error(self, mock_doc, mock_gem):
        mock_doc.search.return_value = []
        mock_doc.format_context_for_prompt.return_value = "No docs"
        mock_gem.generate_structured = AsyncMock(
            side_effect=GeminiServiceError(
                message="Failed to parse structured model response",
                status_code=502,
            )
        )
        response = client.post(
            "/api/ai/demo-personalizer",
            json={
                "industry": "Retail",
                "buyer_requirements": ["Dashboard speed"],
                "use_case": "BI reporting",
            },
        )
        assert response.status_code == 502


# ────────────────────────────────────────────
# Response Structure Validation (Mocked Gemini)
# ────────────────────────────────────────────


class TestResponseStructure:
    """Verify that responses conform to the expected Pydantic schema when Gemini returns valid data."""

    @patch("backend.app.api.routes.product_explainer.gemini_service")
    @patch("backend.app.api.routes.product_explainer.document_retriever")
    def test_product_explainer_response_structure(self, mock_doc, mock_gem):
        mock_doc.search.return_value = []
        mock_doc.format_context_for_prompt.return_value = "Test context"
        mock_gem.generate_structured = AsyncMock(
            return_value=ProductExplainerResponse(
                simple_explanation="IOMETE decouples compute from storage.",
                business_relevance="Reduces warehouse spend by 60-75%.",
                technical_explanation="Apache Iceberg v2 tables on Parquet in S3.",
                practical_example="Morning BI refresh completes 10x faster.",
                follow_up_question="What percentage of your spend is on idle clusters?",
            )
        )
        response = client.post(
            "/api/ai/product-explainer",
            json={
                "buyer_role": "VP Data Platform",
                "topic": "Decoupled Compute and Storage",
                "technical_level": "Executive",
                "explanation_preference": "Analogy-Driven",
            },
        )
        assert response.status_code == 200
        data = response.json()
        assert "simple_explanation" in data
        assert "business_relevance" in data
        assert "technical_explanation" in data
        assert "practical_example" in data
        assert "follow_up_question" in data

    @patch("backend.app.api.routes.meeting_summary.gemini_service")
    @patch("backend.app.api.routes.meeting_summary.document_retriever")
    def test_meeting_summary_response_structure(self, mock_doc, mock_gem):
        mock_doc.search.return_value = []
        mock_doc.format_context_for_prompt.return_value = "Test context"
        mock_gem.generate_structured = AsyncMock(
            return_value=MeetingSummaryResponse(
                meeting_summary="Productive session with Northstar FinTech.",
                key_requirements=["Sub-second BI", "Private VPC"],
                discussed_capabilities=["Apache Iceberg", "Spark auto-scaling"],
                unanswered_questions=["FedRAMP status"],
                recommended_next_steps=["Schedule VPC peering call", "Share security whitepaper"],
            )
        )
        response = client.post(
            "/api/ai/meeting-summary",
            json={
                "buyer_requirements": ["Sub-second BI", "Private VPC"],
                "selected_use_cases": ["Executive BI"],
                "questions_discussed": ["How does auto-compaction work?"],
            },
        )
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data["key_requirements"], list)
        assert isinstance(data["recommended_next_steps"], list)


# ────────────────────────────────────────────
# Document Retriever Tests
# ────────────────────────────────────────────


class TestDocumentRetriever:
    """Verify the keyword-based document retrieval service."""

    def test_retriever_loads_documents(self):
        from backend.app.services.document_retriever import document_retriever
        # The knowledge_base/iomete_docs directory should have files
        assert document_retriever.get_indexed_count() > 0

    def test_retriever_search_returns_results(self):
        from backend.app.services.document_retriever import document_retriever
        results = document_retriever.search("Apache Iceberg compute storage")
        assert isinstance(results, list)
        # Should find relevant sections given the knowledge base content
        assert len(results) > 0

    def test_retriever_search_empty_query_returns_empty(self):
        from backend.app.services.document_retriever import document_retriever
        results = document_retriever.search("")
        assert results == []

    def test_retriever_format_context_no_sections(self):
        from backend.app.services.document_retriever import document_retriever
        formatted = document_retriever.format_context_for_prompt([])
        assert "NO OFFICIAL DOCUMENTATION FOUND" in formatted

    def test_retriever_format_context_with_sections(self):
        from backend.app.services.document_retriever import document_retriever
        from backend.app.services.document_retriever import DocumentSection
        sections = [
            DocumentSection(
                filename="test.md",
                section_title="Test Section",
                content="Test content about Apache Iceberg.",
                source_ref="test.md > Test Section",
                score=5.0,
            )
        ]
        formatted = document_retriever.format_context_for_prompt(sections)
        assert "test.md" in formatted
        assert "Test Section" in formatted
        assert "Apache Iceberg" in formatted


# ────────────────────────────────────────────
# Security Assistant – Zero Documentation Fallback
# ────────────────────────────────────────────


class TestSecurityAssistantFallback:
    """Verify that security assistant returns safe fallback when no documentation is found."""

    @patch("backend.app.api.routes.security_assistant.document_retriever")
    def test_security_no_docs_returns_needs_confirmation(self, mock_doc):
        mock_doc.search.return_value = []
        response = client.post(
            "/api/ai/security-assistant",
            json={"question": "Does IOMETE support Quantum-Safe Encryption?"},
        )
        assert response.status_code == 200
        data = response.json()
        assert data["needs_confirmation"] is True
        assert data["evidence_status"] == "Needs Confirmation"
        assert "Needs confirmation" in data["answer"]
