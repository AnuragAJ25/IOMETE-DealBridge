"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Cpu,
  Database,
  MonitorPlay,
  Compass,
  Calculator,
  Swords,
  GraduationCap,
  FileCheck,
  ChevronRight,
  CheckCircle2,
  Users,
  Presentation,
  BookOpen,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { usePresentation } from "@/context/PresentationContext";

export default function OverviewPage() {
  const { sessionData, stages } = usePresentation();

  const workspaceModules = [
    {
      title: "Why IOMETE?",
      route: "/why-iomete",
      category: "Narrative",
      icon: <Sparkles className="h-5 w-5 text-sky-500" />,
      desc: "Visual storytelling contrasting traditional SaaS warehouse trade-offs with the sovereign lakehouse.",
      highlights: ["Open Table Formats", "Customer VPC Control", "Maya & David Journey"],
    },
    {
      title: "Product Walkthrough & Demo",
      route: "/demo",
      category: "Interactive Tour",
      icon: <MonitorPlay className="h-5 w-5 text-cyan-500" />,
      desc: "Live simulated tour of the SQL editor, data catalog, lakehouses, Spark compute, and AI assistance.",
      highlights: ["ANSI SQL Editor", "5 Industry Scenarios", "AI Personalizer"],
    },
    {
      title: "Interactive Architecture Explorer",
      route: "/architecture",
      category: "System Design",
      icon: <Layers className="h-5 w-5 text-indigo-500" />,
      desc: "Visual React Flow diagram showing decoupled storage and compute with live animated data pipelines.",
      highlights: ["React Flow Diagram", "Decoupled Engine", "Right-panel Inspector"],
    },
    {
      title: "Industry Use Cases",
      route: "/use-cases",
      category: "Discovery",
      icon: <Compass className="h-5 w-5 text-teal-500" />,
      desc: "Five vertical business scenarios covering banking, retail, healthcare, manufacturing, and telecommunications.",
      highlights: ["Vertical Journeys", "Deterministic Finder", "Target Architectures"],
    },
    {
      title: "Pricing & Business Case Calculator",
      route: "/business-case",
      category: "Economics",
      icon: <Calculator className="h-5 w-5 text-amber-500" />,
      desc: "Transparent commercial evaluation modeling infrastructure costs based on customer-entered assumptions.",
      highlights: ["Zero Markup Compute", "Customer Assumptions", "TCO Modeling"],
    },
    {
      title: "Platform Comparison",
      route: "/competitors",
      category: "Market Context",
      icon: <Swords className="h-5 w-5 text-rose-500" />,
      desc: "Factual, source-cited comparison matrix for Snowflake, Databricks, BigQuery, and IOMETE.",
      highlights: ["Deployment Models", "Data Sovereignty", "Official Documentation Sources"],
    },
    {
      title: "Learn from the Experts",
      route: "/learn",
      category: "Media & Walkthroughs",
      icon: <GraduationCap className="h-5 w-5 text-purple-500" />,
      desc: "Immediate access to two original video walkthroughs and lakehouse demonstrations by Shyaamal Tripathi.",
      highlights: ["Platform Overview MP4", "Claude AI Exploration MP4", "LinkedIn References"],
    },
    {
      title: "Meeting Summary & Next Steps",
      route: "/meeting-summary",
      category: "Executive Close",
      icon: <FileCheck className="h-5 w-5 text-emerald-500" />,
      desc: "AI-generated executive recap, key buyer requirements, mutual action plan, and follow-up email draft.",
      highlights: ["Executive Brief", "Mutual Action Plan", "One-Click Email Draft"],
    },
  ];

  return (
    <div className="space-y-12 max-w-6xl mx-auto">
      {/* Page Header */}
      <PageHeader
        title="IOMETE DealBridge Workspace"
        subtitle="A human-led sales enablement platform. Guide potential customers through an interactive visual story to understand, evaluate, and buy IOMETE."
        badgeText="Sales Enablement Hub"
      />

      {/* Narrative Sales Journey Overview */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600">
              Guided Sales Methodology
            </span>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              The 7-Stage Customer Conversation Roadmap
            </h2>
          </div>
          <Link
            href="/meeting"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors shrink-0"
          >
            <Presentation className="h-3.5 w-3.5" />
            <span>Open Meeting Room</span>
          </Link>
        </div>

        {/* Stages Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {stages.slice(0, 4).map((stage, idx) => (
            <Link
              key={stage.id}
              href={stage.route}
              className="p-3.5 rounded-2xl bg-slate-50 hover:bg-sky-50 border border-slate-200/80 hover:border-sky-300 transition-colors space-y-1.5 group"
            >
              <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400 group-hover:text-sky-600">
                <span>Stage {stage.number}</span>
                <span>~{stage.durationMin}m</span>
              </div>
              <h3 className="font-bold text-slate-900 text-xs group-hover:text-sky-700">
                {stage.title}
              </h3>
              <p className="text-[11px] text-slate-500 leading-normal line-clamp-2">
                {stage.buyerFocus}
              </p>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
          {stages.slice(4).map((stage, idx) => (
            <Link
              key={stage.id}
              href={stage.route}
              className="p-3.5 rounded-2xl bg-slate-50 hover:bg-sky-50 border border-slate-200/80 hover:border-sky-300 transition-colors space-y-1.5 group"
            >
              <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400 group-hover:text-sky-600">
                <span>Stage {stage.number}</span>
                <span>~{stage.durationMin}m</span>
              </div>
              <h3 className="font-bold text-slate-900 text-xs group-hover:text-sky-700">
                {stage.title}
              </h3>
              <p className="text-[11px] text-slate-500 leading-normal line-clamp-2">
                {stage.buyerFocus}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Main Workspace Modules Grid */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
            Interactive Modules
          </span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Explore DealBridge Sales Modules
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Select any module to visually demonstrate IOMETE capabilities, architecture, and economics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workspaceModules.map((module) => (
            <Link
              key={module.route}
              href={module.route}
              className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-sky-300 transition-all group flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {module.icon}
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {module.category}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-sky-600 transition-colors">
                  {module.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {module.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2">
                <div className="flex flex-wrap gap-1">
                  {module.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="text-[9px] font-medium px-2 py-0.5 rounded-md bg-slate-50 text-slate-600"
                    >
                      {h}
                    </span>
                  ))}
                </div>
                <div className="flex items-center text-xs font-semibold text-sky-600 group-hover:text-sky-700 pt-1">
                  <span>Open module</span>
                  <ChevronRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
