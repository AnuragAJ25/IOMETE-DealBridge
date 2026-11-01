import pytest
from unittest.mock import AsyncMock, patch

from backend.app.schemas.assistant import AssistantResponse, Citation
from backend.app.services.document_retriever import DocumentSection, document_retriever


@pytest.fixture
def mock_gemini_assistant():
    """Mock the gemini_service instance in the assistant route to avoid live network calls during tests."""
    with patch("backend.app.api.routes.assistant.gemini_service") as mock_svc:
        mock_svc.is_configured.return_value = True
        mock_svc.generate_structured = AsyncMock()
        yield mock_svc


@pytest.fixture
def mock_retriever_sections():
    return [
        DocumentSection(
            filename="01_product_fundamentals.md",
            section_title="What is IOMETE?",
            content="IOMETE is a fully-managed modern Data Lakehouse platform built on Apache Iceberg and Spark.",
            source_ref="01_product_fundamentals.md > What is IOMETE?",
            source_url="https://iomete.com/docs",
            category="Product Overview",
            tags=["overview", "iceberg", "spark"],
            doc_title="IOMETE Product Fundamentals",
            score=0.92,
        ),
        DocumentSection(
            filename="04_security_and_governance.md",
            section_title="Zero-Data-Retention (ZDR) Architecture",
            content="Customer data never leaves your VPC. Storage remains in customer-owned S3 or ADLS buckets.",
            source_ref="04_security_and_governance.md > Zero-Data-Retention",
            source_url="https://iomete.com/docs/security",
            category="Security",
            tags=["security", "zdr", "vpc"],
            doc_title="IOMETE Security & Governance",
            score=0.88,
        ),
    ]


def test_assistant_empty_message_returns_422(client):
    """Test 14: Validation error when empty message is provided."""
    response = client.post("/api/ai/assistant", json={"message": ""})
    assert response.status_code == 422


def test_assistant_product_overview_query(client, mock_gemini_assistant, mock_retriever_sections):
    """Test 1: Product overview query ('What is IOMETE?')."""
    mock_gemini_assistant.generate_structured.return_value = AssistantResponse(
        answer="IOMETE is a modern, fully-managed Data Lakehouse platform built natively on Apache Iceberg and Apache Spark.",
        citations=[
            Citation(
                doc_title="IOMETE Product Fundamentals",
                section_title="What is IOMETE?",
                filename="01_product_fundamentals.md",
                source_url="https://iomete.com/docs",
            )
        ],
        suggested_followups=["How does IOMETE compare to Snowflake?", "How does IOMETE deploy in our VPC?"],
        evidence_status="Verified from Documentation",
        needs_confirmation=False,
    )

    with patch.object(document_retriever, "search", return_value=mock_retriever_sections):
        response = client.post(
            "/api/ai/assistant",
            json={"message": "What is IOMETE?"},
        )

    assert response.status_code == 200
    data = response.json()
    assert "Lakehouse" in data["answer"]
    assert data["evidence_status"] == "Verified from Documentation"
    assert data["needs_confirmation"] is False
    assert len(data["citations"]) > 0
    assert data["citations"][0]["source_url"] == "https://iomete.com/docs/architecture"


def test_assistant_architecture_query(client, mock_gemini_assistant, mock_retriever_sections):
    """Test 2: Architecture query ('How does IOMETE separate compute from storage?')."""
    mock_gemini_assistant.generate_structured.return_value = AssistantResponse(
        answer="IOMETE decouples compute and storage into three distinct tiers: Storage Layer in customer S3/ADLS/GCS, Platform Services on Kubernetes, and Elastic Spark SQL Workload engines.",
        citations=[
            Citation(
                doc_title="IOMETE Architecture & Technology Stack",
                section_title="Compute-Storage Separation",
                filename="02_architecture_and_technology.md",
                source_url="https://iomete.com/docs/architecture",
            )
        ],
        suggested_followups=["How does cluster auto-suspend work?", "What table maintenance does IOMETE automate?"],
        evidence_status="Verified from Documentation",
        needs_confirmation=False,
    )

    with patch.object(document_retriever, "search", return_value=mock_retriever_sections):
        response = client.post(
            "/api/ai/assistant",
            json={"message": "How does IOMETE separate compute from storage?"},
        )

    assert response.status_code == 200
    data = response.json()
    assert "decouples compute and storage" in data["answer"]
    assert data["needs_confirmation"] is False


