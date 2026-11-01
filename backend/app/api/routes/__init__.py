from fastapi import APIRouter

from backend.app.api.routes.health import router as health_router
from backend.app.api.routes.product_explainer import router as product_explainer_router
from backend.app.api.routes.sales_call_prep import router as sales_call_prep_router
from backend.app.api.routes.demo_personalizer import router as demo_personalizer_router
from backend.app.api.routes.security_assistant import router as security_assistant_router
from backend.app.api.routes.meeting_summary import router as meeting_summary_router
from backend.app.api.routes.assistant import router as assistant_router

api_router = APIRouter()

# Mount health at top level
api_router.include_router(health_router)

# Mount AI routes under /api
api_router.include_router(product_explainer_router)
api_router.include_router(sales_call_prep_router)
api_router.include_router(demo_personalizer_router)
api_router.include_router(security_assistant_router)
api_router.include_router(meeting_summary_router)
api_router.include_router(assistant_router)

__all__ = ["api_router"]
