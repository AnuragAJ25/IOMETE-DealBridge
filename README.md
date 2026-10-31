# IOMETE DealBridge — Sales Companion Platform

> **Make Complex Technology Easy to Understand, Evaluate & Buy.**

A human-led, AI-assisted sales enablement platform designed for **IOMETE** solutions architects and enterprise sales leaders. The website empowers the human seller to orchestrate visual storytelling, interactive architectures, real-time TCO calculations, live SQL demos, and mutual action planning with enterprise prospective buyers.

This is **NOT** an autonomous AI sales agent — the human seller remains in total control of the narrative, pacing, and navigation, while the buyer can interactively explore sliders, architecture tiers, and calculators.

---

## 🚀 Key Capabilities & Architectural Highlights

1. **Human-Led Guided Presentation Journey**:
   - A structured 7-stage sales roadmap across Discovery, Architecture, Live Demo, Security, ROI Modeling, Competitive Comparison, and Mutual Action Plan (MAP).
   - Integrated **Presenter Teleprompter** (`/presenter`) with real-time talking points, high-impact discovery questions, and objection handling cards.
   - Pacing clock with timer and stage progress indicators.

2. **Dual-Role Sync (Seller Pilot vs Buyer Sandbox)**:
   - **Seller Mode**: Navigation lock, teleprompter notes drawer, pacing timer, buyer engagement telemetry, and question logger.
   - **Buyer Mode** (`/buyer`): Self-service sliders for monthly cloud spend, raw data footprint, and analyst team size with instant ROI and payback modeling.

3. **Interactive Visual Modules**:
   - **Interactive Lakehouse Architecture** (`/architecture`): Deep node inspection of customer-owned cloud storage, Apache Iceberg open table format, distributed Spark compute, and Apache Ranger governance vs legacy closed warehouses (Snowflake).
   - **Interactive SQL Studio & Auto-Scaler** (`/demo`): Realistic sub-second SQL queries on 120M+ rows with partition pruning and dynamic Spark worker fleet scaling simulator.
   - **Dynamic TCO Calculator** (`/business-case`): Interactive 3-year financial model with Recharts comparing Snowflake/Databricks/BigQuery vs IOMETE.
   - **Enterprise Trust & InfoSec** (`/security`): Interactive Apache Ranger RBAC persona inspector and column masking simulator.
   - **Competitive Battlecards** (`/competitors`): Head-to-head contrast and feature comparison matrix vs Snowflake, Databricks, and AWS Athena.
   - **Executive Summary & MAP** (`/meeting-summary`): Auto-compiled deal recap, milestone action plan, and confetti-powered PoC charter sign-off.

4. **Grounded AI Sales Copilot (Google Gemini)**:
   - 5 dedicated AI endpoints for sales call prep, audience-tailored pitch explanations, personalized demo agendas, security review assistance, and post-call executive summaries.
   - Keyword-based markdown document grounding from verified IOMETE product, architecture, security, and TCO documentation.
   - Zero-hallucination safeguards and fallback mechanisms for unverified claims.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 & custom enterprise design tokens
- **Icons**: Lucide React
- **Animations & Micro-interactions**: Framer Motion & CSS keyframe transitions
- **Data Visualization**: Recharts (Interactive 3-year TCO charts)
- **Delight & Celebrations**: Canvas Confetti
- **State Management**: React Context (`PresentationContext`) + `localStorage` persistence

### Backend & AI
- **Framework**: Python 3.11+ with FastAPI & Uvicorn
- **Validation**: Pydantic v2 & Pydantic-Settings
- **AI Engine**: Google Gemini API (`google-genai` / `google-generativeai`)
- **Default Model**: `gemini-2.5-flash` (or `gemini-1.5-flash` / `gemini-1.5-pro`)
- **Grounding / Knowledge Base**: Structured section-indexed Markdown retriever (`knowledge_base/iomete_docs/`)
- **Testing**: Pytest & Starlette TestClient (100% mocked AI in automated tests)

---

## 📁 Application Route Structure

