"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Database,
  Globe,
  FileCode,
  Activity,
  Layers,
  Cpu,
  Server,
  ShieldCheck,
  BarChart3,
  Bot,
  Share2,
  Terminal,
  Zap,
  Sparkles,
  Cloud,
  CheckCircle2,
  HardDrive,
} from "lucide-react";

export function HeroArchitectureVisual() {
  const [activeHover, setActiveHover] = useState<string | null>(null);

  const inputs = [
    { id: "db", label: "Databases", desc: "Postgres, MySQL, Oracle", icon: <Database className="h-4 w-4 text-cyan-400" /> },
    { id: "api", label: "Applications & APIs", desc: "SaaS, REST, Microservices", icon: <Globe className="h-4 w-4 text-sky-400" /> },
    { id: "files", label: "Files & Streams", desc: "Parquet, CSV, Kafka, Logs", icon: <FileCode className="h-4 w-4 text-teal-400" /> },
    { id: "analytics", label: "Analytics Data", desc: "Historical & Event Telemetry", icon: <Activity className="h-4 w-4 text-blue-400" /> },
  ];

  const outputs = [
    { id: "sql", label: "SQL & Analytics", desc: "Sub-second interactive queries", icon: <Terminal className="h-4 w-4 text-cyan-400" /> },
    { id: "bi", label: "BI & Dashboards", desc: "Tableau, PowerBI, Superset", icon: <BarChart3 className="h-4 w-4 text-emerald-400" /> },
    { id: "aiml", label: "AI/ML Workloads", desc: "PySpark, Python, LLM Queries", icon: <Bot className="h-4 w-4 text-purple-400" /> },
    { id: "products", label: "Data Products", desc: "Zero-copy sharing & APIs", icon: <Share2 className="h-4 w-4 text-sky-400" /> },
  ];

  return (
    <div className="relative w-full rounded-3xl bg-slate-950/90 border border-cyan-500/30 p-5 sm:p-7 shadow-[0_0_50px_-10px_rgba(6,182,212,0.25)] overflow-hidden backdrop-blur-xl">
      {/* Background Radial Glow & Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.12),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#082f4915_1px,transparent_1px),linear-gradient(to_bottom,#082f4915_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Top Header Bar */}
      <div className="relative z-10 flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-bold tracking-wider uppercase text-cyan-300">
            Sovereign Lakehouse Architecture
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-[10px] font-mono text-cyan-300">
          <Zap className="h-3 w-3 text-cyan-400 animate-bounce" />
          <span>Continuous Data Flow</span>
        </div>
      </div>

      {/* 3-Column Visual Flow on Desktop / Stacked on Mobile */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* LEFT COLUMN: INPUTS (3 cols on desktop) */}
        <div className="lg:col-span-3 space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Inputs · Data Sources
            </span>
            <span className="text-[9px] text-cyan-400 font-mono">Continuous</span>
          </div>

          <div className="space-y-2">
            {inputs.map((item) => (
              <motion.div
                key={item.id}
                onHoverStart={() => setActiveHover(item.id)}
                onHoverEnd={() => setActiveHover(null)}
                whileHover={{ scale: 1.02, x: 2 }}
                className={`p-2.5 rounded-xl border transition-all text-left flex items-center gap-2.5 ${
                  activeHover === item.id
                    ? "bg-slate-900 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                    : "bg-slate-900/80 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 shrink-0">
                  {item.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-slate-200 truncate">
                    {item.label}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {item.desc}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* MIDDLE COLUMN: IOMETE PLATFORM HUB (6 cols on desktop) */}
        <div className="lg:col-span-6 relative my-2 lg:my-0">
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/95 to-sky-950/80 border-2 border-cyan-400/60 shadow-[0_0_35px_rgba(6,182,212,0.25)] space-y-4 text-center relative overflow-hidden">
            {/* Subtle light sweep reflection */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-400/10 rounded-full blur-2xl pointer-events-none" />

            {/* IOMETE Header */}
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold">
                <Layers className="h-3.5 w-3.5 text-cyan-400" />
                <span>IOMETE Data Platform</span>
              </div>
              <h4 className="text-base sm:text-lg font-black tracking-tight text-white">
                Decoupled Storage &amp; Compute
              </h4>
              <p className="text-[11px] text-slate-300 max-w-sm mx-auto leading-relaxed">
                Operates inside your private network boundary with complete data sovereignty and zero credit markups.
              </p>
            </div>

            {/* Internal Core Capabilities */}
            <div className="grid grid-cols-2 gap-2 text-left pt-1">
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
                  <Terminal className="h-3 w-3 text-cyan-400" />
                  <span>SQL &amp; Lakehouse Catalog</span>
                </div>
                <p className="text-[9px] text-slate-400 leading-tight">
                  REST catalog, ACID transactions, table metadata &amp; query caching.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
                  <ShieldCheck className="h-3 w-3 text-emerald-400" />
                  <span>Ranger Governance</span>
                </div>
                <p className="text-[9px] text-slate-400 leading-tight">
                  Fine-grained RBAC, column masking, and Customer-Managed KMS keys.
                </p>
              </div>
            </div>

            {/* Technology Foundation Pill Strip */}
            <div className="pt-2 border-t border-slate-800 space-y-1.5">
              <span className="text-[9px] font-bold uppercase tracking-wider text-cyan-400 block">
                Open-Source Technology Foundation
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] font-semibold text-slate-300">
                <span className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 flex items-center gap-1">
                  <Layers className="h-2.5 w-2.5 text-teal-400" />
                  Apache Iceberg
                </span>
                <span className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 flex items-center gap-1">
                  <Cpu className="h-2.5 w-2.5 text-cyan-400" />
                  Apache Spark
                </span>
                <span className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 flex items-center gap-1">
                  <Server className="h-2.5 w-2.5 text-indigo-400" />
                  Kubernetes
                </span>
              </div>
            </div>

            {/* Deployment Models Strip */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 px-1">
              <span className="font-semibold text-slate-300">Deployment:</span>
              <div className="flex items-center gap-2 text-cyan-300 font-mono">
                <span>On-Premises</span>
                <span>•</span>
                <span>Private Cloud</span>
                <span>•</span>
                <span>Public Cloud (VPC)</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: OUTPUTS (3 cols on desktop) */}
        <div className="lg:col-span-3 space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Outputs · Workloads
            </span>
            <span className="text-[9px] text-cyan-400 font-mono">Business Value</span>
          </div>

          <div className="space-y-2">
            {outputs.map((item) => (
              <motion.div
                key={item.id}
                onHoverStart={() => setActiveHover(item.id)}
                onHoverEnd={() => setActiveHover(null)}
                whileHover={{ scale: 1.02, x: -2 }}
                className={`p-2.5 rounded-xl border transition-all text-left flex items-center gap-2.5 ${
                  activeHover === item.id
                    ? "bg-slate-900 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                    : "bg-slate-900/80 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 shrink-0">
                  {item.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-slate-200 truncate">
                    {item.label}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {item.desc}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Conceptual Disclaimer */}
      <div className="relative z-10 mt-4 pt-3 border-t border-slate-800/70 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="h-3 w-3 text-cyan-400" />
          <span>Customer-managed object storage (S3/ADLS/GCS) with zero data egress penalty</span>
        </span>
        <span className="text-slate-400 italic">
          *Conceptual platform architecture illustration
        </span>
      </div>
    </div>
  );
}
