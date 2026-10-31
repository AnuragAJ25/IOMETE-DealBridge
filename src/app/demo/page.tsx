"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePresentation } from "@/context/PresentationContext";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionHeader } from "@/components/common/SectionHeader";
import { VideoCard } from "@/components/common/VideoCard";
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
  const { sessionData } = usePresentation();
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(true);
  const [queryDuration, setQueryDuration] = useState("412ms");

  // Cluster auto-scaling simulator state
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
      dataScanned: "2.1 GB (Parquet vectorized)",
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
      dataScanned: "48 MB (Zero-Copy metadata)",
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

  // Calculate simulated active cluster nodes based on concurrency load
  const activeNodes = Math.max(2, Math.min(16, Math.ceil(concurrencyLoad / 4)));
  const clusterCores = activeNodes * 8;
  const clusterRamGB = activeNodes * 32;

  return (
    <motion.div className="space-y-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <PageHeader
        badge="Stage 3 of 7 • Platform Demo"
        badgeVariant="default"
        title="Live Platform Tour & Feature Demonstration"
        subtitle="Experience sub-second Spark SQL execution directly on Apache Iceberg with automated cluster scaling."
        breadcrumbs={[{ label: "DealBridge", href: "/" }, { label: "Demo" }]}
        actions={
          <div className="flex items-center gap-2">
            <Link href="/security">
              <Button variant="primary" size="sm">
                <span>Next: Security & Trust</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        }
      />

      {/* Personalized Industry Scenarios */}
      <IndustryDemoScenarios />

      {/* AI Demo Journey Personalizer */}
      <AIDemoPersonalizer />

      {/* Interactive SQL Workbench Simulator */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        {/* Header bar */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400 border border-sky-400/30">
              <Terminal className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider">
                  Interactive SQL Studio
                </span>
                <Badge variant="success" size="sm">
                  Catalog: fin_lakehouse
                </Badge>
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Live Query Execution Engine
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs">
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
              isLoading={isRunning}
              className="shadow-md shadow-sky-500/30"
            >
              <Play className="h-4 w-4" />
              <span>Run Query</span>
            </Button>
          </div>
        </div>

        {/* Code Viewport */}
        <div className="p-4 sm:p-6 bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto border-b border-slate-800">
          <pre className="text-sky-300 leading-relaxed">{activePreset.sql}</pre>
        </div>

        {/* Query Telemetry & Results Table */}
        <div className="p-4 sm:p-6 space-y-4">
          {/* Telemetry pill row */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                <Clock className="h-3.5 w-3.5 text-sky-600" />
                <span>Execution Time: <strong className="text-emerald-600">{queryDuration}</strong></span>
              </span>
              <span className="text-slate-500">
                Data Scanned: <strong className="text-slate-800">{activePreset.dataScanned}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-500">{activePreset.expectedRows}</span>
              <Badge variant="success" size="sm">
                Iceberg Partition Pruned
              </Badge>
            </div>
          </div>

          {/* Results Table */}
          {hasRun && (
            <div className="overflow-x-auto border border-slate-200/80 rounded-xl">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 border-b border-slate-200/80 text-slate-600 uppercase font-semibold text-[10px] tracking-wider">
                  <tr>
                    {Object.keys(activePreset.results[0]).map((key) => (
                      <th key={key} className="p-3">
                        {key.replace("_", " ")}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {activePreset.results.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-50/60 transition-colors">
                      {Object.values(row).map((val, cIdx) => (
                        <td key={cIdx} className="p-3 text-slate-800 whitespace-nowrap">
                          {String(val)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Elastic Auto-Scaler Simulator */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Badge variant="indigo" size="sm">
              Cluster Compute Elasticity
            </Badge>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mt-1">
              Simulate Dynamic Auto-Scaling Under Query Concurrency
            </h3>
            <p className="text-xs text-slate-500">
              Move the slider to simulate burst traffic from Monday morning BI reporting runs.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-200/80 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                Active Nodes
              </span>
              <span className="text-base font-extrabold text-sky-600">{activeNodes} Workers</span>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                Cluster Resources
              </span>
              <span className="text-base font-bold text-slate-800">{clusterCores} Cores • {clusterRamGB} GB</span>
            </div>
          </div>
        </div>

        {/* Concurrency slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold text-slate-700">
            <span>Simulated Concurrent BI Users / Queries:</span>
            <span className="text-sky-600 font-bold">{concurrencyLoad} Concurrent Analysts</span>
          </div>
          <input
            type="range"
            min={1}
            max={60}
            step={1}
            value={concurrencyLoad}
            onChange={(e) => setConcurrencyLoad(Number(e.target.value))}
            className="w-full accent-sky-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>1 Query (Auto-suspend idle mode)</span>
            <span>30 Peak Load</span>
            <span>60 Heavy Burst (Max Scale)</span>
          </div>
        </div>

        {/* Visualized worker node grid */}
        <div className="pt-2">
          <span className="text-xs font-semibold text-slate-500 block mb-2">
            Active Apache Spark Worker Fleet:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {Array.from({ length: 16 }).map((_, idx) => {
              const isNodeActive = idx < activeNodes;
              return (
                <motion.div
                  key={idx}
                  animate={{
                    scale: isNodeActive ? 1 : 0.95,
                    opacity: isNodeActive ? 1 : 0.4,
                  }}
                  transition={{ duration: 0.2, delay: idx * 0.02 }}
                  className={`p-3 rounded-xl border text-center ${
                    isNodeActive
                      ? "bg-sky-50 border-sky-300 text-sky-900 shadow-xs"
                      : "bg-slate-50/50 border-slate-200/50 text-slate-300 opacity-40"
                  }`}
                >
                  <Cpu className={`h-4 w-4 mx-auto mb-1 ${isNodeActive ? "text-sky-600" : "text-slate-300"}`} />
                  <span className="text-[10px] font-bold block">Node {idx + 1}</span>
                  <span className="text-[9px] block text-slate-400">
                    {isNodeActive ? "Online" : "Idle"}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Video Platform Tour Component */}
      <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
      <div className="space-y-4">
        <SectionHeader
          title="Guided Product Video & Feature Walkthrough"
          description="High-definition walkthrough of the lakehouse user experience and administrative console."
          icon={<Zap className="h-4 w-4" />}
        />

        <VideoCard
          title="IOMETE Enterprise Data Platform Overview"
          description="Watch how data engineers create Iceberg tables, configure auto-scaling Spark clusters, and connect Tableau dashboards in under 3 minutes."
          duration="4:15"
          category="Architectural Walkthrough"
        />
      </div>
      </motion.div>
    </motion.div>
  );
}
