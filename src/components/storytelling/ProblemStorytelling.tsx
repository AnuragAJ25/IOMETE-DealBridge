"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Cloud,
  Wrench,
  ShieldCheck,
  DollarSign,
  Layers,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Server,
  Lock,
  Cpu,
  Sparkles,
  SlidersHorizontal,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface TradeoffDimension {
  id: "control" | "complexity" | "governance" | "cost";
  title: string;
  icon: React.ReactNode;
  summary: string;
  optionA: {
    title: string;
    description: string;
    consideration: string;
    sentiment: "neutral" | "warning";
  };
  optionB: {
    title: string;
    description: string;
    consideration: string;
    sentiment: "neutral" | "warning";
  };
  iometeWay: {
    title: string;
    description: string;
    proofPoint: string;
  };
}

export function ProblemStorytelling({
  onExploreIomete,
  className = "",
}: {
  onExploreIomete?: () => void;
  className?: string;
}) {
  const [activeDimension, setActiveDimension] = useState<
    "control" | "complexity" | "governance" | "cost"
  >("control");
  const [selectedPerspective, setSelectedPerspective] = useState<
    "comparison" | "optionA" | "optionB" | "iomete"
  >("comparison");

  const dimensions: TradeoffDimension[] = [
    {
      id: "control",
      title: "Infrastructure Control",
      icon: <Server className="h-4 w-4" />,
      summary: "Balancing vendor delegation against sovereign data residency.",
      optionA: {
        title: "Managed Cloud Platforms",
        description:
          "Compute and proprietary storage formats are typically hosted and managed inside the vendor's cloud ecosystem.",
        consideration:
          "While setup is instant, organizations in regulated sectors may find vendor-controlled perimeters challenging for data residency audits and egress flexibility.",
        sentiment: "neutral",
      },
      optionB: {
        title: "DIY Open-Source Stack",
        description:
          "Storage and open-source engines (e.g. Spark, Presto, Trino) run entirely within customer-owned cloud accounts or on-premises servers.",
        consideration:
          "Provides complete physical and logical control, but requires continuous DevOps maintenance, network tuning, and infrastructure provisioning.",
        sentiment: "neutral",
      },
      iometeWay: {
        title: "IOMETE Managed on Customer Infrastructure",
        description:
          "Combines sovereignty with cloud-managed ease: data and compute remain 100% inside your private VPC or on-premises Kubernetes cluster, while IOMETE orchestrates the workload lifecycle.",
        proofPoint:
          "Zero customer data copies; works with your existing AWS S3, Azure Blob, or MinIO buckets.",
      },
    },
    {
      id: "complexity",
      title: "Operational Complexity",
      icon: <Cpu className="h-4 w-4" />,
      summary: "Balancing hands-off simplicity against engineering maintenance overhead.",
      optionA: {
        title: "Managed Cloud Platforms",
        description:
          "The vendor abstracts cluster provisioning, operating system patching, and software upgrades behind a clean web console.",
        consideration:
          "Very low maintenance overhead for data engineers, though tuning parameters are constrained and vendor-specific workarounds may arise.",
        sentiment: "neutral",
      },
      optionB: {
        title: "DIY Open-Source Stack",
        description:
          "Engineers hand-craft Docker images, Helm charts, Iceberg compaction jobs, and Spark cluster auto-scalers on Kubernetes.",
        consideration:
          "Platform teams frequently spend 30% to 50% of their sprint time managing cluster health, failed executors, and table metadata bloat rather than delivering business features.",
        sentiment: "warning",
      },
      iometeWay: {
        title: "Automated Lakehouse Lifecycle",
        description:
          "IOMETE automates table maintenance (small file compaction, snapshot expiration, partition pruning) and dynamic worker autoscaling without vendor lock-in.",
        proofPoint:
          "No manual Spark cluster tuning needed; auto-suspends idle clusters after configurable inactivity.",
      },
    },
    {
      id: "governance",
      title: "Data Governance & Security",
      icon: <ShieldCheck className="h-4 w-4" />,
      summary: "Consistent access policies without building fragmented security islands.",
      optionA: {
        title: "Managed Cloud Platforms",
        description:
          "Provides polished role-based access control (RBAC), masking, and tagging within their proprietary engine boundary.",
        consideration:
          "Access rules rarely transfer to external tools: if data scientists query the data with external Python or Spark jobs, governance must be re-implemented separately.",
        sentiment: "warning",
      },
      optionB: {
        title: "DIY Open-Source Stack",
        description:
          "Relies on integrating multiple disparate open-source tools (Apache Ranger, Knox, Hive Metastore) across clusters.",
        consideration:
          "Standardized open governance is achievable, but cross-component synchronization, audit logging, and SSO identity mapping require ongoing specialized expertise.",
        sentiment: "warning",
      },
      iometeWay: {
        title: "Centralized Open Apache Ranger Governance",
        description:
          "Unified fine-grained access control with column masking and row-level filtering applied consistently across SQL BI queries and PySpark batch jobs.",
        proofPoint:
          "Native SAML/OIDC/Okta integration with comprehensive audit logging to customer CloudWatch or Datadog.",
      },
    },
    {
      id: "cost",
      title: "Cost Visibility & Predictability",
      icon: <DollarSign className="h-4 w-4" />,
      summary: "Predictable analytics spend without opaque credit consumption markups.",
      optionA: {
        title: "Managed Cloud Platforms",
        description:
          "Charges through proprietary credit units or virtual compute tiers, decoupling billing from standard cloud hardware costs.",
        consideration:
          "Can deliver rapid start-up value, but many organizations experience monthly budget volatility, credit burst surprises, and high data egress charges when scaling.",
        sentiment: "warning",
      },
      optionB: {
        title: "DIY Open-Source Stack",
        description:
          "Compute is billed directly at underlying cloud provider rates (e.g. AWS EC2 spot/on-demand instances) with zero credit markup.",
        consideration:
          "Hardware unit costs are low, but total cost of ownership (TCO) often escalates due to specialized platform engineering salaries required to keep the stack operational.",
        sentiment: "neutral",
      },
      iometeWay: {
        title: "Transparent Compute with Zero Credit Markup",
        description:
          "Run high-performance Spark compute directly on your own cloud provider instances. Pay flat platform fees with transparent, predictable hardware bills.",
        proofPoint:
          "Typical organizations observe significant cost efficiency without hiring specialized infrastructure teams.",
      },
    },
  ];

  const currentDim = dimensions.find((d) => d.id === activeDimension) || dimensions[0];

  return (
    <section className={`space-y-8 ${className}`}>
      {/* Section Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          <span>The Traditional Platform Dilemma</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 leading-tight">
          Two Traditional Approaches.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-teal-600 to-indigo-600">
            Real Architectural Trade-Offs.
          </span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
          Organizations modernizing their data architecture frequently evaluate managed proprietary
          cloud platforms against self-hosted open-source stacks. Each approach offers legitimate
          advantages along with potential trade-offs.
        </p>
      </div>

      {/* The Two Dilemma Paths + The IOMETE Synthesis Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Option A Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="indigo" size="sm">
                Option A
              </Badge>
              <Cloud className="h-5 w-5 text-indigo-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Managed Cloud Data Platform
            </h3>
            <p className="text-xs text-slate-500">
              e.g., Proprietary SaaS Warehouses & Virtual Compute Hubs
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
              Provides turnkey ease-of-use with instant query setup and automated cluster
              provisioning.
            </p>
          </div>

          <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
            <div className="flex items-start gap-2 text-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Zero day-1 infrastructure setup required.</span>
            </div>
            <div className="flex items-start gap-2 text-slate-700">
              <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
              <span>Potential proprietary format lock-in & credit billing volatility.</span>
            </div>
          </div>
        </motion.div>

        {/* Option B Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="default" size="sm">
                Option B
              </Badge>
              <Wrench className="h-5 w-5 text-sky-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Build & Manage DIY Open Source
            </h3>
            <p className="text-xs text-slate-500">
              e.g., Self-hosted Apache Spark, Trino & Hive on Kubernetes
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
              Delivers complete infrastructure ownership and eliminates proprietary vendor credit
              margins.
            </p>
          </div>

          <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
            <div className="flex items-start gap-2 text-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>100% open standards and native cloud hardware pricing.</span>
            </div>
            <div className="flex items-start gap-2 text-slate-700">
              <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
              <span>High operational maintenance burden on engineering teams.</span>
            </div>
          </div>
        </motion.div>

        {/* The IOMETE Approach Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 text-white rounded-3xl p-6 border border-slate-800 shadow-xl flex flex-col justify-between space-y-4 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-3 relative z-10">
            <div className="flex items-center justify-between">
              <Badge variant="success" size="sm">
                The IOMETE Approach
              </Badge>
              <Sparkles className="h-5 w-5 text-sky-400" />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Managed Lakehouse on Customer Infrastructure
            </h3>
            <p className="text-xs text-sky-300">
              Best of both worlds: Managed simplicity + Customer sovereignty
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
              A fully managed Apache Iceberg data platform that runs inside your own cloud or
              data-center perimeter with predictable economics.
            </p>
          </div>

          <div className="space-y-2 pt-3 border-t border-white/10 text-xs relative z-10">
            <div className="flex items-start gap-2 text-slate-200">
              <CheckCircle2 className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
              <span>Your storage, your network, your security keys.</span>
            </div>
            <div className="flex items-start gap-2 text-slate-200">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Automated compaction, scaling, and zero credit markups.</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Interactive 4-Dimension Trade-Off Deep Dive */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              Deep-Dive Trade-off Analysis
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Select any architectural dimension to compare trade-offs and see how IOMETE bridges
              the gap.
            </p>
          </div>

          {/* Dimension Selector Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl">
            {dimensions.map((dim) => {
              const isSelected = dim.id === activeDimension;
              return (
                <button
                  key={dim.id}
                  onClick={() => setActiveDimension(dim.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {dim.icon}
                  <span>{dim.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Current Dimension Comparison View */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Option A Column */}
          <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                Option A
              </span>
              <h4 className="text-sm font-bold text-slate-900">{currentDim.optionA.title}</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              {currentDim.optionA.description}
            </p>
            <div className="p-3 rounded-xl bg-white border border-slate-200/70 text-xs text-slate-600 leading-relaxed space-y-1">
              <span className="font-semibold text-slate-800 text-[11px] block">
                Trade-off Consideration:
              </span>
              <p>{currentDim.optionA.consideration}</p>
            </div>
          </div>

          {/* Option B Column */}
          <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-100">
                Option B
              </span>
              <h4 className="text-sm font-bold text-slate-900">{currentDim.optionB.title}</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              {currentDim.optionB.description}
            </p>
            <div className="p-3 rounded-xl bg-white border border-slate-200/70 text-xs text-slate-600 leading-relaxed space-y-1">
              <span className="font-semibold text-slate-800 text-[11px] block">
                Trade-off Consideration:
              </span>
              <p>{currentDim.optionB.consideration}</p>
            </div>
          </div>

          {/* IOMETE Approach Column */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-sky-50 via-teal-50/50 to-indigo-50/40 border-2 border-sky-300 space-y-3 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-200">
                The IOMETE Resolution
              </span>
              <h4 className="text-sm font-bold text-slate-900">{currentDim.iometeWay.title}</h4>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {currentDim.iometeWay.description}
            </p>
            <div className="p-3 rounded-xl bg-white/90 border border-sky-200 text-xs text-slate-800 leading-relaxed space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-sky-800 text-[11px]">
                <Sparkles className="h-3 w-3 text-sky-600" />
                <span>Architectural Proof Point:</span>
              </div>
              <p className="text-slate-700">{currentDim.iometeWay.proofPoint}</p>
            </div>
          </div>
        </div>

        {/* Nuanced note */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 text-xs text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-slate-400 shrink-0" />
            <span>
              Architecture requirements vary by data volume, regulatory posture, and team maturity.
              IOMETE is purpose-built for teams prioritizing sovereign control and cost predictability.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

