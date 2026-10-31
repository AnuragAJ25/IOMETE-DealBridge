from fastapi import APIRouter, status

from backend.app.ai.gemini import gemini_service
from backend.app.core.config import settings
from backend.app.schemas.health import HealthResponse
from backend.app.services.document_retriever import document_retriever

router = APIRouter(tags=["System Health"])


@router.get(
    "/health",
    response_model=HealthResponse,
    status_code=status.HTTP_200_OK,
    summary="Health check and configuration status",
)
async def health_check() -> HealthResponse:
    """Return application health, active Gemini model, and knowledge base document metrics."""
    return HealthResponse(
        status="healthy",
        version=settings.VERSION,
        gemini_configured=gemini_service.is_configured(),
        gemini_model=settings.GEMINI_MODEL,
        documentation_files_indexed=document_retriever.get_indexed_count(),
    )