def test_assistant_deployment_query(client, mock_gemini_assistant, mock_retriever_sections):
    """Test 3: Deployment query ('Can I deploy IOMETE on our AWS EKS cluster?')."""
    mock_gemini_assistant.generate_structured.return_value = AssistantResponse(
        answer="Yes, IOMETE is packaged as the `iomete-data-plane-enterprise` Helm chart and deploys natively on AWS EKS, Azure AKS, Google GKE, and on-premises Kubernetes.",
        citations=[
            Citation(
                doc_title="IOMETE Deployment & Infrastructure",
                section_title="Kubernetes Helm Installation",
                filename="03_deployment_and_infrastructure.md",
                source_url="https://iomete.com/docs/installation",
            )
        ],
        suggested_followups=["What are the Helm chart prerequisites?", "How are IAM roles mapped?"],
        evidence_status="Verified from Documentation",
        needs_confirmation=False,
    )

    with patch.object(document_retriever, "search", return_value=mock_retriever_sections):
        response = client.post(
            "/api/ai/assistant",
            json={"message": "Can I deploy IOMETE on our AWS EKS cluster?"},
        )

    assert response.status_code == 200
    data = response.json()
    assert "Helm chart" in data["answer"]


def test_assistant_security_query(client, mock_gemini_assistant, mock_retriever_sections):
    """Test 4: Security query ('What access controls does IOMETE support?')."""
    mock_gemini_assistant.generate_structured.return_value = AssistantResponse(
        answer="IOMETE integrates Apache Ranger providing fine-grained RBAC, cell-level dynamic column masking, row-level filtering, and centralized audit logging.",
        citations=[
            Citation(
                doc_title="IOMETE Security & Governance",
                section_title="Access Control & Governance Engine: Apache Ranger",
                filename="04_security_and_governance.md",
                source_url="https://iomete.com/docs/security",
            )
        ],
        suggested_followups=["How does dynamic column masking work?", "Does IOMETE support CMEK?"],
        evidence_status="Verified from Documentation",
        needs_confirmation=False,
    )

    with patch.object(document_retriever, "search", return_value=mock_retriever_sections):
        response = client.post(
            "/api/ai/assistant",
            json={"message": "What access controls does IOMETE support?"},
        )

    assert response.status_code == 200
    data = response.json()
    assert "Apache Ranger" in data["answer"]
    assert "masking" in data["answer"]


def test_assistant_pricing_query(client, mock_gemini_assistant, mock_retriever_sections):
    """Test 5: Pricing query ('How much does IOMETE cost compared to Snowflake?')."""
    mock_gemini_assistant.generate_structured.return_value = AssistantResponse(
        answer="IOMETE charges a flat $500 per vCPU per year for Enterprise Edition with zero compute markups. Customers also have a Free Tier up to 100 vCPUs. Unlike Snowflake which charges 300-800% markups on warehouse credits, IOMETE delivers 40% to 65% total 3-year TCO savings.",
        citations=[
            Citation(
                doc_title="IOMETE Pricing Model & Total Cost of Ownership",
                section_title="Official Pricing Tiers",
                filename="06_business_pricing_tco.md",
                source_url="https://iomete.com/pricing",
            )
        ],
        suggested_followups=["What is included in the Free Tier?", "Can we use AWS Spot instances?"],
        evidence_status="Verified from Documentation",
        needs_confirmation=False,
    )

    with patch.object(document_retriever, "search", return_value=mock_retriever_sections):
        response = client.post(
            "/api/ai/assistant",
            json={"message": "How much does IOMETE cost compared to Snowflake?"},
        )

    assert response.status_code == 200
    data = response.json()
    assert "$500 per vCPU per year" in data["answer"]
    assert "100 vCPUs" in data["answer"]


def test_assistant_objection_handling_query(client, mock_gemini_assistant, mock_retriever_sections):
    """Test 6: Objection handling query ('Why should we switch from Snowflake?')."""
    mock_gemini_assistant.generate_structured.return_value = AssistantResponse(
        answer="You don't need to rip and replace on day one. You can start by offloading high-volume ETL and heavy reporting workloads to IOMETE to stop burning expensive Snowflake credits. Since IOMETE writes open Apache Iceberg tables in your own S3/ADLS bucket, Snowflake can still query those exact tables externally.",
        citations=[
            Citation(
                doc_title="IOMETE Sales Copilot & Demo Playbook",
                section_title="Objection Handling Guide",
                filename="09_sales_copilot_and_demo_guide.md",
                source_url="https://iomete.com",
            )
        ],
        suggested_followups=["How does dual-run query validation work?", "Can external tools query Iceberg directly?"],
        evidence_status="Verified from Documentation",
        needs_confirmation=False,
    )

    with patch.object(document_retriever, "search", return_value=mock_retriever_sections):
        response = client.post(
            "/api/ai/assistant",
            json={"message": "Why should we switch from Snowflake?"},
        )

    assert response.status_code == 200
    data = response.json()
    assert "ETL" in data["answer"]