| Route | Name | Purpose |
|---|---|---|
| `/` | **Home / Launchpad** | High-impact hero, deal banner, 7-stage roadmap stepper, and module selector |
| `/dashboard` | **Executive Dashboard** | Key deal KPIs, buyer dossier, session objectives checklist, and stage launcher |
| `/meeting` | **Guided Meeting Room** | Active presentation runner, dual-view preview, and buyer engagement tracker |
| `/presenter` | **Presenter Console** | Private seller HUD, talking points, objection cards, and question logger |
| `/buyer` | **Buyer Interactive Portal** | Client sandbox with spend sliders, ROI preview, and question submitter |
| `/architecture` | **Lakehouse Architecture** | Interactive multi-tier Iceberg diagram with deep technical node inspection |
| `/use-cases` | **Use-Case Discovery** | Filterable industry & workload cards with Problem ➔ Solution mapping |
| `/demo` | **Live Product Tour** | SQL workbench simulation, Spark worker auto-scaler, and video walkthrough |
| `/business-case` | **TCO & Financial Model** | Interactive spend sliders and 3-year Recharts comparative cost breakdown |
| `/security` | **Enterprise Security** | Private VPC residency, SOC2/HIPAA badges, and Apache Ranger RBAC simulator |
| `/learn` | **Knowledge Hub** | Iceberg primers, lakehouse math breakdown, and technical FAQ accordion |
| `/meeting-summary` | **Meeting Summary & MAP** | Executive recap memo, 4-milestone Mutual Action Plan, and PoC activation |
| `/competitors` | **Competitive Battlecards** | Head-to-head architectural & pricing comparison vs Snowflake, Databricks, Athena |

---

## ⚡ Backend & AI Architecture

The backend lives in the `backend/` directory, exposing a structured REST API configured with CORS for seamless frontend consumption.

```
backend/
├── app/
│   ├── main.py                     # FastAPI app, lifespan, CORS & routers
│   ├── core/
│   │   └── config.py               # Pydantic Settings & environment variables
│   ├── ai/
│   │   └── gemini.py               # GeminiService (dual SDK, JSON parsing)
│   ├── prompts/
│   │   ├── system_instructions.py  # Behavioral boundaries & anti-hallucination
│   │   └── templates.py            # 5 structured prompt templates
│   ├── services/
│   │   └── document_retriever.py   # Grounding retrieval over markdown docs
│   ├── schemas/                    # Pydantic request & response models
│   │   ├── health.py
│   │   ├── product_explainer.py
│   │   ├── sales_call_prep.py
│   │   ├── demo_personalizer.py
│   │   ├── security_assistant.py
│   │   └── meeting_summary.py
│   └── api/
│       └── routes/                 # 5 AI routes + health
├── tests/                          # 23 automated pytest cases (all passing)
│   ├── conftest.py                 # Mocks for Gemini & document retriever
│   ├── test_health.py
│   └── test_api_endpoints.py
└── requirements.txt
```

### 🧠 Grounded Knowledge Base
The AI is grounded in authentic, verified IOMETE technical documents stored in `knowledge_base/iomete_docs/`:
- `architecture_overview.md` — Decoupled compute/storage, multi-engine Spark & Trino, metadata caching
- `deployment_models.md` — Customer VPC/Cloud, On-Premise Kubernetes, and fully managed SaaS
- `iceberg_management.md` — Auto compaction, snapshot retention, schema evolution, catalog federation
- `security_and_governance.md` — Apache Ranger, fine-grained RBAC/ABAC, column masking, KMS encryption
- `tco_and_pricing.md` — Transparent compute pricing, 70-80% savings vs Snowflake/Databricks

### 🛡️ Anti-Hallucination & Guardrails
- **Grounding Injection**: The `DocumentRetriever` selects matching documentation sections based on query keywords and injects them as an explicit context block into the prompt.
- **Strict Guardrail System**: Prompts enforce:
  1. *Never invent features or compliance certifications not explicitly present in context.*
  2. *If documentation is insufficient, explicitly return `"needs_custom_confirmation"` and flag for manual solution architect review.*
  3. *All outputs are strictly validated into Pydantic JSON schemas.*

---

## 🔌 API Endpoints Summary

| Endpoint | Method | Purpose |
|---|---|---|
| `/health` | `GET` | Health check, Gemini status, loaded doc chunk count |
| `/api/ai/product-explainer` | `POST` | Persona-tailored pitch (Executive, Technical, Architect) |
| `/api/ai/sales-call-prep` | `POST` | Pre-call briefing, discovery questions, objection traps |
| `/api/ai/demo-personalizer` | `POST` | Minute-by-minute demo agenda with screen hooks |
| `/api/ai/security-assistant` | `POST` | VPC data sovereignty & compliance review with doc citations |
| `/api/ai/meeting-summary` | `POST` | Executive summary, MAP action items, follow-up email draft |

