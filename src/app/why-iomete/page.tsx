"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
  Database,
  Cpu,
  Lock,
  Server,
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  Sparkles,
  ChevronRight,
  User,
  Users,
  Code2,
  Briefcase,
  HelpCircle,
  HardDrive,
  RefreshCw,
  Sliders,
  DollarSign,
  Activity,
} from "lucide-react";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { PageHeader } from "@/components/common/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function WhyIometePage() {
  const [selectedCharacterStep, setSelectedCharacterStep] = useState<number>(0);

  const characterJourney = [
    {
      step: 1,
      title: "The Problem",
      dataEngineer: {
        role: "Data Engineer (Maya)",
        quote: "Our data is trapped in proprietary formats. Every quarter our warehouse bills spike, and we spend half our sprint managing cluster idle timeouts and egress fees.",
        impact: "Frustrated by vendor lock-in & unpredictable compute spend",
      },
      decisionMaker: {
        role: "VP of Engineering (David)",
        quote: "Our InfoSec team is questioning third-party SaaS data retention, and finance wants predictable annual infrastructure costs without surprise credit bills.",
        impact: "Struggling with data sovereignty & spiraling warehouse costs",
      },
      diagram: "Siloed SaaS warehouses with opaque billing & strict vendor lock-in",
    },
    {
      step: 2,
      title: "Evaluating Open Standards",
      dataEngineer: {
        role: "Data Engineer (Maya)",
        quote: "We evaluated Apache Iceberg. Decoupling storage into our own S3 bucket gives us full ACID transactions and open access from Spark, Trino, and Python.",
        impact: "Discovers open table format flexibility & CMEK encryption",
      },
      decisionMaker: {
        role: "VP of Engineering (David)",
        quote: "If our data stays in our AWS/Azure VPC under our encryption keys, InfoSec signs off immediately. Now we need an enterprise platform to manage it without maintaining raw open source.",
        impact: "Demands private cloud deployment with managed enterprise catalog",
      },
      diagram: "Customer-controlled S3 bucket with Apache Iceberg open tables",
    },
    {
      step: 3,
      title: "Deploying IOMETE",
      dataEngineer: {
        role: "Data Engineer (Maya)",
        quote: "IOMETE deployed right into our Kubernetes cluster. We get a fast SQL editor, integrated catalog, auto-scaling Spark, and automatic cluster sleep with zero config overhead.",
        impact: "Builds high-performance pipelines in standard SQL and Spark",
      },
      decisionMaker: {
        role: "VP of Engineering (David)",
        quote: "We pay raw AWS EC2 rates directly with no credit markups. Our computing bill dropped significantly, and our data never leaves our security perimeter.",
        impact: "Achieves sovereign data governance with predictable, transparent TCO",
      },
      diagram: "IOMETE sovereign lakehouse running inside customer VPC",
    },
  ];

  return (
    <div className="space-y-16 max-w-6xl mx-auto">
      {/* Page Header */}
      <PageHeader
        title="Why IOMETE?"
        subtitle="A visual narrative comparing traditional managed warehouse challenges to the modern sovereign lakehouse."
        badgeText="Visual Storytelling"
      />

      {/* SECTION A: The Traditional Approach */}
      <section className="space-y-6">
        <ScrollReveal>
          <div className="border-l-4 border-amber-500 pl-4 space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
              Section A · The Status Quo
            </span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Common Challenges in Traditional Data Platforms
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
              Enterprise data teams often face structural trade-offs between managed convenience and operational control. These common friction points highlight why many teams consider a sovereign approach.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3">
              <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <DollarSign className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">
                Opaque Compute Economics
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Proprietary cloud warehouses apply significant credit markups on top of raw cloud compute. Running standard batch analytics or queries often incurs unpredictable consumption surges.
              </p>
              <div className="pt-2 text-[11px] text-amber-700 bg-amber-50 p-2 rounded-lg font-medium">
                ⚠️ Surprise month-end invoices &amp; idle cluster billing
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3">
              <div className="h-10 w-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">
                Data Sovereignty &amp; Egress
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Moving data into third-party multi-tenant SaaS environments introduces regulatory friction, cross-cloud egress fees, and complex third-party data retention audits.
              </p>
              <div className="pt-2 text-[11px] text-rose-700 bg-rose-50 p-2 rounded-lg font-medium">
                ⚠️ Compliance hurdles with GDPR, HIPAA &amp; financial mandates
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3">
              <div className="h-10 w-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
                <HardDrive className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">
                Proprietary Storage Lock-in
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Data stored in proprietary table formats cannot be easily read by external engines (Spark, Trino, Python) without paying high extraction compute or conversion costs.
              </p>
              <div className="pt-2 text-[11px] text-slate-700 bg-slate-100 p-2 rounded-lg font-medium">
                ⚠️ Expensive to switch or run external AI/ML tooling
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* SECTION B: Introducing IOMETE */}
      <section className="space-y-6">
        <ScrollReveal>
          <div className="border-l-4 border-sky-500 pl-4 space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
              Section B · The Modern Solution
            </span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Introducing IOMETE: The Sovereign Lakehouse
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
              IOMETE is a self-hosted data platform that combines open-source Apache Iceberg, Apache Spark, and Kubernetes into a unified, secure enterprise analytics platform.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-white to-sky-50/50 border border-sky-200/80 shadow-sm space-y-3">
              <div className="h-10 w-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center font-bold">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">
                Apache Iceberg Open Tables
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your data lives in standard Apache Iceberg format directly inside your own S3 or Blob bucket. Zero proprietary encapsulation. Queryable by any compatible tool.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-white to-cyan-50/50 border border-cyan-200/80 shadow-sm space-y-3">
              <div className="h-10 w-10 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center font-bold">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">
                Optimized Apache Spark
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Distributed query engine with automatic cluster scaling, sub-second query caching, and automated suspend after configurable inactivity.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-white to-emerald-50/50 border border-emerald-200/80 shadow-sm space-y-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                <Server className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">
                Kubernetes Native Deployment
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Deploys in minutes on AWS EKS, Azure AKS, Google GKE, or on-premises OpenShift/Kubernetes. Data never leaves your network perimeter.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-white to-indigo-50/50 border border-indigo-200/80 shadow-sm space-y-3">
              <div className="h-10 w-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                <Database className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">
                Enterprise Data Catalog
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Centralized metadata, schema exploration, table statistics, partition tracking, and data lineage directly accessible in the web UI.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-white to-purple-50/50 border border-purple-200/80 shadow-sm space-y-3">
              <div className="h-10 w-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                <Code2 className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">
                Collaborative SQL Editor
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Standard ANSI SQL query editor with auto-complete, saved queries, result visualizations, and seamless integration with BI tools (PowerBI, Tableau).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-white to-teal-50/50 border border-teal-200/80 shadow-sm space-y-3">
              <div className="h-10 w-10 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center font-bold">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">
                Fine-Grained Governance
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Apache Ranger role-based access control (RBAC), column masking, row-level filtering, and audit logging to satisfy stringent compliance requirements.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* SECTION C: Before vs After (Side-by-Side with Animated Flow) */}
      <section className="space-y-6">
        <ScrollReveal>
          <div className="border-l-4 border-emerald-500 pl-4 space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Section C · Comparison
            </span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Before vs. After: Architecture &amp; Operating Model
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
              Compare how the operating model transforms when transitioning from traditional managed platforms to the IOMETE sovereign lakehouse.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Before Card */}
            <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 space-y-5 shadow-lg">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-rose-500" />
                  Before: Traditional Managed Platform
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Multi-tenant SaaS</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-start gap-3">
                  <span className="text-rose-400 font-bold">✕</span>
                  <div>
                    <span className="font-semibold text-slate-200">Data Location:</span>
                    <p className="text-slate-400 text-[11px] mt-0.5">
                      Copied or ingested into third-party vendor storage clusters outside your VPC.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-start gap-3">
                  <span className="text-rose-400 font-bold">✕</span>
                  <div>
                    <span className="font-semibold text-slate-200">Storage Format:</span>
                    <p className="text-slate-400 text-[11px] mt-0.5">
                      Proprietary formats requiring vendor compute engines to read or extract.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-start gap-3">
                  <span className="text-rose-400 font-bold">✕</span>
                  <div>
                    <span className="font-semibold text-slate-200">Compute Pricing:</span>
                    <p className="text-slate-400 text-[11px] mt-0.5">
                      Proprietary credit consumption models with substantial markups over raw cloud costs.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-start gap-3">
                  <span className="text-rose-400 font-bold">✕</span>
                  <div>
                    <span className="font-semibold text-slate-200">Operational Perimeter:</span>
                    <p className="text-slate-400 text-[11px] mt-0.5">
                      Vendor controls updates, maintenance windows, and networking constraints.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* After Card: With IOMETE */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 text-white border border-sky-800/80 space-y-5 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Sparkles className="h-32 w-32 text-cyan-400" />
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-sky-800/60 relative z-10">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                  With IOMETE: Sovereign Lakehouse
                </span>
                <span className="text-[10px] text-cyan-300 font-mono bg-sky-900/60 px-2 py-0.5 rounded-full border border-sky-700">
                  Customer VPC
                </span>
              </div>

              <div className="space-y-3 text-xs relative z-10">
                <div className="p-3 rounded-xl bg-sky-950/60 border border-sky-700/50 flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">Data Location:</span>
                    <p className="text-sky-200/80 text-[11px] mt-0.5">
                      Your S3 / Blob storage in your private VPC. Data never leaves your perimeter.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-sky-950/60 border border-sky-700/50 flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">Storage Format:</span>
                    <p className="text-sky-200/80 text-[11px] mt-0.5">
                      100% open Apache Iceberg format. Directly queryable by Spark, Trino, Python, or AI.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-sky-950/60 border border-sky-700/50 flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">Compute Pricing:</span>
                    <p className="text-sky-200/80 text-[11px] mt-0.5">
                      Direct cloud compute cost with zero markup. Configurable auto-suspend stops idle spend.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-sky-950/60 border border-sky-700/50 flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">Operational Perimeter:</span>
                    <p className="text-sky-200/80 text-[11px] mt-0.5">
                      Self-hosted deployment on Kubernetes with complete operational control &amp; compliance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* SECTION D: Visual Storytelling with Characters */}
      <section className="space-y-6">
        <ScrollReveal>
          <div className="border-l-4 border-indigo-500 pl-4 space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Section D · Team Storytelling
            </span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              The Journey to a Sovereign Lakehouse
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
              Follow Maya (Data Engineer) and David (VP of Engineering) through their journey from data platform friction to a modern lakehouse workflow.
            </p>
          </div>
        </ScrollReveal>

        {/* Step Selector Buttons */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          {characterJourney.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCharacterStep(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCharacterStep === idx
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Step {step.step}: {step.title}
            </button>
          ))}
        </div>

        {/* Character Dialogue & Journey Card */}
        <ScrollReveal delay={0.1}>
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                  Stage {selectedCharacterStep + 1} of 3
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  {characterJourney[selectedCharacterStep].title}
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-mono px-3 py-1 bg-slate-100 rounded-lg">
                {characterJourney[selectedCharacterStep].diagram}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Character 1: Data Engineer (Maya) */}
              <div className="p-5 rounded-2xl bg-sky-50/60 border border-sky-100 space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold">
                    <Code2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">
                      {characterJourney[selectedCharacterStep].dataEngineer.role}
                    </h4>
                    <span className="text-[10px] text-sky-700 font-medium">
                      Technical Practitioner
                    </span>
                  </div>
                </div>
                <blockquote className="text-xs text-slate-700 italic leading-relaxed pl-2 border-l-2 border-sky-300">
                  &ldquo;{characterJourney[selectedCharacterStep].dataEngineer.quote}&rdquo;
                </blockquote>
                <div className="text-[11px] font-semibold text-sky-800 bg-white/80 p-2 rounded-lg border border-sky-200/60">
                  Key Focus: {characterJourney[selectedCharacterStep].dataEngineer.impact}
                </div>
              </div>

              {/* Character 2: Decision Maker (David) */}
              <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                    <Briefcase className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">
                      {characterJourney[selectedCharacterStep].decisionMaker.role}
                    </h4>
                    <span className="text-[10px] text-indigo-700 font-medium">
                      Business &amp; Infrastructure Leader
                    </span>
                  </div>
                </div>
                <blockquote className="text-xs text-slate-700 italic leading-relaxed pl-2 border-l-2 border-indigo-300">
                  &ldquo;{characterJourney[selectedCharacterStep].decisionMaker.quote}&rdquo;
                </blockquote>
                <div className="text-[11px] font-semibold text-indigo-800 bg-white/80 p-2 rounded-lg border border-indigo-200/60">
                  Key Focus: {characterJourney[selectedCharacterStep].decisionMaker.impact}
                </div>
              </div>
            </div>

            {/* Progression CTA */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-slate-500">
                A human sales representative walks both technical and executive stakeholders through this journey.
              </span>
              <div className="flex items-center gap-3">
                <Link
                  href="/architecture"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
                >
                  <span>Explore Architecture</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 text-xs font-semibold transition-colors"
                >
                  <span>See Live Tour</span>
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
