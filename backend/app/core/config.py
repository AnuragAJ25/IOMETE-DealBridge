import os
from pathlib import Path
from typing import List, Optional
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    PROJECT_NAME: str = "IOMETE Sales Companion API"
    VERSION: str = "1.0.0"
    API_PREFIX: str = "/api"

    # Gemini API Configuration
    GEMINI_API_KEY: Optional[str] = None
    GEMINI_MODEL: str = "gemini-2.5-flash"

    # CORS Configuration
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000",
    ]

    # Knowledge Base Path
    KNOWLEDGE_BASE_DIR: Path = Path(__file__).resolve().parent.parent.parent.parent / "knowledge_base" / "iomete_docs"

    # Environment
    ENVIRONMENT: str = "development"

    model_config = SettingsConfigDict(
        env_file=(".env", "../.env", "../../.env"),
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()
