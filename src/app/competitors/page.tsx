"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePresentation } from "@/context/PresentationContext";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/common/ScrollReveal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  ArrowRight,
  Info,
  Check,
  Minus,
  AlertTriangle,
  ExternalLink,
  Server,
  Cloud,
  Shield,
  Zap,
  Database,
  Workflow,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Scale,
  Building2,
  Globe,
  Lock,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Data — sourced from official product documentation
// ---------------------------------------------------------------------------

const LAST_VERIFIED = "October 2026";

interface PlatformProfile {
  id: string;
  name: string;
  tagline: string;
  color: string;
  bgColor: string;
  borderColor: string;
  sourceUrl: string;
}

const PLATFORMS: PlatformProfile[] = [
  {
    id: "iomete",
    name: "IOMETE",
    tagline: "Managed Lakehouse on Your Infrastructure",
    color: "text-sky-600",
    bgColor: "bg-sky-50",
    borderColor: "border-sky-200",
    sourceUrl: "https://iomete.com/docs",
  },
  {
    id: "snowflake",
    name: "Snowflake",
    tagline: "Managed Multi-Tenant Cloud Data Platform",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    sourceUrl: "https://docs.snowflake.com",
  },
  {
    id: "databricks",
    name: "Databricks",
    tagline: "Unified Analytics / Lakehouse Platform",
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    sourceUrl: "https://docs.databricks.com",
  },
  {
    id: "bigquery",
    name: "Google BigQuery",
    tagline: "Serverless Enterprise Data Warehouse",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    sourceUrl: "https://cloud.google.com/bigquery/docs",
  },
];

type ComparisonStatus = "supported" | "partial" | "not-supported" | "depends" | "not-verified";

interface ComparisonRow {
  dimension: string;
  category: string;
  iomete: { status: ComparisonStatus; detail: string };
  snowflake: { status: ComparisonStatus; detail: string };
  databricks: { status: ComparisonStatus; detail: string };
  bigquery: { status: ComparisonStatus; detail: string };
  note?: string;
}

