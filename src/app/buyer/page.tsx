"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePresentation } from "@/context/PresentationContext";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionHeader } from "@/components/common/SectionHeader";
import { FeatureCard } from "@/components/common/FeatureCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Sliders,
  DollarSign,
  TrendingDown,
  Layers,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Database,
  Lock,
  Download,
  Cloud,
  Server,
  Radio,
  Cpu,
  BarChart3,
  Check,
  Filter,
  Send,
  ExternalLink,
  Info,
} from "lucide-react";

interface UseCaseItem {
  id: string;
  industry: "FinTech" | "Healthcare" | "Retail" | "SaaS";
  title: string;
  problem: string;
  solution: string;
  impact: string;
}

export default function BuyerPortalPage() {
  const {
    sessionData,
    updateSessionData,
    toggleRequirement,
    toggleWorkload,
    currentStage,
    stages,
  } = usePresentation();

  const [questionText, setQuestionText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<
    "All" | "FinTech" | "Healthcare" | "Retail" | "SaaS"
  >("All");
  const [activeArchLayer, setActiveArchLayer] = useState<string>("iceberg");

  // Financial calculations
  const annualSpend = sessionData.monthlyCloudSpend * 12;
  const estimatedAnnualSavings = Math.round(annualSpend * 0.684);
  const threeYearSavings = estimatedAnnualSavings * 3;

  const handleSliderChange = (field: keyof typeof sessionData, value: number) => {
    updateSessionData({ [field]: value });
  };

  const handleDeploymentSelect = (
    dep: "aws" | "azure" | "gcp" | "onprem" | "hybrid" | "airgapped"
  ) => {
    updateSessionData({ deploymentTarget: dep });
  };

  const handleWarehouseSelect = (wh: string) => {
    updateSessionData({ currentWarehouse: wh });
  };

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;
    updateSessionData({
      bookmarkedQuestions: [...sessionData.bookmarkedQuestions, questionText.trim()],
    });
    setQuestionText("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const priorityOptions = [
    {
      id: "customer_vpc",
      label: "Customer VPC Data Residency",
      desc: "Data never leaves customer cloud; zero vendor data retention.",
    },
    {
      id: "zero_lockin",
      label: "100% Open Apache Iceberg",
      desc: "Standard Parquet files readable by any external engine or BI tool.",
    },
    {
      id: "predictable_spend",
      label: "Predictable Compute Pricing",
      desc: "Eliminate opaque credit multipliers; run at raw cloud hardware rates.",
    },
    {
      id: "subsecond_bi",
      label: "Sub-Second BI Queries",
      desc: "Optimized vectorized Spark caching delivering <850ms dashboard response.",
    },
    {
      id: "ranger_rbac",
      label: "Fine-Grained Column Masking",
      desc: "Centralized Apache Ranger security with dynamic PII masking.",
    },
    {
      id: "zero_rewrite",
      label: "Zero SQL Rewrite for BI",
      desc: "Standard JDBC/ODBC connectors for Tableau, Looker, PowerBI & dbt.",
    },
  ];

  const workloadOptions = [
    { id: "bi_reporting", label: "BI Dashboards & Executive Reports" },
    { id: "lakehouse_etl", label: "Scheduled Batch Data Pipelines & dbt" },
    { id: "ad_hoc_sql", label: "Ad-hoc Analytics & Exploratory Queries" },
    { id: "data_science", label: "Python, PySpark & Machine Learning" },
    { id: "streaming_ingest", label: "Real-time Event Ingestion & Kafka" },
  ];

  const useCases: UseCaseItem[] = [
    {
      id: "fintech-1",
      industry: "FinTech",
      title: "Real-Time Transaction Risk & Daily Settlement",
      problem:
        "High query concurrency during 8:00 AM market open caused Snowflake credit spikes and query timeouts.",
      solution:
        "IOMETE decoupled the transaction history on Iceberg storage from elastic Spark auto-scaling clusters.",
      impact: "P95 query latency dropped to 720ms with a 65% reduction in monthly compute bills.",
    },
    {
      id: "health-1",
      industry: "Healthcare",
      title: "Multi-Hospital HIPAA Compliant Analytics",
      problem:
        "InfoSec rejected multi-tenant cloud warehouses due to cross-tenant data co-mingling concerns.",
      solution:
        "Deployed IOMETE into the customer's private AWS VPC with dedicated single-tenant clusters and KMS CMEK.",
      impact: "100% HIPAA and SOC2 compliance passed without any external data copies.",
    },
    {
      id: "retail-1",
      industry: "Retail",
      title: "Omnichannel Customer 360 & Inventory Forecasting",
      problem:
        "Data was copied between a cheap S3 data lake and an expensive warehouse, creating ETL delays and sync failures.",
      solution:
        "Created an Apache Iceberg lakehouse on existing S3 buckets, enabling Tableau to query raw data directly.",
      impact: "Eliminated 6 ETL sync pipelines and cut end-to-end data freshness from 14 hours to 8 minutes.",
    },
    {
      id: "saas-1",
      industry: "SaaS",
      title: "Embedded Customer-Facing Analytics",
      problem:
        "Customer analytics portals generated hundreds of simultaneous queries, hitting warehouse concurrency caps.",
      solution:
        "Deployed vectorized Spark clusters with intelligent query caching and rapid auto-scaling.",
      impact: "Scaled effortlessly to 400+ concurrent tenant dashboards with predictable flat platform pricing.",
    },
  ];

  const filteredUseCases =
    selectedIndustry === "All"
      ? useCases
      : useCases.filter((uc) => uc.industry === selectedIndustry);

  return (
    <div className="space-y-8">
      {/* 1. Header with Account & Sync status */}
      <PageHeader
        badge="Buyer Self-Service Sandbox"
        badgeVariant="success"
        title={`Evaluation Workspace for ${sessionData.buyerName}`}
        subtitle={`Interactive sandbox prepared for ${sessionData.buyerCompany}. Test cloud economic models, inspect the private architecture, and configure your requirements.`}
        breadcrumbs={[{ label: "DealBridge", href: "/" }, { label: "Buyer Portal" }]}
        actions={
          <div className="flex items-center gap-2">
            <Link href="/business-case">
              <Button variant="primary" size="sm">
                <DollarSign className="h-4 w-4 mr-1" />
                <span>Full TCO Calculator</span>
              </Button>
            </Link>
          </div>
        }
      />

      {/* 2. Seller Presentation Pacing Bar (Seller in Total Control) */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white rounded-2xl p-4 border border-slate-800 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-3 w-3 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <div className="text-xs">
            <span className="text-slate-400">Presenter is currently leading:</span>{" "}
            <strong className="text-white font-bold">
              Stage {currentStage.number}: {currentStage.title}
            </strong>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-300 hidden md:inline">
            Your sandbox selections sync live with the presenter
          </span>
          <Link href={currentStage.route}>
            <Button variant="secondary" size="sm" className="text-xs bg-white/10 hover:bg-white/20 text-white border-white/20">
              <span>View Presenter&apos;s Active Stage</span>
              <ExternalLink className="h-3 w-3 ml-1" />
            </Button>
          </Link>
        </div>
      </div>

      {/* 3. Non-Technical Executive Overview */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="indigo" size="sm">
            Quick Executive Primer
          </Badge>
          <span className="text-xs text-slate-400">Non-Technical Summary</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Modern Lakehouse Simplicity Without Cloud Lock-In
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
          IOMETE gives your business analysts and data engineers the speed and familiar SQL interface
          of a cloud data warehouse, but runs directly on your existing cloud storage (AWS S3, Azure
          Blob, GCP) using the open Apache Iceberg format. Your sensitive data never leaves your
          private cloud, and you never pay inflated credit markups.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700">
            <span className="font-bold text-slate-900 block mb-1">1. Keep Your Existing BI</span>
            Tableau, Looker, PowerBI, and dbt connect with standard JDBC/ODBC drivers with zero SQL
            rewrites.
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700">
            <span className="font-bold text-slate-900 block mb-1">2. Zero Data Egress</span>
            Queries execute locally in your VPC. Your data remains 100% inside your sovereign cloud
            perimeter.
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700">
            <span className="font-bold text-slate-900 block mb-1">3. Transparent Economics</span>
            Pay standard cloud provider hardware rates directly to AWS/Azure, with zero opaque credit
            markups.
          </div>
        </div>
      </div>

      {/* 4. Interactive Business Requirements Selector */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <Badge variant="default" size="sm">
              Tailor to Your Architecture
            </Badge>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mt-1">
              Select Your Business &amp; Technical Requirements
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Check the criteria that matter most to {sessionData.buyerCompany}. The platform dynamically
              adapts its architectural recommendations.
            </p>
          </div>
          <Badge variant="indigo" size="sm">
            {sessionData.selectedRequirements.length} Criteria Selected
          </Badge>
        </div>

        {/* Step A: Deployment Target Selector */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            Step 1 • Target Deployment Environment
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {[
              { id: "aws", label: "AWS VPC", icon: <Cloud className="h-4 w-4" /> },
              { id: "azure", label: "Azure VNet", icon: <Cloud className="h-4 w-4" /> },
              { id: "gcp", label: "Google Cloud", icon: <Cloud className="h-4 w-4" /> },
              { id: "onprem", label: "On-Premises", icon: <Server className="h-4 w-4" /> },
              { id: "hybrid", label: "Hybrid Cloud", icon: <Layers className="h-4 w-4" /> },
              { id: "airgapped", label: "Air-Gapped", icon: <Radio className="h-4 w-4" /> },
            ].map((dep) => {
              const isSelected = sessionData.deploymentTarget === dep.id;
              return (
                <button
                  key={dep.id}
                  onClick={() =>
                    handleDeploymentSelect(
                      dep.id as "aws" | "azure" | "gcp" | "onprem" | "hybrid" | "airgapped"
                    )
                  }
                  className={`p-3 rounded-2xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    isSelected
                      ? "bg-sky-50 text-sky-800 border-sky-400 shadow-xs font-bold"
                      : "bg-slate-50 text-slate-600 border-slate-200/80 hover:bg-slate-100"
                  }`}
                >
                  {dep.icon}
                  <span>{dep.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step B: Incumbent Data Warehouse */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            Step 2 • Current Data Warehouse / Primary Lake
          </span>
          <div className="flex flex-wrap gap-2">
            {["Snowflake", "Databricks", "AWS Redshift", "Google BigQuery", "Hadoop / DIY Hive"].map(
              (wh) => {
                const isSelected = sessionData.currentWarehouse === wh;
                return (
                  <button
                    key={wh}
                    onClick={() => handleWarehouseSelect(wh)}
                    className={`px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {wh}
                  </button>
                );
              }
            )}
          </div>
        </div>

        {/* Step C: Strategic Priorities Checklist */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            Step 3 • Strategic Priorities &amp; Capabilities
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {priorityOptions.map((opt) => {
              const isChecked = sessionData.selectedRequirements.includes(opt.id);
              return (
                <div
                  key={opt.id}
                  onClick={() => toggleRequirement(opt.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                    isChecked
                      ? "bg-sky-50/70 border-sky-300 shadow-xs"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div
                    className={`h-4 w-4 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isChecked ? "bg-sky-600 border-sky-600 text-white" : "border-slate-300"
                    }`}
                  >
                    {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{opt.label}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{opt.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Fit Summary Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-emerald-900">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
            <div>
              <span className="font-bold block">
                Strong Architecture Alignment with IOMETE
              </span>
              <span className="text-emerald-800/90 text-[11px]">
                IOMETE natively fulfills {sessionData.selectedRequirements.length} selected
                priorities in your {sessionData.deploymentTarget.toUpperCase()} environment.
              </span>
            </div>
          </div>
          <span className="font-mono font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-lg shrink-0">
            Fit Score: 98%
          </span>
        </div>
      </div>

      {/* 5. Interactive Value Estimator Card (Sliders) */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-sky-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Badge variant="indigo" size="sm">
              Live Custom Value Model
            </Badge>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
              Adjust Your Cloud Parameters Live
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Move the sliders below to see projected savings versus {sessionData.currentWarehouse}.
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-sky-400 font-medium uppercase tracking-wider block">
              Projected 3-Year Savings
            </span>
            <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400">
              ${(threeYearSavings / 1000).toFixed(0)}k
            </span>
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Slider 1: Monthly Spend */}
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-medium">Monthly Cloud Spend</span>
              <span className="font-bold text-sky-400">
                ${sessionData.monthlyCloudSpend.toLocaleString()}/mo
              </span>
            </div>
            <input
              type="range"
              min={10000}
              max={200000}
              step={5000}
              value={sessionData.monthlyCloudSpend}
              onChange={(e) => handleSliderChange("monthlyCloudSpend", Number(e.target.value))}
              className="w-full accent-sky-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>$10k/mo</span>
              <span>$200k/mo</span>
            </div>
          </div>

          {/* Slider 2: Data Volume */}
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-medium">Data Footprint</span>
              <span className="font-bold text-sky-400">{sessionData.dataSizeTB} TB Raw</span>
            </div>
            <input
              type="range"
              min={10}
              max={1000}
              step={10}
              value={sessionData.dataSizeTB}
              onChange={(e) => handleSliderChange("dataSizeTB", Number(e.target.value))}
              className="w-full accent-sky-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>10 TB</span>
              <span>1 PB</span>
            </div>
          </div>

          {/* Slider 3: Active Analysts */}
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-medium">Active BI Analysts</span>
              <span className="font-bold text-sky-400">{sessionData.activeAnalysts} Users</span>
            </div>
            <input
              type="range"
              min={5}
              max={250}
              step={5}
              value={sessionData.activeAnalysts}
              onChange={(e) => handleSliderChange("activeAnalysts", Number(e.target.value))}
              className="w-full accent-sky-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>5 Users</span>
              <span>250 Users</span>
            </div>
          </div>
        </div>

        {/* Dynamic Metric Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10 text-center">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
              Incumbent Annual Spend
            </span>
            <span className="text-lg font-bold text-slate-200">
              ${(annualSpend / 1000).toFixed(0)}k/yr
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
              IOMETE Projected Spend
            </span>
            <span className="text-lg font-bold text-sky-300">
              ${((annualSpend - estimatedAnnualSavings) / 1000).toFixed(0)}k/yr
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
              Annual Cash Savings
            </span>
            <span className="text-lg font-bold text-emerald-400">
              ${(estimatedAnnualSavings / 1000).toFixed(0)}k/yr
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
              Effective ROI
            </span>
            <span className="text-lg font-bold text-emerald-400">3.2x ROI</span>
          </div>
        </div>
      </div>

      {/* 6. Interactive Lakehouse Architecture Explorer */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <Badge variant="indigo" size="sm">
              Interactive Architecture Explorer
            </Badge>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mt-1">
              Click Any Tier to Inspect How Data Stays in Your Perimeter
            </h3>
          </div>
          <span className="text-xs text-slate-400">Verified Zero-Copy Topology</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {[
            {
              id: "storage",
              title: "1. Customer S3 / Blob",
              subtitle: "100% Data Sovereignty",
              desc: "Data never leaves your cloud account. CMEK encryption with your own AWS KMS keys.",
              icon: <Database className="h-5 w-5 text-sky-600" />,
              spec: "Residency: Private VPC",
            },
            {
              id: "iceberg",
              title: "2. Apache Iceberg",
              subtitle: "Open Table Standard",
              desc: "ACID transactions, time travel, and automated metadata compaction with zero vendor lock-in.",
              icon: <Layers className="h-5 w-5 text-teal-600" />,
              spec: "Format: Parquet / Iceberg",
            },
            {
              id: "compute",
              title: "3. Vectorized Spark",
              subtitle: "Elastic & Sub-Second",
              desc: "High-concurrency SQL execution cache delivering sub-second queries with auto-suspension.",
              icon: <Cpu className="h-5 w-5 text-indigo-600" />,
              spec: "Latency: <850ms on 100M rows",
            },
            {
              id: "governance",
              title: "4. Apache Ranger",
              subtitle: "Fine-Grained RBAC",
              desc: "Column-level masking and row-level filtering applied consistently across all BI tools.",
              icon: <ShieldCheck className="h-5 w-5 text-emerald-600" />,
              spec: "Certifications: SOC2 / HIPAA",
            },
          ].map((tier) => {
            const isSelected = activeArchLayer === tier.id;
            return (
              <div
                key={tier.id}
                onClick={() => setActiveArchLayer(tier.id)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  isSelected
                    ? "border-sky-500 bg-sky-50/50 shadow-md scale-[1.01]"
                    : "border-slate-200/80 bg-slate-50/50 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-xl bg-white shadow-xs border border-slate-200">
                    {tier.icon}
                  </div>
                  <span className="text-[10px] font-bold text-sky-700 uppercase tracking-wider">
                    {tier.spec}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">{tier.title}</h4>
                <p className="text-[11px] font-medium text-slate-500 mt-0.5">{tier.subtitle}</p>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{tier.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 7. Explore Relevant Use Cases (Filterable) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <Badge variant="indigo" size="sm">
              Validated Customer Scenarios
            </Badge>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mt-1">
              Explore Enterprise Use Cases
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              See how data engineering teams solve warehouse bottlenecks and credit overruns with
              IOMETE.
            </p>
          </div>

          {/* Industry Filter Buttons */}
          <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-xl">
            {(["All", "FinTech", "Healthcare", "Retail", "SaaS"] as const).map((ind) => (
              <button
                key={ind}
                onClick={() => setSelectedIndustry(ind)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedIndustry === ind
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredUseCases.map((uc) => (
            <div
              key={uc.id}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3"
            >
              <div className="flex items-center justify-between">
                <Badge variant="default" size="sm">
                  {uc.industry}
                </Badge>
                <span className="text-[11px] font-bold text-emerald-600">Verified Outcome</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">{uc.title}</h4>

              <div className="space-y-1.5 text-xs text-slate-600">
                <p>
                  <strong className="text-slate-800">Challenge:</strong> {uc.problem}
                </p>
                <p>
                  <strong className="text-slate-800">IOMETE Solution:</strong> {uc.solution}
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200/70 text-xs text-emerald-900 font-semibold flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>{uc.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 8. Buyer Question / Clarification Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Have a Specific Technical Question for the IOMETE Architect?
            </h3>
            <p className="text-xs text-slate-500">
              Submit your inquiry below. It syncs directly to the presenter&apos;s console in
              real-time.
            </p>
          </div>
          {submitted && (
            <Badge variant="success" size="sm">
              <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
              Question Delivered to Presenter!
            </Badge>
          )}
        </div>

        <form onSubmit={handleAskQuestion} className="flex gap-2">
          <input
            type="text"
            placeholder="e.g. Can we bring our existing dbt Cloud pipelines to IOMETE without modification?"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            className="flex-1 text-xs px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500"
          />
          <Button type="submit" variant="primary" size="sm" className="cursor-pointer">
            <Send className="h-3.5 w-3.5 mr-1" />
            <span>Send Question</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
