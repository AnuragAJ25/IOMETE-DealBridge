from typing import Any, List, Optional
from pydantic import BaseModel, Field, model_validator


class ChatMessage(BaseModel):
    role: str = Field(..., description="'user' or 'assistant'")
    content: str = Field(..., description="Content of the message")


class Citation(BaseModel):
    doc_title: str = Field(..., description="Human-readable document title")
    section_title: str = Field(..., description="Section heading")
    filename: str = Field(..., description="Source markdown filename")
    source_url: str = Field(..., description="Official documentation URL")


class AssistantRequest(BaseModel):
    message: str = Field(
        ...,
        description="User question, sales objection, technical inquiry, or prompt (English or Hindi/Hinglish)",
        examples=["What makes IOMETE different from Databricks and Snowflake?"],
    )
    history: List[ChatMessage] = Field(
        default_factory=list,
        description="Prior conversation turn history for multi-turn context",
    )
    persona: Optional[str] = Field(
        default=None,
        description="Target buyer persona for tailored messaging (e.g. 'CTO', 'Data Engineer', 'FinOps', 'CIO', 'Architect')",
    )
    current_page: Optional[str] = Field(
        default=None,
        description="The frontend route the user is currently viewing to provide contextual relevance",
    )


class AssistantResponse(BaseModel):
    answer: str = Field(
        ...,
        description="Grounded, authoritative answer adhering to IOMETE documentation",
    )
    citations: List[Citation] = Field(
        default_factory=list,
        description="Structured citations with links to official docs",
    )
    suggested_followups: List[str] = Field(
        default_factory=list,
        description="2-3 relevant recommended follow-up questions",
    )
    evidence_status: str = Field(
        ...,
        description="'Verified from Documentation' if verified by official docs, or 'Needs Confirmation'",
    )
    needs_confirmation: bool = Field(
        ...,
        description="True if the documentation does not verify the claim and requires confirmation with the IOMETE team",
    )

    @model_validator(mode="before")
    @classmethod
    def normalize_fields(cls, data: Any) -> Any:
        if isinstance(data, dict):
            if "answer" not in data and "response" in data:
                data["answer"] = data["response"]
            if "answer" not in data and "content" in data:
                data["answer"] = data["content"]
            if "citations" not in data and "sources" in data:
                data["citations"] = data["sources"]
            if "citations" not in data and "source_references" in data:
                data["citations"] = []
            if "suggested_followups" not in data and "followups" in data:
                data["suggested_followups"] = data["followups"]
            if "suggested_followups" not in data and "suggested_questions" in data:
                data["suggested_followups"] = data["suggested_questions"]
            if "evidence_status" not in data:
                data["evidence_status"] = "Verified from Documentation"
            if "needs_confirmation" not in data:
                data["needs_confirmation"] = False
        return data