const COMPARISON_DATA: ComparisonRow[] = [
  {
    dimension: "On-Premises Deployment",
    category: "Deployment",
    iomete: { status: "supported", detail: "Kubernetes-native deployment on any on-premises infrastructure" },
    snowflake: { status: "not-supported", detail: "Cloud-only SaaS; no on-premises deployment option" },
    databricks: { status: "not-supported", detail: "Cloud-only; control plane hosted by Databricks" },
    bigquery: { status: "not-supported", detail: "Google Cloud exclusive; no on-premises option" },
  },
  {
    dimension: "Air-Gapped Deployment",
    category: "Deployment",
    iomete: { status: "supported", detail: "Runs fully disconnected with zero external telemetry" },
    snowflake: { status: "not-supported", detail: "Requires internet connectivity to Snowflake services" },
    databricks: { status: "not-supported", detail: "Requires connectivity to Databricks control plane" },
    bigquery: { status: "not-supported", detail: "Requires Google Cloud connectivity" },
  },
  {
    dimension: "Customer VPC / Private Cloud",
    category: "Deployment",
    iomete: { status: "supported", detail: "Data plane runs entirely within customer-owned Kubernetes cluster" },
    snowflake: { status: "partial", detail: "Snowflake VPS (Virtual Private Snowflake) available at enterprise tier" },
    databricks: { status: "supported", detail: "Data plane deploys into customer cloud VPC/VNet" },
    bigquery: { status: "partial", detail: "VPC Service Controls available; compute remains Google-managed" },
    note: "Snowflake VPS and BigQuery VPC-SC are premium-tier features with additional cost",
  },
  {
    dimension: "Multi-Cloud Support",
    category: "Deployment",
    iomete: { status: "supported", detail: "AWS, Azure, GCP, and any Kubernetes-capable environment" },
    snowflake: { status: "supported", detail: "AWS, Azure, GCP with separate account per region" },
    databricks: { status: "supported", detail: "AWS, Azure, GCP via cloud-native control planes" },
    bigquery: { status: "partial", detail: "Native on GCP; BigQuery Omni available for limited AWS/Azure querying" },
  },
  {
    dimension: "Data Stored in Customer Infrastructure",
    category: "Data Sovereignty",
    iomete: { status: "supported", detail: "All data stays in customer-owned S3-compatible, NFS, or HDFS storage" },
    snowflake: { status: "partial", detail: "Data stored in Snowflake-managed cloud storage by default; External Tables available" },
    databricks: { status: "supported", detail: "Data stored in customer-owned cloud storage (S3, ADLS, GCS)" },
    bigquery: { status: "partial", detail: "Data stored in Google-managed Colossus; BigLake supports external storage reads" },
    note: "Databricks and IOMETE keep data in customer accounts by design; Snowflake and BigQuery manage storage by default",
  },
  {
    dimension: "Customer-Managed Encryption Keys",
    category: "Data Sovereignty",
    iomete: { status: "supported", detail: "Full CMEK support via customer-owned Kubernetes secrets and KMS" },
    snowflake: { status: "supported", detail: "Tri-Secret Secure with customer-managed keys (Enterprise edition)" },
    databricks: { status: "supported", detail: "CMEK supported across all major clouds" },
    bigquery: { status: "supported", detail: "CMEK via Google Cloud KMS" },
  },
  {
    dimension: "Apache Iceberg (Native Table Format)",
    category: "Open Standards",
    iomete: { status: "supported", detail: "Built natively on Apache Iceberg as the primary and only table format" },
    snowflake: { status: "supported", detail: "Native Iceberg Tables supported; Horizon Catalog implements REST Catalog API" },
    databricks: { status: "supported", detail: "Iceberg supported via Unity Catalog; Delta Lake remains the primary native format" },
    bigquery: { status: "supported", detail: "Iceberg tables supported via BigLake storage API" },
    note: "All platforms now support Apache Iceberg, but IOMETE and Snowflake treat it as a first-class citizen. Databricks primarily uses Delta Lake.",
  },
  {
    dimension: "Apache Spark (Native Compute Engine)",
    category: "Open Standards",
    iomete: { status: "supported", detail: "Full Apache Spark runtime for batch, streaming, and interactive SQL" },
    snowflake: { status: "partial", detail: "Snowpark offers Spark-compatible APIs, but not native Apache Spark" },
    databricks: { status: "supported", detail: "Custom Apache Spark runtime with Photon acceleration" },
    bigquery: { status: "partial", detail: "Spark available via Dataproc integration; not native to BigQuery engine" },
    note: "IOMETE and Databricks run Apache Spark natively. Snowflake uses Snowpark and BigQuery uses Dremel as their primary engines.",
  },
  {
    dimension: "Platform Self-Management Responsibility",
    category: "Operations",
    iomete: { status: "depends", detail: "Customer manages Kubernetes infrastructure; IOMETE manages data plane software" },
    snowflake: { status: "supported", detail: "Fully managed SaaS; zero infrastructure management" },
    databricks: { status: "partial", detail: "Customer manages cloud account and networking; Databricks manages control plane" },
    bigquery: { status: "supported", detail: "Fully serverless; no infrastructure to manage" },
    note: "Managed platforms trade infrastructure control for operational simplicity. IOMETE requires Kubernetes operations expertise.",
  },
  {
    dimension: "Predictable Pricing (No Compute Markups)",
    category: "Economics",
    iomete: { status: "supported", detail: "Runs on raw cloud compute instances or customer hardware with platform license fee" },
    snowflake: { status: "not-supported", detail: "Credit-based pricing with multipliers above raw compute cost" },
    databricks: { status: "not-supported", detail: "DBU-based pricing layered on top of cloud instance costs" },
    bigquery: { status: "partial", detail: "On-demand pricing at $6.25/TB scanned; flat-rate slots available for predictability" },
    note: "Pricing models differ significantly. Snowflake credits and Databricks DBUs include markups above underlying compute. IOMETE charges a platform fee on raw infrastructure.",
  },
  {
    dimension: "Zero Vendor Lock-in (Data Portability)",
    category: "Economics",
    iomete: { status: "supported", detail: "Open formats (Iceberg/Parquet) on customer storage; portable by design" },
    snowflake: { status: "partial", detail: "Iceberg Tables are portable; traditional tables use proprietary micro-partition format" },
    databricks: { status: "partial", detail: "Delta Lake is open-source but Databricks-originated; Unity Catalog adds proprietary governance" },
    bigquery: { status: "partial", detail: "BigLake Iceberg tables are portable; native BigQuery tables require export" },
    note: "All platforms have improved portability through Iceberg adoption, but legacy data in proprietary formats may require migration.",
  },
  {
    dimension: "Fine-Grained Access Control (Row/Column Level)",
    category: "Governance",
    iomete: { status: "supported", detail: "Apache Ranger integration for RBAC, row-level and column-level security" },
    snowflake: { status: "supported", detail: "Row Access Policies and Dynamic Data Masking" },
    databricks: { status: "supported", detail: "Unity Catalog with row filters and column masks" },
    bigquery: { status: "supported", detail: "Row-level security and column-level access controls" },
  },
];

