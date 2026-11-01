import logging
from typing import List

from fastapi import APIRouter, HTTPException, status

from backend.app.ai.gemini import GeminiServiceError, gemini_service
from backend.app.schemas.assistant import (
    AssistantRequest,
    AssistantResponse,
    Citation,
)
from backend.app.services.document_retriever import document_retriever

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/ai", tags=["AI Knowledge Assistant"])


@router.post(
    "/assistant",
    response_model=AssistantResponse,
    status_code=status.HTTP_200_OK,
    summary="IOMETE Comprehensive AI Knowledge Assistant & Sales Copilot",
    description="Contextually grounded, documentation-backed answers with citations, persona tailoring, and multi-turn support.",
)
async def query_knowledge_assistant(request: AssistantRequest) -> AssistantResponse:
    if not request.message or not request.message.strip():
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="The 'message' field cannot be empty.",
        )

    # 1. Retrieve top matching documentation sections
    matched_sections = document_retriever.search(request.message, top_k=4)
    doc_context = document_retriever.format_context_for_prompt(matched_sections)

    # 2. Build structured citations from matched sections
    citations: List[Citation] = []
    seen_refs = set()
    for sec in matched_sections:
        ref_key = f"{sec.filename}::{sec.section_title}"
        if ref_key not in seen_refs:
            seen_refs.add(ref_key)
            citations.append(
                Citation(
                    doc_title=sec.doc_title,
                    section_title=sec.section_title,
                    filename=sec.filename,
                    source_url=sec.source_url,
                )
            )

    # 3. Format conversational history
    history_lines = []
    for turn in request.history[-6:]:  # Keep recent 3 roundtrips
        role_label = "Prospect / User" if turn.role.lower() == "user" else "IOMETE Assistant"
        history_lines.append(f"{role_label}: {turn.content}")
    history_block = "\n".join(history_lines) if history_lines else "None (New conversation)"

    # 4. Construct Persona Framing & Page Context
    persona_instruction = ""
    if request.persona:
        p = request.persona.lower()
        if "cto" in p:
            persona_instruction = (
                "The user is a Chief Technology Officer (CTO). Emphasize architectural control, "
                "open standards (Apache Iceberg, Apache Spark), multi-cloud portability, avoiding proprietary engine lock-in, and engineering velocity."
            )
        elif "cio" in p or "ciso" in p or "security" in p:
            persona_instruction = (
                "The user is a CIO/CISO or Security Executive. Emphasize Zero-Data-Retention (ZDR), customer-hosted VPC deployment, "
                "CMEK encryption, Apache Ranger cell-level masking, row filtering, audit logs, and documented compliance (HIPAA, GDPR, SOC 2)."
            )
        elif "engineer" in p or "data" in p:
            persona_instruction = (
                "The user is a Data Engineer or Analytics Engineer. Emphasize developer ergonomics, interactive SQL Studio, "
                "Spark batch/streaming jobs, dbt-iomete adapter, automated Iceberg table maintenance (compaction, orphan removal), and visual explain plans."
            )
        elif "finops" in p or "procurement" in p or "cfo" in p:
            persona_instruction = (
                "The user is a FinOps or Procurement Leader. Emphasize official pricing: Free Tier up to 100 vCPUs, "
                "Enterprise Edition at $500/vCPU/year with a $100,000/year minimum commitment (200 vCPUs baseline), "
                "direct cloud infrastructure billing, and capacity-based predictability for steady-state workloads."
            )
        elif "architect" in p:
            persona_instruction = (
                "The user is a Principal Data Architect. Emphasize clean separation of compute and storage, Apache Iceberg REST catalog, "
                "multi-engine interoperability (Snowflake Iceberg tables, Trino, Athena querying same Iceberg tables), and workload concurrency isolation."
            )

    page_context_instruction = ""
    if request.current_page:
        page_context_instruction = f"The user is currently browsing the frontend page: '{request.current_page}'."

    # 5. Build Rigorous System Prompt
    system_instruction = (
        "You are the official IOMETE AI Knowledge Assistant & Sales Copilot on DealBridge.\n"
        "Your mission is to provide deeply informative, accurate, balanced, and strictly verified answers about the IOMETE Data Lakehouse platform.\n\n"
        "CORE ACCURACY & FACTUAL RULES:\n"
        "1. STRICT DOCUMENTATION GROUNDING:\n"
        "   - Base all platform capabilities, architectures, pricing, and features strictly on the provided OFFICIAL IOMETE DOCUMENTATION CONTEXT.\n"
        "   - Do NOT invent or hallucinate certifications, unannounced features, or fictitious customer case studies.\n"
        "   - If a specific question cannot be verified from the documentation (e.g. unverified certifications like FedRAMP High, unannounced partnerships like NASA, arbitrary third-party claims), explicitly state:\n"
        "     'I couldn't verify this information in the available official IOMETE documentation. Please confirm with the IOMETE team.'\n"
        "     In such cases, set 'evidence_status' to 'Needs Confirmation' and 'needs_confirmation' to true.\n"
        "   - When information is conclusively verified in the documentation context, set 'evidence_status' to 'Verified from Documentation' and 'needs_confirmation' to false.\n\n"
        "2. COMPETITOR ACCURACY & BALANCED COMPARISON:\n"
        "   - Produce objective, balanced comparisons, not sales propaganda.\n"
        "   - NEVER claim that Snowflake has exclusively proprietary storage. Official Snowflake documentation confirms native support for Apache Iceberg tables, including customer-managed external storage (S3/GCS/Azure Blob) and external catalogs (Glue, Iceberg REST, or Snowflake-managed).\n"
        "   - REMOVE all unsupported numerical competitor claims such as 'Snowflake charges 300–500% markups'. Do NOT state arbitrary percentage markups unless an exact, reliable source explicitly supports it.\n"
        "   - Frame the contrast accurately: Snowflake is a fully managed SaaS service billing via consumption credits; IOMETE is a lakehouse platform running inside customer-managed Kubernetes with fixed annual vCPU capacity licensing.\n\n"
        "3. OFFICIAL IOMETE PRICING ACCURACY:\n"
        "   - Follow official pricing from https://iomete.com/pricing:\n"
        "     * Free Tier: $0/month up to 100 vCPUs with community support.\n"
        "     * Enterprise Plan: $500 per vCPU per year with a published minimum annual commitment of $100,000 per year (equivalent to a baseline of 200 vCPUs).\n"
        "     * Business Critical Plan: Custom pricing with a published minimum annual commitment of $250,000 per year.\n"
        "   - ALWAYS state that infrastructure costs (Kubernetes VMs, object storage, and data transfer) are additional and paid directly to the cloud provider (AWS, Azure, GCP).\n"
        "   - DO NOT state that IOMETE guarantees zero vendor lock-in, zero egress charges, or guaranteed savings. State realistically that open table formats reduce switching friction, and cost savings depend on specific workload patterns, concurrency, and cloud provider discounts.\n\n"
        "4. DISTINGUISH IOMETE FROM OPEN SOURCE & EXPLAIN TRADE-OFFS:\n"
        "   - Distinguish IOMETE product capabilities (Helm chart `iomete-data-plane-enterprise`, automated Lakehouse Manager for compaction/orphan cleanup/snapshot expiration, web SQL Studio, Apache Ranger RBAC integration, cluster autosuspend/autoscaler) from the baseline capabilities of Apache Iceberg, Apache Spark, or Kubernetes.\n"
        "   - Explain operational trade-offs of self-hosted deployment: Customer is responsible for Kubernetes cluster provisioning, upgrades, node pools, VPC networking/peering, cloud IAM roles, and paying cloud infrastructure bills.\n\n"
        "5. SPECIFIC CITATION URLS:\n"
        "   - Citations must use exact, deep documentation URLs (e.g. 'https://iomete.com/pricing', 'https://iomete.com/docs/architecture', 'https://iomete.com/docs/installation', 'https://iomete.com/docs/table-maintenance', 'https://iomete.com/docs/data-security/ranger', 'https://iomete.com/why-iomete'). Never return generic homepages ('https://iomete.com/' or 'https://iomete.com/docs').\n\n"
        "6. MULTILINGUAL FLUENCY (English + Hindi/Hinglish):\n"
        "   - If the user asks their question in Hindi or Hinglish, respond naturally in clear, professional Hindi / Hinglish while preserving standard technical terminology (e.g. 'Apache Iceberg', 'Kubernetes', 'VPC', 'vCPU').\n\n"
        "7. PERSONA & CONTEXT AWARENESS:\n"
        f"   {persona_instruction}\n"
        f"   {page_context_instruction}\n\n"
        "Return a valid JSON object matching the requested schema."
    )

    user_prompt = (
        f"--- CONVERSATION HISTORY ---\n{history_block}\n\n"
        f"--- OFFICIAL IOMETE DOCUMENTATION CONTEXT ---\n{doc_context}\n\n"
        f"--- USER QUERY ---\n{request.message}\n\n"
        "Please provide your grounded, balanced, and factually verified response according to the schema."
    )

    try:
        response: AssistantResponse = await gemini_service.generate_structured(
            prompt=user_prompt,
            response_model=AssistantResponse,
            system_instruction=system_instruction,
        )

        # Ensure deep, specific URLs on all citations
        generic_url_replacements = {
            "https://iomete.com": "https://iomete.com/why-iomete",
            "https://iomete.com/": "https://iomete.com/why-iomete",
            "https://iomete.com/docs": "https://iomete.com/docs/architecture",
            "https://iomete.com/docs/": "https://iomete.com/docs/architecture",
            "https://iomete.com/docs/security": "https://iomete.com/docs/data-security/ranger",
        }

        # Merge retriever citations with model citations to ensure valid source references
        if not response.citations and citations:
            response.citations = citations[:3]
        elif response.citations:
            url_map = {c.filename: c.source_url for c in citations}
            for c in response.citations:
                if c.filename in url_map:
                    c.source_url = url_map[c.filename]
                if c.source_url in generic_url_replacements:
                    c.source_url = generic_url_replacements[c.source_url]

        # Double-check citations for exact URLs
        for c in response.citations:
            if c.source_url in generic_url_replacements:
                c.source_url = generic_url_replacements[c.source_url]

        # If the answer indicates unverified information, enforce Needs Confirmation
        if "couldn't verify this information" in response.answer.lower() or "not verified" in response.answer.lower():
            response.evidence_status = "Needs Confirmation"
            response.needs_confirmation = True

        return response

    except GeminiServiceError as gse:
        logger.error(f"Gemini service error in knowledge assistant: {gse.message}")
        raise HTTPException(status_code=gse.status_code, detail=gse.message)
    except Exception as e:
        logger.error(f"Unexpected error in knowledge assistant endpoint: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An unexpected error occurred while processing your request: {str(e)}",
        )
