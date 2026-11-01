import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from backend.app.api.routes import api_router
from backend.app.api.routes.health import health_check
from backend.app.core.config import settings
from backend.app.services.document_retriever import document_retriever

# Setup structured logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger("iomete-backend")


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize and log knowledge base metrics
    logger.info("Initializing IOMETE Sales Companion API...")
    indexed_sections = document_retriever.get_indexed_count()
    file_count = document_retriever.get_file_count()
    logger.info(f"Loaded {indexed_sections} sections from {file_count} official IOMETE documentation files.")
    yield
    # Shutdown
    logger.info("Shutting down IOMETE Sales Companion API.")


app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Backend API and Google Gemini AI integration for the IOMETE Sales Companion platform.",
    version=settings.VERSION,
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
    lifespan=lifespan,
)

# Configure CORS Middleware for Next.js frontend
cors_origins = list(settings.CORS_ORIGINS)
if "https://iomete-dealbridge.netlify.app" not in cors_origins:
    cors_origins.append("https://iomete-dealbridge.netlify.app")
if "https://iomete-dealbridge.netlify.app/" not in cors_origins:
    cors_origins.append("https://iomete-dealbridge.netlify.app/")

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_origin_regex=r"^https:\/\/([a-zA-Z0-9_-]+--)?iomete-dealbridge\.netlify\.app$",
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS", "HEAD", "PUT", "DELETE", "PATCH"],
    allow_headers=["*"],
    expose_headers=["*"],
    max_age=86400,
)

# Root-level health endpoint (as explicitly requested: GET /health)
app.add_api_route(
    "/health",
    health_check,
    methods=["GET"],
    tags=["System Health"],
    summary="Health check endpoint",
)

# Mount all /api routes
app.include_router(api_router, prefix=settings.API_PREFIX)


# Global Exception Handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception during {request.method} {request.url.path}: {exc}", exc_info=True)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "detail": "An internal server error occurred while processing the sales enablement request.",
            "error_type": exc.__class__.__name__,
        },
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.app.main:app", host="0.0.0.0", port=8000, reload=True)
