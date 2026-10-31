"""Shared pytest configuration and fixtures for IOMETE DealBridge backend tests."""

import sys
from pathlib import Path
from unittest.mock import AsyncMock, MagicMock, patch

import pytest
from fastapi.testclient import TestClient

# Ensure `backend` is importable from workspace root
sys.path.insert(0, str(Path(__file__).resolve().parent.parent.parent))

from backend.app.main import app


@pytest.fixture
def client():
    """Provide a synchronous FastAPI test client."""
    return TestClient(app)


@pytest.fixture
def mock_gemini_service():
    """Patch the GeminiService with a mock for AI endpoints (no paid API calls)."""
    with patch("backend.app.ai.gemini.gemini_service") as mock_svc:
        mock_svc.is_configured.return_value = True
        mock_svc.generate_structured = AsyncMock()
        yield mock_svc


@pytest.fixture
def mock_gemini_unconfigured():
    """Patch the GeminiService as unconfigured (no API key)."""
    with patch("backend.app.ai.gemini.gemini_service") as mock_svc:
        mock_svc.is_configured.return_value = False
        yield mock_svc


@pytest.fixture
def mock_document_retriever():
    """Patch the DocumentRetrieverService for controlled test responses."""
    with patch("backend.app.services.document_retriever.document_retriever") as mock_ret:
        mock_ret.get_indexed_count.return_value = 42
        mock_ret.get_file_count.return_value = 5
        mock_ret.search.return_value = []
        mock_ret.format_context_for_prompt.return_value = "Test documentation context."
        yield mock_ret
