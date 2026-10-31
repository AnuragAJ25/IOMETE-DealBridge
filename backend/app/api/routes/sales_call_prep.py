import logging
from fastapi import APIRouter, HTTPException, status

from backend.app.ai.gemini import gemini_service, GeminiServiceError
from backend.app.prompts.templates import SALES_CALL_PREP_PROMPT
from backend.app.schemas.sales_call_prep import (
    SalesCallPrepRequest,
    SalesCallPrepResponse,
)
from backend.app.services.document_retriever import document_retriever

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/ai", tags=["AI - Sales Call Prep"])


@router.post(
    "/sales-call-prep",
    response_model=SalesCallPrepResponse,
    status_code=status.HTTP_200_OK,
    summary="Prepare an enterprise sales meeting briefing with discovery questions and talking points",
)
async def prepare_sales_call(request: SalesCallPrepRequest) -> SalesCallPrepResponse:
    """Generate executive sales call briefing, discovery questions, relevant capabilities,

    talking points, potential objections, and items needing live verification.
    """
    try:
        # Search documentation for context on known challenges and capabilities
        challenges_str = (
            ", ".join(request.known_challenges)
            if isinstance(request.known_challenges, list)
            else str(request.known_challenges)
        )
        search_query = f"{request.industry} {challenges_str} {request.meeting_objective}"
        matched_sections = document_retriever.search(query=search_query, top_k=3)
        doc_context = document_retriever.format_context_for_prompt(matched_sections)

        prompt = SALES_CALL_PREP_PROMPT.format(
            company_name=request.company_name,
            industry=request.industry,
            buyer_role=request.buyer_role,
            known_challenges=challenges_str,
            meeting_objective=request.meeting_objective,
            documentation_context=doc_context,
        )

        response = await gemini_service.generate_structured(
            prompt=prompt,
            response_model=SalesCallPrepResponse,
        )
        return response

    except GeminiServiceError as ge:
        logger.error(f"Gemini service error in sales-call-prep: {ge.message}")
        raise HTTPException(status_code=ge.status_code, detail=ge.message)
    except Exception as e:
        logger.error(f"Unexpected error in sales-call-prep: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to prepare sales call briefing: {str(e)}",
        )
