import logging
from fastapi import APIRouter, HTTPException, status

from backend.app.ai.gemini import gemini_service, GeminiServiceError
from backend.app.prompts.templates import MEETING_SUMMARY_PROMPT
from backend.app.schemas.meeting_summary import (
    MeetingSummaryRequest,
    MeetingSummaryResponse,
)
from backend.app.services.document_retriever import document_retriever

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/ai", tags=["AI - Meeting Summary"])


@router.post(
    "/meeting-summary",
    response_model=MeetingSummaryResponse,
    status_code=status.HTTP_200_OK,
    summary="Generate executive sales meeting summary and Mutual Action Plan (MAP)",
)
async def summarize_meeting(request: MeetingSummaryRequest) -> MeetingSummaryResponse:
    """Synthesize meeting inputs into an executive summary, validated requirements, discussed capabilities,

    unanswered questions, and recommended next steps for a Mutual Action Plan.
    """
    try:
        reqs_str = (
            ", ".join(request.buyer_requirements)
            if isinstance(request.buyer_requirements, list)
            else str(request.buyer_requirements)
        )
        use_cases_str = ", ".join(request.selected_use_cases)
        questions_str = ", ".join(request.questions_discussed)
        notes_str = request.seller_notes or "None recorded"
        next_steps_str = (
            ", ".join(request.next_steps) if request.next_steps else "14-day production PoC"
        )

        search_query = f"{reqs_str} {use_cases_str} {questions_str}"
        matched_sections = document_retriever.search(query=search_query, top_k=3)
        doc_context = document_retriever.format_context_for_prompt(matched_sections)

        prompt = MEETING_SUMMARY_PROMPT.format(
            buyer_requirements=reqs_str,
            selected_use_cases=use_cases_str,
            questions_discussed=questions_str,
            seller_notes=notes_str,
            next_steps=next_steps_str,
            documentation_context=doc_context,
        )

        response = await gemini_service.generate_structured(
            prompt=prompt,
            response_model=MeetingSummaryResponse,
        )
        return response

    except GeminiServiceError as ge:
        logger.error(f"Gemini service error in meeting-summary: {ge.message}")
        raise HTTPException(status_code=ge.status_code, detail=ge.message)
    except Exception as e:
        logger.error(f"Unexpected error in meeting-summary: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate meeting summary: {str(e)}",
        )
