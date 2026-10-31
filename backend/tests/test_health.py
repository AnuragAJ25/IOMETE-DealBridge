"""Tests for health endpoint and system configuration."""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent.parent))

from fastapi.testclient import TestClient
from backend.app.main import app


client = TestClient(app)


class TestHealthEndpoint:
    """Verify /health and /api/health endpoints return correct system metrics."""

    def test_root_health_returns_200(self):
        """Health check returns HTTP 200 with expected fields."""
        response = client.get("/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert "version" in data
        assert "gemini_configured" in data
        assert "gemini_model" in data
        assert "documentation_files_indexed" in data

    def test_health_version_matches_config(self):
        """Version returned matches the settings constant."""
        response = client.get("/health")
        data = response.json()
        assert data["version"] == "1.0.0"

    def test_health_reports_gemini_model(self):
        """Health endpoint should include configured Gemini model name."""
        response = client.get("/health")
        data = response.json()
        assert data["gemini_model"] == "gemini-2.5-flash"

    def test_health_documentation_count_is_integer(self):
        """Documentation file count is a non-negative integer."""
        response = client.get("/health")
        data = response.json()
        assert isinstance(data["documentation_files_indexed"], int)
        assert data["documentation_files_indexed"] >= 0

    def test_api_health_returns_200(self):
        """/api/health should also respond (mounted via api_router)."""
        response = client.get("/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