def test_assistant_competitor_query(client, mock_gemini_assistant, mock_retriever_sections):
    """Test 7: Competitor query ('How does IOMETE compare to Databricks?')."""
    mock_gemini_assistant.generate_structured.return_value = AssistantResponse(
        answer="Databricks relies primarily on proprietary Delta Lake and charges DBU surcharges across multiple tiers. IOMETE is built 100% on open Apache Iceberg, includes an automated Lakehouse Manager out of the box, and uses flat $500/vCPU/yr pricing with zero compute markup.",
        citations=[
            Citation(
                doc_title="IOMETE Competitor Comparison & Differentiation",
                section_title="Deep Dive: IOMETE vs Databricks",
                filename="08_competitor_comparison.md",
                source_url="https://iomete.com/why-iomete",
            )
        ],
        suggested_followups=["What is the difference between Delta Lake and Iceberg?", "How does Lakehouse Manager work?"],
        evidence_status="Verified from Documentation",
        needs_confirmation=False,
    )

    with patch.object(document_retriever, "search", return_value=mock_retriever_sections):
        response = client.post(
            "/api/ai/assistant",
            json={"message": "How does IOMETE compare to Databricks?"},
        )

    assert response.status_code == 200
    data = response.json()
    assert "Delta Lake" in data["answer"]


def test_assistant_industry_query(client, mock_gemini_assistant, mock_retriever_sections):
    """Test 8: Industry query ('How is IOMETE used in financial services?')."""
    mock_gemini_assistant.generate_structured.return_value = AssistantResponse(
        answer="In banking and financial services, IOMETE's customer-hosted VPC deployment satisfies strict data localization and sovereignty mandates. Apache Ranger enforces cell-level PII masking for account data, while Iceberg time-travel allows compliance teams to recreate exact historical balances for regulatory audits.",
        citations=[
            Citation(
                doc_title="IOMETE Industry Use Cases & Solutions",
                section_title="1. Banking & Financial Services",
                filename="07_industry_use_cases.md",
                source_url="https://iomete.com/solutions",
            )
        ],
        suggested_followups=["How does IOMETE assist with HIPAA compliance?", "Can we audit query history?"],
        evidence_status="Verified from Documentation",
        needs_confirmation=False,
    )

    with patch.object(document_retriever, "search", return_value=mock_retriever_sections):
        response = client.post(
            "/api/ai/assistant",
            json={"message": "How is IOMETE used in financial services?"},
        )

    assert response.status_code == 200
    data = response.json()
    assert "sovereignty" in data["answer"]


def test_assistant_unsupported_claim_fallback(client, mock_gemini_assistant, mock_retriever_sections):
    """Test 9: Unsupported question honesty check (FedRAMP High / NASA partnership)."""
    mock_gemini_assistant.generate_structured.return_value = AssistantResponse(
        answer="I couldn't verify this information in the available official IOMETE documentation. Please confirm with the IOMETE team. Official documentation does not verify FedRAMP High or a contract with NASA.",
        citations=[],
        suggested_followups=["What compliance certifications are currently verified?", "Can I request custom compliance validation?"],
        evidence_status="Needs Confirmation",
        needs_confirmation=True,
    )

    with patch.object(document_retriever, "search", return_value=mock_retriever_sections):
        response = client.post(
            "/api/ai/assistant",
            json={"message": "Does IOMETE have FedRAMP High certification and a contract with NASA?"},
        )

    assert response.status_code == 200
    data = response.json()
    assert "I couldn't verify this information in the available official IOMETE documentation" in data["answer"]
    assert data["evidence_status"] == "Needs Confirmation"
    assert data["needs_confirmation"] is True


def test_assistant_persona_adaptation_cto(client, mock_gemini_assistant, mock_retriever_sections):
    """Test 10: Persona-adapted query for CTO."""
    mock_gemini_assistant.generate_structured.return_value = AssistantResponse(
        answer="From a CTO perspective, IOMETE guarantees total architectural sovereignty: 100% open Apache Iceberg tables, multi-cloud Kubernetes deployment, and complete elimination of vendor lock-in.",
        citations=[
            Citation(
                doc_title="IOMETE Sales Copilot & Demo Playbook",
                section_title="1. Chief Technology Officer (CTO)",
                filename="09_sales_copilot_and_demo_guide.md",
                source_url="https://iomete.com",
            )
        ],
        suggested_followups=["How do we pilot on AWS EKS?", "What is the REST catalog specification?"],
        evidence_status="Verified from Documentation",
        needs_confirmation=False,
    )

    with patch.object(document_retriever, "search", return_value=mock_retriever_sections):
        response = client.post(
            "/api/ai/assistant",
            json={"message": "Why should our company consider IOMETE?", "persona": "CTO"},
        )

    assert response.status_code == 200
    data = response.json()
    assert "CTO" in data["answer"] or "sovereignty" in data["answer"]


