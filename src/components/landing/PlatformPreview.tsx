"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  Sparkles,
  Users,
  User,
  Laptop,
  CheckCircle2,
  DollarSign,
  TrendingDown,
  Lock,
  Cpu,
  Database,
  ArrowRight,
  ShieldCheck,
  Play,
  Activity,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function PlatformPreview({
  onLaunchMeeting,
  onExploreMore,
}: {
  onLaunchMeeting?: () => void;
  onExploreMore?: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"sync" | "architecture" | "tco">("sync");
  const [activeLayer, setActiveLayer] = useState<string>("iceberg");
  const [previewSpend, setPreviewSpend] = useState<number>(45000);

  const previewAnnualSpend = previewSpend * 12;
  const previewSavings = Math.round(previewAnnualSpend * 0.684);

  return (
    <div className="rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden text-white">
      {/* Top Browser / Window Header */}
      <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-xs font-mono text-slate-400 ml-2">
            iomete-sales-companion.internal • Live Meeting Canvas
          </span>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab("sync")}
            className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
              activeTab === "sync"
                ? "bg-sky-500 text-white shadow-xs"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Live Dual-Sync
          </button>
          <button
            onClick={() => setActiveTab("architecture")}
            className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
              activeTab === "architecture"
                ? "bg-sky-500 text-white shadow-xs"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Lakehouse Topology
          </button>
          <button
            onClick={() => setActiveTab("tco")}
            className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
              activeTab === "tco"
                ? "bg-sky-500 text-white shadow-xs"
                : "text-slate-400 hover:text-white"
            }`}
          >
            TCO Simulator
          </button>
        </div>
      </div>

      {/* Main Interactive Canvas */}
      <div className="p-6 sm:p-8 min-h-[420px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          {activeTab === "sync" && (
            <motion.div
              key="sync"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                    Dual-Role Synchronization
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    Seller Drives The Story. Buyer Explores In Real-Time.
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Sub-100ms Telemetry Sync</span>
                </div>
              </div>

              {/* Split Screen Mockup */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Seller Side */}
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-sky-400" />
                      <span className="text-xs font-bold text-sky-300">Seller HUD (Private)</span>
                    </div>
                    <Badge variant="indigo" size="sm">
                      Stage 2 of 7
                    </Badge>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                      <span className="text-[10px] font-bold text-sky-400 uppercase">
                        Teleprompter Script
                      </span>
                      <p className="text-slate-300 leading-relaxed text-[11px]">
                        &ldquo;Alex, notice how IOMETE decouples your existing S3 storage from
                        vectorized Spark compute. Your data never leaves your VPC perimeter.&rdquo;
                      </p>
                    </div>

                    <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 text-[11px] flex items-center justify-between">
                      <span>Buyer Input Received:</span>
                      <span className="font-bold text-white">120 TB Iceberg selected</span>
                    </div>
                  </div>
                </div>

                {/* Buyer Side */}
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-emerald-400" />
                      <span className="text-xs font-bold text-emerald-300">
                        Buyer Interactive Sandbox
                      </span>
                    </div>
                    <Badge variant="success" size="sm">
                      Live Client View
                    </Badge>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-slate-400">Simulate Monthly Spend</span>
                        <span className="font-bold text-sky-400">$45,000/mo</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-sky-500 to-emerald-400 w-3/5" />
                      </div>
                      <div className="flex justify-between text-[10px] text-emerald-400 font-semibold">
                        <span>Projected Annual Savings:</span>
                        <span>$369,360 / year</span>
                      </div>
                    </div>

                    <div className="p-2 rounded-lg bg-sky-950/40 border border-sky-800/60 text-sky-300 text-[11px] flex items-center justify-between">
                      <span>Current Status:</span>
                      <span className="font-medium text-slate-200">
                        Inspecting Ranger RBAC Masking
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "architecture" && (
            <motion.div
              key="architecture"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                    Modern Decoupled Lakehouse
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    Open Apache Iceberg Storage + Elastic Spark Compute
                  </h3>
                </div>
                <span className="text-xs text-slate-400">
                  Click any tier to inspect specifications
                </span>
              </div>

              {/* Architecture Tier Stacks */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                {[
                  {
                    id: "storage",
                    title: "1. Customer S3 / Blob",
                    desc: "100% Customer Cloud Storage. Zero data movement outside VPC.",
                    tag: "Storage Layer",
                    icon: <Database className="h-4 w-4 text-sky-400" />,
                  },
                  {
                    id: "iceberg",
                    title: "2. Apache Iceberg",
                    desc: "Open table format. ACID transactions & automated compaction.",
                    tag: "Open Standard",
                    icon: <Layers className="h-4 w-4 text-teal-400" />,
                  },
                  {
                    id: "compute",
                    title: "3. Vectorized Spark",
                    desc: "Sub-second SQL queries with automatic cluster auto-suspension.",
                    tag: "Compute Layer",
                    icon: <Cpu className="h-4 w-4 text-indigo-400" />,
                  },
                  {
                    id: "governance",
                    title: "4. Apache Ranger",
                    desc: "Fine-grained column masking and row filtering in customer VPC.",
                    tag: "Governance",
                    icon: <ShieldCheck className="h-4 w-4 text-emerald-400" />,
                  },
                ].map((tier) => {
                  const isSelected = activeLayer === tier.id;
                  return (
                    <div
                      key={tier.id}
                      onClick={() => setActiveLayer(tier.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-slate-800 border-sky-400 shadow-lg shadow-sky-500/10 scale-[1.02]"
                          : "bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        {tier.icon}
                        <Badge variant="outline" size="sm">
                          {tier.tag}
                        </Badge>
                      </div>
                      <h4 className="font-bold text-white text-xs">{tier.title}</h4>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                        {tier.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Layer Deep-Dive Banner */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-emerald-400" />
                  <span className="text-slate-300">
                    Active Inspection:{" "}
                    <strong className="text-white capitalize">{activeLayer} tier</strong>. Verified
                    compatible with AWS KMS CMEK &amp; SOC2 Type II.
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "tco" && (
            <motion.div
              key="tco"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Live Economic Proof
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    Interactive 3-Year Cloud Budget Projection
                  </h3>
                </div>
                <span className="text-xs text-slate-400">
                  Slide to adjust hypothetical monthly cloud spend
                </span>
              </div>

              {/* Slider Control */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-medium">
                    Current Monthly Cloud Warehouse Bill
                  </span>
                  <span className="font-bold text-sky-400 text-sm">
                    ${previewSpend.toLocaleString()}/mo
                  </span>
                </div>
                <input
                  type="range"
                  min={15000}
                  max={150000}
                  step={5000}
                  value={previewSpend}
                  onChange={(e) => setPreviewSpend(Number(e.target.value))}
                  className="w-full accent-sky-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>$15k/mo</span>
                  <span>$75k/mo</span>
                  <span>$150k/mo</span>
                </div>
              </div>

              {/* Comparison Numbers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
                    Legacy Warehouse Annual Cost
                  </span>
                  <span className="text-lg font-bold text-slate-300">
                    ${(previewAnnualSpend / 1000).toFixed(0)}k/year
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] uppercase tracking-wider text-sky-400 block">
                    IOMETE Projected Cost
                  </span>
                  <span className="text-lg font-bold text-sky-300">
                    ${((previewAnnualSpend - previewSavings) / 1000).toFixed(0)}k/year
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/60">
                  <span className="text-[10px] uppercase tracking-wider text-emerald-400 block">
                    Projected Annual Savings
                  </span>
                  <span className="text-lg font-extrabold text-emerald-300">
                    ${(previewSavings / 1000).toFixed(0)}k/year
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom CTA Bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>Tested on real enterprise data sets with up to 100M+ Iceberg rows</span>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              size="sm"
              onClick={onLaunchMeeting}
              className="shadow-md shadow-sky-500/20"
            >
              <Play className="h-3.5 w-3.5 mr-1" />
              <span>Launch Live Presentation</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