// Deployment Model Cards
interface DeploymentModel {
  title: string;
  description: string;
  icon: React.ReactNode;
  platforms: { name: string; support: string }[];
}

const DEPLOYMENT_MODELS: DeploymentModel[] = [
  {
    title: "Fully Managed SaaS",
    description: "Zero infrastructure management. The vendor operates all components in their own cloud environment.",
    icon: <Cloud className="h-5 w-5" />,
    platforms: [
      { name: "Snowflake", support: "Primary model" },
      { name: "BigQuery", support: "Primary model (serverless)" },
      { name: "Databricks", support: "Control plane only" },
      { name: "IOMETE", support: "Not offered as multi-tenant SaaS" },
    ],
  },
  {
    title: "Customer VPC / Private Cloud",
    description: "Compute and data processing runs within the customer's own cloud account or virtual private cloud.",
    icon: <Shield className="h-5 w-5" />,
    platforms: [
      { name: "IOMETE", support: "Primary model — full data plane in customer K8s" },
      { name: "Databricks", support: "Data plane in customer VPC" },
      { name: "Snowflake", support: "Available via Virtual Private Snowflake (premium)" },
      { name: "BigQuery", support: "VPC Service Controls (network isolation only)" },
    ],
  },
  {
    title: "On-Premises / Air-Gapped",
    description: "Deployed entirely within corporate data centers with no external internet dependency.",
    icon: <Server className="h-5 w-5" />,
    platforms: [
      { name: "IOMETE", support: "Fully supported on any Kubernetes cluster" },
      { name: "Snowflake", support: "Not available" },
      { name: "Databricks", support: "Not available" },
      { name: "BigQuery", support: "Not available" },
    ],
  },
  {
    title: "Hybrid (Cloud + On-Premises)",
    description: "A combination of on-premises data planes with cloud-based management or federated querying.",
    icon: <Globe className="h-5 w-5" />,
    platforms: [
      { name: "IOMETE", support: "Multiple data planes across environments" },
      { name: "Databricks", support: "Lakehouse Federation for cross-catalog queries" },
      { name: "Snowflake", support: "Data sharing across regions/clouds" },
      { name: "BigQuery", support: "BigQuery Omni for limited cross-cloud queries" },
    ],
  },
];

// Buyer requirement tags
interface BuyerRequirement {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  matchingPlatforms: string[];
  iometeRelevance: string;
}

const BUYER_REQUIREMENTS: BuyerRequirement[] = [
  {
    id: "data_on_prem",
    label: "Data Must Stay On-Premises",
    description: "Regulatory or policy requirements mandate that data cannot leave corporate data centers.",
    icon: <Building2 className="h-4 w-4" />,
    matchingPlatforms: ["IOMETE"],
    iometeRelevance: "IOMETE deploys as a Kubernetes-native application on any on-premises infrastructure, including air-gapped environments. Data never leaves the customer's physical boundary.",
  },
  {
    id: "customer_infra",
    label: "Data Must Remain in Our Infrastructure",
    description: "The organization requires data to stay within their own cloud accounts or infrastructure.",
    icon: <Lock className="h-4 w-4" />,
    matchingPlatforms: ["IOMETE", "Databricks"],
    iometeRelevance: "IOMETE's data plane runs entirely within customer-owned Kubernetes clusters. All data is stored in customer-controlled S3-compatible storage, NFS, or HDFS. Databricks also stores data in customer cloud accounts.",
  },
  {
    id: "no_vendor_lock",
    label: "Avoid Vendor Lock-in",
    description: "Open formats and portability are critical to the organization's data strategy.",
    icon: <Database className="h-4 w-4" />,
    matchingPlatforms: ["IOMETE"],
    iometeRelevance: "IOMETE is built exclusively on Apache Iceberg and Apache Spark — both open-source standards. Data stored in Parquet/Iceberg on customer storage is readable by any compatible engine without vendor dependency.",
  },
  {
    id: "cost_predictable",
    label: "Predictable, Transparent Pricing",
    description: "The organization needs to avoid opaque credit-based or per-query pricing models.",
    icon: <Scale className="h-4 w-4" />,
    matchingPlatforms: ["IOMETE"],
    iometeRelevance: "IOMETE runs on raw cloud instances or existing hardware with a transparent platform license. There are no credit multipliers, DBU surcharges, or per-TB-scanned fees.",
  },
  {
    id: "spark_native",
    label: "Native Apache Spark Support",
    description: "Teams rely on Apache Spark for ETL, ML, and data engineering workloads.",
    icon: <Zap className="h-4 w-4" />,
    matchingPlatforms: ["IOMETE", "Databricks"],
    iometeRelevance: "IOMETE provides full Apache Spark runtime for batch processing, streaming, and interactive SQL queries. Databricks also runs Apache Spark natively with their custom runtime.",
  },
  {
    id: "multi_cloud",
    label: "Multi-Cloud or Cloud-Agnostic",
    description: "The organization operates across multiple cloud providers and needs consistent tooling.",
    icon: <Globe className="h-4 w-4" />,
    matchingPlatforms: ["IOMETE", "Snowflake", "Databricks"],
    iometeRelevance: "IOMETE runs on any Kubernetes-capable environment across AWS, Azure, GCP, or on-premises. Snowflake and Databricks are also available across major clouds.",
  },
];

