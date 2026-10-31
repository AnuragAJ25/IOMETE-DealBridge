"""Prompt templates for IOMETE Sales Companion AI modules."""

PRODUCT_EXPLAINER_PROMPT = """Explain the IOMETE lakehouse topic '{topic}' specifically tailored for a '{buyer_role}' with '{technical_level}' technical depth.
Explanation preference: '{explanation_preference}'.

OFFICIAL IOMETE DOCUMENTATION CONTEXT:
{documentation_context}

REQUIREMENTS:
1. 'simple_explanation': A clear, non-jargon executive summary appropriate for a {buyer_role}.
2. 'business_relevance': Why this capability matters to their business, budget, risk, and team agility.
3. 'technical_explanation': Accurate technical mechanics (mention Apache Iceberg, decoupled Spark compute, open table formats, caching).
4. 'practical_example': A concrete, relatable operational scenario illustrating the contrast before vs after IOMETE.
5. 'follow_up_question': A thoughtful, open-ended question the seller should ask this {buyer_role} to deepen discovery.

Return strictly a JSON object with keys:
- simple_explanation (string)
- business_relevance (string)
- technical_explanation (string)
- practical_example (string)
- follow_up_question (string)
"""

SALES_CALL_PREP_PROMPT = """Prepare an enterprise sales meeting briefing for an upcoming conversation with:
- Company Name: {company_name}
- Industry: {industry}
- Lead Stakeholder: {buyer_role}
- Known Challenges / Bottlenecks: {known_challenges}
- Meeting Objective: {meeting_objective}

OFFICIAL IOMETE DOCUMENTATION CONTEXT:
{documentation_context}

CRITICAL RULES:
- Do NOT fabricate corporate secrets or present unverified assumptions as facts.
- Clearly identify discovery hypotheses in 'verification_notes' that must be validated with the prospect.
- Map stated challenges to IOMETE's true capabilities (e.g. Iceberg open tables, auto-scaling compute, 70% TCO savings, Apache Ranger RBAC).

Return strictly a JSON object with keys:
- meeting_brief (string: strategic summary framing the conversation)
- discovery_questions (list of strings: 4-5 high-impact questions to diagnose current warehouse pain points)
- relevant_iomete_capabilities (list of strings: 3-4 specific IOMETE capabilities addressing their challenges)
- talking_points (list of strings: 3-4 persuasive seller talk tracks)
- potential_objections (list of objects with 'objection' and 'recommended_response')
- verification_notes (list of strings: items to verify live rather than assume)
"""

DEMO_PERSONALIZER_PROMPT = """Create an interactive, personalized product demonstration storyline for:
- Industry: {industry}
- Buyer Requirements: {buyer_requirements}
- Core Use Case: {use_case}
- Technical Level: {technical_level}

OFFICIAL IOMETE DOCUMENTATION CONTEXT:
{documentation_context}

REQUIREMENTS:
- Keep all demo data scenarios explicitly marked as illustrative mock data.
- Structure a compelling narrative arc showing the journey from raw data in S3/ADLS to sub-second BI dashboards.
- Mention specific IOMETE modules (Catalog Explorer, SQL Studio, Auto-Scaling Spark Clusters, Apache Ranger Governance).

Return strictly a JSON object with keys:
- demo_storyline (string: narrative walk-through from start to finish)
- relevant_components (list of strings: specific platform UI areas to highlight)
- sample_data_scenario (string: description of the illustrative dataset and metrics)
- seller_talking_points (list of strings: narration talking points for the presenter during the demo)
- suggested_next_step (string: natural transition to a 14-day assisted PoC)
"""

SECURITY_ASSISTANT_PROMPT = """Answer the prospective buyer's security question strictly using the provided official IOMETE documentation.

BUYER'S QUESTION:
"{question}"

ADDITIONAL CONTEXT FROM QUESTIONNAIRE (IF ANY):
"{additional_context}"

OFFICIAL IOMETE SECURITY & GOVERNANCE DOCUMENTATION:
{documentation_context}

CRITICAL SECURITY RULES:
1. NEVER invent or hallucinate security certifications, compliance statuses, encryption capabilities, or guarantees.
2. If the documentation explicitly covers the topic, provide a clear, professional answer citing the document and section.
   Set 'evidence_status' to 'Verified from Documentation' and 'needs_confirmation' to false.
3. If the documentation does NOT explicitly verify the claim (e.g. FedRAMP High, PCI-DSS Level 1 merchant, or bespoke sovereignty guarantees):
   - You MUST clearly state in the answer: "Needs confirmation from the IOMETE team."
   - Set 'evidence_status' to 'Needs Confirmation'.
   - Set 'needs_confirmation' to true.
   - List any partial relevant facts that ARE documented without overstepping.

Return strictly a JSON object with keys:
- answer (string)
- source_references (list of strings: e.g. ["security_and_governance.md > Access Control & Authorization (Apache Ranger)"])
- evidence_status (string: 'Verified from Documentation' or 'Needs Confirmation')
- needs_confirmation (boolean: true or false)
"""

MEETING_SUMMARY_PROMPT = """Generate an executive-level sales meeting summary and Mutual Action Plan (MAP) based on:
- Buyer Requirements: {buyer_requirements}
- Selected Use Cases: {selected_use_cases}
- Questions & Objections Discussed: {questions_discussed}
- Seller Notes / Observations: {seller_notes}
- Proposed Next Steps: {next_steps}

OFFICIAL IOMETE DOCUMENTATION CONTEXT:
{documentation_context}

REQUIREMENTS:
- Formulate an executive narrative summary suitable for sharing with client leadership (e.g. VP Data / CFO).
- Outline validated requirements and how IOMETE addresses each.
- List any unresolved questions that require technical follow-up.
- Propose clear, milestone-driven next steps toward a 14-day production PoC.

Return strictly a JSON object with keys:
- meeting_summary (string)
- key_requirements (list of strings)
- discussed_capabilities (list of strings)
- unanswered_questions (list of strings)
- recommended_next_steps (list of strings)
"""