> Detailed schema definitions, request payloads, and example responses are available in [`docs/API_CONTRACT.md`](file:///c:/AntiGravity_WorkSpaces/IOMETE-DealBridge/docs/API_CONTRACT.md) and via Swagger UI at [http://localhost:8000/docs](http://localhost:8000/docs).

---

## 💻 Local Setup & Running Instructions

### 1. Prerequisites
- **Node.js**: 18.x or higher
- **npm**: 9.x or higher
- **Python**: 3.11 or higher
- **Google Gemini API Key**: [Get a key from Google AI Studio](https://aistudio.google.com/)

---

### 2. Frontend Setup (Next.js)

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
# Copy .env.example or create .env.local:
# NEXT_PUBLIC_API_BASE_URL=http://localhost:8000

# 3. Start Next.js development server
npm run dev
```

The frontend will be available at [http://localhost:3000](http://localhost:3000).

---

### 3. Backend Setup (FastAPI + Gemini)

```bash
# 1. Create and activate Python virtual environment
python -m venv backend/venv

# Windows PowerShell:
.\backend\venv\Scripts\Activate.ps1
# Or Windows CMD:
# .\backend\venv\Scripts\activate.bat
# Or Linux / macOS:
# source backend/venv/bin/activate

# 2. Install backend dependencies
pip install -r backend/requirements.txt

# 3. Set your Google Gemini API key
# Create a .env file in the project root:
# GEMINI_API_KEY=your_actual_gemini_api_key_here
# GEMINI_MODEL=gemini-2.5-flash

# 4. Start the FastAPI server from the project root
python -m uvicorn backend.app.main:app --host 0.0.0.0 --port 8000 --reload
```

- **API Base**: [http://localhost:8000](http://localhost:8000)
- **Interactive Swagger Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)
- **Health Check**: [http://localhost:8000/health](http://localhost:8000/health)

---

### 4. Running Backend Tests

The test suite runs with 100% mocked Gemini responses, so **no paid API calls or live API keys** are needed to run tests:

```bash
# Run all tests with pytest
backend\venv\Scripts\python.exe -m pytest backend/tests/ -v

# Or if the virtual environment is activated:
pytest backend/tests/ -v
```

**Test Coverage**:
- Request validation for missing required fields on all 5 AI endpoints
- Missing Gemini API key graceful degradation (HTTP 503)
- Upstream Gemini error handling (HTTP 502)
- Structured JSON response parsing and schema conformance
- `DocumentRetriever` section indexing, keyword search, and context formatting
- Zero-documentation security fallback
- Health check endpoints (`/health` and `/api/health`)

---

### 5. Frontend API Client Usage

A centralized, strongly-typed API client is available at [`src/lib/api.ts`](file:///c:/AntiGravity_WorkSpaces/IOMETE-DealBridge/src/lib/api.ts):

```typescript
import { apiClient } from "@/lib/api";

// 1. Health check
const health = await apiClient.checkHealth();
console.log(health.gemini_configured);

// 2. Persona-tailored product explainer
const explainer = await apiClient.generateProductExplainer({
  audience_role: "architect",
  depth_level: "deep_dive",
  topic: "Decoupled compute and Apache Iceberg catalog synchronization",
});

// 3. InfoSec inquiry
const secResult = await apiClient.askSecurityAssistant({
  question: "Does IOMETE have access to customer data in VPC deployment?",
  compliance_frameworks: ["SOC2", "HIPAA"],
});
```

---

## 📋 Presentation Journey Cheatsheet

1. Start at `/` or `/dashboard` to review target buyer profile (Alex Vance @ Northstar FinTech).
2. Enter `/meeting` to run the live presentation room.
3. Use the docked remote control at the bottom to traverse the 7 stages:
   - **Stage 1**: `/use-cases` (Discovery & Pain Point Diagnosis)
   - **Stage 2**: `/architecture` (Open Apache Iceberg Lakehouse)
   - **Stage 3**: `/demo` (Sub-second SQL & Dynamic Auto-scaling)
   - **Stage 4**: `/security` (Zero-Data-Retention & Apache Ranger)
   - **Stage 5**: `/business-case` (70% Compute TCO Savings)
   - **Stage 6**: `/competitors` (Battlecards vs Snowflake & Databricks)
   - **Stage 7**: `/meeting-summary` (Mutual Action Plan & 14-day PoC)
4. Toggle **"Talking Points"** anytime to view contextual speaker notes and objection counters.