// ---------------------------------------------------------------------------
// Status Indicator Component
// ---------------------------------------------------------------------------
function StatusIndicator({ status }: { status: ComparisonStatus }) {
  switch (status) {
    case "supported":
      return (
        <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
          <Check className="h-3.5 w-3.5" />
          <span className="text-[11px]">Supported</span>
        </span>
      );
    case "partial":
      return (
        <span className="inline-flex items-center gap-1 text-amber-700 font-medium">
          <AlertTriangle className="h-3.5 w-3.5" />
          <span className="text-[11px]">Depends on configuration</span>
        </span>
      );
    case "not-supported":
      return (
        <span className="inline-flex items-center gap-1 text-slate-400 font-medium">
          <Minus className="h-3.5 w-3.5" />
          <span className="text-[11px]">Not available</span>
        </span>
      );
    case "depends":
      return (
        <span className="inline-flex items-center gap-1 text-blue-600 font-medium">
          <Info className="h-3.5 w-3.5" />
          <span className="text-[11px]">Depends on configuration</span>
        </span>
      );
    case "not-verified":
      return (
        <span className="inline-flex items-center gap-1 text-slate-400 font-medium">
          <HelpCircle className="h-3.5 w-3.5" />
          <span className="text-[11px]">Not verified</span>
        </span>
      );
  }
}

