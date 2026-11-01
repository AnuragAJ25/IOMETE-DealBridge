"""Tests for CORS middleware configuration and preflight handling.
Verifies that production Netlify origin, Netlify preview domains, and localhost origins
are permitted for OPTIONS preflight, POST, and GET requests with Content-Type header.
"""

from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

PRODUCTION_NETLIFY_ORIGIN = "https://iomete-dealbridge.netlify.app"
NETLIFY_PREVIEW_ORIGIN = "https://deploy-preview-123--iomete-dealbridge.netlify.app"
LOCALHOST_ORIGIN = "http://localhost:3000"
DISALLOWED_ORIGIN = "https://malicious-attacker-site.com"


class TestCorsPreflight:
    """Verify CORS preflight (OPTIONS) requests from production and development origins."""

    def test_options_preflight_production_netlify_origin(self):
        """OPTIONS preflight from https://iomete-dealbridge.netlify.app to assistant endpoint."""
        response = client.options(
            "/api/ai/assistant",
            headers={
                "Origin": PRODUCTION_NETLIFY_ORIGIN,
                "Access-Control-Request-Method": "POST",
                "Access-Control-Request-Headers": "Content-Type",
            },
        )
        assert response.status_code == 200
        assert response.headers.get("access-control-allow-origin") == PRODUCTION_NETLIFY_ORIGIN
        assert "POST" in response.headers.get("access-control-allow-methods", "")
        assert "OPTIONS" in response.headers.get("access-control-allow-methods", "")
        allow_headers = response.headers.get("access-control-allow-headers", "").lower()
        assert "content-type" in allow_headers or "*" in allow_headers

    def test_options_preflight_health_endpoint(self):
        """OPTIONS preflight from production origin to /health endpoint."""
        response = client.options(
            "/health",
            headers={
                "Origin": PRODUCTION_NETLIFY_ORIGIN,
                "Access-Control-Request-Method": "GET",
            },
        )
        assert response.status_code == 200
        assert response.headers.get("access-control-allow-origin") == PRODUCTION_NETLIFY_ORIGIN

    def test_options_preflight_netlify_preview_deploy(self):
        """OPTIONS preflight from Netlify branch / deploy preview matching regex."""
        response = client.options(
            "/api/ai/assistant",
            headers={
                "Origin": NETLIFY_PREVIEW_ORIGIN,
                "Access-Control-Request-Method": "POST",
                "Access-Control-Request-Headers": "Content-Type",
            },
        )
        assert response.status_code == 200
        assert response.headers.get("access-control-allow-origin") == NETLIFY_PREVIEW_ORIGIN

    def test_options_preflight_localhost_origin(self):
        """OPTIONS preflight from local Next.js dev server."""
        response = client.options(
            "/api/ai/assistant",
            headers={
                "Origin": LOCALHOST_ORIGIN,
                "Access-Control-Request-Method": "POST",
                "Access-Control-Request-Headers": "Content-Type",
            },
        )
        assert response.status_code == 200
        assert response.headers.get("access-control-allow-origin") == LOCALHOST_ORIGIN

    def test_options_preflight_disallowed_origin_rejected(self):
        """OPTIONS preflight from unknown/malicious origin must not return allow-origin header."""
        response = client.options(
            "/api/ai/assistant",
            headers={
                "Origin": DISALLOWED_ORIGIN,
                "Access-Control-Request-Method": "POST",
                "Access-Control-Request-Headers": "Content-Type",
            },
        )
        # Starlette returns 400 Bad Request or omits access-control-allow-origin
        assert response.headers.get("access-control-allow-origin") != DISALLOWED_ORIGIN


class TestCorsActualRequests:
    """Verify actual GET and POST requests include CORS response headers."""

    def test_get_health_with_production_origin(self):
        """Actual GET /health request includes Access-Control-Allow-Origin."""
        response = client.get(
            "/health",
            headers={"Origin": PRODUCTION_NETLIFY_ORIGIN},
        )
        assert response.status_code == 200
        assert response.headers.get("access-control-allow-origin") == PRODUCTION_NETLIFY_ORIGIN

    def test_post_endpoint_validation_error_includes_cors_header(self):
        """Even if validation fails (422), CORS headers must still be attached so browser can read the error."""
        response = client.post(
            "/api/ai/assistant",
            json={"message": ""},
            headers={"Origin": PRODUCTION_NETLIFY_ORIGIN},
        )
        assert response.status_code == 422
        assert response.headers.get("access-control-allow-origin") == PRODUCTION_NETLIFY_ORIGIN