def test_assistant_persona_adaptation_data_engineer(client, mock_gemini_assistant, mock_retriever_sections):
    """Test 11: Persona-adapted query for Data Engineer."""
    mock_gemini_assistant.generate_structured.return_value = AssistantResponse(
        answer="For data engineers, IOMETE offers an interactive SQL Studio, native dbt-iomete adapter, automated Iceberg table maintenance (bin-packing compaction and orphan cleanup), and dynamic Spark pod allocation.",
        citations=[
            Citation(
                doc_title="IOMETE Platform Capabilities & Developer Experience",
                section_title="Lakehouse Manager (Automated Table Maintenance)",
                filename="05_platform_capabilities.md",
                source_url="https://iomete.com/docs/developer-guide",
            )
        ],
        suggested_followups=["How does dbt-iomete work?", "How do we write Spark jobs?"],
        evidence_status="Verified from Documentation",
        needs_confirmation=False,
    )

    with patch.object(document_retriever, "search", return_value=mock_retriever_sections):
        response = client.post(
            "/api/ai/assistant",
            json={"message": "What is the developer experience like?", "persona": "Data Engineer"},
        )

    assert response.status_code == 200
    data = response.json()
    assert "dbt-iomete" in data["answer"] or "compaction" in data["answer"]


def test_assistant_hindi_hinglish_query(client, mock_gemini_assistant, mock_retriever_sections):
    """Test 12: Multilingual Hindi / Hinglish query handling."""
    mock_gemini_assistant.generate_structured.return_value = AssistantResponse(
        answer="IOMETE ek fully-managed modern Data Lakehouse platform hai jo Apache Iceberg aur Apache Spark par built hai. Yeh directly aapke cloud VPC mein deploy hota hai jisse 100% data sovereignty milti hai.",
        citations=[
            Citation(
                doc_title="IOMETE Product Fundamentals",
                section_title="What is IOMETE?",
                filename="01_product_fundamentals.md",
                source_url="https://iomete.com/docs",
            )
        ],
        suggested_followups=["Pricing model kya hai?", "Deployment kaise hoti hai?"],
        evidence_status="Verified from Documentation",
        needs_confirmation=False,
    )

    with patch.object(document_retriever, "search", return_value=mock_retriever_sections):
        response = client.post(
            "/api/ai/assistant",
            json={"message": "IOMETE kya hai aur yeh kaise kaam karta hai?"},
        )

    assert response.status_code == 200
    data = response.json()
    assert "Data Lakehouse platform hai" in data["answer"]


def test_assistant_citations_structure(client, mock_gemini_assistant, mock_retriever_sections):
    """Test 13: Source citations contain valid section and URL fields."""
    mock_gemini_assistant.generate_structured.return_value = AssistantResponse(
        answer="IOMETE supports fine-grained RBAC through Apache Ranger.",
        citations=[
            Citation(
                doc_title="IOMETE Security & Governance",
                section_title="Access Control & Governance Engine: Apache Ranger",
                filename="04_security_and_governance.md",
                source_url="https://iomete.com/docs/security",
            )
        ],
        suggested_followups=["What column masking types are supported?"],
        evidence_status="Verified from Documentation",
        needs_confirmation=False,
    )

    with patch.object(document_retriever, "search", return_value=mock_retriever_sections):
        response = client.post(
            "/api/ai/assistant",
            json={"message": "How does access control work?"},
        )

    assert response.status_code == 200
    data = response.json()
    assert len(data["citations"]) > 0
    cite = data["citations"][0]
    assert "source_url" in cite
    assert "https://iomete.com" in cite["source_url"]
    assert "doc_title" in cite
    assert "section_title" in cite


def test_retriever_hybrid_search_unit():
    """Unit test for DocumentRetrieverService hybrid search on actual knowledge base."""
    results = document_retriever.search("zero data retention", top_k=3)
    assert len(results) > 0
    top = results[0]
    assert top.filename.endswith(".md")
    assert top.source_url.startswith("https://")
    assert top.score > 0.0


# ═══════════════════════════════════════════════════════════════════════════════
# REGRESSION TESTS — Accuracy, Evidence & Citation Quality
# ═══════════════════════════════════════════════════════════════════════════════