// ---------------------------------------------------------------------------
// Main Page Component
// ---------------------------------------------------------------------------
export default function CompetitorsPage() {
  const { sessionData } = usePresentation();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>([]);
  const [expandedNotes, setExpandedNotes] = useState<Set<number>>(new Set());

  const categories = useMemo(() => {
    const cats = Array.from(new Set(COMPARISON_DATA.map((r) => r.category)));
    return ["All", ...cats];
  }, []);

  const filteredData = useMemo(() => {
    if (selectedCategory === "All") return COMPARISON_DATA;
    return COMPARISON_DATA.filter((r) => r.category === selectedCategory);
  }, [selectedCategory]);

  const toggleRequirement = (id: string) => {
    setSelectedRequirements((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const toggleNote = (idx: number) => {
    setExpandedNotes((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const activeRequirements = BUYER_REQUIREMENTS.filter((r) =>
    selectedRequirements.includes(r.id)
  );

  return (
    <div className="space-y-8">
      <PageHeader
        badge="Platform Comparison"
        badgeVariant="default"
        title="Why Consider IOMETE?"
        subtitle="Understand how different data platform approaches compare. This comparison is based on official product documentation and architectural characteristics."
        breadcrumbs={[{ label: "DealBridge", href: "/" }, { label: "Comparison" }]}
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

      {/* ----------------------------------------------------------------- */}
      {/* 1. Buyer Requirement Selector                                     */}
      {/* ----------------------------------------------------------------- */}
      <ScrollReveal>
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-5">
          <SectionHeader
            title="What Matters Most to You?"
            description="Select the requirements that are important for your organization. We'll highlight which platforms match."
            icon={<Scale className="h-4 w-4" />}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {BUYER_REQUIREMENTS.map((req) => {
              const isActive = selectedRequirements.includes(req.id);
              return (
                <motion.button
                  key={req.id}
                  onClick={() => toggleRequirement(req.id)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`text-left p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "border-sky-500 bg-sky-50/80 shadow-sm shadow-sky-100"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={isActive ? "text-sky-600" : "text-slate-400"}>
                      {req.icon}
                    </span>
                    <span className={`text-xs font-bold ${isActive ? "text-sky-800" : "text-slate-700"}`}>
                      {req.label}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {req.description}
                  </p>
                </motion.button>
              );
            })}
          </div>

          {/* Active requirement explanations */}
          <AnimatePresence mode="sync">
            {activeRequirements.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-4 space-y-3 pt-4 border-t border-slate-200/80">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    IOMETE Positioning for Your Requirements
                  </h4>
                  {activeRequirements.map((req) => (
                    <motion.div
                      key={req.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      className="p-4 rounded-xl bg-sky-50/60 border border-sky-100"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sky-600">{req.icon}</span>
                        <span className="text-xs font-bold text-sky-900">{req.label}</span>
                        <div className="flex items-center gap-1 ml-auto">
                          {req.matchingPlatforms.map((p) => (
                            <Badge key={p} variant={p === "IOMETE" ? "default" : "secondary"} size="sm">
                              {p}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {req.iometeRelevance}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ScrollReveal>

      {/* ----------------------------------------------------------------- */}
      {/* 2. Deployment Model Cards                                         */}
      {/* ----------------------------------------------------------------- */}
      <ScrollReveal delay={0.1}>
        <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <Badge variant="indigo" size="sm">Deployment Models</Badge>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight mt-1">
                Deployment Approaches Compared
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Different platforms offer different levels of infrastructure control and deployment flexibility.
              </p>
            </div>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DEPLOYMENT_MODELS.map((model) => (
              <StaggerItem key={model.title}>
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3 h-full hover:bg-white/8 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/15 text-sky-400 border border-sky-400/20">
                      {model.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">{model.title}</h3>
                      <p className="text-[11px] text-slate-400">{model.description}</p>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    {model.platforms.map((p) => (
                      <div
                        key={p.name}
                        className="flex items-center justify-between text-xs px-2.5 py-1.5 rounded-lg bg-white/5"
                      >
                        <span className={`font-medium ${p.name === "IOMETE" ? "text-sky-300" : "text-slate-300"}`}>
                          {p.name}
                        </span>
                        <span className="text-slate-400 text-[11px] text-right max-w-[60%]">
                          {p.support}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </ScrollReveal>

      {/* ----------------------------------------------------------------- */}
      {/* 3. Comprehensive Feature Comparison Table                         */}
      {/* ----------------------------------------------------------------- */}
      <ScrollReveal delay={0.15}>
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-5">
          <SectionHeader
            title="Feature Comparison Matrix"
            description="Side-by-side comparison based on official documentation. Hover on details for more context."
            icon={<Workflow className="h-4 w-4" />}
            actions={
              <div className="text-[10px] text-slate-400 font-medium">
                Last verified: {LAST_VERIFIED}
              </div>
            }
          />

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-xl border border-slate-200/80 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-sky-600 text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-800 hover:bg-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto -mx-2 px-2">
            <table className="w-full text-xs text-left min-w-[720px]">
              <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-200/80">
                <tr>
                  <th className="p-3 min-w-[180px]">Dimension</th>
                  {PLATFORMS.map((p) => (
                    <th
                      key={p.id}
                      className={`p-3 ${p.id === "iomete" ? "bg-sky-50/60" : ""}`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className={p.id === "iomete" ? "text-sky-800 font-bold" : ""}>
                          {p.name}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <AnimatePresence mode="sync">
                  {filteredData.map((row, idx) => (
                    <motion.tr
                      key={row.dimension}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15, delay: idx * 0.03 }}
                      className="hover:bg-slate-50/60 transition-colors group"
                    >
                      <td className="p-3">
                        <div className="font-semibold text-slate-900">{row.dimension}</div>
                        <span className="text-[10px] text-slate-400">{row.category}</span>
                        {row.note && (
                          <button
                            onClick={() => toggleNote(idx)}
                            className="ml-1.5 inline-flex items-center text-slate-400 hover:text-sky-600 cursor-pointer"
                          >
                            <Info className="h-3 w-3" />
                          </button>
                        )}
                      </td>

                      {(["iomete", "snowflake", "databricks", "bigquery"] as const).map((platformId) => (
                        <td
                          key={platformId}
                          className={`p-3 align-top ${platformId === "iomete" ? "bg-sky-50/40" : ""}`}
                        >
                          <StatusIndicator status={row[platformId].status} />
                          <p className="mt-1 text-[11px] text-slate-500 leading-relaxed">
                            {row[platformId].detail}
                          </p>
                        </td>
                      ))}
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Expanded notes */}
          <AnimatePresence>
            {filteredData.map((row, idx) =>
              row.note && expandedNotes.has(idx) ? (
                <motion.div
                  key={`note-${idx}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-start gap-2 p-3 bg-amber-50/60 border border-amber-200/50 rounded-xl text-xs text-amber-800"
                >
                  <Info className="h-3.5 w-3.5 shrink-0 mt-0.5 text-amber-500" />
                  <div>
                    <span className="font-semibold">{row.dimension}:</span>{" "}
                    {row.note}
                  </div>
                </motion.div>
              ) : null
            )}
          </AnimatePresence>
        </div>
      </ScrollReveal>

      {/* ----------------------------------------------------------------- */}
      {/* 4. IOMETE Positioning Summary                                     */}
      {/* ----------------------------------------------------------------- */}
      <ScrollReveal delay={0.1}>
        <div className="bg-gradient-to-br from-sky-50 via-white to-indigo-50 rounded-3xl p-6 sm:p-8 border border-sky-200/60 shadow-sm space-y-5">
          <SectionHeader
            title="IOMETE's Approach"
            description="IOMETE focuses on managed lakehouse operations while keeping infrastructure control with the customer."
            icon={<Database className="h-4 w-4" />}
          />

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: "Runs on Your Infrastructure",
                detail: "Deploy on AWS, Azure, GCP, on-premises, hybrid, or air-gapped environments. IOMETE operates as a Kubernetes-native application within your existing infrastructure.",
              },
              {
                title: "Built on Open Standards",
                detail: "Apache Iceberg for table format, Apache Spark for compute, Parquet for storage. No proprietary formats that create vendor dependency.",
              },
              {
                title: "Managed Lakehouse Operations",
                detail: "IOMETE handles automated Iceberg compaction, snapshot pruning, Spark cluster management, and catalog operations while you retain infrastructure control.",
              },
              {
                title: "Transparent Economics",
                detail: "Platform license on raw compute instances — no credit multipliers, no DBU surcharges, no per-TB-scanned fees. Costs are predictable and directly tied to infrastructure consumption.",
              },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <div className="p-5 rounded-2xl bg-white border border-sky-100 shadow-xs hover:shadow-md hover:border-sky-200 transition-all duration-200">
                  <h4 className="text-sm font-bold text-slate-900 mb-1.5">{item.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.detail}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </ScrollReveal>

      {/* ----------------------------------------------------------------- */}
      {/* 5. Sources & Disclaimers                                          */}
      {/* ----------------------------------------------------------------- */}
      <ScrollReveal delay={0.05}>
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-3">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Info className="h-3.5 w-3.5" />
            Sources & Disclaimer
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {PLATFORMS.map((p) => (
              <a
                key={p.id}
                href={p.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:border-sky-300 hover:text-sky-700 transition-colors"
              >
                <ExternalLink className="h-3 w-3 shrink-0" />
                <span>{p.name} Documentation</span>
              </a>
            ))}
          </div>

          <div className="text-[11px] text-slate-400 leading-relaxed space-y-1 pt-2 border-t border-slate-200/60">
            <p>
              <strong className="text-slate-500">Last verified:</strong> {LAST_VERIFIED}. 
              Product capabilities evolve rapidly. Always verify against the latest official documentation before making procurement decisions.
            </p>
            <p>
              <strong className="text-slate-500">Disclaimer:</strong> This comparison reflects publicly documented architectural characteristics at the time of verification. 
              Feature availability may vary by product edition, region, and configuration. This is not an endorsement of one platform over another — 
              the best choice depends on your organization's specific requirements, compliance needs, and operational capabilities.
            </p>
            <p>
              <strong className="text-slate-500">Pricing note:</strong> No specific pricing figures are included because pricing structures change frequently 
              and depend on negotiated contracts, committed-use discounts, and workload characteristics.
            </p>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
