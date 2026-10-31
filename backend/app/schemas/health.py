from pydantic import BaseModel, Field
from typing import Optional


class HealthResponse(BaseModel):
    status: str = Field(default="healthy", description="API health status")
    version: str = Field(..., description="API version")
    gemini_configured: bool = Field(..., description="Whether Gemini API key is configured")
    gemini_model: str = Field(..., description="Active Gemini model configured")
    documentation_files_indexed: int = Field(..., description="Count of official IOMETE documentation files loaded")
