# IOMETE DealBridge — Sales Companion Platform

> **Make Complex Technology Easy to Understand, Evaluate & Buy.**

A human-led, AI-assisted sales enablement platform designed for **IOMETE** solutions architects and enterprise sales leaders. The website empowers the human seller to orchestrate visual storytelling, interactive architectures, real-time TCO calculations, live SQL demos, and mutual action planning with enterprise prospective buyers.

This is **NOT** an autonomous AI sales agent — the human seller remains in total control of the narrative, pacing, and navigation, while the buyer can interactively explore sliders, architecture tiers, and calculators.

---

## 🚀 Key Capabilities & Architectural Highlights

1. **Human-Led Guided Presentation Journey**:
   - A structured 9-stage sales roadmap across Discovery, Problem Storytelling, Product Introduction, Architecture, Use Cases, Live Demo, ROI Modeling, Security, and Mutual Action Plan (MAP).
   - Integrated **Presenter Teleprompter** (`/presenter`) with real-time talking points, high-impact discovery questions, and objection handling cards.
   - Pacing clock with timer and stage progress indicators.

2. **Dual-Role Sync (Seller Pilot vs Buyer Sandbox)**:
   - **Seller Mode**: Navigation lock, teleprompter notes drawer, pacing timer, buyer engagement telemetry, and question logger.
   - **Buyer Mode** (`/buyer`): Self-service sliders for monthly cloud spend, raw data footprint, and analyst team size with instant ROI and payback modeling.
   - **State Isolation**: Buyer interactions in sandbox mode do not alter or disrupt the seller's active meeting progress.

3. **Interactive Visual Modules**:
   - **Interactive Architecture Explorer** (`/architecture`): Powered by **React Flow** with 9 layers: Data Sources, Ingestion, Apache Iceberg, S3 Storage, Apache Spark, Workloads, Governance, Customer Perimeter, and Kubernetes Orchestration. Clickable nodes with a detailed side panel and animated data flows.
   - **Use-Case Finder** (`/use-cases`): Interactive 7-parameter deterministic matcher for Industry, Existing Infrastructure, Data Sources, Business Challenges, Analytics, AI/ML, and Data Sovereignty.
   - **Personalized Demo** (`/demo`): 5 pre-engineered industry scenarios (Banking/FinTech, Retail, Healthcare, Manufacturing, Telecom) with data journeys, seller hooks, and live SQL execution.
   - **Business Case Builder** (`/business-case`): Interactive 3-year financial model with **Recharts** comparing Snowflake/Databricks/BigQuery vs IOMETE based on user-entered assumptions.
   - **Enterprise Trust & InfoSec** (`/security`): Interactive Apache Ranger RBAC persona inspector, column masking simulator, and documentation-grounded security assistant.
   - **Executive Summary & MAP** (`/meeting-summary`): Auto-compiled deal recap, milestone action plan, confetti-powered PoC charter sign-off, and grounded AI meeting synthesis.

4. **Grounded AI Sales Copilot (Google Gemini Microservices)**:
   - 5 dedicated AI endpoints for sales call prep, audience-tailored pitch explanations, personalized demo agendas, security review assistance, and post-call executive summaries.
   - Keyword-based markdown document grounding from verified IOMETE product, architecture, security, and TCO documentation (`knowledge_base/iomete_docs/`).
   - Zero-hallucination safeguards and fallback mechanisms for unverified claims.

5. **"Learn IOMETE from the Experts" Video Series** (`/learn`):
   - Features **Shyaamal Tripathi** (GTM & Developer Advocacy, IOMETE).
   - Dual HTML5 video players (`/videos/iomete-overview.mp4` and `/videos/iomete-demo.mp4`) with native controls and original LinkedIn post fallback links.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 16 with App Router (Turbopack)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 & custom enterprise design tokens
- **Diagrams & Visual Workflows**: React Flow (`@xyflow/react`)
- **Data Visualization**: Recharts (Interactive 3-year TCO charts)
- **Icons**: Lucide React
- **Animations & Micro-interactions**: Framer Motion
- **Delight & Celebrations**: Canvas Confetti
- **State Management**: React Context (`PresentationContext`) + `sessionStorage` & `localStorage` persistence

### Backend & AI
- **Framework**: Python 3.11+ with FastAPI & Uvicorn
- **Validation**: Pydantic v2 & Pydantic-Settings
- **AI Engine**: Google Gemini API (`google-genai` / `google-generativeai`)
- **Default Model**: `gemini-2.5-flash` (or `gemini-1.5-flash` / `gemini-1.5-pro`)
- **Grounding / Knowledge Base**: Structured section-indexed Markdown retriever (`knowledge_base/iomete_docs/`)
- **Testing**: Pytest & Starlette TestClient (100% mocked AI in automated tests)

