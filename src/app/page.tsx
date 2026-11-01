"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
  Lock,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Server,
  Compass,
  MonitorPlay,
  GraduationCap,
  HardDrive,
  Database,
  CheckCircle2,
} from "lucide-react";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { HeroArchitectureVisual } from "@/components/landing/HeroArchitectureVisual";
import { EcosystemLogoCarousel } from "@/components/landing/EcosystemLogoCarousel";

export default function HomePage() {
  return (
    <div className="space-y-12 lg:space-y-16 -mt-2">
      {/* 1. HERO SECTION (Dark Navy Two-Column Layout) */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-[#0B132B] to-[#031B33] text-white p-6 sm:p-10 lg:p-14 border border-cyan-500/20 shadow-2xl">
        {/* Subtle Ambient Radial Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT COLUMN: Text, CTAs, and 3 Benefit Indicators (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Small Badge */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold backdrop-blur-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              <span>IOMETE DealBridge · Sales Companion</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.12]"
            >
              Build a Modern, Sovereign Data Lakehouse{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">
                with IOMETE
              </span>
            </motion.h1>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal"
            >
              Make your data work for you — on your infrastructure, with your data, and for your business needs.
            </motion.p>

            {/* Two Prominent Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3.5 pt-1"
            >
              {/* Button 1: Get Started -> /overview */}
              <Link
                href="/overview"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-sky-500 hover:from-cyan-300 hover:to-sky-400 text-slate-950 font-bold text-sm shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all hover:scale-[1.03] active:scale-[0.98]"
              >
                <span>Get Started</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              {/* Button 2: Know More About IOMETE -> https://iomete.com/ in new tab */}
              <a
                href="https://iomete.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white border border-slate-700 hover:border-cyan-400/50 font-semibold text-sm backdrop-blur-sm transition-all"
              >
                <span>Know More About IOMETE</span>
                <ExternalLink className="h-4 w-4 text-cyan-400" />
              </a>
            </motion.div>

            {/* Three Compact Benefit Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="pt-4 border-t border-slate-800/80 space-y-2.5 text-xs"
            >
              <div className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors group">
                <div className="p-1 rounded-md bg-cyan-950/80 border border-cyan-800/50 text-cyan-400 shrink-0 group-hover:scale-105 transition-transform">
                  <ShieldCheck className="h-3.5 w-3.5" />
                </div>
                <span className="font-medium">
                  <strong>Your Infrastructure, Your Control</strong> — deployed in your private cloud or on-prem.
                </span>
              </div>

              <div className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors group">
                <div className="p-1 rounded-md bg-teal-950/80 border border-teal-800/50 text-teal-400 shrink-0 group-hover:scale-105 transition-transform">
                  <Layers className="h-3.5 w-3.5" />
                </div>
                <span className="font-medium">
                  <strong>Open Data Formats</strong> — 100% Apache Iceberg standard with zero lock-in.
                </span>
              </div>

              <div className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors group">
                <div className="p-1 rounded-md bg-sky-950/80 border border-sky-800/50 text-sky-400 shrink-0 group-hover:scale-105 transition-transform">
                  <Server className="h-3.5 w-3.5" />
                </div>
                <span className="font-medium">
                  <strong>Flexible Deployment</strong> — On-Premises, Private Cloud, or Public Cloud (VPC).
                </span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: MAIN IOMETE ARCHITECTURE VISUAL (7 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-7 w-full"
          >
            <HeroArchitectureVisual />
          </motion.div>
        </div>
      </section>

      {/* 2. CUSTOMER / ECOSYSTEM LOGO CAROUSEL */}
      <EcosystemLogoCarousel />

      {/* 3. VALUE PROPOSITION HIGHLIGHTS */}
      <section className="space-y-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto space-y-2.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-sky-600">
              Platform Pillars
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              A Sovereign Lakehouse Built on Open Standards
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              IOMETE combines the power of Apache Iceberg and Spark with enterprise catalog, fine-grained access control, and sub-second SQL workspaces.
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
                Stored in 100% open Apache Iceberg format. Full ACID transactions, snapshot time-travel, and zero proprietary lock-in.
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
                Deploy inside your private AWS VPC, Azure VNet, GCP, or on-prem Kubernetes. Your data never leaves your security perimeter.
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
                Pay raw cloud infrastructure directly with zero credit markup. Dynamic cluster suspend eliminates idle compute spend.
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
                Apache Ranger role-based access control, row/column masking, audit logging, and Customer-Managed KMS Encryption Keys.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 4. GUIDED EVALUATION MODULES */}
      <section className="space-y-6">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-sky-600">
                Explore DealBridge
              </h2>
              <p className="text-2xl font-black text-slate-900 tracking-tight">
                Guided Sales Enablement Modules
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
                Visual storytelling comparing traditional warehouse challenges to the sovereign lakehouse.
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
                Tour the SQL editor, data catalog, lakehouses, Spark compute, and AI assistance.
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
