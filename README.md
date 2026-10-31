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

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 & custom enterprise design tokens
- **Icons**: Lucide React
- **Animations & Micro-interactions**: Framer Motion & CSS keyframe transitions
- **Data Visualization**: Recharts (Interactive 3-year TCO charts)
- **Delight & Celebrations**: Canvas Confetti
- **State Management**: React Context (`PresentationContext`) + `localStorage` persistence (No database required)

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

## 🧩 Reusable Component Library

- **Navigation & Layout**: `Navbar`, `Sidebar`, `AppShell`, `PageHeader`, `SectionHeader`
- **Presentation Engine**: `PresenterControls` (docked remote bar), `ProgressIndicator` (stepper & compact), `PresenterNotesDrawer` (teleprompter script)
- **Content & Visuals**: `FeatureCard`, `VideoCard`
- **Primitives**: `Button`, `Badge`, `Modal`, `Tooltip`, `LoadingState`, `EmptyState`

---

## 💻 Local Installation & Running Instructions

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher

### Steps

1. **Clone & Navigate to Workspace**:
   ```bash
   cd c:\AntiGravity_WorkSpaces\IOMETE-DealBridge
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   ```bash
   cp .env.example .env.local
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```

5. **Open in Browser**:
   Open [http://localhost:3000](http://localhost:3000) in your web browser.

6. **Validate Production Build**:
   ```bash
   npm run build
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
