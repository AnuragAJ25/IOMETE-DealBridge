"use client";

import React from "react";
import { usePresentation } from "@/context/PresentationContext";
import { X, Sparkles, MessageSquare, AlertTriangle, Lightbulb, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const STAGE_NOTES: Record<
  string,
  {
    script: string[];
    discoveryQuestions: string[];
    objections: { question: string; response: string }[];
    proTip: string;
  }
> = {
  "use-cases": {
    script: [
      "Open with empathy: 'Most data teams we speak with love SQL & Spark, but dread their month-end cloud bills.'",
      "Confirm their current data volume and query latency profile before diving into features.",
      "Highlight how IOMETE bridges both BI and batch analytics seamlessly on open formats.",
    ],
    discoveryQuestions: [
      "What percentage of your cloud data spend is currently dedicated to idle warehouse clusters?",
      "How are your data engineers currently sharing datasets with your BI analysts?",
      "Have you run into table locking or concurrency limits during peak morning reporting runs?",
    ],
    objections: [
      {
        question: "We already have Snowflake/Databricks, why change?",
        response:
          "You keep your existing BI tools (Tableau, Looker, PowerBI) intact. IOMETE sits directly on your cloud storage, cutting your compute bill by up to 70% with zero egress lock-in.",
      },
    ],
    proTip:
      "Listen for mention of 'credit bursts' or 'unexpected monthly spikes' — these are prime proof points for IOMETE's predictable flat-rate or right-sized compute.",
  },
  architecture: {
    script: [
      "Point to the clean separation between storage (their S3/GCS/Azure blob) and compute.",
      "Emphasize: 'Your data NEVER leaves your cloud perimeter. We do not store or mirror your data.'",
      "Walk through Apache Iceberg metadata: instant snapshots, time travel, and zero-copy clones.",
    ],
    discoveryQuestions: [
      "Is data sovereignty or private VPC residency mandatory for your InfoSec review?",
      "Are you currently paying egress fees when moving data between different analytics tools?",
    ],
    objections: [
      {
        question: "Is managing Apache Iceberg complex?",
        response:
          "IOMETE provides fully automated metadata maintenance, file compaction, and partition pruning under the hood.",
      },
    ],
    proTip:
      "Invite the buyer to click on the compute nodes in the interactive diagram to inspect the Apache Spark execution engine.",
  },
  demo: {
    script: [
      "Walk through the unified SQL editor and catalog view.",
      "Show how an analyst can query billions of rows in under 2 seconds without cluster warm-up delays.",
      "Demonstrate automatic cluster auto-suspension to prevent accidental billing overnight.",
    ],
    discoveryQuestions: [
      "How long does it take for a new data analyst to get onboarded and query their first table?",
    ],
    objections: [
      {
        question: "Can our business analysts write standard ANSI SQL?",
        response:
          "100% standard ANSI SQL with full support for window functions, nested JSON, and BI connectors.",
      },
    ],
    proTip:
      "Trigger the simulated live query benchmark in the demo module to demonstrate sub-second response times.",
  },
  security: {
    script: [
      "Lead with Zero-Trust & Single-Tenant private cloud architecture.",
      "Show fine-grained RBAC down to column-level masking and row-level filtering with Apache Ranger.",
      "Confirm compliance certifications: SOC2 Type II, HIPAA, GDPR ready.",
    ],
    discoveryQuestions: [
      "Who within your organization owns the data governance and access audit approvals?",
    ],
    objections: [
      {
        question: "Does IOMETE have access to our plain text credentials or encryption keys?",
        response:
          "Never. Customer-managed encryption keys (CMEK) via AWS KMS / Azure Key Vault are strictly retained inside your account.",
      },
    ],
    proTip: "Remind the buyer that security teams love the zero-data-retention SaaS model.",
  },
  "business-case": {
    script: [
      "Input their actual data size and current monthly spend into the calculator live.",
      "Walk through the side-by-side annual TCO chart.",
      "Frame the savings as engineering headcount or AI innovation budget.",
    ],
    discoveryQuestions: [
      "If you freed up $200k in warehouse compute this year, where would you reinvest it?",
    ],
    objections: [
      {
        question: "What are the migration costs?",
        response:
          "Because Iceberg is open format, migration is non-disruptive. You can point IOMETE to your existing parquet files directly.",
      },
    ],
    proTip: "Offer to export the personalized financial model for their CFO right after the call.",
  },
  competitors: {
    script: [
      "Focus on openness vs proprietary black-boxes.",
      "Snowflake charges massive markups on AWS compute; IOMETE runs at near-cloud-cost efficiency.",
      "Databricks can require heavy cluster tuning; IOMETE offers serverless ease with full lakehouse power.",
    ],
    discoveryQuestions: [
      "What has been your team's experience with Snowflake credit burn rates?",
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
  },
  "meeting-summary": {
    script: [
      "Summarize the 3 key findings agreed upon today.",
      "Review the Mutual Action Plan (MAP) and milestone dates.",
      "Propose the 14-day assisted Proof of Concept on one real workload.",
    ],
    discoveryQuestions: [
      "Does this timeline align with your Q4 architecture review schedule?",
      "Who else from your cloud infrastructure team should join our technical deep dive on Thursday?",
    ],
    objections: [
      {
        question: "We need more time to review internally.",
        response:
          "Understood! Let me send the executive one-pager and ROI breakdown immediately. Let's reserve a provisional 20-minute slot next week.",
      },
    ],
    proTip: "Click 'Generate Executive One-Pager' to bundle today's inputs into their summary packet.",
  },
};

export function PresenterNotesDrawer() {
  const { isNotesOpen, setIsNotesOpen, currentStage } = usePresentation();

  if (!isNotesOpen) return null;

  const notes = STAGE_NOTES[currentStage.id] || STAGE_NOTES["use-cases"];

  return (
    <div className="fixed top-16 right-0 bottom-24 z-30 w-full sm:w-96 bg-white border-l border-slate-200 shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-sky-400" />
          <h3 className="text-sm font-semibold tracking-tight">Seller Teleprompter</h3>
        </div>
        <button
          onClick={() => setIsNotesOpen(false)}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="px-4 py-2 bg-sky-50 border-b border-sky-100 flex items-center justify-between">
        <span className="text-xs font-semibold text-sky-800">
          Stage {currentStage.number}: {currentStage.shortTitle}
        </span>
        <Badge variant="default" size="sm">
          {currentStage.durationMin} min pacing
        </Badge>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs text-slate-700">
        {/* Pitch Script */}
        <div>
          <div className="flex items-center gap-1.5 font-semibold text-slate-900 mb-2">
            <MessageSquare className="h-3.5 w-3.5 text-sky-600" />
            <span>Recommended Narrative</span>
          </div>
          <ul className="space-y-2">
            {notes.script.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                <span className="text-sky-600 font-bold shrink-0">•</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Discovery Questions */}
        <div>
          <div className="flex items-center gap-1.5 font-semibold text-slate-900 mb-2">
            <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
            <span>High-Impact Discovery Questions</span>
          </div>
          <div className="space-y-1.5">
            {notes.discoveryQuestions.map((q, idx) => (
              <div
                key={idx}
                className="bg-amber-50/60 border border-amber-200/70 p-2.5 rounded-lg text-amber-950 font-medium leading-relaxed"
              >
                &ldquo;{q}&rdquo;
              </div>
            ))}
          </div>
        </div>

        {/* Objection Handles */}
        <div>
          <div className="flex items-center gap-1.5 font-semibold text-slate-900 mb-2">
            <AlertTriangle className="h-3.5 w-3.5 text-rose-500" />
            <span>Objection Counter-Card</span>
          </div>
          <div className="space-y-2">
            {notes.objections.map((obj, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 space-y-1">
                <p className="font-semibold text-slate-900 text-[11px]">
                  Buyer: &ldquo;{obj.question}&rdquo;
                </p>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  <strong>You:</strong> {obj.response}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Pro Tip */}
        <div className="bg-sky-50/70 border border-sky-200 rounded-xl p-3">
          <div className="flex items-center gap-1.5 text-sky-900 font-semibold mb-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-sky-600" />
            <span>Seller Pro Tip</span>
          </div>
          <p className="text-sky-800 leading-relaxed text-[11px]">{notes.proTip}</p>
        </div>
      </div>
    </div>
  );
}
