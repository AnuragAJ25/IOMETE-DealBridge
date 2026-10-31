"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePresentation } from "@/context/PresentationContext";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionHeader } from "@/components/common/SectionHeader";
import { FeatureCard } from "@/components/common/FeatureCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Compass,
  BarChart3,
  Cpu,
  ShieldCheck,
  TrendingDown,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Database,
  Layers,
  Zap,
  SlidersHorizontal,
} from "lucide-react";
import { ProblemStorytelling } from "@/components/storytelling/ProblemStorytelling";
import { UseCaseFinder } from "@/components/use-cases/UseCaseFinder";

interface UseCase {
  id: string;
  title: string;
  category: "BI & SQL" | "Batch ETL / Spark" | "Data Governance" | "Cost Reduction";
  painPoint: string;
  solution: string;
  outcome: string;
  metrics: { label: string; value: string }[];
  tags: string[];
}

export default function UseCasesPage() {
  const { sessionData, goToStage } = usePresentation();
  const [activeView, setActiveView] = useState<"finder" | "use-cases" | "dilemma">("finder");
  const [filter, setFilter] = useState<string>("All");
  const [selectedCaseId, setSelectedCaseId] = useState<string>("lakehouse");

  const useCases: UseCase[] = [
    {
      id: "lakehouse",
      title: "Warehouse Cost Deflation & Iceberg Migration",
      category: "Cost Reduction",
      painPoint: `Uncontrolled Snowflake compute credits burning $42k/mo; lack of predictability during quarterly reporting spikes.`,
      solution: `Deploy IOMETE directly on top of raw S3 parquet files converted to Apache Iceberg format. Auto-suspend clusters during off-peak hours.`,
      outcome: `Slash monthly compute bill from $42,000 to $13,200 with zero changes to existing Tableau dashboards.`,
      metrics: [
        { label: "Cost Reduction", value: "68.4%" },
        { label: "Migration Time", value: "3 Weeks" },
      ],
      tags: ["Iceberg", "Snowflake Replacement", "Cost Control"],
    },
    {
      id: "bi-acceleration",
      title: "Sub-Second BI & Interactive Dashboards",
      category: "BI & SQL",
      painPoint: `Executive dashboards taking 18-35 seconds to refresh on Monday mornings due to cluster concurrency bottlenecks.`,
      solution: `Vectorized query execution with intelligent memory caching across distributed Spark SQL worker nodes.`,
      outcome: `Sub-850ms P95 query response time for 35 concurrent analysts simultaneously querying 120 TB datasets.`,
      metrics: [
        { label: "P95 Latency", value: "<850ms" },
        { label: "Concurrent Users", value: "100+" },
      ],
      tags: ["Tableau", "PowerBI", "Sub-Second SQL"],
    },
    {
      id: "ai-feature-store",
      title: "Unified AI / ML Feature Engineering",
      category: "Batch ETL / Spark",
      painPoint: `Data science team forced to export data out of the warehouse into CSV/Parquet before running PySpark models.`,
      solution: `Zero-copy architecture allows data scientists to read directly from Apache Iceberg tables using native Python and PySpark libraries.`,
      outcome: `Eliminated 4 hours of daily data duplication and zero egress costs when training customer credit risk models.`,
      metrics: [
        { label: "ETL Time Saved", value: "4 hrs/day" },
        { label: "Egress Fees", value: "$0.00" },
      ],
      tags: ["PySpark", "Machine Learning", "Zero-Copy"],
    },
    {
      id: "fintech-governance",
      title: "FinTech Compliance & Immutable Audit Trails",
      category: "Data Governance",
      painPoint: `Strict regulatory demands for row-level PII masking and immutable historical audit snapshots for SEC/FINRA compliance.`,
      solution: `Integrated Apache Ranger RBAC with time-travel query syntax, enabling point-in-time state reconstruction with 100% precision.`,
      outcome: `Passed InfoSec and regulatory audit with zero findings; automated column-level hashing for social security numbers.`,
      metrics: [
        { label: "Compliance", value: "SOC2 Type II" },
        { label: "Audit Resolution", value: "Instant" },
      ],
      tags: ["Ranger RBAC", "SOC2", "Time-Travel"],
    },
  ];

  const filteredCases =
    filter === "All" ? useCases : useCases.filter((c) => c.category === filter);

  const activeCase = useCases.find((c) => c.id === selectedCaseId) || useCases[0];

  return (
    <div className="space-y-8">
      <PageHeader
        badge="Stage 1 of 7 • Discovery"
        badgeVariant="default"
        title="Interactive Use-Case Discovery"
        subtitle={`Diagnosing high-impact workloads and architectural friction points for ${sessionData.buyerCompany}.`}
        breadcrumbs={[{ label: "DealBridge", href: "/" }, { label: "Use Cases" }]}
        actions={
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setActiveView("finder")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeView === "finder"
                    ? "bg-sky-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Use-Case Finder
              </button>
              <button
                onClick={() => setActiveView("use-cases")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeView === "use-cases"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Workload Blueprints
              </button>
              <button
                onClick={() => setActiveView("dilemma")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeView === "dilemma"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Platform Dilemma Story
              </button>
            </div>

            <Link href="/architecture">
              <Button variant="primary" size="sm">
                <span>Next: Lakehouse Architecture</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        }
      />

      {activeView === "finder" ? (
        <UseCaseFinder />
      ) : activeView === "dilemma" ? (
        <ProblemStorytelling />
      ) : (
        <>
          {/* Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-2">
              Filter Workload:
            </span>
            {["All", "Cost Reduction", "BI & SQL", "Batch ETL / Spark", "Data Governance"].map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    filter === cat
                      ? "bg-sky-600 text-white shadow-sm"
                      : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50"
                  }`}
                >
                  {cat}
                </button>
              )
            )}
          </div>

          {/* Grid of Use Cases + Deep Solution Inspector */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 7 Cols: Cards */}
            <div className="lg:col-span-7 space-y-3">
              {filteredCases.map((uc) => {
                const isSelected = uc.id === selectedCaseId;
                return (
                  <div
                    key={uc.id}
                    onClick={() => setSelectedCaseId(uc.id)}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                      isSelected
                        ? "border-sky-500 bg-sky-50/40 shadow-sm"
                        : "bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <Badge variant="indigo" size="sm">
                            {uc.category}
                          </Badge>
                          {uc.tags.map((t, i) => (
                            <span key={i} className="text-[10px] text-slate-400">
                              #{t}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-base font-bold text-slate-900 tracking-tight">
                          {uc.title}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                          <strong className="text-slate-700">Problem:</strong> {uc.painPoint}
                        </p>
                      </div>
                      <ArrowRight
                        className={`h-4 w-4 shrink-0 transition-transform ${
                          isSelected ? "text-sky-600 translate-x-1" : "text-slate-300"
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right 5 Cols: Deep Solution Blueprint for Selected Use Case */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-5 sticky top-20">
                <div className="space-y-1">
                  <Badge variant="default" size="sm">
                    Target Solution Blueprint
                  </Badge>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight mt-2">
                    {activeCase.title}
                  </h3>
                  <p className="text-xs text-slate-500">{activeCase.category}</p>
                </div>

                {/* Pain Point vs Solution comparison */}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div className="p-3.5 rounded-xl bg-rose-50/60 border border-rose-100 space-y-1">
                    <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider block">
                      Current Pain Point
                    </span>
                    <p className="text-xs text-rose-950 font-medium leading-relaxed">
                      {activeCase.painPoint}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-sky-50/60 border border-sky-100 space-y-1">
                    <span className="text-[10px] font-bold text-sky-700 uppercase tracking-wider block">
                      The IOMETE Solution
                    </span>
                    <p className="text-xs text-sky-950 font-medium leading-relaxed">
                      {activeCase.solution}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100 space-y-1">
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                      Measurable Business Outcome
                    </span>
                    <p className="text-xs text-emerald-950 font-medium leading-relaxed">
                      {activeCase.outcome}
                    </p>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  {activeCase.metrics.map((m, idx) => (
                    <div key={idx} className="bg-slate-50 p-2.5 rounded-xl text-center">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                        {m.label}
                      </span>
                      <span className="text-lg font-extrabold text-slate-900">{m.value}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <Link href="/business-case">
                    <Button variant="primary" size="sm" className="w-full justify-center">
                      <span>Calculate Financial Impact</span>
                      <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