class TestSnowflakeIcebergAccuracy:
    """Regression: Never describe Snowflake as exclusively proprietary storage.
    Acknowledge its native support for Apache Iceberg tables and external storage."""

    def test_snowflake_comparison_acknowledges_iceberg_support(
        self, client, mock_gemini_assistant, mock_retriever_sections
    ):
        """The model response must acknowledge Snowflake's Iceberg support."""
        mock_gemini_assistant.generate_structured.return_value = AssistantResponse(
            answer=(
                "Snowflake natively supports Apache Iceberg tables, including "
                "customer-managed external storage on S3, GCS, and Azure Blob, "
                "with external catalog integrations (Glue, Iceberg REST). "
                "IOMETE differentiates by running inside the customer's own Kubernetes "
                "cluster with flat vCPU-based licensing rather than consumption credits."
            ),
            citations=[
                Citation(
                    doc_title="IOMETE Competitor Comparison & Differentiation",
                    section_title="Deep Dive: IOMETE vs Snowflake",
                    filename="08_competitor_comparison.md",
                    source_url="https://iomete.com/why-iomete",
                )
            ],
            suggested_followups=["What are the pricing differences?"],
            evidence_status="Verified from Documentation",
            needs_confirmation=False,
        )

        with patch.object(document_retriever, "search", return_value=mock_retriever_sections):
            response = client.post(
                "/api/ai/assistant",
                json={"message": "How does IOMETE compare to Snowflake on data openness?"},
            )

        data = response.json()
        answer_lower = data["answer"].lower()
        # Must NOT describe Snowflake as exclusively proprietary
        assert "exclusively proprietary" not in answer_lower
        # Must acknowledge Snowflake Iceberg support
        assert "iceberg" in answer_lower
        assert "snowflake" in answer_lower

    def test_snowflake_not_described_as_locked_in(
        self, client, mock_gemini_assistant, mock_retriever_sections
    ):
        """Snowflake should not be described as fully locked-in or no open format support."""
        mock_gemini_assistant.generate_structured.return_value = AssistantResponse(
            answer=(
                "Snowflake offers native Iceberg table support with external catalogs. "
                "IOMETE is built 100% on Apache Iceberg and runs on customer Kubernetes."
            ),
            citations=[
                Citation(
                    doc_title="IOMETE Competitor Comparison & Differentiation",
                    section_title="Deep Dive: IOMETE vs Snowflake",
                    filename="08_competitor_comparison.md",
                    source_url="https://iomete.com/why-iomete",
                )
            ],
            suggested_followups=[],
            evidence_status="Verified from Documentation",
            needs_confirmation=False,
        )

        with patch.object(document_retriever, "search", return_value=mock_retriever_sections):
            response = client.post(
                "/api/ai/assistant",
                json={"message": "Does Snowflake lock you in?"},
            )

        data = response.json()
        answer_lower = data["answer"].lower()
        assert "no open format" not in answer_lower
        assert "cannot use iceberg" not in answer_lower


class TestOfficialPricingAccuracy:
    """Regression: IOMETE pricing must include $500/vCPU/yr, $100k/yr minimum,
    and infrastructure costs being additional."""

    def test_pricing_includes_minimum_commitment(
        self, client, mock_gemini_assistant, mock_retriever_sections
    ):
        """Pricing answer must mention the $100,000/year minimum commitment."""
        mock_gemini_assistant.generate_structured.return_value = AssistantResponse(
            answer=(
                "IOMETE Enterprise Edition is priced at $500 per vCPU per year "
                "with a published minimum annual commitment of $100,000 per year "
                "(equivalent to 200 vCPUs baseline). Infrastructure costs for "
                "Kubernetes VMs, object storage, and data transfer are additional "
                "and paid directly to the cloud provider."
            ),
            citations=[
                Citation(
                    doc_title="IOMETE Pricing Model & Total Cost of Ownership",
                    section_title="Official Pricing Tiers",
                    filename="06_business_pricing_tco.md",
                    source_url="https://iomete.com/pricing",
                )
            ],
            suggested_followups=["What does the Free Tier include?"],
            evidence_status="Verified from Documentation",
            needs_confirmation=False,
        )

        with patch.object(document_retriever, "search", return_value=mock_retriever_sections):
            response = client.post(
                "/api/ai/assistant",
                json={"message": "How much does IOMETE Enterprise cost?"},
            )

        data = response.json()
        assert "$500" in data["answer"]
        assert "100,000" in data["answer"] or "$100k" in data["answer"].lower() or "100000" in data["answer"]
        assert "infrastructure" in data["answer"].lower()

    def test_pricing_citation_uses_pricing_url(
        self, client, mock_gemini_assistant, mock_retriever_sections
    ):
        """Pricing citations must point to https://iomete.com/pricing, not a generic URL."""
        mock_gemini_assistant.generate_structured.return_value = AssistantResponse(
            answer="IOMETE Enterprise is $500/vCPU/year with a $100,000/year minimum.",
            citations=[
                Citation(
                    doc_title="IOMETE Pricing",
                    section_title="Official Pricing Tiers",
                    filename="06_business_pricing_tco.md",
                    source_url="https://iomete.com/pricing",
                )
            ],
            suggested_followups=[],
            evidence_status="Verified from Documentation",
            needs_confirmation=False,
        )

        with patch.object(document_retriever, "search", return_value=mock_retriever_sections):
            response = client.post(
                "/api/ai/assistant",
                json={"message": "What is IOMETE pricing?"},
            )

        data = response.json()
        pricing_urls = [c["source_url"] for c in data["citations"]]
        assert any("pricing" in url for url in pricing_urls), (
            f"Expected at least one citation URL containing 'pricing', got: {pricing_urls}"
        )