---

## 📁 Complete Route Structure & Buyer Journey

```
Discovery ➔ Problem Story ➔ Product Explainer ➔ Architecture ➔ Use Case ➔ Personalized Demo ➔ Business Case ➔ Security ➔ Meeting Summary
```

| Step | Route | Name | Purpose |
|---|---|---|---|
| 1 | `/` | **Home / Launchpad** | High-impact hero, deal banner, 9-stage roadmap stepper, and module selector |
| 2 | `/dashboard` | **Executive Dashboard** | Key deal KPIs, buyer dossier, session objectives checklist, and AI Sales Call Strategy Brief |
| 3 | `/use-cases` | **Use-Case Finder & Dilemma** | Interactive 7-parameter questionnaire matcher, workload blueprints, and Platform Dilemma Story |
| 4 | `/learn` | **Knowledge Hub & Videos** | Product introduction, AI Persona-Tailored Explainer, and "Learn from Experts" video player |
| 5 | `/architecture` | **Lakehouse Architecture** | React Flow 9-tier interactive diagram with node inspection and animated data flows |
| 6 | `/demo` | **Live Product Tour** | 5 industry scenarios, AI Demo Journey Personalizer, live SQL workbench, and auto-scaler |
| 7 | `/business-case` | **TCO & Financial Model** | Interactive spend sliders, editable assumptions, and 3-year Recharts comparative cost chart |
| 8 | `/security` | **Enterprise Security Center** | Documentation-grounded security assistant, SOC2/HIPAA badges, and Apache Ranger RBAC simulator |
| 9 | `/competitors` | **Competitive Battlecards** | Head-to-head architectural & pricing comparison vs Snowflake, Databricks, Athena |
| 10 | `/meeting-summary` | **Meeting Summary & MAP** | Grounded AI executive recap memo, 4-milestone Mutual Action Plan, and PoC activation |
| — | `/meeting` | **Guided Meeting Room** | Active presentation runner, dual-view preview, and buyer engagement tracker |
| — | `/presenter` | **Presenter Console** | Private seller HUD, teleprompter notes, objection cards, and question logger |
| — | `/buyer` | **Buyer Interactive Portal** | Client sandbox with spend sliders, ROI preview, and question submitter |

---

## ⚡ Backend & AI Architecture

The backend lives in the `backend/` directory, exposing a structured REST API configured with CORS for frontend consumption.

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

---

## 🔌 API Endpoints Summary

| Endpoint | Method | Connected Frontend Component | Purpose |
|---|---|---|---|
| `/health` | `GET` | Health monitoring & navbar badges | Health check, Gemini status, loaded doc chunk count |
| `/api/ai/product-explainer` | `POST` | `AIProductExplainer.tsx` on `/learn` | Persona-tailored pitch (Executive, Technical, Architect) |
| `/api/ai/sales-call-prep` | `POST` | `AISalesPrepBrief.tsx` on `/dashboard` | Pre-call briefing, discovery questions, objection traps |
| `/api/ai/demo-personalizer` | `POST` | `AIDemoPersonalizer.tsx` on `/demo` | Minute-by-minute demo agenda with screen hooks |
| `/api/ai/security-assistant` | `POST` | `GroundedSecurityAssistant.tsx` on `/security` | VPC data sovereignty & compliance review with doc citations |
| `/api/ai/meeting-summary` | `POST` | `AIMeetingSummaryGenerator.tsx` on `/meeting-summary` | Executive summary, MAP action items, follow-up email draft |

