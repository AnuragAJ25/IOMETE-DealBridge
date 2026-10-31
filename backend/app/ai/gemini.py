import json
import logging
import re
from typing import Any, Dict, Optional, Type, TypeVar
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
    """Centralized, reusable service for Google Gemini AI integration using official Google Gen AI SDK."""

    def __init__(
        self,
        api_key: Optional[str] = None,
        model_name: Optional[str] = None,
    ):
        self.api_key = api_key or settings.GEMINI_API_KEY
        self.model_name = model_name or settings.GEMINI_MODEL
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
            logger.info(f"Initialized Google Gen AI client with model: {self.model_name}")
        except ImportError:
            logger.warning("google-genai SDK not available; checking fallback to google.generativeai.")
            try:
                import google.generativeai as legacy_genai
                legacy_genai.configure(api_key=self.api_key)
                self._client = legacy_genai.GenerativeModel(self.model_name)
                logger.info("Initialized legacy google.generativeai client as fallback.")
            except Exception as e:
                logger.error(f"Failed to initialize Google Gemini client: {e}")
                self._client = None
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
        """Generate structured JSON output validated against a Pydantic schema."""
        if not self.is_configured():
            raise GeminiServiceError(
                message="Google Gemini API key is not configured on the backend server. Please configure GEMINI_API_KEY in backend/.env.",
                status_code=503,
                details={"error_code": "GEMINI_API_KEY_MISSING"},
            )

        raw_response_text = ""
        try:
            # 1. Primary: Use modern google-genai Client SDK
            from google import genai
            from google.genai import types

            client = self._client or genai.Client(api_key=self.api_key)
            config = types.GenerateContentConfig(
                system_instruction=system_instruction,
                temperature=0.2,
                response_mime_type="application/json",
            )
            response = client.models.generate_content(
                model=self.model_name,
                contents=prompt,
                config=config,
            )
            raw_response_text = response.text or ""

        except ImportError:
            # 2. Fallback: Use legacy google.generativeai
            try:
                import google.generativeai as legacy_genai
                legacy_genai.configure(api_key=self.api_key)
                model = legacy_genai.GenerativeModel(
                    model_name=self.model_name,
                    system_instruction=system_instruction,
                )
                response = model.generate_content(
                    prompt,
                    generation_config={"temperature": 0.2, "response_mime_type": "application/json"},
                )
                raw_response_text = response.text or ""
            except Exception as leg_err:
                logger.error(f"Legacy Gemini API call failed: {leg_err}")
                raise GeminiServiceError(
                    message=f"Gemini API request failed: {str(leg_err)}",
                    status_code=502,
                )

        except Exception as api_err:
            logger.error(f"Gemini API call failed: {api_err}")
            raise GeminiServiceError(
                message=f"Gemini API call failed: {str(api_err)}",
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

    def _clean_and_parse_json(self, text: str) -> Dict[str, Any]:
        """Strip markdown fences (```json ... ```) and load JSON."""
        clean = text.strip()
        # Remove markdown code block fences if present
        if clean.startswith("```"):
            clean = re.sub(r"^```(?:json)?\s*", "", clean, flags=re.IGNORECASE)
            clean = re.sub(r"\s*```$", "", clean)

        clean = clean.strip()
        try:
            return json.loads(clean)
        except json.JSONDecodeError as e:
            # Try finding the first '{' and last '}'
            start = clean.find("{")
            end = clean.rfind("}")
            if start != -1 and end != -1 and end > start:
                try:
                    return json.loads(clean[start : end + 1])
                except json.JSONDecodeError:
                    pass
            raise GeminiServiceError(
                message=f"Could not decode valid JSON from Gemini output: {str(e)}",
                status_code=502,
                details={"raw_text": text[:300]},
            )


# Application-level singleton
gemini_service = GeminiService()
