from pydantic import BaseModel, Field
from typing import Optional


class ProductExplainerRequest(BaseModel):
    buyer_role: str = Field(
        ...,
        description="Target buyer persona (e.g., 'CIO', 'VP Data Platform', 'Lead Data Engineer', 'Head of FinOps')",
        examples=["VP Data Platform"],
    )
    technical_level: str = Field(
        default="Intermediate",
        description="Audience technical depth (e.g., 'Executive', 'Intermediate', 'Deep Technical')",
        examples=["Intermediate"],
    )
    topic: str = Field(
        ...,
        description="Lakehouse capability or topic to explain (e.g., 'Decoupled Compute & Storage', 'Apache Iceberg ACID', 'Zero-ETL')",
        examples=["Decoupled Compute and Storage on Apache Iceberg"],
    )
    explanation_preference: str = Field(
        default="Analogy-Driven",
        description="Style of explanation (e.g., 'Analogy-Driven', 'Financial/ROI-Focused', 'Deep Architecture', 'Bullet Points')",
        examples=["Analogy-Driven"],
    )


class ProductExplainerResponse(BaseModel):
    simple_explanation: str = Field(
        ...,
        description="High-level, plain-language summary tailored to the buyer's role.",
    )
    business_relevance: str = Field(
        ...,
        description="Why this capability matters to the buyer's strategic goals and P&L.",
    )
    technical_explanation: str = Field(
        ...,
        description="Precise technical details regarding the architecture, protocol, or data format.",
    )
    practical_example: str = Field(
        ...,
        description="Real-world scenario illustrating the benefit in daily operations.",
    )
    follow_up_question: str = Field(
        ...,
        description="Impactful discovery question for the seller to ask next.",
    )