> Complete schema definitions, request payloads, and example responses are available in [`docs/API_CONTRACT.md`](file:///c:/AntiGravity_WorkSpaces/IOMETE-DealBridge/docs/API_CONTRACT.md) and via Swagger UI at [http://localhost:8000/docs](http://localhost:8000/docs).

---

## 🔑 Environment Variables Reference

Create a `.env` file in the project root by copying `.env.example`:

```bash
cp .env.example .env
```

| Variable | Scope | Default | Description |
|---|---|---|---|
| `NEXT_PUBLIC_API_URL` | Frontend | `http://localhost:8000` (dev only) | Base URL of the FastAPI backend service (e.g. `https://iomete-dealbridge-backend.onrender.com`) |
| `GEMINI_API_KEY` | Backend | `""` (Empty string) | Google Gemini API key from Google AI Studio |
| `GEMINI_MODEL` | Backend | `gemini-2.5-flash` | Gemini model (`gemini-2.5-flash`, `gemini-1.5-flash`) |
| `CORS_ORIGINS` | Backend | `["http://localhost:3000"]` | Allowed frontend origins for CORS |
| `KNOWLEDGE_BASE_DIR` | Backend | `knowledge_base/iomete_docs` | Directory containing grounded markdown documentation |

> **Security Rule**: The `GEMINI_API_KEY` is strictly used by the FastAPI backend and is **never** exposed to the frontend or browser bundle.

---

## 💻 Local Development Instructions

### 1. Prerequisites
- **Node.js**: 18.x or higher
- **npm**: 9.x or higher
- **Python**: 3.11 or higher
- **Google Gemini API Key**: [Get a free API key from Google AI Studio](https://aistudio.google.com/)

---

### 2. Quickstart (Dual Server Setup)

#### Terminal 1 — Start FastAPI Backend:
```bash
# 1. Activate Python virtual environment
# Windows PowerShell:
.\backend\venv\Scripts\Activate.ps1
# Linux / macOS:
# source backend/venv/bin/activate

# 2. Install dependencies (if not already installed)
pip install -r backend/requirements.txt

# 3. Start Uvicorn backend server
python -m uvicorn backend.app.main:app --host 0.0.0.0 --port 8000 --reload
```
- API Base: [http://localhost:8000](http://localhost:8000)
- Interactive Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)
- Health Check: [http://localhost:8000/health](http://localhost:8000/health)

#### Terminal 2 — Start Next.js Frontend:
```bash
# 1. Install npm dependencies
npm install

# 2. Run Next.js development server
npm run dev
```
- Frontend: [http://localhost:3000](http://localhost:3000)

---

### 3. Running Automated Tests

#### Backend Test Suite (Pytest)
The test suite runs with 100% mocked AI responses, so **no paid API calls or live API keys** are needed to run tests:

```bash
# Run all backend tests
backend\venv\Scripts\python.exe -m pytest backend/tests/ -v

# Output: 23 passed in ~0.3s
```

#### Frontend Type Checking & Production Build
```bash
# Validate TypeScript type safety
npx tsc --noEmit

# Validate Next.js production bundle
npm run build
```

---

## 🚢 Production Deployment Instructions

### Option A: Containerized Deployment (Docker)

#### 1. Backend Dockerfile (`backend/Dockerfile`):
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["python", "-m", "uvicorn", "backend.app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

#### 2. Frontend Dockerfile (`Dockerfile`):
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000
CMD ["npm", "start"]
```

### Option B: Cloud Deployment (Vercel + Cloud Run / Render)
1. **Frontend**: Deploy Next.js to **Vercel** or **AWS Amplify**. Set the environment variable:
   - `NEXT_PUBLIC_API_URL=https://your-backend-api.com`
2. **Backend**: Deploy FastAPI to **Google Cloud Run**, **AWS App Runner**, or **Render**. Set:
   - `GEMINI_API_KEY=your_actual_key`
   - `GEMINI_MODEL=gemini-2.5-flash`
   - `CORS_ORIGINS=["https://your-frontend-domain.vercel.app"]`
   - `KNOWLEDGE_BASE_DIR=knowledge_base/iomete_docs`

---

## 📋 Presentation Journey Cheatsheet for Sellers

1. **Launchpad** (`/`): Introduce IOMETE DealBridge and review the 9-stage meeting roadmap.
2. **Executive Dashboard** (`/dashboard`): Review target account dossier and click **"Generate AI Call Strategy"** for pre-call talking points and objection traps.
3. **Use-Case Finder** (`/use-cases`): Complete the 7-parameter questionnaire with the buyer to deterministically identify their ideal implementation blueprint.
4. **Knowledge & Videos** (`/learn`): Trigger **"Explain for Persona"** to tailor the pitch for a CIO or FinOps lead, and watch original developer walkthrough videos by Shyaamal Tripathi.
5. **Architecture Explorer** (`/architecture`): Inspect the 9-tier React Flow diagram, click individual components (S3 storage, Apache Iceberg, Apache Spark, Apache Ranger), and demonstrate private VPC data isolation.
6. **Live Demo** (`/demo`): Select the buyer's industry scenario, trigger **"Tailor Demo Journey"**, run sub-second SQL queries in the interactive studio, and adjust the cluster auto-scaler.
7. **Business Case Builder** (`/business-case`): Adjust monthly cloud spend, data footprint, and growth sliders to calculate 3-year TCO savings and view Recharts comparative projections.
8. **Security Center** (`/security`): Use the **Grounded Security Assistant** to address InfoSec and compliance questions with verified doc citations, and simulate Apache Ranger dynamic column masking.
9. **Meeting Summary & MAP** (`/meeting-summary`): Enter seller observations, click **"Generate AI Summary"** for an executive memo and follow-up milestones, and celebrate with the **"Accept Mutual Action Plan"** PoC sign-off.
