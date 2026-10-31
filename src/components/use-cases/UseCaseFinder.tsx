"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Compass,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  TrendingDown,
  Cpu,
  BarChart3,
  Layers,
  Database,
  SlidersHorizontal,
} from "lucide-react";
import Link from "next/link";

export interface FinderState {
  industry: string;
  infrastructure: string;
  dataSources: string;
  mainChallenge: string;
  analyticsReq: string;
  aiMlReq: string;
  dataControl: string;
}

export interface RecommendationResult {
  title: string;
  category: string;
  badgeVariant: "default" | "success" | "warning" | "indigo";
  whyMatches: string[];
  iometeCapabilities: string[];
  architectureComponents: string[];
  suggestedNextStep: {
    label: string;
    description: string;
    targetRoute: string;
  };
}

export function UseCaseFinder() {
  const [formData, setFormData] = useState<FinderState>({
    industry: "FinTech & Banking",
    infrastructure: "Snowflake",
    dataSources: "Relational DBs (Postgres/Oracle) & Event Streams",
    mainChallenge: "Runaway compute costs & billing unpredictability",
    analyticsReq: "High-concurrency executive BI (Tableau/PowerBI)",
    aiMlReq: "Direct Python/PySpark access with zero-copy data",
    dataControl: "Must remain 100% in customer VPC / Private Cloud",
  });

  const [step, setStep] = useState<number>(1);
  const [showResult, setShowResult] = useState<boolean>(true);

  // Deterministic mapping function
  const recommendation = React.useMemo<RecommendationResult>(() => {
    const {
      mainChallenge,
      infrastructure,
      analyticsReq,
      aiMlReq,
      dataControl,
      industry,
    } = formData;

    // Rule 1: High Security / Private VPC emphasis
    if (
      dataControl.includes("customer VPC") &&
      (mainChallenge.includes("compliance") || industry.includes("Healthcare") || industry.includes("Banking"))
    ) {
      return {
        title: "Regulated Enterprise Lakehouse in Private Customer VPC",
        category: "Data Sovereignty & Governance",
        badgeVariant: "success",
        whyMatches: [
          `Your requirement for strict data sovereignty inside ${dataControl} matches IOMETE's Zero-Data-Retention architecture.`,
          `Your current stack (${infrastructure}) exposes data to vendor multi-tenancy, whereas IOMETE keeps compute and storage strictly inside your perimeter.`,
          `Addresses regulatory concerns with fine-grained Apache Ranger RBAC and automated column-level PII masking.`,
        ],
        iometeCapabilities: [
          "Zero Data Egress: Compute nodes run within your private VPC / Subnets",
          "Customer-Managed KMS Keys (CMEK) for 100% at-rest encryption",
          "Apache Ranger integration with immutable audit logging and SIEM export",
          "Single-tenant architecture with zero shared multi-tenant metadata leaks",
        ],
        architectureComponents: [
          "Customer Cloud Perimeter (Private VPC)",
          "Governance & RBAC (Apache Ranger)",
          "S3-Compatible Storage with KMS CMEK",
          "Kubernetes Single-Tenant Orchestration",
        ],
        suggestedNextStep: {
          label: "Review Security & InfoSec Architecture",
          description: "Inspect customer VPC isolation, CMEK encryption, and RBAC persona simulator.",
          targetRoute: "/security",
        },
      };
    }

    // Rule 2: AI / ML and Zero-Copy Feature Store
    if (
      aiMlReq.includes("Python/PySpark") ||
      aiMlReq.includes("Feature store") ||
      aiMlReq.includes("Generative AI")
    ) {
      return {
        title: "Unified AI/ML Feature Engineering & Real-Time Lakehouse",
        category: "Advanced Analytics & AI",
        badgeVariant: "indigo",
        whyMatches: [
          `Your team requires direct Python and PySpark access without copying or exporting data from closed proprietary warehouses.`,
          `Apache Iceberg open table format allows data scientists to read directly from storage without compute credit penalties.`,
          `Supports time-travel queries for reproducible model training datasets.`,
        ],
        iometeCapabilities: [
          "Zero-Copy Architecture: PySpark and Pandas read Iceberg tables natively",
          "Snapshot isolation ensures repeatable ML model training experiments",
          "Unified control plane for both BI SQL analysts and Python data scientists",
          "No expensive data egress or external staging fees",
        ],
        architectureComponents: [
          "Apache Iceberg Tables",
          "Apache Spark Distributed Compute Fleet",
          "S3-Compatible Storage",
          "Consumption Tier (Python, Jupyter, dbt)",
        ],
        suggestedNextStep: {
          label: "Explore Interactive Live Tour",
          description: "See sub-second SQL execution and dynamic auto-scaling workers in action.",
          targetRoute: "/demo",
        },
      };
    }

    // Rule 3: Sub-second BI and Concurrency Bottlenecks
    if (
      mainChallenge.includes("dashboard latency") ||
      analyticsReq.includes("High-concurrency")
    ) {
      return {
        title: "Sub-Second BI Acceleration & Peak Concurrency Engine",
        category: "BI Acceleration",
        badgeVariant: "default",
        whyMatches: [
          `Solves Monday morning executive dashboard latency caused by ${infrastructure} concurrency queuing.`,
          `Vectorized execution readers deliver sub-850ms P95 latency across hundreds of millions of records.`,
          `Eliminates warehouse keep-alive credits during idle periods while instantly scaling for morning surges.`,
        ],
        iometeCapabilities: [
          "Vectorized query cache for instant sub-second dashboard refreshes",
          "Zero-rewrite compatibility with existing Tableau and PowerBI JDBC/ODBC drivers",
          "Dynamic cluster auto-scaling: scales from 0 to 100+ nodes in seconds",
          "Automatic small-file background compaction to preserve query performance",
        ],
        architectureComponents: [
          "Apache Spark Vectorized SQL Engine",
          "Apache Iceberg Metadata Cache",
          "S3-Compatible Storage",
          "BI Tools (Tableau, PowerBI)",
        ],
        suggestedNextStep: {
          label: "View Live SQL Workbench Demo",
          description: "Run live sample SQL queries on 120M rows and watch worker auto-scaling.",
          targetRoute: "/demo",
        },
      };
    }

    // Default / Rule 4: Cost Deflation & Iceberg Migration
    return {
      title: "Warehouse Cost Deflation & Apache Iceberg Migration",
      category: "Cost Reduction",
      badgeVariant: "warning",
      whyMatches: [
        `Addresses your primary challenge (${mainChallenge}) on ${infrastructure} by eliminating proprietary compute markup.`,
        `Replaces opaque warehouse credits with transparent, predictable infrastructure pricing (up to 70% savings).`,
        `Migrates tables in-place without reloading raw historical datasets (Zero-Copy registration).`,
      ],
      iometeCapabilities: [
        "Up to 70% TCO compute reduction by running open Spark on customer cloud spot nodes",
        "Zero vendor markup on storage: pay AWS/Azure directly at commodity rates",
        "Configurable auto-suspend prevents idle clusters from burning budget overnight",
        "Full standard ANSI SQL dialect supported with zero BI dashboard re-authoring",
      ],
      architectureComponents: [
        "Apache Iceberg Open Tables",
        "S3-Compatible Storage",
        "Apache Spark Elastic Compute",
        "Kubernetes Cluster Autoscaler",
      ],
      suggestedNextStep: {
        label: "Calculate 3-Year TCO Savings",
        description: "Input your actual cloud spend and compare Snowflake vs IOMETE financial models.",
        targetRoute: "/business-case",
      },
    };
  }, [formData]);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-8">
      {/* Questionnaire Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="indigo" size="sm">
              Deterministic Recommendation Engine
            </Badge>
            <span className="text-xs text-slate-400">Zero AI Required</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Use-Case Finder & Architecture Matcher
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Answer the 7 architectural parameters below to determine the ideal
            IOMETE implementation roadmap for your enterprise.
          </p>
        </div>

        <button
          onClick={() => {
            setFormData({
              industry: "FinTech & Banking",
              infrastructure: "Snowflake",
              dataSources: "Relational DBs (Postgres/Oracle) & Event Streams",
              mainChallenge: "Runaway compute costs & billing unpredictability",
              analyticsReq: "High-concurrency executive BI (Tableau/PowerBI)",
              aiMlReq: "Direct Python/PySpark access with zero-copy data",
              dataControl: "Must remain 100% in customer VPC / Private Cloud",
            });
          }}
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {/* Two Column Layout: Form Selectors vs Instant Recommendation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 6 Cols: 7 Questionnaire Fields */}
        <div className="lg:col-span-6 space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              1. Industry Vertical
            </label>
            <select
              value={formData.industry}
              onChange={(e) =>
                setFormData({ ...formData, industry: e.target.value })
              }
              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-medium"
            >
              <option value="FinTech & Banking">Banking, FinTech & Payments</option>
              <option value="Healthcare & Life Sciences">
                Healthcare, Biotech & Diagnostics
              </option>
              <option value="Retail & E-Commerce">Retail, Omnichannel & E-Commerce</option>
              <option value="Manufacturing & Supply Chain">
                Manufacturing, Automotive & IoT
              </option>
              <option value="Telecommunications & Media">
                Telecommunications, Media & Cable
              </option>
              <option value="Technology & SaaS">Enterprise Technology & SaaS</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              2. Existing Data Infrastructure
            </label>
            <select
              value={formData.infrastructure}
              onChange={(e) =>
                setFormData({ ...formData, infrastructure: e.target.value })
              }
              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-medium"
            >
              <option value="Snowflake">Snowflake (Proprietary micro-partitions)</option>
              <option value="Databricks">Databricks (DBU-based Delta Lake)</option>
              <option value="AWS Redshift">AWS Redshift / Redshift Serverless</option>
              <option value="Google BigQuery">Google BigQuery (Slot / TB pricing)</option>
              <option value="Legacy Hadoop / Teradata">
                Legacy On-Premise Hadoop / Teradata
              </option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              3. Primary Data Sources
            </label>
            <select
              value={formData.dataSources}
              onChange={(e) =>
                setFormData({ ...formData, dataSources: e.target.value })
              }
              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-medium"
            >
              <option value="Relational DBs (Postgres/Oracle) & Event Streams">
                Relational DBs (Postgres/Oracle) & Kafka Streams
              </option>
              <option value="Raw Object Files on S3 / Azure Blob">
                Raw Object Files (Parquet, CSV, JSON) on S3 / Blob
              </option>
              <option value="Third-Party SaaS APIs & Application Logs">
                Third-Party SaaS APIs & Application Webhooks
              </option>
              <option value="IoT Sensor Telemetry & High-Velocity Feeds">
                IoT Sensor Telemetry & High-Velocity Feeds
              </option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              4. Main Business Challenge
            </label>
            <select
              value={formData.mainChallenge}
              onChange={(e) =>
                setFormData({ ...formData, mainChallenge: e.target.value })
              }
              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-medium"
            >
              <option value="Runaway compute costs & billing unpredictability">
                Runaway compute costs & billing unpredictability
              </option>
              <option value="Slow BI dashboard latency during concurrency peaks">
                Slow BI dashboard latency during concurrency peaks
              </option>
              <option value="Proprietary vendor lock-in & data exfiltration fees">
                Proprietary vendor lock-in & data exfiltration fees
              </option>
              <option value="Complex regulatory compliance & InfoSec hurdles">
                Complex regulatory compliance & InfoSec hurdles
              </option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              5. Analytics Requirements
            </label>
            <select
              value={formData.analyticsReq}
              onChange={(e) =>
                setFormData({ ...formData, analyticsReq: e.target.value })
              }
              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-medium"
            >
              <option value="High-concurrency executive BI (Tableau/PowerBI)">
                High-concurrency executive BI (Tableau / PowerBI)
              </option>
              <option value="Large-scale scheduled batch ETL & dbt transformations">
                Large-scale scheduled batch ETL & dbt transformations
              </option>
              <option value="Ad-hoc SQL discovery by 50+ business analysts">
                Ad-hoc SQL discovery by 50+ business analysts
              </option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              6. AI & Machine Learning Requirements
            </label>
            <select
              value={formData.aiMlReq}
              onChange={(e) =>
                setFormData({ ...formData, aiMlReq: e.target.value })
              }
              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-medium"
            >
              <option value="Direct Python/PySpark access with zero-copy data">
                Direct Python/PySpark access with zero-copy data
              </option>
              <option value="Feature store for reproducible model training">
                Feature store for reproducible model training
              </option>
              <option value="Generative AI agent query integration over private tables">
                Generative AI agent query integration over private tables
              </option>
              <option value="No active ML requirements currently">
                No active ML requirements currently (BI only)
              </option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              7. Data Control & Sovereignty Mandate
            </label>
            <select
              value={formData.dataControl}
              onChange={(e) =>
                setFormData({ ...formData, dataControl: e.target.value })
              }
              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-medium"
            >
              <option value="Must remain 100% in customer VPC / Private Cloud">
                Must remain 100% in customer VPC / Private Cloud (Zero Exfiltration)
              </option>
              <option value="Strict SOC2 Type II and HIPAA with Customer-Managed Keys">
                Strict SOC2 Type II and HIPAA with Customer KMS Keys (CMEK)
              </option>
              <option value="Standard single-tenant cloud environment is acceptable">
                Standard single-tenant cloud environment is acceptable
              </option>
            </select>
          </div>
        </div>

        {/* Right 6 Cols: Instant Deterministic Recommendation Card */}
        <div className="lg:col-span-6 space-y-5 bg-gradient-to-br from-slate-900 to-slate-950 text-white p-6 sm:p-7 rounded-3xl border border-slate-800 shadow-xl sticky top-20">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Badge variant={recommendation.badgeVariant} size="sm">
                {recommendation.category}
              </Badge>
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Deterministic Match</span>
              </span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold tracking-tight text-white mt-1">
              {recommendation.title}
            </h4>
          </div>

          {/* Why it matches */}
          <div className="pt-3 border-t border-white/10 space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
              Why This Matches Your Requirements
            </span>
            <ul className="space-y-2">
              {recommendation.whyMatches.map((reason, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-xs text-slate-300"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-sky-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Relevant IOMETE Capabilities */}
          <div className="pt-3 border-t border-white/10 space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
              Relevant IOMETE Platform Capabilities
            </span>
            <div className="space-y-1.5">
              {recommendation.iometeCapabilities.map((cap, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200"
                >
                  {cap}
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Architecture Components */}
          <div className="pt-3 border-t border-white/10 space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
              Suggested Architecture Blueprint
            </span>
            <div className="flex flex-wrap gap-1.5">
              {recommendation.architectureComponents.map((comp, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-sky-500/10 border border-sky-400/20 text-sky-300 text-[11px] font-medium"
                >
                  {comp}
                </span>
              ))}
            </div>
          </div>

          {/* Actionable Next Step Button */}
          <div className="pt-4 border-t border-white/10">
            <div className="mb-2 text-xs text-slate-400">
              <span className="font-semibold text-white">Suggested Next Step: </span>
              {recommendation.suggestedNextStep.description}
            </div>
            <Link href={recommendation.suggestedNextStep.targetRoute}>
              <Button
                variant="primary"
                size="md"
                className="w-full justify-center bg-sky-500 hover:bg-sky-400 text-white font-bold"
              >
                <span>{recommendation.suggestedNextStep.label}</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
