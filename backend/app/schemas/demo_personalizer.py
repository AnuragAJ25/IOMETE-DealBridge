from pydantic import BaseModel, Field
from typing import List, Union


class DemoPersonalizerRequest(BaseModel):
    industry: str = Field(..., description="Target industry vertical (e.g. Retail, FinTech, Healthcare)", examples=["FinTech"])
    buyer_requirements: Union[List[str], str] = Field(
        ...,
        description="Key architectural requirements (e.g., 'Sub-second SQL', 'Private VPC', 'Tableau compatibility')",
        examples=[["Tableau sub-second response", "Private AWS VPC deployment", "No data egress fees"]],
    )
    use_case: str = Field(
        ...,
        description="Specific workload scenario to demonstrate",
        examples=["High-concurrency executive financial reporting and risk analysis"],
    )
    technical_level: str = Field(
        default="Intermediate",
        description="Depth of technical demonstration ('Executive', 'Intermediate', 'Hands-On Data Engineer')",
        examples=["Intermediate"],
    )


class DemoPersonalizerResponse(BaseModel):
    demo_storyline: str = Field(..., description="Narrative arc framing the live demo steps from ingest to dashboard")
    relevant_components: List[str] = Field(..., description="Specific platform UI modules to click through (e.g. Catalog Explorer, SQL Workbench, Spark Auto-Scaler)")
    sample_data_scenario: str = Field(..., description="Illustrative dataset and scenario context (clearly marked as illustrative mock data)")
    seller_talking_points: List[str] = Field(..., description="Chronological narration guide for the seller during the click-through")
    suggested_next_step: str = Field(..., description="Natural transition from demo conclusion to PoC or technical scoping")
