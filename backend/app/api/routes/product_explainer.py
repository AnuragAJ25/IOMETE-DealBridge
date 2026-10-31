import logging
from fastapi import APIRouter, HTTPException, status

from backend.app.ai.gemini import gemini_service, GeminiServiceError
from backend.app.prompts.templates import PRODUCT_EXPLAINER_PROMPT
from backend.app.schemas.product_explainer import (
    ProductExplainerRequest,
    ProductExplainerResponse,
)
from backend.app.services.document_retriever import document_retriever

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/ai", tags=["AI - Product Explainer"])


@router.post(
    "/product-explainer",
    response_model=ProductExplainerResponse,
    status_code=status.HTTP_200_OK,
    summary="Explain an IOMETE product capability tailored to a buyer role",
)
async def explain_product(request: ProductExplainerRequest) -> ProductExplainerResponse:
    """Generate role-tailored explanations (simple, business, technical, practical example, and follow-up question)

    grounded in official IOMETE documentation.
    """
    try:
        # Retrieve grounding context from local documentation
        matched_sections = document_retriever.search(query=request.topic, top_k=3)
        doc_context = document_retriever.format_context_for_prompt(matched_sections)

        # Build prompt
        prompt = PRODUCT_EXPLAINER_PROMPT.format(
            topic=request.topic,
            buyer_role=request.buyer_role,
            technical_level=request.technical_level,
            explanation_preference=request.explanation_preference,
            documentation_context=doc_context,
        )

        response = await gemini_service.generate_structured(
            prompt=prompt,
            response_model=ProductExplainerResponse,
        )
        return response

    except GeminiServiceError as ge:
        logger.error(f"Gemini service error in product-explainer: {ge.message}")
        raise HTTPException(status_code=ge.status_code, detail=ge.message)
    except Exception as e:
        logger.error(f"Unexpected error in product-explainer: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate product explanation: {str(e)}",
        )
