# IOMETE DealBridge — API Contract & Backend Reference

This document provides the definitive REST API specification for the IOMETE DealBridge backend, built on **FastAPI** and integrated with **Google Gemini AI** and local grounding documentation.

---

## 1. Overview & Base URL

- **Default Local URL**: `http://localhost:8000`
- **Interactive OpenAPI Documentation (Swagger)**: `http://localhost:8000/docs`
- **ReDoc Documentation**: `http://localhost:8000/redoc`
- **CORS Allowed Origins**: `http://localhost:3000`, `http://127.0.0.1:3000` (configurable via `CORS_ORIGINS` in `.env`)
- **Content Type**: `application/json`

---

## 2. Global Error Format

All error responses return standard HTTP status codes and a structured JSON payload:

```json
{
  "detail": "Descriptive message explaining the validation failure, missing API key, or AI generation error."
}
```

### Standard Status Codes:
- `200 OK`: Request succeeded.
- `422 Unprocessable Entity`: Request body failed Pydantic schema validation.
- `500 Internal Server Error`: Backend runtime exception or server configuration error.
- `502 Bad Gateway`: Upstream Google Gemini API error, rate limit, or network failure.
- `503 Service Unavailable`: Google Gemini API key is missing or invalid on the server.

---

## 3. Endpoints Reference

### 3.1. Health Check

Verifies backend server liveness, Google Gemini configuration state, active model version, and loaded documentation chunks.

- **URL**: `/health` (also aliased at `/api/health`)
- **Method**: `GET`
- **Authentication**: None

