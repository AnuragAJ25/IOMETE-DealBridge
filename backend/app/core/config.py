import os
from pathlib import Path
from typing import List, Optional
from pydantic_settings import BaseSettings, SettingsConfigDict

_BASE_DIR = Path(__file__).resolve().parent.parent.parent
_WORKSPACE_ROOT = _BASE_DIR.parent


class Settings(BaseSettings):
    PROJECT_NAME: str = "IOMETE Sales Companion & AI Knowledge Assistant API"
    VERSION: str = "1.1.0"
    API_PREFIX: str = "/api"

    # Gemini API Configuration
    GEMINI_API_KEY: Optional[str] = None
    GEMINI_MODEL: str = "gemini-3.5-flash"
    GEMINI_FALLBACK_MODEL: str = "gemini-3.5-flash-lite"
    EMBEDDING_MODEL: str = "gemini-embedding-001"

    # CORS Configuration
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000",
        "http://127.0.0.1:8000",
    ]

    # Knowledge Base Path
    KNOWLEDGE_BASE_DIR: Path = _WORKSPACE_ROOT / "knowledge_base" / "iomete_docs"

    # Environment
    ENVIRONMENT: str = "development"

    model_config = SettingsConfigDict(
        env_file=(
            _BASE_DIR / ".env",
            _WORKSPACE_ROOT / ".env",
            ".env",
            "backend/.env",
            "../.env",
            "../../.env",
        ),
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()
