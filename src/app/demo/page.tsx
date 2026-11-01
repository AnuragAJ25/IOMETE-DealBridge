"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { PageHeader } from "@/components/common/PageHeader";
import { IndustryDemoScenarios } from "@/components/demo/IndustryDemoScenarios";
import { AIDemoPersonalizer } from "@/components/demo/AIDemoPersonalizer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Play,
  Terminal,
  Database,
  Cpu,
  Zap,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Sliders,
  Layers,
  Table,
  HardDrive,
  FileCode,
  ShieldCheck,
  Bot,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

interface QueryPreset {
  name: string;
  sql: string;
  expectedRows: string;
  expectedTime: string;
  dataScanned: string;
  results: { [key: string]: string | number }[];
}

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "sql" | "catalog" | "lakehouses" | "spark" | "ai"
  >("overview");

  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(true);
  const [queryDuration, setQueryDuration] = useState("412ms");
  const [concurrencyLoad, setConcurrencyLoad] = useState(15);

  const queryPresets: QueryPreset[] = [
    {
      name: "High-Volume Transaction Aggregation",
      sql: `SELECT 
    DATE_TRUNC('month', transaction_ts) AS month,
    account_tier,
    COUNT(1) AS transaction_count,
    ROUND(SUM(amount_usd), 2) AS total_volume_usd,
    ROUND(AVG(latency_ms), 1) AS avg_gateway_latency
FROM fin_lakehouse.iceberg_transactions
WHERE transaction_ts >= CURRENT_DATE - INTERVAL '12 months'
GROUP BY 1, 2
ORDER BY 1 DESC, 4 DESC;`,
      expectedRows: "128,450,290 rows scanned",
      expectedTime: "412ms",
      dataScanned: "2.1 GB (vectorized)",
      results: [
        { month: "2026-10", account_tier: "Enterprise Tier 1", transaction_count: 14205000, total_volume_usd: "$184,209,400", avg_gateway_latency: "14.2ms" },
        { month: "2026-10", account_tier: "Growth SME", transaction_count: 8490200, total_volume_usd: "$64,102,900", avg_gateway_latency: "15.8ms" },
        { month: "2026-09", account_tier: "Enterprise Tier 1", transaction_count: 13980100, total_volume_usd: "$179,840,100", avg_gateway_latency: "14.1ms" },
        { month: "2026-09", account_tier: "Growth SME", transaction_count: 8120400, total_volume_usd: "$61,400,200", avg_gateway_latency: "16.0ms" },
      ],
    },
    {
      name: "Time-Travel Snapshot Auditing (Iceberg)",
      sql: `SELECT 
    user_id,
    compliance_status,
    risk_score,
    snapshot_timestamp
FROM fin_lakehouse.kyc_records
FOR SYSTEM_TIME AS OF '2026-09-01 00:00:00'
WHERE risk_score > 85;`,
      expectedRows: "450,000 historical snapshots",
      expectedTime: "280ms",
      dataScanned: "48 MB (Iceberg metadata)",
      results: [
        { user_id: "usr_9921_x", compliance_status: "Pending Re-audit", risk_score: 91, snapshot_timestamp: "2026-08-31 23:59:58" },
        { user_id: "usr_4012_a", compliance_status: "Escalated Tier 3", risk_score: 88, snapshot_timestamp: "2026-08-31 23:58:12" },
      ],
    },
  ];

  const activePreset = queryPresets[selectedPresetIndex];

  const handleRunQuery = () => {
    setIsRunning(true);
    setHasRun(false);
    setTimeout(() => {
      setIsRunning(false);
      setHasRun(true);
      setQueryDuration(activePreset.expectedTime);
    }, 450);
  };

  const activeNodes = Math.max(2, Math.min(16, Math.ceil(concurrencyLoad / 4)));
  const clusterCores = activeNodes * 8;
  const clusterRamGB = activeNodes * 32;

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      {/* Header */}
      <PageHeader
        title="Product Walkthrough & Tour"
        subtitle="Explore IOMETE's core modules: SQL Editor, Data Catalog, Lakehouses, Spark Compute, and AI workflows."
        badgeText="Interactive Tour"
      />

      {/* Illustrative Simulation Notice */}
      <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-3 text-xs text-amber-800">
        <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Illustrative Product Tour:</span>
          <p className="text-amber-700 text-[11px] mt-0.5 leading-relaxed">
            These interactive demonstrations simulate typical IOMETE platform experiences, sub-second query execution, and cluster scaling metrics. Queries execute against illustrative sample datasets without modifying live customer environments.
          </p>
        </div>
      </div>

      {/* Module Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-200 text-xs font-semibold">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === "overview"
              ? "bg-slate-900 text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Layers className="h-4 w-4" />
          <span>Platform Overview</span>
        </button>

        <button
          onClick={() => setActiveTab("sql")}
          className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === "sql"
              ? "bg-slate-900 text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Terminal className="h-4 w-4" />
          <span>SQL Editor</span>
        </button>

        <button
          onClick={() => setActiveTab("catalog")}
          className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === "catalog"
              ? "bg-slate-900 text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Database className="h-4 w-4" />
          <span>Data Catalog</span>
        </button>

        <button
          onClick={() => setActiveTab("lakehouses")}
          className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === "lakehouses"
              ? "bg-slate-900 text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <HardDrive className="h-4 w-4" />
          <span>Lakehouses</span>
        </button>

        <button
          onClick={() => setActiveTab("spark")}
          className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === "spark"
              ? "bg-slate-900 text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Cpu className="h-4 w-4" />
          <span>Spark Jobs &amp; Scaling</span>
        </button>

        <button
          onClick={() => setActiveTab("ai")}
          className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === "ai"
              ? "bg-slate-900 text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Sparkles className="h-4 w-4" />
          <span>AI &amp; Industry Demos</span>
        </button>
      </div>

      {/* Tab 1: Platform Overview */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900">
              The Unified IOMETE Workspace
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
              IOMETE unifies the data team around customer-owned object storage. Data engineers build automated Spark pipelines, analysts execute ANSI SQL queries in sub-second speeds, and governance teams manage fine-grained access policies through Apache Ranger.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
              <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-100 space-y-1.5">
                <span className="font-bold text-sky-900">1. Open Table Foundation</span>
                <p className="text-sky-700 text-[11px] leading-relaxed">
                  Tables stored on Apache Iceberg in customer-managed S3/ADLS/GCS buckets with full snapshot history.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-cyan-50/60 border border-cyan-100 space-y-1.5">
                <span className="font-bold text-cyan-900">2. Decoupled Spark Engine</span>
                <p className="text-cyan-700 text-[11px] leading-relaxed">
                  Distributed query clusters spin up and down dynamically without credit markups.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-1.5">
                <span className="font-bold text-indigo-900">3. Sovereign Security</span>
                <p className="text-indigo-700 text-[11px] leading-relaxed">
                  Deployed inside your VPC with Apache Ranger RBAC and Customer-Managed Encryption Keys.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: SQL Editor */}
      {activeTab === "sql" && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden space-y-0">
          <div className="p-4 sm:p-5 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400 border border-sky-400/30">
                <Terminal className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider block">
                  Interactive SQL Studio (Simulated)
                </span>
                <h3 className="text-sm font-bold text-white tracking-tight">
                  Standard ANSI SQL Query Engine
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl text-xs">
                {queryPresets.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedPresetIndex(idx);
                      setHasRun(true);
                    }}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                      selectedPresetIndex === idx
                        ? "bg-sky-600 text-white shadow-xs"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Query {idx + 1}
                  </button>
                ))}
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={handleRunQuery}
                disabled={isRunning}
              >
                {isRunning ? (
                  <>
                    <RotateCcw className="h-3.5 w-3.5 mr-1 animate-spin" />
                    <span>Executing...</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5 mr-1 fill-current" />
                    <span>Run Query</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="p-4 sm:p-5 bg-slate-950 font-mono text-xs text-sky-200 border-y border-slate-800 overflow-x-auto">
            <pre className="whitespace-pre">{activePreset.sql}</pre>
          </div>

          {/* Results Table */}
          <div className="p-5 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Status: <strong className="text-emerald-600">Finished in {queryDuration}</strong></span>
              <span>Scanned: {activePreset.dataScanned}</span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
                  <tr>
                    {Object.keys(activePreset.results[0] || {}).map((col) => (
                      <th key={col} className="p-3 font-semibold uppercase text-[10px]">
                        {col.replace(/_/g, " ")}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {activePreset.results.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-50/80">
                      {Object.values(row).map((val, cIdx) => (
                        <td key={cIdx} className="p-3 font-mono text-[11px] text-slate-700">
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Data Catalog */}
      {activeTab === "catalog" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600">
                Metadata &amp; Schemas
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                Centralized Iceberg Data Catalog
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-mono bg-slate-100 px-3 py-1 rounded-lg">
              REST Catalog Protocol
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Table className="h-4 w-4 text-sky-600" />
                <span>fin_lakehouse.transactions</span>
              </div>
              <p className="text-slate-500 text-[11px]">
                Type: Iceberg v2 Table<br />
                Partitions: Month(transaction_ts)<br />
                Snapshots: 1,420 snapshots tracked
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Table className="h-4 w-4 text-sky-600" />
                <span>fin_lakehouse.kyc_records</span>
              </div>
              <p className="text-slate-500 text-[11px]">
                Type: Iceberg v2 Table<br />
                Security: Ranger column masking (SSN, Email)<br />
                Encryption: AWS KMS CMEK
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Table className="h-4 w-4 text-sky-600" />
                <span>analytics.customer_events</span>
              </div>
              <p className="text-slate-500 text-[11px]">
                Type: Iceberg Streaming Ingestion<br />
                Source: Kafka / Kinesis connector<br />
                Compaction: Automated background optimize
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Lakehouses */}
      {activeTab === "lakehouses" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900">
            Lakehouse Storage Connections
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
            IOMETE registers customer-owned object storage buckets without copying data. Storage remains 100% inside your cloud provider account under your IAM roles.
          </p>
          <div className="space-y-3 pt-2 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900">AWS S3 Sovereign Lakehouse</span>
                <p className="text-[11px] text-slate-500 font-mono mt-0.5">s3://my-enterprise-lakehouse-prod/iceberg-data/</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-semibold">
                Connected · VPC Endpoint
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900">Azure Data Lake Storage (ADLS Gen2)</span>
                <p className="text-[11px] text-slate-500 font-mono mt-0.5">abfss://iceberg@datalake.dfs.core.windows.net/</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-semibold">
                Connected · Private Link
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Spark Jobs & Scaling */}
      {activeTab === "spark" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600">
                Elastic Distributed Compute
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                Apache Spark Cluster Auto-Scaling Simulator
              </h3>
            </div>
            <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Auto-Suspend: 5 mins idle
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">Simulated Concurrent Queries:</span>
              <span className="font-mono font-bold text-sky-600">{concurrencyLoad} active users</span>
            </div>
            <input
              type="range"
              min="1"
              max="60"
              value={concurrencyLoad}
              onChange={(e) => setConcurrencyLoad(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Allocated Spark Nodes</span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">{activeNodes} worker pods</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Compute Power</span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">{clusterCores} vCPUs</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Distributed Memory</span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">{clusterRamGB} GB RAM</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 6: AI & Industry Scenarios */}
      {activeTab === "ai" && (
        <div className="space-y-8">
          <IndustryDemoScenarios />
          <AIDemoPersonalizer />
        </div>
      )}
    </div>
  );
}
