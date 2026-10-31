"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePresentation } from "@/context/PresentationContext";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Tooltip } from "@/components/ui/Tooltip";
import {
  Layers,
  Database,
  Cpu,
  ShieldCheck,
  Server,
  Cloud,
  ArrowRight,
  CheckCircle2,
  AlertOctagon,
  Sparkles,
  Lock,
  Zap,
  BarChart3,
  Terminal,
  Activity,
} from "lucide-react";

interface ArchNode {
  id: string;
  title: string;
  subtitle: string;
  tier: "Storage" | "Format" | "Compute" | "Governance" | "Consumption";
  color: string;
  details: string[];
  specs: { label: string; value: string }[];
}

export default function ArchitecturePage() {
  const { sessionData, role } = usePresentation();
  const [selectedArch, setSelectedArch] = useState<"iomete" | "legacy">("iomete");
  const [activeNodeId, setActiveNodeId] = useState<string>("iceberg");

  const nodes: ArchNode[] = [
    {
      id: "storage",
      title: "Customer Cloud Storage",
      subtitle: "AWS S3 / Azure Blob / Google Cloud Storage",
      tier: "Storage",
      color: "border-sky-500 bg-sky-50 text-sky-800",
      details: [
        "100% Customer-Owned: Data never leaves your private cloud perimeter.",
        "Zero Storage Markup: Pay baseline cloud provider rates ($0.023/GB/mo) directly to AWS.",
        "Zero Egress Penalty: Native in-region high throughput I/O without transit costs.",
      ],
      specs: [
        { label: "Data Residency", value: "Customer VPC" },
        { label: "Encryption", value: "KMS CMEK (AES-256)" },
        { label: "Durability", value: "99.999999999% (11 9s)" },
      ],
    },
    {
      id: "iceberg",
      title: "Apache Iceberg Open Table Format",
      subtitle: "High-Performance Open Metadata & ACID Tables",
      tier: "Format",
      color: "border-teal-500 bg-teal-50 text-teal-800",
      details: [
        "Full ACID Transactions: Reliable multi-concurrent writes and serializable isolation.",
        "Hidden Partitioning & Evolution: Change schema and partition specs without rewriting tables.",
        "Automated Maintenance: IOMETE automatically compacts small files and prunes snapshots.",
      ],
      specs: [
        { label: "Format Standard", value: "Apache Iceberg v2" },
        { label: "Data Files", value: "Apache Parquet" },
        { label: "Time Travel", value: "Snapshot & Timestamp" },
      ],
    },
    {
      id: "compute",
      title: "IOMETE Elastic Compute Engine",
      subtitle: "Distributed Apache Spark & Vectorized SQL Engine",
      tier: "Compute",
      color: "border-indigo-500 bg-indigo-50 text-indigo-800",
      details: [
        "Decoupled Serverless Scaling: Clusters spin up in seconds and auto-suspend when idle.",
        "Multi-Engine Support: Unified SQL query engine, batch PySpark, and streaming jobs.",
        "Vectorized Execution Cache: Memory-tier caching delivers sub-second BI response times.",
      ],
      specs: [
        { label: "Engine Core", value: "Optimized Apache Spark 3.5+" },
        { label: "Auto-suspend", value: "Configurable (1 - 60 min)" },
        { label: "Query Latency", value: "<850ms on 100M rows" },
      ],
    },
    {
      id: "governance",
      title: "Enterprise Governance & RBAC",
      subtitle: "Apache Ranger & Fine-Grained Security Plane",
      tier: "Governance",
      color: "border-emerald-500 bg-emerald-50 text-emerald-800",
      details: [
        "Column Masking & Row Filtering: Enforce granular data access policies dynamically.",
        "Audit Logging: Comprehensive access trails exported to CloudWatch or Datadog.",
        "Single-Tenant Isolation: Dedicated control plane; no multi-tenant cross-talk.",
      ],
      specs: [
        { label: "Auth Protocol", value: "OIDC / SAML / Okta" },
        { label: "RBAC Engine", value: "Apache Ranger" },
        { label: "Certifications", value: "SOC2 Type II, HIPAA" },
      ],
    },
    {
      id: "consumption",
      title: "Unified Consumption & BI Tools",
      subtitle: "Tableau, PowerBI, dbt, Looker, Python, Jupyter",
      tier: "Consumption",
      color: "border-purple-500 bg-purple-50 text-purple-800",
      details: [
        "Zero-Rewrite BI: Connect standard JDBC/ODBC drivers directly into your BI tools.",
        "Full dbt Integration: Run analytics engineering models natively using dbt-iomete.",
        "Data Science Ready: Read tables directly into Pandas, Polars, and PySpark dataframes.",
      ],
      specs: [
        { label: "Dialect", value: "100% ANSI SQL" },
        { label: "Drivers", value: "JDBC / ODBC / REST" },
        { label: "Orchestration", value: "Airflow, dbt, Dagster" },
      ],
    },
  ];

  const activeNode = nodes.find((n) => n.id === activeNodeId) || nodes[1];

  return (
    <div className="space-y-8">
      <PageHeader
        badge="Stage 2 of 7 • Lakehouse Architecture"
        badgeVariant="default"
        title="Interactive Lakehouse Architecture"
        subtitle="Explore the decoupled, open Apache Iceberg architecture. Click any architectural tier to inspect technical specifications."
        breadcrumbs={[{ label: "DealBridge", href: "/" }, { label: "Architecture" }]}
        actions={
          <div className="flex items-center gap-2">
            <Link href="/demo">
              <Button variant="primary" size="sm">
                <span>Next: Live Product Tour</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        }
      />

      {/* Architectural Comparison Toggle */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Architecture Model:
          </span>
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setSelectedArch("iomete")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedArch === "iomete"
                  ? "bg-sky-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              IOMETE Modern Lakehouse (Iceberg)
            </button>
            <button
              onClick={() => setSelectedArch("legacy")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedArch === "legacy"
                  ? "bg-slate-800 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Legacy Closed Warehouse ({sessionData.currentWarehouse})
            </button>
          </div>
        </div>

        <div className="text-xs text-slate-500">
          Showing:{" "}
          <strong className="text-slate-800">
            {selectedArch === "iomete" ? "Open Data Plane in Private VPC" : "Proprietary Cloud Lock-In"}
          </strong>
        </div>
      </div>
      </motion.div>

      {/* Main Architecture Diagram / Interactive Tiers */}
      {selectedArch === "iomete" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left 7 Cols: Interactive Architecture Stack */}
          <div className="lg:col-span-7 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Click Any Layer to Inspect Technical Details
            </div>

            {nodes.map((node, idx) => {
              const isSelected = node.id === activeNodeId;
              return (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: idx * 0.07 }}
                  whileHover={{ x: 2 }}
                  layout
                  onClick={() => setActiveNodeId(node.id)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                    isSelected
                      ? `${node.color} shadow-md scale-[1.01]`
                      : "bg-white border-slate-200/80 hover:border-sky-300 hover:bg-slate-50/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-xs border border-slate-200">
                        {node.tier === "Storage" && <Cloud className="h-4 w-4 text-sky-600" />}
                        {node.tier === "Format" && <Database className="h-4 w-4 text-teal-600" />}
                        {node.tier === "Compute" && <Cpu className="h-4 w-4 text-indigo-600" />}
                        {node.tier === "Governance" && <ShieldCheck className="h-4 w-4 text-emerald-600" />}
                        {node.tier === "Consumption" && <BarChart3 className="h-4 w-4 text-purple-600" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold tracking-tight text-slate-900">
                            {node.title}
                          </h3>
                          <Badge variant="outline" size="sm">
                            {node.tier}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{node.subtitle}</p>
                      </div>
                    </div>

                    <ArrowRight
                      className={`h-4 w-4 transition-transform ${
                        isSelected ? "text-slate-900 translate-x-1" : "text-slate-300"
                      }`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right 5 Cols: Deep Inspection Drawer for Selected Node */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-5 sticky top-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeNodeId}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
              <div className="space-y-1">
                <Badge variant="default" size="sm">
                  {activeNode.tier} Tier Specification
                </Badge>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight mt-2">
                  {activeNode.title}
                </h3>
                <p className="text-xs text-slate-500">{activeNode.subtitle}</p>
              </div>

              {/* Spec Key-Value Table */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                  Enterprise Technical Parameters
                </span>
                <div className="grid grid-cols-1 gap-2">
                  {activeNode.specs.map((spec, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                    >
                      <span className="text-slate-500">{spec.label}:</span>
                      <span className="font-bold text-slate-800">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Architectural Differentiators */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                  Why It Matters for {sessionData.buyerCompany}
                </span>
                <ul className="space-y-2">
                  {activeNode.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

                </motion.div>
              </AnimatePresence>

              <div className="pt-2">
                <Link href="/demo">
                  <Button variant="secondary" size="sm" className="w-full justify-center">
                    <span>See Live Execution in Demo</span>
                    <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Legacy Closed Warehouse Comparison View */
        <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 space-y-6">
          <div className="max-w-2xl space-y-2">
            <Badge variant="danger" size="sm">
              Incumbent Pain Points: {sessionData.currentWarehouse}
            </Badge>
            <h3 className="text-2xl font-bold tracking-tight">
              The Proprietary Lock-In Bottleneck
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Proprietary cloud warehouses force your data into closed formats, monetize every compute credit with opaque markups, and penalize you with egress fees if you ever want to leave.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: 0 * 0.1 }}>
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-3">
              <AlertOctagon className="h-6 w-6 text-rose-400" />
              <h4 className="text-base font-bold text-white">Closed Table Format</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Data is locked into proprietary micro-partitions. You cannot run PySpark, Trino, or external AI models without paying massive data export fees.
              </p>
            </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: 1 * 0.1 }}>
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-3">
              <AlertOctagon className="h-6 w-6 text-rose-400" />
              <h4 className="text-base font-bold text-white">Opaque Credit Metering</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Runaway billing where a single poorly written query or unmonitored warehouse cluster can consume tens of thousands in credits overnight.
              </p>
            </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: 2 * 0.1 }}>
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-3">
              <AlertOctagon className="h-6 w-6 text-rose-400" />
              <h4 className="text-base font-bold text-white">Multi-Tenant Security Exposure</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Data resides in vendor-managed infrastructure rather than inside your own isolated AWS VPC, creating InfoSec compliance hurdles.
              </p>
            </div>
            </motion.div>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-white/10">
            <span className="text-xs text-slate-400">
              Switch back to the IOMETE Lakehouse model to see how open Apache Iceberg solves this.
            </span>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setSelectedArch("iomete")}
            >
              Switch to IOMETE Architecture
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
