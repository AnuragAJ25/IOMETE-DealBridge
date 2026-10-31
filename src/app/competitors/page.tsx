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
  Swords,
  Check,
  X,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  Layers,
  Sparkles,
  Zap,
  Lock,
} from "lucide-react";

interface CompetitorFeature {
  feature: string;
  iomete: string | boolean;
  snowflake: string | boolean;
  databricks: string | boolean;
  athena: string | boolean;
}

export default function CompetitorsPage() {
  const { sessionData } = usePresentation();
  const [selectedCompetitor, setSelectedCompetitor] = useState<"Snowflake" | "Databricks" | "Athena">("Snowflake");

  const matrix: CompetitorFeature[] = [
    {
      feature: "Table Format",
      iomete: "100% Open Apache Iceberg",
      snowflake: "Proprietary Micro-partitions",
      databricks: "Delta Lake (Proprietary features)",
      athena: "Iceberg / Parquet",
    },
    {
      feature: "Data Plane Residency",
      iomete: "Customer Private VPC (100% In-Region)",
      snowflake: "Vendor Multi-Tenant Cloud",
      databricks: "Customer VPC",
      athena: "AWS Managed VPC",
    },
    {
      feature: "Pricing Model",
      iomete: "Transparent, Near-Raw Cloud Compute",
      snowflake: "Opaque Credit Multipliers (3-5x markup)",
      databricks: "DBU Multipliers + AWS Compute",
      athena: "Per-TB Scanned ($5/TB)",
    },
    {
      feature: "Sub-Second BI Queries",
      iomete: "Sub-850ms with Vectorized Memory Cache",
      snowflake: "Fast (Expensive continuous warehouse)",
      databricks: "SQL Warehouse (High spin-up latency)",
      athena: "Slow (High queue variance 5s-20s)",
    },
    {
      feature: "Zero-Copy Data Sharing",
      iomete: true,
      snowflake: false,
      databricks: false,
      athena: true,
    },
    {
      feature: "Automated Maintenance (Compaction)",
      iomete: true,
      snowflake: true,
      databricks: false,
      athena: false,
    },
    {
      feature: "Zero Egress Vendor Lock-in",
      iomete: true,
      snowflake: false,
      databricks: false,
      athena: true,
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        badge="Stage 6 of 7 • Competitive Analysis"
        badgeVariant="default"
        title="Competitive Landscape & Battlecards"
        subtitle={`Architectural and economic contrast against ${sessionData.currentWarehouse}, Databricks, and AWS serverless engines.`}
        breadcrumbs={[{ label: "DealBridge", href: "/" }, { label: "Competitors" }]}
        actions={
          <div className="flex items-center gap-2">
            <Link href="/meeting-summary">
              <Button variant="primary" size="sm">
                <span>Next: Executive Summary</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        }
      />

      {/* Head to Head Selector */}
      <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200/80 shadow-xs max-w-md">
        {(["Snowflake", "Databricks", "Athena"] as const).map((comp) => (
          <button
            key={comp}
            onClick={() => setSelectedCompetitor(comp)}
            className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              selectedCompetitor === comp
                ? "bg-sky-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            vs {comp}
          </button>
        ))}
      </div>

      {/* Battlecard Detail for Selected Competitor */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Badge variant="indigo" size="sm">
              Head-to-Head Battlecard
            </Badge>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mt-1">
              Why Teams Switch from {selectedCompetitor} to IOMETE
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Key architectural flaws and pricing traps in the incumbent model.
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block">
              Average Compute Cost Delta
            </span>
            <span className="text-3xl font-extrabold text-emerald-400">
              {selectedCompetitor === "Snowflake" ? "68% Lower" : selectedCompetitor === "Databricks" ? "45% Lower" : "60% Lower"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Incumbent Flaws */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
              {selectedCompetitor} Weaknesses & Pain Points
            </span>
            <ul className="space-y-2 text-xs text-slate-300">
              {selectedCompetitor === "Snowflake" && (
                <>
                  <li className="flex items-start gap-2">
                    <X className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>Proprietary micro-partitions lock your data in their walled garden.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>Heavily marked-up credits where an unpaused cluster burns $1,000s overnight.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>Snowpark compute is clunky and expensive compared to native Apache Spark.</span>
                  </li>
                </>
              )}
              {selectedCompetitor === "Databricks" && (
                <>
                  <li className="flex items-start gap-2">
                    <X className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>Complex cluster configuration and manual cluster sizing headache for analysts.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>Expensive DBU surcharge added on top of your underlying cloud instance fees.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>Unity Catalog introduces proprietary governance locks around Delta Lake.</span>
                  </li>
                </>
              )}
              {selectedCompetitor === "Athena" && (
                <>
                  <li className="flex items-start gap-2">
                    <X className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>High query latency (5-20s) makes Athena unusable for interactive BI dashboards.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>Per-TB scanned pricing penalizes large table joins and frequent report refreshes.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>Zero automated Iceberg file compaction or snapshot pruning.</span>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* IOMETE Advantage */}
          <div className="p-5 rounded-2xl bg-sky-500/10 border border-sky-400/30 space-y-3">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block">
              The IOMETE Lakehouse Advantage
            </span>
            <ul className="space-y-2 text-xs text-slate-200">
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>100% Apache Iceberg open format: your data stays in your S3/GCS buckets forever.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Sub-850ms query speeds on 100M+ rows with vectorized memory caching.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Deploy compute directly inside your private VPC with customer-managed keys (CMEK).</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Comprehensive Feature Comparison Matrix */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-5">
        <SectionHeader
          title="Architectural Comparison Matrix"
          description="Side-by-side technical evaluation across critical enterprise dimensions."
          icon={<Swords className="h-4 w-4" />}
        />

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-200/80">
              <tr>
                <th className="p-3">Capability / Architecture</th>
                <th className="p-3 bg-sky-50/80 text-sky-900 font-bold">IOMETE Lakehouse</th>
                <th className="p-3">Snowflake</th>
                <th className="p-3">Databricks</th>
                <th className="p-3">AWS Athena</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {matrix.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-3 font-semibold text-slate-900">{row.feature}</td>
                  <td className="p-3 bg-sky-50/40 text-sky-950 font-medium">
                    {typeof row.iomete === "boolean" ? (
                      row.iomete ? (
                        <Check className="h-4 w-4 text-emerald-600 font-bold" />
                      ) : (
                        <X className="h-4 w-4 text-rose-500" />
                      )
                    ) : (
                      row.iomete
                    )}
                  </td>
                  <td className="p-3 text-slate-600">
                    {typeof row.snowflake === "boolean" ? (
                      row.snowflake ? (
                        <Check className="h-4 w-4 text-emerald-600" />
                      ) : (
                        <X className="h-4 w-4 text-rose-500" />
                      )
                    ) : (
                      row.snowflake
                    )}
                  </td>
                  <td className="p-3 text-slate-600">
                    {typeof row.databricks === "boolean" ? (
                      row.databricks ? (
                        <Check className="h-4 w-4 text-emerald-600" />
                      ) : (
                        <X className="h-4 w-4 text-rose-500" />
                      )
                    ) : (
                      row.databricks
                    )}
                  </td>
                  <td className="p-3 text-slate-600">
                    {typeof row.athena === "boolean" ? (
                      row.athena ? (
                        <Check className="h-4 w-4 text-emerald-600" />
                      ) : (
                        <X className="h-4 w-4 text-rose-500" />
                      )
                    ) : (
                      row.athena
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