#### Response: `200 OK`
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "gemini_configured": true,
  "gemini_model": "gemini-2.5-flash",
  "documentation_files_indexed": 18
}
```

---

### 3.2. Product Explainer (`/api/ai/product-explainer`)

Generates audience-tailored, grounded explanations of IOMETE's lakehouse architecture, Apache Iceberg governance, or deployment models.

- **URL**: `/api/ai/product-explainer`
- **Method**: `POST`

#### Request Payload
| Field | Type | Required | Description |
|---|---|---|---|
| `buyer_role` | `string` | Yes | Target persona: `"CIO"`, `"VP Data Platform"`, `"Lead Data Engineer"`, `"Head of FinOps"` |
| `technical_level` | `string` | No (Default: `"Intermediate"`) | Detail level: `"Executive"`, `"Intermediate"`, or `"Deep Technical"` |
| `topic` | `string` | Yes | Subject: e.g. `"Decoupled Compute and Storage on Apache Iceberg"` |
| `explanation_preference` | `string` | No (Default: `"Analogy-Driven"`) | `"Analogy-Driven"`, `"Financial/ROI-Focused"`, `"Deep Architecture"`, `"Bullet Points"` |

#### Example Request
```json
{
  "buyer_role": "VP Data Platform",
  "technical_level": "Intermediate",
  "topic": "Decoupled Compute and Storage on Apache Iceberg",
  "explanation_preference": "Analogy-Driven"
}
```

#### Example Response (`200 OK`)
```json
{
  "simple_explanation": "IOMETE separates your data storage from the compute engines that query it, much like an electricity grid where you own your appliances and only pay for the kilowatt-hours you consume.",
  "business_relevance": "Eliminates proprietary vendor markups on cloud compute and storage, reducing annual data warehouse bills by up to 80%.",
  "technical_explanation": "Data resides as open Apache Iceberg Parquet files in customer-owned S3 or GCS buckets. Independent Spark and Trino clusters spin up on Kubernetes, query the open files via metadata pointers, and terminate when idle.",
  "practical_example": "During month-end financial reporting, spin up an 8-node compute cluster for 45 minutes to run heavy aggregations without paying for 24/7 idle warehouse clusters.",
  "follow_up_question": "What percentage of your existing Snowflake compute credits are currently consumed by idle cluster keep-alives?"
}
```

---

### 3.3. Sales Call Prep (`/api/ai/sales-call-prep`)

Prepares an IOMETE sales representative for an upcoming pitch or discovery call with target discovery questions, strategic talking points, and objection counters.

- **URL**: `/api/ai/sales-call-prep`
- **Method**: `POST`

#### Request Payload
| Field | Type | Required | Description |
|---|---|---|---|
| `company_name` | `string` | Yes | Target customer name (e.g., `"Northstar FinTech"`) |
| `industry` | `string` | Yes | Industry vertical (e.g., `"FinTech"`) |
| `buyer_role` | `string` | Yes | Lead stakeholder title (e.g., `"VP of Data & Infrastructure"`) |
| `known_challenges` | `string[] \| string` | Yes | Customer challenges (e.g., `["Snowflake credit overrun", "Slow morning reports"]`) |
| `meeting_objective` | `string` | Yes | Primary goal (e.g., `"Secure agreement for 14-day production PoC"`) |

#### Example Request
```json
{
  "company_name": "Northstar FinTech",
  "industry": "FinTech",
  "buyer_role": "VP of Data & Infrastructure",
  "known_challenges": ["Snowflake credit overrun by 40%", "BI report latency over 30s during peak market hours"],
  "meeting_objective": "Secure technical agreement for a 14-day production PoC on top 5 Tableau dashboards"
}
```

#### Example Response (`200 OK`)
```json
{
  "meeting_brief": "Northstar FinTech is seeking compute cost predictability and sub-second BI dashboard latency while keeping transaction data inside their AWS perimeter.",
  "discovery_questions": [
    "How does your team currently handle small-file compaction in your existing data lake?",
    "What is your target p95 dashboard response time during peak market hours?"
  ],
  "relevant_iomete_capabilities": [
    "In-VPC Kubernetes deployment with zero data exfiltration",
    "Automated background Iceberg compaction without table locks",
    "On-demand Trino compute clusters with auto-suspend"
  ],
  "talking_points": [
    "No vendor compute markup: you pay AWS directly for EC2 instances",
    "Data stays in your S3 buckets in open Apache Iceberg format at all times"
  ],
  "potential_objections": [
    {
      "objection": "We don't want to manage another complex open-source infrastructure stack.",
      "recommended_response": "IOMETE provides a fully automated control plane that handles cluster provisioning, scaling, and Iceberg maintenance automatically."
    }
  ],
  "verification_notes": [
    "Verify whether their current Tableau connection uses live queries or extracts."
  ]
}
```

---

### 3.4. Demo Personalizer (`/api/ai/demo-personalizer`)

Generates a tailored demo storyline, relevant UI components to showcase, a realistic mock dataset scenario, and chronological narration points for live sales calls.

- **URL**: `/api/ai/demo-personalizer`
- **Method**: `POST`

#### Request Payload
| Field | Type | Required | Description |
|---|---|---|---|
| `industry` | `string` | Yes | e.g. `"FinTech"`, `"Retail"`, `"Healthcare"` |
| `buyer_requirements` | `string[] \| string` | Yes | Key requirements: `["Sub-second SQL", "Private VPC", "Tableau support"]` |
| `use_case` | `string` | Yes | Workload scenario: `"High-concurrency executive financial reporting"` |
| `technical_level` | `string` | No (Default: `"Intermediate"`) | `"Executive"`, `"Intermediate"`, or `"Hands-On Data Engineer"` |

#### Example Request
```json
{
  "industry": "FinTech",
  "buyer_requirements": ["Tableau sub-second response", "Private AWS VPC deployment", "No data egress fees"],
  "use_case": "High-concurrency executive financial reporting and risk analysis",
  "technical_level": "Intermediate"
}
```

#### Example Response (`200 OK`)
```json
{
  "demo_storyline": "From raw transaction ingestion in your private S3 bucket to sub-second Tableau risk analytics using automated Iceberg partition pruning.",
  "relevant_components": [
    "Catalog Explorer (Iceberg table metadata & schema evolution)",
    "SQL Workbench (Sub-second query execution on 120M records)",
    "Spark Auto-Scaler (Dynamic node allocation during load spikes)"
  ],
  "sample_data_scenario": "120M row credit card authorization stream partitioned by year/month/region.",
  "seller_talking_points": [
    "Point out that the query runs directly against open Iceberg files without proprietary ingestion",
    "Demonstrate how compute nodes automatically scale down to zero when queries finish"
  ],
  "suggested_next_step": "Offer a 14-day production PoC connected to an isolated test bucket with customer queries."
}
```

---

### 3.5. Security Assistant (`/api/ai/security-assistant`)

Provides rigorous, grounded answers to technical enterprise security, compliance, data residency, and isolation questions with direct documentation references.

- **URL**: `/api/ai/security-assistant`
- **Method**: `POST`

#### Grounding & Hallucination Prevention
- When documentation does **not** contain verified facts to answer the question, the assistant explicitly flags:
  - `evidence_status: "Needs Confirmation"`
  - `needs_confirmation: true`
  - Explains what documentation covers and recommends scheduling an IOMETE security architect call.

#### Request Payload
| Field | Type | Required | Description |
|---|---|---|---|
| `question` | `string` | Yes | The buyer's InfoSec or compliance question |
| `documentation_context` | `string` | No | Optional additional context or customer-provided questionnaire snippet |

#### Example Request
```json
{
  "question": "Does IOMETE have access to customer encryption keys, or can we manage our own keys via AWS KMS?"
}
```

#### Example Response (`200 OK`)
```json
{
  "answer": "IOMETE does not manage or store your encryption keys. In customer-hosted deployments, data at rest is encrypted using customer-managed AWS KMS keys (or GCP KMS / HashiCorp Vault), and the control plane never has access to the key material.",
  "source_references": [
    "security_and_governance.md (Encryption at Rest and in Transit)",
    "deployment_models.md (Customer VPC Deployment)"
  ],
  "evidence_status": "Verified from Documentation",
  "needs_confirmation": false
}
```

---

### 3.6. Meeting Summary & Follow-Up (`/api/ai/meeting-summary`)

Summarizes an executive or technical sales meeting, recaps key requirements, notes discussed capabilities, identifies unanswered questions, and outlines next MAP milestones.

- **URL**: `/api/ai/meeting-summary`
- **Method**: `POST`

#### Request Payload
| Field | Type | Required | Description |
|---|---|---|---|
| `buyer_requirements` | `string[] \| string` | Yes | Validated customer requirements |
| `selected_use_cases` | `string[]` | Yes | Use cases mapped during the session |
| `questions_discussed` | `string[]` | Yes | Key questions or objections raised during the conversation |
| `seller_notes` | `string` | No | Internal observations or action items recorded by the sales team |
| `next_steps` | `string[]` | No | Preliminary next steps discussed at the end of the call |

#### Example Request
```json
{
  "buyer_requirements": ["Sub-second Tableau dashboard latency", "Private VPC in AWS us-east-1", "Budget reduction >50%"],
  "selected_use_cases": ["Executive BI Dashboard Acceleration", "Snowflake Cost Deflation & Iceberg Migration"],
  "questions_discussed": ["How does automated Iceberg file compaction work?", "What is the migration effort for existing dbt models?"],
  "seller_notes": "Buyer is facing strong Q4 pressure from CFO to cut compute credits.",
  "next_steps": ["Share security whitepaper", "Schedule VPC peering technical call"]
}
```

#### Example Response (`200 OK`)
```json
{
  "meeting_summary": "Constructive discovery session with data leadership focusing on accelerating Tableau executive dashboards and deflating escalating Snowflake compute bills via an open Iceberg lakehouse deployed in their private AWS VPC.",
  "key_requirements": [
    "Sub-second Tableau dashboard latency",
    "Private VPC in AWS us-east-1",
    "Compute cost reduction >50%"
  ],
  "discussed_capabilities": [
    "Trino-powered high concurrency query engine",
    "Zero-copy Apache Iceberg open table architecture",
    "Automated background compaction and metadata management"
  ],
  "unanswered_questions": [
    "Specific timeline and dbt adapter migration details for custom SQL models"
  ],
  "recommended_next_steps": [
    "Deliver IOMETE Security Whitepaper and SOC2 compliance package",
    "Conduct 45-minute technical VPC architecture session with infrastructure team",
    "Initiate 14-day production PoC charter"
  ]
}
```
