import logging
from fastapi import APIRouter, HTTPException, status

from backend.app.ai.gemini import gemini_service, GeminiServiceError
from backend.app.prompts.templates import DEMO_PERSONALIZER_PROMPT
from backend.app.schemas.demo_personalizer import (
    DemoPersonalizerRequest,
    DemoPersonalizerResponse,
)
from backend.app.services.document_retriever import document_retriever

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/ai", tags=["AI - Demo Personalizer"])


@router.post(
    "/demo-personalizer",
    response_model=DemoPersonalizerResponse,
    status_code=status.HTTP_200_OK,
    summary="Personalize a product demonstration storyline and sample data scenario",
)
async def personalize_demo(request: DemoPersonalizerRequest) -> DemoPersonalizerResponse:
    """Generate tailored demo storyline, relevant UI components, sample data scenario (clearly marked

    as illustrative), seller talking points, and suggested next steps.
    """
    try:
        reqs_str = (
            ", ".join(request.buyer_requirements)
            if isinstance(request.buyer_requirements, list)
            else str(request.buyer_requirements)
        )
        search_query = f"{request.use_case} {reqs_str} {request.industry}"
        matched_sections = document_retriever.search(query=search_query, top_k=3)
        doc_context = document_retriever.format_context_for_prompt(matched_sections)

        prompt = DEMO_PERSONALIZER_PROMPT.format(
            industry=request.industry,
            buyer_requirements=reqs_str,
            use_case=request.use_case,
            technical_level=request.technical_level,
            documentation_context=doc_context,
        )

        response = await gemini_service.generate_structured(
            prompt=prompt,
            response_model=DemoPersonalizerResponse,
        )
        return response

    except GeminiServiceError as ge:
        logger.error(f"Gemini service error in demo-personalizer: {ge.message}")
        raise HTTPException(status_code=ge.status_code, detail=ge.message)
    except Exception as e:
        logger.error(f"Unexpected error in demo-personalizer: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to personalize demo storyline: {str(e)}",
        )
