"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
  Database,
  Cpu,
  Lock,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  Server,
  BarChart3,
  Users,
  Compass,
  MonitorPlay,
  Calculator,
  Swords,
  GraduationCap,
} from "lucide-react";
import { ScrollReveal } from "@/components/common/ScrollReveal";

export default function HomePage() {
  const scrollToExplore = () => {
    const el = document.getElementById("value-proposition");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-16 lg:space-y-24">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 text-white p-8 sm:p-12 lg:p-16 border border-slate-800 shadow-2xl">
        {/* Subtle Background Mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-300 text-xs font-semibold"
          >
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>IOMETE DealBridge · Sales Companion</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]"
          >
            Make Your Data Work for You.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-cyan-200">
              Without Losing Control.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-base sm:text-xl text-slate-300 leading-relaxed font-normal max-w-2xl"
          >
            Discover how IOMETE helps organizations build a modern, sovereign data lakehouse with control over their infrastructure, data and analytics workloads.
          </motion.p>

          {/* 2 Clear CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <Link
              href="/why-iomete"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-sky-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <button
              onClick={scrollToExplore}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white border border-white/15 font-semibold text-sm backdrop-blur-sm transition-all"
            >
              <span>Know More About IOMETE</span>
              <ChevronRight className="h-4 w-4 text-sky-400" />
            </button>

            <Link
              href="https://iomete.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors pl-2"
            >
              <span>Official Website</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
          </motion.div>
        </div>

        {/* High-Quality Enterprise Technology Visual (Data Flow to Lakehouse & Business Insights) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-10 pt-8 border-t border-slate-800/80"
        >
          <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-inner">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Sovereign Enterprise Architecture &amp; Insight Pipeline
              </span>
              <span className="text-[11px] text-cyan-400 font-mono bg-cyan-950/60 px-2.5 py-0.5 rounded-full border border-cyan-800/50">
                Customer-Controlled VPC Perimeter
              </span>
            </div>

            {/* Architecture Data Flow Diagram */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
              {/* Step 1: Data Sources */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-sky-400 font-semibold">
                  <Database className="h-4 w-4" />
                  <span>1. Business Sources</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Transactional DBs (Postgres, MySQL), REST APIs, application logs, and streaming events.
                </p>
                <div className="pt-1 flex flex-wrap gap-1">
                  <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[9px] font-mono">
                    PostgreSQL
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[9px] font-mono">
                    Kafka
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[9px] font-mono">
                    S3 Files
                  </span>
                </div>
              </div>

              {/* Step 2: Customer Storage & Iceberg */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-sky-800/40 space-y-2 relative">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                  <Layers className="h-4 w-4" />
                  <span>2. Apache Iceberg</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Open table format stored in customer-owned S3, ADLS Gen2, or MinIO with zero lock-in.
                </p>
                <div className="pt-1 flex flex-wrap gap-1">
                  <span className="px-1.5 py-0.5 rounded bg-sky-950 text-sky-300 text-[9px] font-mono">
                    ACID Snapshots
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-sky-950 text-sky-300 text-[9px] font-mono">
                    CMEK Encryption
                  </span>
                </div>
              </div>

              {/* Step 3: Decoupled Spark Engine */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-teal-400 font-semibold">
                  <Cpu className="h-4 w-4" />
                  <span>3. Decoupled Compute</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Auto-scaling Apache Spark clusters running inside your own VPC with automatic suspend.
                </p>
                <div className="pt-1 flex flex-wrap gap-1">
                  <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[9px] font-mono">
                    Auto-Suspend
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[9px] font-mono">
                    Zero Markups
                  </span>
                </div>
              </div>

              {/* Step 4: Business Insights & Teams */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-800/40 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <BarChart3 className="h-4 w-4" />
                  <span>4. Business Insights</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Sub-second SQL queries, BI dashboards, and AI workloads driving business decisions.
                </p>
                <div className="pt-1 flex flex-wrap gap-1">
                  <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[9px] font-mono">
                    ANSI SQL
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[9px] font-mono">
                    PowerBI / Tableau
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. Product Value Proposition & Architecture Strip (Factual & Verified) */}
      <section id="value-proposition" className="space-y-8 scroll-mt-24">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-sky-600">
              Core Principles
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              A Sovereign Lakehouse Built on Open Standards
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              IOMETE combines the flexibility of open-source Apache Iceberg and Spark with enterprise-grade catalog, governance, and SQL workspaces—deployed directly within your own cloud perimeter.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3 hover:shadow-md transition-shadow">
              <div className="h-10 w-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">
                Open Table Standard
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Stored in 100% open Apache Iceberg format. Full ACID transactions, schema evolution, and zero risk of proprietary vendor lock-in.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3 hover:shadow-md transition-shadow">
              <div className="h-10 w-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">
                Complete Data Sovereignty
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Deploy inside your AWS VPC, Azure VNet, GCP, or on-prem Kubernetes. Your data never leaves your infrastructure boundary.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3 hover:shadow-md transition-shadow">
              <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">
                Transparent Economics
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pay raw cloud infrastructure directly with zero credit markups. Automatic cluster suspension stops idle compute costs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3 hover:shadow-md transition-shadow">
              <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">
                Enterprise Governance
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Apache Ranger role-based access control, row/column masking, audit logging, and Customer-Managed Encryption Keys (CMEK).
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. Verified Technology Foundation Strip (No fake customer logos) */}
      <section className="p-6 sm:p-8 rounded-3xl bg-slate-100/70 border border-slate-200/80">
        <div className="text-center space-y-3">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Built on Battle-Tested Open Standards &amp; Enterprise Cloud
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 pt-2 text-slate-600 font-semibold text-xs sm:text-sm">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-sky-500" />
              Apache Iceberg
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-cyan-500" />
              Apache Spark
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-indigo-500" />
              Kubernetes
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-teal-500" />
              Apache Ranger
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              Standard ANSI SQL
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-slate-500" />
              S3 / ADLS / GCS Storage
            </span>
          </div>
        </div>
      </section>

      {/* 4. Sales Enablement Storytelling Pathways */}
      <section className="space-y-6">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-sky-600">
                Explore DealBridge
              </h2>
              <p className="text-2xl font-black text-slate-900 tracking-tight">
                Guided Evaluation Modules
              </p>
            </div>
            <Link
              href="/overview"
              className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1"
            >
              <span>View full workspace</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/why-iomete"
              className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-sky-300 hover:shadow-md transition-all group space-y-3"
            >
              <div className="h-9 w-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Sparkles className="h-4 w-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-sky-600 transition-colors">
                Why IOMETE?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Visual storytelling comparing traditional warehouse challenges to the modern sovereign lakehouse.
              </p>
              <span className="text-[11px] font-semibold text-sky-600 flex items-center gap-1 pt-1">
                Explore story <ChevronRight className="h-3 w-3" />
              </span>
            </Link>

            <Link
              href="/demo"
              className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-sky-300 hover:shadow-md transition-all group space-y-3"
            >
              <div className="h-9 w-9 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <MonitorPlay className="h-4 w-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-sky-600 transition-colors">
                Platform Tour &amp; Demo
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Walkthrough of the SQL editor, data catalog, lakehouses, Spark compute, and AI assistance.
              </p>
              <span className="text-[11px] font-semibold text-sky-600 flex items-center gap-1 pt-1">
                Tour platform <ChevronRight className="h-3 w-3" />
              </span>
            </Link>

            <Link
              href="/architecture"
              className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-sky-300 hover:shadow-md transition-all group space-y-3"
            >
              <div className="h-9 w-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Layers className="h-4 w-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-sky-600 transition-colors">
                Architecture Explorer
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Interactive React Flow diagram displaying decoupled compute, open storage, and governance.
              </p>
              <span className="text-[11px] font-semibold text-sky-600 flex items-center gap-1 pt-1">
                Explore diagram <ChevronRight className="h-3 w-3" />
              </span>
            </Link>

            <Link
              href="/learn"
              className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-sky-300 hover:shadow-md transition-all group space-y-3"
            >
              <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <GraduationCap className="h-4 w-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-sky-600 transition-colors">
                Learn from Experts
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Watch original video walkthroughs and product demos by Shyaamal Tripathi from IOMETE.
              </p>
              <span className="text-[11px] font-semibold text-sky-600 flex items-center gap-1 pt-1">
                Watch videos <ChevronRight className="h-3 w-3" />
              </span>
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
