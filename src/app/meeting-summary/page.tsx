"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePresentation } from "@/context/PresentationContext";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import confetti from "canvas-confetti";
import { AIMeetingSummaryGenerator } from "@/components/summary/AIMeetingSummaryGenerator";
import {
  FileCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  TrendingDown,
  Clock,
  Shield,
  HelpCircle,
  Share2,
  Download,
  Building2,
  Users,
} from "lucide-react";

export default function MeetingSummaryPage() {
  const { sessionData } = usePresentation();
  const [pocAccepted, setPocAccepted] = useState(false);

  const annualSavings = Math.round(sessionData.monthlyCloudSpend * 12 * 0.684);

  const handleLaunchPoC = () => {
    setPocAccepted(true);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }
  };

  const milestones = [
    {
      step: 1,
      title: "Technical Discovery & Lakehouse Scoping",
      owner: "IOMETE SA & Alex Vance",
      date: "Oct 31, 2026 (Completed Today)",
      status: "Done",
      description: "Identified Snowflake concurrency bottlenecks; validated Apache Iceberg architecture.",
    },
    {
      step: 2,
      title: "Private VPC Peering & S3 Read-Only IAM Grant",
      owner: "Northstar Cloud Infra Team",
      date: "Nov 4, 2026",
      status: "In Progress",
      description: "Establish secure cross-account role for S3 bucket access with customer-managed KMS keys.",
    },
    {
      step: 3,
      title: "14-Day Production PoC Benchmark",
      owner: "Joint Working Group",
      date: "Nov 8 - Nov 22, 2026",
      status: "Scheduled",
      description: "Run parallel BI query benchmarks on top 5 Tableau dashboards against 120 TB dataset.",
    },
    {
      step: 4,
      title: "Executive Business Review & CFO Sign-Off",
      owner: "Alex Vance & VP Sales",
      date: "Nov 25, 2026",
      status: "Scheduled",
      description: "Present verified latency and financial results; execute annual enterprise license.",
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <PageHeader
        title="Executive Meeting Summary & Follow-Up"
        subtitle={`Summary of agreed findings, financial model, and next steps for ${sessionData.buyerCompany}.`}
        badgeText="Executive Recap"
      />

      {/* Top Banner: Deal Value Summary */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Badge variant="success" size="sm">
              Deal Overview • High Conviction
            </Badge>
            <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight mt-1 text-white">
              {sessionData.buyerCompany} Evaluation Packet
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Prepared for: <strong>{sessionData.buyerName}</strong> ({sessionData.buyerRole})
            </p>
          </div>

          <div className="text-right sm:text-right">
            <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block">
              Validated Annual Savings
            </span>
            <span className="text-3xl sm:text-4xl font-black text-emerald-400">
              ${(annualSavings / 1000).toFixed(0)}k/year
            </span>
          </div>
        </div>

        {/* 4 Summary Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-white/10 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase">Incumbent</span>
            <span className="font-bold text-white">{sessionData.currentWarehouse}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase">Dataset Volume</span>
            <span className="font-bold text-white">{sessionData.dataSizeTB} TB Iceberg</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase">Deployment Model</span>
            <span className="font-bold text-sky-400">Customer Private VPC</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase">Next Step</span>
            <span className="font-bold text-emerald-400">14-Day Production PoC</span>
          </div>
        </div>
      </div>

      {/* Grounded AI Executive Meeting Summary Copilot */}
      <AIMeetingSummaryGenerator />

      {/* Main Grid: Mutual Action Plan (MAP) & Logged Questions Addressed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Mutual Action Plan (MAP) Timeline */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  Mutual Action Plan (MAP) Timeline
                </h3>
                <p className="text-xs text-slate-500">
                  Agreed schedule to validate production workloads and ensure risk-free cutover.
                </p>
              </div>
              <Badge variant="indigo" size="sm">
                4 Milestones
              </Badge>
            </div>

            <div className="space-y-4 pt-2">
              {milestones.map((m) => (
                <div
                  key={m.step}
                  className="p-4 rounded-2xl border border-slate-100 bg-slate-50/60 space-y-2 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold ${
                          m.status === "Done"
                            ? "bg-emerald-100 text-emerald-800"
                            : m.status === "In Progress"
                            ? "bg-sky-100 text-sky-800"
                            : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {m.step}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">{m.title}</h4>
                    </div>

                    <Badge
                      variant={
                        m.status === "Done"
                          ? "success"
                          : m.status === "In Progress"
                          ? "default"
                          : "secondary"
                      }
                      size="sm"
                    >
                      {m.status}
                    </Badge>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed pl-9">
                    {m.description}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pl-9 pt-1">
                    <span>Owner: <strong className="text-slate-700">{m.owner}</strong></span>
                    <span>Target: <strong className="text-slate-700">{m.date}</strong></span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Button
                variant={pocAccepted ? "secondary" : "primary"}
                size="md"
                onClick={handleLaunchPoC}
                className="w-full justify-center"
              >
                <CheckCircle2 className="h-4 w-4 mr-1 text-emerald-600" />
                <span>
                  {pocAccepted
                    ? "MAP Formally Confirmed • Invitation Dispatched"
                    : "Formally Confirm MAP & Book Technical Deep-Dive"}
                </span>
              </Button>
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Logged Questions & Follow-Up Artifacts */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <HelpCircle className="h-4 w-4 text-amber-500" />
                <span>Questions Logged During Session</span>
              </div>
              <Badge variant="warning" size="sm">
                {sessionData.bookmarkedQuestions.length} Items
              </Badge>
            </div>

            <p className="text-xs text-slate-500">
              The following inquiries were bookmarked during today&apos;s call and are resolved in the technical packet:
            </p>

            <div className="space-y-2.5">
              {sessionData.bookmarkedQuestions.map((q, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-200/60 space-y-1.5"
                >
                  <p className="text-xs font-bold text-amber-950">
                    &ldquo;{q}&rdquo;
                  </p>
                  <p className="text-xs text-amber-900/80">
                    <strong>Resolution:</strong> Documented in Technical Appendix B with architecture diagrams.
                  </p>
                </div>
              ))}
            </div>

            {/* Follow-up Deliverables List */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                Deliverables Included in Summary:
              </span>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Personalized 3-Year TCO Financial Model (Excel / PDF)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>AWS PrivateLink & S3 VPC Architecture Blueprint</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>SOC2 Type II Security & Compliance Package</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
