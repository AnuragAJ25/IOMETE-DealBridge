import logging
from fastapi import APIRouter, HTTPException, status

from backend.app.ai.gemini import gemini_service, GeminiServiceError
from backend.app.prompts.templates import SECURITY_ASSISTANT_PROMPT
from backend.app.schemas.security_assistant import (
    SecurityAssistantRequest,
    SecurityAssistantResponse,
)
from backend.app.services.document_retriever import document_retriever

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/ai", tags=["AI - Security Assistant"])


@router.post(
    "/security-assistant",
    response_model=SecurityAssistantResponse,
    status_code=status.HTTP_200_OK,
    summary="Answer prospective buyer security questions with strict official documentation grounding",
)
async def answer_security_question(request: SecurityAssistantRequest) -> SecurityAssistantResponse:
    """Answer prospective buyer security and compliance questions strictly grounded in official IOMETE documentation.

    Never invents unverified claims. If unsupported by documentation, flags as needing confirmation.
    """
    try:
        # Search documentation specifically for security, compliance, VPC, encryption, and governance
        matched_sections = document_retriever.search(query=request.question, top_k=4)

        # If zero relevant documentation is found at all, return safe fallback without calling Gemini
        if not matched_sections:
            return SecurityAssistantResponse(
                answer="Needs confirmation from the IOMETE team. This specific security or compliance topic is not verified in official documentation.",
                source_references=[],
                evidence_status="Needs Confirmation",
                needs_confirmation=True,
            )

        doc_context = document_retriever.format_context_for_prompt(matched_sections)
        source_refs = [sec.source_ref for sec in matched_sections]

        prompt = SECURITY_ASSISTANT_PROMPT.format(
            question=request.question,
            additional_context=request.documentation_context or "None provided",
            documentation_context=doc_context,
        )

        response = await gemini_service.generate_structured(
            prompt=prompt,
            response_model=SecurityAssistantResponse,
        )

        # If model returned source references, keep them; otherwise populate from matched sections
        if not response.source_references:
            response.source_references = source_refs

        return response

    except GeminiServiceError as ge:
        logger.error(f"Gemini service error in security-assistant: {ge.message}")
        raise HTTPException(status_code=ge.status_code, detail=ge.message)
    except Exception as e:
        logger.error(f"Unexpected error in security-assistant: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to process security assistant inquiry: {str(e)}",
        )