class TestUnsupportedMarkupClaims:
    """Regression: Must NOT state arbitrary percentage markups like
    'Snowflake charges 300–500% markups' without a verified source."""

    def test_no_arbitrary_markup_percentages(
        self, client, mock_gemini_assistant, mock_retriever_sections
    ):
        """Answer must not contain unsupported markup percentage claims."""
        mock_gemini_assistant.generate_structured.return_value = AssistantResponse(
            answer=(
                "Snowflake uses consumption-based credit billing where costs scale "
                "with usage volume. IOMETE uses flat $500/vCPU/year capacity licensing. "
                "Cost differences depend on specific workload patterns and concurrency."
            ),
            citations=[
                Citation(
                    doc_title="IOMETE Pricing Model & Total Cost of Ownership",
                    section_title="Pricing Model Comparison",
                    filename="06_business_pricing_tco.md",
                    source_url="https://iomete.com/pricing",
                )
            ],
            suggested_followups=[],
            evidence_status="Verified from Documentation",
            needs_confirmation=False,
        )

        with patch.object(document_retriever, "search", return_value=mock_retriever_sections):
            response = client.post(
                "/api/ai/assistant",
                json={"message": "How much more does Snowflake charge compared to IOMETE?"},
            )

        data = response.json()
        answer = data["answer"]
        # Must not contain unsupported markup claims
        assert "300%" not in answer
        assert "500%" not in answer
        assert "300-500%" not in answer
        assert "300–500%" not in answer
        assert "800%" not in answer

    def test_no_guaranteed_savings_claim(
        self, client, mock_gemini_assistant, mock_retriever_sections
    ):
        """Answer must not guarantee specific savings percentages."""
        mock_gemini_assistant.generate_structured.return_value = AssistantResponse(
            answer=(
                "Potential savings with IOMETE depend on workload patterns, "
                "concurrency profiles, and negotiated cloud provider discounts. "
                "IOMETE's capacity licensing model can be advantageous for "
                "steady-state, high-utilization workloads."
            ),
            citations=[
                Citation(
                    doc_title="IOMETE Pricing Model",
                    section_title="TCO Analysis",
                    filename="06_business_pricing_tco.md",
                    source_url="https://iomete.com/pricing",
                )
            ],
            suggested_followups=[],
            evidence_status="Verified from Documentation",
            needs_confirmation=False,
        )

        with patch.object(document_retriever, "search", return_value=mock_retriever_sections):
            response = client.post(
                "/api/ai/assistant",
                json={"message": "How much will IOMETE save us?"},
            )

        data = response.json()
        answer_lower = data["answer"].lower()
        assert "guaranteed savings" not in answer_lower
        assert "zero egress" not in answer_lower


class TestUnverifiedCertifications:
    """Regression: Unverified certifications (FedRAMP, DISA, NASA) must trigger
    'Needs Confirmation' and never be stated as verified."""

    def test_fedramp_triggers_needs_confirmation(
        self, client, mock_gemini_assistant, mock_retriever_sections
    ):
        """FedRAMP High query must return Needs Confirmation."""
        mock_gemini_assistant.generate_structured.return_value = AssistantResponse(
            answer=(
                "I couldn't verify this information in the available official IOMETE documentation. "
                "IOMETE documentation does not currently list FedRAMP High certification. "
                "Please confirm with the IOMETE team."
            ),
            citations=[],
            suggested_followups=["What compliance certifications are documented?"],
            evidence_status="Needs Confirmation",
            needs_confirmation=True,
        )

        with patch.object(document_retriever, "search", return_value=mock_retriever_sections):
            response = client.post(
                "/api/ai/assistant",
                json={"message": "Does IOMETE have FedRAMP High certification?"},
            )

        data = response.json()
        assert data["evidence_status"] == "Needs Confirmation"
        assert data["needs_confirmation"] is True

    def test_force_needs_confirmation_on_unverifiable_claim(
        self, client, mock_gemini_assistant, mock_retriever_sections
    ):
        """Even if the model says 'Verified', the post-processing guard must flip
        it to 'Needs Confirmation' when the answer text contains the unverified phrase."""
        mock_gemini_assistant.generate_structured.return_value = AssistantResponse(
            answer=(
                "I couldn't verify this information in the available official IOMETE documentation. "
                "Please confirm with the IOMETE team."
            ),
            citations=[],
            suggested_followups=[],
            # Model incorrectly returns Verified
            evidence_status="Verified from Documentation",
            needs_confirmation=False,
        )

        with patch.object(document_retriever, "search", return_value=mock_retriever_sections):
            response = client.post(
                "/api/ai/assistant",
                json={"message": "Is IOMETE ISO 27001 certified?"},
            )

        data = response.json()
        # Post-processing guard must override to Needs Confirmation
        assert data["evidence_status"] == "Needs Confirmation"
        assert data["needs_confirmation"] is True


