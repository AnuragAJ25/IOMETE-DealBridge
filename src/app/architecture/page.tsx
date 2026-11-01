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
import { ArchitectureFlow } from "@/components/architecture/ArchitectureFlow";
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
    <div className="space-y-8 max-w-6xl mx-auto">
      <PageHeader
        title="Interactive Architecture Explorer"
        subtitle="Explore IOMETE's decoupled lakehouse architecture. Click nodes to inspect specifications, data flows, and security boundaries."
        badgeText="Conceptual System Design"
      />

      {/* Conceptual Architecture Disclaimer */}
      <div className="p-3.5 rounded-2xl bg-sky-50/80 border border-sky-200/80 flex items-center justify-between gap-3 text-xs text-sky-900">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-sky-600 shrink-0" />
          <span>
            <strong>Conceptual Architecture Illustration:</strong> Represents the decoupled logical design of IOMETE running in a customer VPC on open Apache Iceberg and Spark.
          </span>
        </div>
        <span className="text-[11px] font-mono text-sky-700 bg-sky-100/70 px-2.5 py-0.5 rounded-full border border-sky-200 shrink-0 hidden sm:inline">
          Customer VPC Perimeter
        </span>
      </div>

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
        <div className="space-y-6">
          <ArchitectureFlow />
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
