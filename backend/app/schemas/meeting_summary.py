from pydantic import BaseModel, Field
from typing import List, Optional, Union


class MeetingSummaryRequest(BaseModel):
    buyer_requirements: Union[List[str], str] = Field(
        ...,
        description="List or text of buyer technical and operational requirements",
        examples=[["Sub-second Tableau dashboard latency", "Private VPC in AWS us-east-1", "Budget reduction >50%"]],
    )
    selected_use_cases: List[str] = Field(
        ...,
        description="Use cases mapped during the session",
        examples=["Executive BI Dashboard Acceleration", "Snowflake Cost Deflation & Iceberg Migration"],
    )
    questions_discussed: List[str] = Field(
        ...,
        description="Key questions or objections raised during the live conversation",
        examples=["How does automated Iceberg file compaction work?", "What is the migration effort for existing dbt models?"],
    )
    seller_notes: Optional[str] = Field(
        default=None,
        description="Observations or action items recorded by the sales team",
        examples=["Buyer is facing strong Q4 pressure from CFO to cut compute credits."],
    )
    next_steps: Optional[List[str]] = Field(
        default=None,
        description="Preliminary next steps discussed at the end of the call",
        examples=["Share security whitepaper", "Schedule VPC peering technical call"],
    )


class MeetingSummaryResponse(BaseModel):
    meeting_summary: str = Field(
        ...,
        description="Executive-level narrative recap summarizing the session findings and value alignment.",
    )
    key_requirements: List[str] = Field(
        ...,
        description="Consolidated list of validated buyer requirements.",
    )
    discussed_capabilities: List[str] = Field(
        ...,
        description="IOMETE architectural capabilities presented to address those requirements.",
    )
    unanswered_questions: List[str] = Field(
        ...,
        description="Open questions requiring follow-up in the follow-up packet.",
    )
    recommended_next_steps: List[str] = Field(
        ...,
        description="Structured Mutual Action Plan (MAP) milestones to advance to PoC.",
    )
