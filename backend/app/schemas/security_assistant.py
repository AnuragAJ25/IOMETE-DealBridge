from pydantic import BaseModel, Field
from typing import List, Optional


class SecurityAssistantRequest(BaseModel):
    question: str = Field(
        ...,
        description="The prospective buyer's InfoSec or compliance question",
        examples=["Does IOMETE have access to customer encryption keys, or can we manage our own keys via AWS KMS?"],
    )
    documentation_context: Optional[str] = Field(
        default=None,
        description="Optional additional context or customer-provided security questionnaire snippet",
    )


class SecurityAssistantResponse(BaseModel):
    answer: str = Field(
        ...,
        description="Accurate security answer strictly grounded in official documentation.",
    )
    source_references: List[str] = Field(
        default_factory=list,
        description="Document filenames and sections referenced as supporting evidence.",
    )
    evidence_status: str = Field(
        ...,
        description="'Verified from Documentation' if backed by docs, otherwise 'Needs Confirmation'.",
    )
    needs_confirmation: bool = Field(
        ...,
        description="True if documentation does not conclusively verify the claim, requiring human team confirmation.",
    )
