import json
import logging
import re
from typing import Any, Dict, List, Optional, Type, TypeVar
from pydantic import BaseModel

from backend.app.core.config import settings
from backend.app.prompts.system_instructions import IOMETE_BASE_SYSTEM_INSTRUCTION

logger = logging.getLogger(__name__)

T = TypeVar("T", bound=BaseModel)


class GeminiServiceError(Exception):
    """Custom exception raised when Gemini API call fails."""

    def __init__(self, message: str, status_code: int = 502, details: Optional[Dict[str, Any]] = None):
        super().__init__(message)
        self.message = message
        self.status_code = status_code
        self.details = details or {}


class GeminiService:
    """Centralized, resilient service for Google Gemini AI integration using official Google Gen AI SDK."""

    def __init__(
        self,
        api_key: Optional[str] = None,
        model_name: Optional[str] = None,
        fallback_model: Optional[str] = None,
        embedding_model: Optional[str] = None,
    ):
        self.api_key = api_key or settings.GEMINI_API_KEY
        self.model_name = model_name or settings.GEMINI_MODEL
        self.fallback_model = fallback_model or settings.GEMINI_FALLBACK_MODEL
        self.embedding_model = embedding_model or settings.EMBEDDING_MODEL
        self._client = None
        self._initialize_client()

    def _initialize_client(self) -> None:
        """Initialize Google Gen AI client safely without crashing if key is missing."""
        if not self.api_key:
            logger.warning("Gemini API key is not configured. Live AI calls will raise GeminiServiceError.")
            self._client = None
            return

        try:
            from google import genai
            self._client = genai.Client(api_key=self.api_key)
            logger.info(f"Initialized Google Gen AI client with primary model: {self.model_name}")
        except Exception as e:
            logger.error(f"Failed to initialize Google Gen AI client: {e}")
            self._client = None

    def is_configured(self) -> bool:
        """Check whether the Gemini API key is configured."""
        return bool(self.api_key and self.api_key.strip())

    async def generate_structured(
        self,
        prompt: str,
        response_model: Type[T],
        system_instruction: str = IOMETE_BASE_SYSTEM_INSTRUCTION,
    ) -> T:
        """Generate structured JSON output validated against a Pydantic schema with automatic model fallback."""
        if not self.is_configured():
            raise GeminiServiceError(
                message="Google Gemini API key is not configured on the backend server. Please configure GEMINI_API_KEY in backend/.env.",
                status_code=503,
                details={"error_code": "GEMINI_API_KEY_MISSING"},
            )

        raw_response_text = ""
        models_to_try = [self.model_name, self.fallback_model]
        last_error = None

        from google import genai
        from google.genai import types

        client = self._client or genai.Client(api_key=self.api_key)
        config = types.GenerateContentConfig(
            system_instruction=system_instruction,
            temperature=0.2,
            response_mime_type="application/json",
            response_schema=response_model,
        )

        for model in models_to_try:
            try:
                response = client.models.generate_content(
                    model=model,
                    contents=prompt,
                    config=config,
                )
                raw_response_text = response.text or ""
                if raw_response_text:
                    break
            except Exception as e:
                last_error = e
                logger.warning(f"Gemini call with {model} failed: {e}. Trying fallback if available.")

        if not raw_response_text and last_error:
            logger.error(f"All Gemini models failed: {last_error}")
            raise GeminiServiceError(
                message=f"Gemini API request failed across models: {str(last_error)}",
                status_code=502,
            )

        # Parse & Validate structured JSON output
        parsed_data = self._clean_and_parse_json(raw_response_text)
        try:
            return response_model.model_validate(parsed_data)
        except Exception as val_err:
            logger.error(f"Pydantic validation failed for {response_model.__name__}: {val_err}. Raw: {raw_response_text[:300]}")
            raise GeminiServiceError(
                message=f"Failed to parse structured model response: {str(val_err)}",
                status_code=502,
                details={"raw_output_snippet": raw_response_text[:400]},
            )

    async def generate_structured_content(self, *args, **kwargs):
        """Alias for generate_structured."""
        return await self.generate_structured(*args, **kwargs)

    def embed_text(self, text: str) -> Optional[List[float]]:
        """Generate high-dimensional vector embeddings for text using official Gemini embedding model."""
        if not self.is_configured() or not text.strip():
            return None

        try:
            from google import genai
            client = self._client or genai.Client(api_key=self.api_key)
            res = client.models.embed_content(
                model=self.embedding_model,
                contents=text[:8000],
            )
            if hasattr(res, "embeddings") and res.embeddings:
                return res.embeddings[0].values
            return None
        except Exception as e:
            logger.warning(f"Failed to generate embedding with {self.embedding_model}: {e}")
            return None

    def _clean_and_parse_json(self, text: str) -> Dict[str, Any]:
        """Strip markdown fences (```json ... ```) and load JSON safely."""
        cleaned = text.strip()
        # Remove markdown code fence if present
        if cleaned.startswith("```"):
            cleaned = re.sub(r"^```(?:json)?\s*", "", cleaned, flags=re.MULTILINE)
            cleaned = re.sub(r"\s*```$", "", cleaned, flags=re.MULTILINE)

        cleaned = cleaned.strip()

        try:
            return json.loads(cleaned)
        except json.JSONDecodeError as e:
            # Fallback: Extract first outer JSON object {...}
            match = re.search(r"(\{.*\})", cleaned, re.DOTALL)
            if match:
                try:
                    return json.loads(match.group(1))
                except json.JSONDecodeError:
                    pass
            logger.error(f"Failed to parse JSON. Content: {cleaned[:400]}")
            raise GeminiServiceError(
                message=f"Model output could not be parsed as JSON: {e}",
                status_code=502,
                details={"raw_text": cleaned[:400]},
            )


# Global singleton instance
gemini_service = GeminiService()
