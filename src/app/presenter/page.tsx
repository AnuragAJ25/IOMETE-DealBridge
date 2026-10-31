"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePresentation } from "@/context/PresentationContext";
import { PageHeader } from "@/components/common/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Sparkles,
  Clock,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  HelpCircle,
  Play,
  RotateCcw,
  Pause,
  ExternalLink,
  Target,
  FileCheck,
  Maximize2,
  Minimize2,
  Sliders,
  Tv,
  Eye,
  Layers,
  Database,
  ShieldCheck,
  TrendingDown,
  Swords,
  Copy,
  Check,
} from "lucide-react";

interface StageDetail {
  script: { hook: string; proof: string; bridge: string };
  discoveryQuestions: string[];
  objections: { question: string; response: string }[];
  proTip: string;
  slideVisual: {
    title: string;
    headline: string;
    keyPoints: string[];
    highlightMetric: { label: string; value: string };
  };
}

const STAGE_DETAILS: Record<string, StageDetail> = {
  "use-cases": {
    script: {
      hook: "Open with empathy: 'Alex, you mentioned Snowflake credits are 40% over budget. Most data teams we speak with love SQL & Spark, but dread unpredictable month-end cloud bills.'",
      proof: "Today we want to show how decoupling your compute from storage with Apache Iceberg preserves sub-second BI speed while permanently right-sizing your budget.",
      bridge: "Let's first diagnose where query bottlenecks and credit bursts are currently concentrating across your Northstar FinTech pipelines.",
    },
    discoveryQuestions: [
      "What percentage of your cloud data spend is currently dedicated to idle warehouse clusters?",
      "How are your data engineers currently sharing datasets with your BI analysts?",
      "Have you run into table locking or concurrency limits during peak morning reporting runs?",
    ],
    objections: [
      {
        question: "We already have Snowflake/Databricks, why change now?",
        response:
          "You keep your existing BI tools (Tableau, Looker, PowerBI) intact with zero SQL rewrites. IOMETE sits directly on your cloud storage, cutting your compute bill by up to 70% with zero vendor lock-in.",
      },
      {
        question: "Will migrating disrupt our ongoing production reporting?",
        response:
          "No. Iceberg enables zero-copy in-place registration. You can point IOMETE to your existing Parquet tables on S3 and run parallel validation without moving data.",
      },
    ],
    proTip:
      "Listen for mention of 'credit bursts' or 'unexpected monthly spikes' — these are prime proof points for IOMETE's predictable flat-rate or right-sized compute.",
    slideVisual: {
      title: "Stage 1: Discovery & Pain Point Mapping",
      headline: "The Hidden Cost of Proprietary Cloud Warehouses",
      keyPoints: [
        "Unpredictable credit-based metering decouples billing from actual hardware usage",
        "Data trapped in proprietary micro-partitions requires expensive egress to query externally",
        "IOMETE brings managed simplicity without giving up cloud infrastructure sovereignty",
      ],
      highlightMetric: { label: "Typical Compute Margin Removed", value: "3x – 5x" },
    },
  },
  architecture: {
    script: {
      hook: "Point to the clean separation between customer storage (S3/ADLS) and elastic compute. Emphasize: 'Your data NEVER leaves your private cloud perimeter.'",
      proof: "Notice on the diagram: IOMETE spins up zero-copy Spark compute directly against your existing S3 buckets using the open Apache Iceberg format.",
      bridge: "Let's inspect how the metadata manifests provide full ACID transactions, snapshot isolation, and automated compaction without engineering overhead.",
    },
    discoveryQuestions: [
      "Is data sovereignty or private VPC residency mandatory for your upcoming InfoSec review?",
      "Are you currently paying egress fees when moving data between different analytics tools?",
      "How often does your team perform manual vacuum or file compaction routines?",
    ],
    objections: [
      {
        question: "Is managing Apache Iceberg going to overload our team?",
        response:
          "IOMETE provides fully automated metadata maintenance, file compaction, and partition pruning under the hood. Zero manual cluster tuning required.",
      },
      {
        question: "Can external engines like Python or Trino still query these tables?",
        response:
          "Yes! Because Apache Iceberg is a universal open table standard, any Iceberg-compliant engine can query your S3 data directly without translation.",
      },
    ],
    proTip:
      "Invite the buyer to toggle nodes on the architecture canvas to inspect the Apache Spark execution engine and Apache Ranger governance.",
    slideVisual: {
      title: "Stage 2: Modern Lakehouse Architecture",
      headline: "100% Customer Cloud Storage Decoupled from Elastic Compute",
      keyPoints: [
        "Data Plane resides inside customer VPC with AWS KMS Customer-Managed Keys (CMEK)",
        "Open Apache Iceberg format eliminates closed-vendor table lock-in permanently",
        "Dynamic Spark worker fleets auto-scale on demand and auto-suspend when idle",
      ],
      highlightMetric: { label: "Data Egress to Vendor", value: "0 MB (100% Private)" },
    },
  },
  demo: {
    script: {
      hook: "Walk through the unified SQL editor and catalog view. Show how easily an analyst can run complex aggregations across 120M+ rows.",
      proof: "Notice the query execution time: 840ms on over 120 million rows with partition pruning and memory-tier caching.",
      bridge: "Observe what happens when query concurrency drops: the compute cluster automatically steps down to zero idle cost.",
    },
    discoveryQuestions: [
      "How long does it typically take for a new data analyst to get onboarded and query their first table?",
      "Do your users experience latency spikes when multiple teams run dashboards simultaneously?",
    ],
    objections: [
      {
        question: "Can our business analysts write standard ANSI SQL?",
        response:
          "100% standard ANSI SQL with full support for window functions, nested JSON, and standard JDBC/ODBC drivers for Tableau and Looker.",
      },
    ],
    proTip:
      "Trigger the simulated live query benchmark in the demo module to demonstrate sub-second response times.",
    slideVisual: {
      title: "Stage 3: Live Platform Tour & SQL Studio",
      headline: "Sub-Second SQL Analytics Meets Autonomous Scaling",
      keyPoints: [
        "Unified web-based SQL workbench, database explorer, and access catalog",
        "Vectorized execution cache delivers <850ms latency on 100M+ Iceberg records",
        "Autonomous auto-suspension prevents accidental billing overnight",
      ],
      highlightMetric: { label: "P95 Query Latency", value: "<850 ms" },
    },
  },
  security: {
    script: {
      hook: "Lead with Zero-Trust & Single-Tenant private cloud architecture. Reassure InfoSec stakeholders immediately.",
      proof: "Show fine-grained RBAC down to column-level masking and row-level filtering powered by Apache Ranger.",
      bridge: "Let's review the SOC2 Type II, HIPAA, and GDPR compliance certifications backing the platform.",
    },
    discoveryQuestions: [
      "Who within your organization owns the data governance and access audit approvals?",
      "Do you have requirements around column-level masking for PII, SSNs, or credit card numbers?",
    ],
    objections: [
      {
        question: "Does IOMETE have access to our plain text credentials or encryption keys?",
        response:
          "Never. Customer-managed encryption keys (CMEK) via AWS KMS or Azure Key Vault are strictly retained inside your cloud account. IOMETE adheres to zero-data-retention.",
      },
    ],
    proTip:
      "Remind the buyer that security teams love the zero-data-retention model because it accelerates InfoSec approval from months to days.",
    slideVisual: {
      title: "Stage 4: Enterprise Trust & InfoSec Governance",
      headline: "Private Cloud Residency with Apache Ranger Fine-Grained RBAC",
      keyPoints: [
        "Single-tenant architecture: compute and data remain within your isolated perimeter",
        "Dynamic column masking and row-level filtering applied at query time",
        "Comprehensive audit logs exported directly to your CloudWatch or Datadog",
      ],
      highlightMetric: { label: "Data Residency Guarantee", value: "Zero Data Retention" },
    },
  },
  "business-case": {
    script: {
      hook: "Input their actual 120 TB dataset and $42,000/mo spend into the calculator live. Show the concrete dollar impact.",
      proof: "By shifting from proprietary credit units to raw cloud compute + IOMETE platform fees, Northstar FinTech saves over $344,000 annually.",
      bridge: "That frees up over $1M in capital over 3 years that can be reinvested into your engineering roadmap or AI initiatives.",
    },
    discoveryQuestions: [
      "If you freed up $300k+ in warehouse compute this year, where would you reinvest that budget?",
      "Who on your executive team (CFO, VP Finance) reviews cloud infrastructure spend?",
    ],
    objections: [
      {
        question: "What are the migration costs?",
        response:
          "Because Iceberg is an open format, migration is non-disruptive. You point IOMETE to your existing Parquet files on S3 directly without bulk exports.",
      },
    ],
    proTip:
      "Offer to export the personalized financial model for their CFO right after the call.",
    slideVisual: {
      title: "Stage 5: TCO Reduction & ROI Modeling",
      headline: "Up to 70% Lower Total Cost of Ownership",
      keyPoints: [
        "Replace 300%-500% vendor compute credit markups with transparent cloud compute",
        "Eliminate idle cluster waste with aggressive, automated auto-suspension",
        "Pay flat platform fees with zero data egress surcharges",
      ],
      highlightMetric: { label: "Projected 3-Year Savings", value: "$1,030,000+" },
    },
  },
  competitors: {
    script: {
      hook: "Focus on openness vs proprietary black-boxes. Praise competitors for early innovation, then explain where the modern market has evolved.",
      proof: "Snowflake charges massive markups on AWS compute; IOMETE runs at near-cloud-cost efficiency with 100% open Iceberg formats.",
      bridge: "Let's look at the side-by-side battlecard across table format, data residency, and pricing predictability.",
    },
    discoveryQuestions: [
      "What has been your team's experience with Snowflake credit burn rates?",
      "Have you experienced unexpected compute charges from unattended queries?",
    ],
    objections: [
      {
        question: "Isn't Snowflake easier to start with?",
        response:
          "Easy to start, but notoriously expensive at scale. IOMETE gives you that same 1-click simplicity with open standards and 70% lower TCO.",
      },
    ],
    proTip:
      "Avoid trashing competitors — praise their early adoption, then highlight where the market evolved to open table formats.",
    slideVisual: {
      title: "Stage 6: Competitive Landscape & Battlecards",
      headline: "Open Lakehouse Architecture vs Closed Proprietary SaaS",
      keyPoints: [
        "Snowflake: Closed micro-partition format & opaque credit burn vs IOMETE Open Iceberg",
        "Databricks: Complex cluster tuning & expensive DBUs vs IOMETE Automated Simplicity",
        "AWS Athena: High per-TB scanned charges vs IOMETE Predictable Flat Compute",
      ],
      highlightMetric: { label: "Format Portability", value: "100% Open Standards" },
    },
  },
  "meeting-summary": {
    script: {
      hook: "Summarize the 3 key findings agreed upon today: open table format, 70% compute savings, and zero-data-retention security.",
      proof: "Review the Mutual Action Plan (MAP) and milestone dates for the 14-day production PoC on one real workload.",
      bridge: "Let's confirm who from your infrastructure team should join our technical onboarding session this Thursday.",
    },
    discoveryQuestions: [
      "Does this timeline align with your Q4 architecture review schedule?",
      "Who else from your cloud infrastructure team should join our technical deep dive?",
    ],
    objections: [
      {
        question: "We need more time to review internally.",
        response:
          "Understood! Let me send the executive one-pager and ROI breakdown immediately. Let's reserve a provisional 20-minute slot next week.",
      },
    ],
    proTip:
      "Click 'Generate Executive One-Pager' to bundle today's inputs into their summary packet.",
    slideVisual: {
      title: "Stage 7: Executive Summary & Next Steps",
      headline: "Mutual Action Plan & 14-Day Production PoC Charter",
      keyPoints: [
        "Validated 68.4% compute savings on Northstar FinTech 120 TB workload",
        "Agreed upon 14-day assisted PoC with zero customer data egress",
        "PoC Success criteria: Sub-second BI latency & automatic cluster scaling",
      ],
      highlightMetric: { label: "PoC Duration", value: "14 Days" },
    },
  },
};

