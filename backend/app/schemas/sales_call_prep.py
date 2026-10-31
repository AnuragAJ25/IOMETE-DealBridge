from pydantic import BaseModel, Field
from typing import List, Union


class PotentialObjection(BaseModel):
    objection: str = Field(..., description="Likely objection or hesitation raised by the buyer")
    recommended_response: str = Field(..., description="Actionable, non-defensive seller counter-argument")


class SalesCallPrepRequest(BaseModel):
    company_name: str = Field(..., description="Target prospect enterprise name", examples=["Northstar FinTech"])
    industry: str = Field(..., description="Industry vertical (e.g., FinTech, Healthcare, E-Commerce, SaaS)", examples=["FinTech"])
    buyer_role: str = Field(..., description="Lead stakeholder title", examples=["VP of Data & Infrastructure"])
    known_challenges: Union[List[str], str] = Field(
        ...,
        description="Pain points noted from discovery or SDR handoff (e.g., 'Snowflake credit overrun', 'Slow morning BI reports')",
        examples=[["Snowflake credit overrun by 40%", "BI report latency over 30s during peak market hours"]],
    )
    meeting_objective: str = Field(
        ...,
        description="Primary goal for the upcoming sales conversation",
        examples=["Secure technical agreement for a 14-day production PoC on top 5 Tableau dashboards"],
    )


class SalesCallPrepResponse(BaseModel):
    meeting_brief: str = Field(..., description="Executive overview synthesizing account context and strategy")
    discovery_questions: List[str] = Field(..., description="High-impact questions to diagnose technical bottlenecks")
    relevant_iomete_capabilities: List[str] = Field(..., description="Specific IOMETE platform capabilities that address their stated pain")
    talking_points: List[str] = Field(..., description="Key persuasive points for the human seller to articulate")
    potential_objections: List[PotentialObjection] = Field(..., description="Likely objections and recommended seller counters")
    verification_notes: List[str] = Field(..., description="Items that require verification during the call rather than being assumed as fact")