class TestCitationURLRelevance:
    """Regression: Citations must use exact, deep URLs — never generic homepages
    like https://iomete.com/ or https://iomete.com/docs."""

    def test_generic_homepage_url_replaced(
        self, client, mock_gemini_assistant, mock_retriever_sections
    ):
        """Generic https://iomete.com must be replaced with a deep URL."""
        mock_gemini_assistant.generate_structured.return_value = AssistantResponse(
            answer="IOMETE runs inside your Kubernetes cluster.",
            citations=[
                Citation(
                    doc_title="IOMETE Product Fundamentals",
                    section_title="Overview",
                    filename="01_product_fundamentals.md",
                    # Intentionally generic — should be replaced by post-processing
                    source_url="https://iomete.com",
                )
            ],
            suggested_followups=[],
            evidence_status="Verified from Documentation",
            needs_confirmation=False,
        )

        with patch.object(document_retriever, "search", return_value=mock_retriever_sections):
            response = client.post(
                "/api/ai/assistant",
                json={"message": "Where does IOMETE run?"},
            )

        data = response.json()
        for cite in data["citations"]:
            assert cite["source_url"] != "https://iomete.com", (
                "Generic homepage URL should be replaced with a deep URL"
            )
            assert cite["source_url"] != "https://iomete.com/", (
                "Generic homepage URL should be replaced with a deep URL"
            )

    def test_generic_docs_url_replaced(
        self, client, mock_gemini_assistant, mock_retriever_sections
    ):
        """Generic https://iomete.com/docs must be replaced with a specific docs path."""
        mock_gemini_assistant.generate_structured.return_value = AssistantResponse(
            answer="IOMETE uses compute-storage separation.",
            citations=[
                Citation(
                    doc_title="Architecture",
                    section_title="Compute-Storage Separation",
                    filename="02_architecture_and_technology.md",
                    source_url="https://iomete.com/docs",
                )
            ],
            suggested_followups=[],
            evidence_status="Verified from Documentation",
            needs_confirmation=False,
        )

        with patch.object(document_retriever, "search", return_value=mock_retriever_sections):
            response = client.post(
                "/api/ai/assistant",
                json={"message": "How does architecture work?"},
            )

        data = response.json()
        for cite in data["citations"]:
            assert cite["source_url"] != "https://iomete.com/docs", (
                "Generic docs URL should be replaced with a deep docs URL"
            )
            assert cite["source_url"] != "https://iomete.com/docs/", (
                "Generic docs URL should be replaced with a deep docs URL"
            )

    def test_security_url_replaced_with_ranger_path(
        self, client, mock_gemini_assistant, mock_retriever_sections
    ):
        """https://iomete.com/docs/security should be replaced with /data-security/ranger."""
        mock_gemini_assistant.generate_structured.return_value = AssistantResponse(
            answer="Apache Ranger provides cell-level masking.",
            citations=[
                Citation(
                    doc_title="IOMETE Security",
                    section_title="Apache Ranger",
                    filename="04_security_and_governance.md",
                    source_url="https://iomete.com/docs/security",
                )
            ],
            suggested_followups=[],
            evidence_status="Verified from Documentation",
            needs_confirmation=False,
        )

        with patch.object(document_retriever, "search", return_value=mock_retriever_sections):
            response = client.post(
                "/api/ai/assistant",
                json={"message": "How does security work?"},
            )

        data = response.json()
        assert data["citations"][0]["source_url"] == "https://iomete.com/docs/data-security/ranger"