export default function PresenterConsolePage() {
  const {
    currentStage,
    currentStageIndex,
    nextStage,
    prevStage,
    stages,
    goToStage,
    meetingTimeElapsed,
    isTimerRunning,
    toggleTimer,
    resetTimer,
    sessionData,
    updateSessionData,
  } = usePresentation();

  const [questionInput, setQuestionInput] = useState("");
  const [viewMode, setViewMode] = useState<"hud" | "slide">("hud");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copiedQuestionIdx, setCopiedQuestionIdx] = useState<number | null>(null);

  // Keyboard navigation support: ArrowRight / ArrowLeft / PageDown / PageUp
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        nextStage();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        prevStage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextStage, prevStage]);

  // Fullscreen event listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionInput.trim()) return;
    updateSessionData({
      bookmarkedQuestions: [...sessionData.bookmarkedQuestions, questionInput.trim()],
    });
    setQuestionInput("");
  };

  const handleCopyQuestion = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedQuestionIdx(idx);
    setTimeout(() => setCopiedQuestionIdx(null), 2000);
  };

  const currentDetails = STAGE_DETAILS[currentStage.id] || STAGE_DETAILS["use-cases"];

  return (
    <div className="space-y-6">
      {/* Header with Title and Mode Switchers */}
      <PageHeader
        badge="Dedicated Seller Command HUD"
        badgeVariant="indigo"
        title="Presenter Teleprompter & Live Console"
        subtitle="Designed for live enterprise sales meetings. Seamlessly navigate sections without losing buyer inputs."
        breadcrumbs={[{ label: "DealBridge", href: "/" }, { label: "Presenter Console" }]}
        actions={
          <div className="flex items-center gap-2">
            {/* View Mode Switcher */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setViewMode("hud")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === "hud"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Sliders className="h-3.5 w-3.5" />
                <span>Teleprompter HUD</span>
              </button>
              <button
                onClick={() => setViewMode("slide")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === "slide"
                    ? "bg-sky-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Tv className="h-3.5 w-3.5" />
                <span>Slide Deck View</span>
              </button>
            </div>

            {/* Fullscreen Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFullscreen}
              className="hidden sm:flex items-center gap-1 cursor-pointer"
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="h-3.5 w-3.5" />
                  <span>Exit Fullscreen</span>
                </>
              ) : (
                <>
                  <Maximize2 className="h-3.5 w-3.5" />
                  <span>Fullscreen</span>
                </>
              )}
            </Button>

            <Link href={currentStage.route}>
              <Button variant="primary" size="sm">
                <span>View Full Stage</span>
                <ExternalLink className="h-3.5 w-3.5 ml-1" />
              </Button>
            </Link>
          </div>
        }
      />

      {/* Top Banner: Stage Nav, Progress & Pacing Clock */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="indigo" size="sm">
                Stage {currentStage.number} of {stages.length}
              </Badge>
              <span className="text-xs text-sky-400 font-medium">{currentStage.category}</span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400">Target: {currentStage.durationMin} mins</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              {currentStage.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Strategic Objective: <span className="text-slate-200">{currentStage.sellerGoal}</span>
            </p>
          </div>

          {/* Meeting Timer & Remote Navigation Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-800/90 px-3.5 py-2 rounded-xl border border-slate-700 font-mono text-sm">
              <Clock className="h-4 w-4 text-sky-400" />
              <span className="font-bold text-white">{formatTime(meetingTimeElapsed)}</span>
              <button
                onClick={toggleTimer}
                className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title={isTimerRunning ? "Pause Meeting Timer" : "Resume Meeting Timer"}
              >
                {isTimerRunning ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              </button>
              <button
                onClick={resetTimer}
                className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Reset Timer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <Button
                variant="secondary"
                size="sm"
                onClick={prevStage}
                disabled={currentStageIndex === 0}
                className="bg-slate-800 hover:bg-slate-700 text-white border-slate-700 disabled:opacity-30 cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Prev (←)</span>
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={nextStage}
                disabled={currentStageIndex === stages.length - 1}
                className="disabled:opacity-30 cursor-pointer shadow-md shadow-sky-500/20"
              >
                <span className="hidden sm:inline">Next (→)</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Navigation Strip (All 7 Stages) */}
        <div className="pt-3 border-t border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>QUICK NAVIGATION (JUMP DIRECTLY WITHOUT LOSING SELECTIONS)</span>
            <span>Keyboard: ← / → Arrow Keys</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5">
            {stages.map((stg, idx) => {
              const isActive = idx === currentStageIndex;
              const isPassed = idx < currentStageIndex;
              return (
                <button
                  key={stg.id}
                  onClick={() => goToStage(idx)}
                  className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                    isActive
                      ? "bg-sky-500 text-white border-sky-400 shadow-md shadow-sky-500/20 font-bold"
                      : isPassed
                      ? "bg-slate-800/80 text-slate-200 border-slate-700 hover:border-slate-600"
                      : "bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] mb-0.5">
                    <span className="opacity-80">Stage {stg.number}</span>
                    {isPassed && <CheckCircle2 className="h-3 w-3 text-emerald-400" />}
                  </div>
                  <p className="text-xs truncate font-medium">{stg.shortTitle}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Conditionally Render: HUD Mode vs Slide Presentation Mode */}
      {viewMode === "slide" ? (
        /* ==================== SLIDE PRESENTATION DECK VIEW ==================== */
        <motion.div
          key="slide-view"
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-slate-800 shadow-2xl space-y-8 min-h-[550px] flex flex-col justify-between"
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Badge variant="indigo" size="sm">
                  {currentDetails.slideVisual.title}
                </Badge>
                <span className="text-xs text-sky-400 uppercase tracking-wider font-semibold">
                  {currentStage.category}
                </span>
              </div>
              <div className="text-xs text-slate-400 font-mono">
                Stage {currentStage.number} of {stages.length}
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight max-w-4xl">
              {currentDetails.slideVisual.headline}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              <div className="md:col-span-2 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Executive Proof Points
                </span>
                <div className="space-y-3">
                  {currentDetails.slideVisual.keyPoints.map((point, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3 text-sm sm:text-base text-slate-200"
                    >
                      <CheckCircle2 className="h-5 w-5 text-sky-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlight Metric Card */}
              <div className="bg-gradient-to-br from-slate-900 to-sky-950 p-6 rounded-3xl border border-sky-500/30 flex flex-col justify-center items-center text-center space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                  {currentDetails.slideVisual.highlightMetric.label}
                </span>
                <span className="text-4xl sm:text-5xl font-black text-emerald-400 tracking-tight">
                  {currentDetails.slideVisual.highlightMetric.value}
                </span>
                <p className="text-xs text-slate-400 pt-2">
                  Demonstrated across customer deployments
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Presenter Slide Drawer */}
          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="line-clamp-1">
                <strong>Speaker Prompt:</strong> {currentDetails.script.hook}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setViewMode("hud")}
                className="bg-white/10 hover:bg-white/20 text-white border-white/10 cursor-pointer"
              >
                <span>Open Full Script HUD</span>
              </Button>
              <Link href={currentStage.route}>
                <Button variant="primary" size="sm">
                  <span>Interactive Stage</span>
                  <ExternalLink className="h-3.5 w-3.5 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      ) : (
        /* ==================== TELEPROMPTER & HUD VIEW ==================== */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Main Talking Points, Script & Objections */}
          <div className="lg:col-span-2 space-y-6">
            {/* 3-Step Slide Script */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                  <MessageSquare className="h-4 w-4 text-sky-600" />
                  <span>Structured Talking Points &amp; Teleprompter Script</span>
                </div>
                <Badge variant="default" size="sm">
                  Pacing Target: {currentStage.durationMin} mins
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-100 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-sky-800">
                    Step 1 • Hook &amp; Reframe
                  </span>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                    &ldquo;{currentDetails.script.hook}&rdquo;
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700">
                    Step 2 • Technical Proof Point
                  </span>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                    &ldquo;{currentDetails.script.proof}&rdquo;
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700">
                    Step 3 • Call-to-Action Bridge
                  </span>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                    &ldquo;{currentDetails.script.bridge}&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* High-Impact Discovery Questions */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 pb-3 border-b border-slate-100">
                <Lightbulb className="h-4 w-4 text-amber-500" />
                <span>High-Impact Discovery Questions for This Stage</span>
              </div>

              <div className="space-y-2">
                {currentDetails.discoveryQuestions.map((q, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200/60 text-xs sm:text-sm text-amber-950 font-medium leading-relaxed flex items-start gap-2.5"
                  >
                    <span className="font-bold text-amber-600 shrink-0">Q{idx + 1}:</span>
                    <span>&ldquo;{q}&rdquo;</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Objection Rapid Response Counter-Cards */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 pb-3 border-b border-slate-100">
                <AlertTriangle className="h-4 w-4 text-rose-500" />
                <span>Anticipated Buyer Objections &amp; Recommended Pivot</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentDetails.objections.map((obj, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-rose-50/40 border border-rose-200/60 space-y-2"
                  >
                    <p className="text-xs font-bold text-rose-950">
                      Buyer: &ldquo;{obj.question}&rdquo;
                    </p>
                    <p className="text-xs text-rose-900/80 leading-relaxed">
                      <strong>Recommended Answer:</strong> {obj.response}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pro Tip Callout */}
            <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-sky-900">
              <Sparkles className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-sky-950 mb-0.5">Solutions Architect Pro Tip:</span>
                <p className="leading-relaxed">{currentDetails.proTip}</p>
              </div>
            </div>
          </div>

          {/* Right Col: Live Buyer Synchronization & Question Logger */}
          <div className="space-y-6">
            {/* Live Buyer Synchronization Status */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <Target className="h-4 w-4 text-sky-600" />
                  <span>Buyer Engagement &amp; Selections</span>
                </div>
                <Badge variant="success" size="sm">
                  Synced Live
                </Badge>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Account:</span>
                  <span className="font-bold text-slate-900">{sessionData.buyerCompany}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Contact:</span>
                  <span className="font-medium text-slate-800">
                    {sessionData.buyerName} ({sessionData.buyerRole})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Incumbent Warehouse:</span>
                  <Badge variant="warning" size="sm">
                    {sessionData.currentWarehouse}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Monthly Cloud Spend:</span>
                  <span className="font-bold text-slate-900">
                    ${sessionData.monthlyCloudSpend.toLocaleString()}/mo
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Data Footprint:</span>
                  <span className="font-bold text-slate-900">{sessionData.dataSizeTB} TB Raw</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Deployment Target:</span>
                  <span className="font-bold text-sky-700 uppercase">
                    {sessionData.deploymentTarget}
                  </span>
                </div>
              </div>

              {/* Selected Priorities by Buyer */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Active Buyer Priorities ({sessionData.selectedRequirements.length})
                </span>
                <div className="flex flex-wrap gap-1">
                  {sessionData.selectedRequirements.map((req) => (
                    <span
                      key={req}
                      className="px-2 py-0.5 rounded-md bg-sky-50 border border-sky-100 text-[10px] font-medium text-sky-700 capitalize"
                    >
                      {req.replace(/_/g, " ")}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Question Logger */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <HelpCircle className="h-4 w-4 text-amber-500" />
                  <span>Buyer Question Log</span>
                </div>
                <Badge variant="warning" size="sm">
                  {sessionData.bookmarkedQuestions.length} Saved
                </Badge>
              </div>

              <p className="text-xs text-slate-500">
                Log buyer inquiries or objections during the pitch. Automatically compiled into the
                Mutual Action Plan.
              </p>

              <form onSubmit={handleAddQuestion} className="space-y-2">
                <textarea
                  rows={2}
                  placeholder="Type question or objection..."
                  value={questionInput}
                  onChange={(e) => setQuestionInput(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500 resize-none"
                />
                <Button type="submit" size="sm" variant="primary" className="w-full justify-center">
                  <span>Save Question to MAP</span>
                </Button>
              </form>

              <div className="space-y-2 pt-2 border-t border-slate-100 max-h-60 overflow-y-auto">
                {sessionData.bookmarkedQuestions.map((q, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 font-medium flex items-start justify-between gap-2"
                  >
                    <span>&ldquo;{q}&rdquo;</span>
                    <button
                      onClick={() => handleCopyQuestion(q, idx)}
                      className="text-slate-400 hover:text-slate-600 shrink-0 p-1 cursor-pointer"
                      title="Copy question text"
                    >
                      {copiedQuestionIdx === idx ? (
                        <Check className="h-3 w-3 text-emerald-500" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Link to Mutual Action Plan */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <FileCheck className="h-4 w-4 text-sky-600" />
                <span>Post-Meeting Next Steps</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                When ready to close, generate the Mutual Action Plan (MAP) and 14-day production PoC
                charter.
              </p>
              <Link href="/meeting-summary" className="block pt-1">
                <Button variant="outline" size="sm" className="w-full justify-center">
                  <FileCheck className="h-3.5 w-3.5 mr-1" />
                  <span>Open Executive MAP Memo</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
