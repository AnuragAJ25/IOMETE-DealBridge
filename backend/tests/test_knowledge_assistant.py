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
    assert data["citations"][0]["source_url"] == "https://iomete.com/docs"


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