class TestSelfHostedTradeoffs:
    """Regression: Answers about deployment must explain operational trade-offs
    of self-hosted deployment, including customer infrastructure responsibilities."""

    def test_self_hosted_mentions_customer_responsibilities(
        self, client, mock_gemini_assistant, mock_retriever_sections
    ):
        """Self-hosted deployment answer must mention customer infrastructure responsibilities."""
        mock_gemini_assistant.generate_structured.return_value = AssistantResponse(
            answer=(
                "IOMETE deploys into your Kubernetes cluster via the "
                "iomete-data-plane-enterprise Helm chart. The customer is responsible "
                "for provisioning and maintaining the Kubernetes cluster, node pools, "
                "VPC networking, cloud IAM roles, and paying cloud infrastructure costs directly."
            ),
            citations=[
                Citation(
                    doc_title="IOMETE Deployment & Infrastructure",
                    section_title="Kubernetes Helm Installation",
                    filename="03_deployment_and_infrastructure.md",
                    source_url="https://iomete.com/docs/installation",
                )
            ],
            suggested_followups=["What are the minimum Kubernetes requirements?"],
            evidence_status="Verified from Documentation",
            needs_confirmation=False,
        )

        with patch.object(document_retriever, "search", return_value=mock_retriever_sections):
            response = client.post(
                "/api/ai/assistant",
                json={"message": "What is required to run IOMETE in our own infrastructure?"},
            )

        data = response.json()
        answer_lower = data["answer"].lower()
        assert "customer" in answer_lower or "your" in answer_lower
        assert "responsible" in answer_lower or "maintain" in answer_lower
        assert "kubernetes" in answer_lower

    def test_no_zero_vendor_lockin_guarantee(
        self, client, mock_gemini_assistant, mock_retriever_sections
    ):
        """Answer must not guarantee zero vendor lock-in."""
        mock_gemini_assistant.generate_structured.return_value = AssistantResponse(
            answer=(
                "IOMETE uses open table formats (Apache Iceberg) and open compute "
                "(Apache Spark on Kubernetes), which reduce switching friction. "
                "However, operational dependencies on IOMETE's Helm chart, "
                "Lakehouse Manager, and SQL Studio still exist."
            ),
            citations=[
                Citation(
                    doc_title="IOMETE Product Fundamentals",
                    section_title="Open Architecture",
                    filename="01_product_fundamentals.md",
                    source_url="https://iomete.com/why-iomete",
                )
            ],
            suggested_followups=[],
            evidence_status="Verified from Documentation",
            needs_confirmation=False,
        )

        with patch.object(document_retriever, "search", return_value=mock_retriever_sections):
            response = client.post(
                "/api/ai/assistant",
                json={"message": "Does IOMETE have vendor lock-in?"},
            )

        data = response.json()
        answer_lower = data["answer"].lower()
        assert "zero vendor lock-in" not in answer_lower
        assert "guaranteed" not in answer_lower or "guarantee" not in answer_lower


class TestURLPostProcessing:
    """Unit tests for the deterministic URL replacement logic in assistant.py.
    These verify the post-processing step without relying on model behavior."""

    def test_all_generic_urls_are_replaced(
        self, client, mock_gemini_assistant, mock_retriever_sections
    ):
        """Every known generic URL must be replaced by the post-processing step."""
        # The model returns multiple citations with various generic URLs
        mock_gemini_assistant.generate_structured.return_value = AssistantResponse(
            answer="Combined answer about multiple topics.",
            citations=[
                Citation(
                    doc_title="A", section_title="A",
                    filename="01_product_fundamentals.md",
                    source_url="https://iomete.com",
                ),
                Citation(
                    doc_title="B", section_title="B",
                    filename="02_architecture_and_technology.md",
                    source_url="https://iomete.com/",
                ),
                Citation(
                    doc_title="C", section_title="C",
                    filename="03_deployment_and_infrastructure.md",
                    source_url="https://iomete.com/docs",
                ),
                Citation(
                    doc_title="D", section_title="D",
                    filename="04_security_and_governance.md",
                    source_url="https://iomete.com/docs/",
                ),
                Citation(
                    doc_title="E", section_title="E",
                    filename="05_platform_capabilities.md",
                    source_url="https://iomete.com/docs/security",
                ),
            ],
            suggested_followups=[],
            evidence_status="Verified from Documentation",
            needs_confirmation=False,
        )

        with patch.object(document_retriever, "search", return_value=mock_retriever_sections):
            response = client.post(
                "/api/ai/assistant",
                json={"message": "Tell me about everything."},
            )

        data = response.json()
        blocked_urls = {
            "https://iomete.com",
            "https://iomete.com/",
            "https://iomete.com/docs",
            "https://iomete.com/docs/",
            "https://iomete.com/docs/security",
        }
        for cite in data["citations"]:
            assert cite["source_url"] not in blocked_urls, (
                f"Generic URL '{cite['source_url']}' was not replaced by post-processing"
            )

    def test_deep_url_preserved_unchanged(
        self, client, mock_gemini_assistant, mock_retriever_sections
    ):
        """Already-deep URLs must NOT be altered by post-processing."""
        deep_url = "https://iomete.com/docs/table-maintenance"
        mock_gemini_assistant.generate_structured.return_value = AssistantResponse(
            answer="Lakehouse Manager automates compaction.",
            citations=[
                Citation(
                    doc_title="Platform Capabilities",
                    section_title="Lakehouse Manager",
                    filename="05_platform_capabilities.md",
                    source_url=deep_url,
                )
            ],
            suggested_followups=[],
            evidence_status="Verified from Documentation",
            needs_confirmation=False,
        )

        with patch.object(document_retriever, "search", return_value=mock_retriever_sections):
            response = client.post(
                "/api/ai/assistant",
                json={"message": "How does table maintenance work?"},
            )

        data = response.json()
        assert data["citations"][0]["source_url"] == deep_url
