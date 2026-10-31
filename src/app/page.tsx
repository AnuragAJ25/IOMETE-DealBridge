"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { usePresentation } from "@/context/PresentationContext";
import {
  Layers,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  BarChart3,
  Database,
  Cpu,
  CheckCircle2,
  TrendingDown,
  Lock,
  Presentation,
  Play,
  FileSpreadsheet,
  Compass,
  Server,
  ArrowDown,
  Users,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressIndicator } from "@/components/common/ProgressIndicator";
import { FeatureCard } from "@/components/common/FeatureCard";
import { PlatformPreview } from "@/components/landing/PlatformPreview";
import { ProblemStorytelling } from "@/components/storytelling/ProblemStorytelling";
import { ProductIntroduction } from "@/components/storytelling/ProductIntroduction";
import { ScrollReveal } from "@/components/common/ScrollReveal";

export default function HomePage() {
  const router = useRouter();
  const { sessionData, role, setRole, goToStage } = usePresentation();

  const handleScrollToExplore = () => {
    const el = document.getElementById("explore-iomete");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-16">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 text-white p-8 sm:p-12 lg:p-16 border border-slate-800 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 text-xs font-semibold"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>IOMETE Sales Companion Platform</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]"
          >
            Make Complex Technology{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300">
              Easy to Understand, Evaluate &amp; Buy.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl"
          >
            A human-led, interactive sales enablement companion. A human seller tells the story,
            while the platform visually supports every statement with live architectures, real-time
            TCO calculations, and synchronized buyer exploration.
          </motion.p>

          {/* Active meeting snapshot banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-xs"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300">Target Buyer:</span>
            <span className="font-bold text-white">{sessionData.buyerCompany}</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">Contact:</span>
            <span className="font-medium text-slate-200">
              {sessionData.buyerName} ({sessionData.buyerRole})
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">Incumbent Stack:</span>
            <Badge variant="warning" size="sm">
              {sessionData.currentWarehouse}
            </Badge>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <Link href="/meeting">
              <Button size="lg" variant="primary" className="shadow-lg shadow-sky-500/25">
                <Play className="h-4 w-4 mr-1" />
                <span>Start a Buyer Meeting</span>
              </Button>
            </Link>

            <Button
              size="lg"
              variant="secondary"
              onClick={handleScrollToExplore}
              className="bg-white/10 hover:bg-white/20 text-white border-white/20 cursor-pointer"
            >
              <span>Explore IOMETE</span>
              <ArrowDown className="h-4 w-4 ml-1" />
            </Button>

            <Link href="/presenter">
              <Button size="lg" variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/5">
                <User className="h-4 w-4 mr-1 text-sky-400" />
                <span>Presenter Mode</span>
              </Button>
            </Link>

            <Link href="/buyer">
              <Button size="lg" variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/5">
                <Users className="h-4 w-4 mr-1 text-emerald-400" />
                <span>Buyer Sandbox</span>
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. Visual Preview of the Platform */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <Badge variant="indigo" size="sm">
              Interactive Platform Preview
            </Badge>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Engineered for High-Conviction Buyer Conversations
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md">
            Toggle between the live synchronization screen, decoupled lakehouse topology, and
            budget model simulator below.
          </p>
        </div>

        <PlatformPreview
          onLaunchMeeting={() => router.push("/meeting")}
          onExploreMore={handleScrollToExplore}
        />
      </section>

      {/* 3. Problem Storytelling Section */}
      <div id="explore-iomete" className="pt-4">
        <ProblemStorytelling
          onExploreIomete={() => {
            const el = document.getElementById("product-intro");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        />
      </div>

      {/* 4. IOMETE Product Introduction Section */}
      <ProductIntroduction
        onSelectMeeting={() => router.push("/meeting")}
      />

      {/* 5. Core Feature Overview (The 4 Value Pillars) */}
      <ScrollReveal>
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="indigo" size="sm">
            Core Architectural Pillars
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Why Enterprise Leaders Are Choosing IOMETE
          </h2>
          <p className="text-sm text-slate-500">
            Eliminating proprietary lock-in and runaway cloud compute without sacrificing sub-second
            query performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <FeatureCard
            icon={<TrendingDown className="h-5 w-5" />}
            badge="Economics"
            badgeVariant="warning"
            title="Up to 70% Lower TCO"
            description="Replace proprietary credit markups with transparent, predictable compute running directly on raw object storage."
            metrics={[
              { label: "Avg Savings", value: "68.4%" },
              { label: "Pricing", value: "Flat/Usage" },
            ]}
            actionText="Simulate ROI"
            onClick={() => goToStage(4)}
          />

          <FeatureCard
            icon={<Database className="h-5 w-5" />}
            badge="Open Standards"
            badgeVariant="default"
            title="100% Apache Iceberg"
            description="Open table format with ACID transactions, time travel, and zero proprietary lock-in. Your data is always yours."
            metrics={[
              { label: "Format", value: "Parquet/Iceberg" },
              { label: "Catalog", value: "REST / Hive" },
            ]}
            actionText="View Architecture"
            onClick={() => goToStage(1)}
          />

          <FeatureCard
            icon={<Zap className="h-5 w-5" />}
            badge="Performance"
            badgeVariant="indigo"
            title="Sub-Second SQL Engine"
            description="High-concurrency Apache Spark SQL and vectorized execution optimized for BI dashboards and batch analytics."
            metrics={[
              { label: "P95 Latency", value: "<850ms" },
              { label: "Concurrency", value: "Infinite" },
            ]}
            actionText="Run Benchmarks"
            onClick={() => goToStage(2)}
          />

          <FeatureCard
            icon={<Lock className="h-5 w-5" />}
            badge="Governance"
            badgeVariant="success"
            title="Private VPC Residency"
            description="Deploy into AWS, Azure, GCP, or On-Premises with Zero-Data-Retention. Full Apache Ranger RBAC and column masking."
            metrics={[
              { label: "Certifications", value: "SOC2 Type II" },
              { label: "Network", value: "Private Cloud" },
            ]}
            actionText="Check Security"
            onClick={() => goToStage(3)}
          />
        </div>
      </section>
      </ScrollReveal>

      {/* 6. Guided Sales Narrative Roadmap */}
      <ScrollReveal delay={0.1}>
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="default" size="sm">
                The 7-Stage Journey
              </Badge>
              <span className="text-xs text-slate-400">45-minute structured enterprise pitch</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Guided Sales Experience Roadmap
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              The seller orchestrates every milestone while the buyer explores live calculators and
              architectures.
            </p>
          </div>
          <Link href="/meeting">
            <Button variant="outline" size="sm">
              <span>Enter Meeting Runner</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </Link>
        </div>

        <ProgressIndicator variant="stepper" />
      </section>
      </ScrollReveal>

      {/* 7. Quick Launchpad Grid */}
      <ScrollReveal delay={0.15}>
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider">
              Presenter &amp; Buyer Quick Jump
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight mt-1">
              Select Any Presentation Module
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Current Role:</span>
            <Badge variant={role === "seller" ? "default" : "success"} size="sm">
              {role === "seller" ? "Seller Pilot" : "Buyer Sandbox"}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            {
              title: "Executive Dashboard",
              desc: "Deal timeline, objectives & buyer profile",
              href: "/dashboard",
              tag: "Strategy",
            },
            {
              title: "Guided Meeting Room",
              desc: "Live dual-pane presentation conductor",
              href: "/meeting",
              tag: "Live Runner",
            },
            {
              title: "Presenter Console",
              desc: "Private seller notes, objection cheat-sheets",
              href: "/presenter",
              tag: "Seller Only",
            },
            {
              title: "Buyer Self-Service Portal",
              desc: "Interactive sandbox for client experimentation",
              href: "/buyer",
              tag: "Client View",
            },
            {
              title: "Use-Case Discovery",
              desc: "Map customer pain points to solution modules",
              href: "/use-cases",
              tag: "Stage 1",
            },
            {
              title: "Interactive Architecture",
              desc: "Compare Legacy Warehouse vs IOMETE Lakehouse",
              href: "/architecture",
              tag: "Stage 2",
            },
            {
              title: "Live Product Tour",
              desc: "Explore SQL editor, auto-scaling clusters, catalog",
              href: "/demo",
              tag: "Stage 3",
            },
            {
              title: "Enterprise Security & Trust",
              desc: "Apache Ranger RBAC, SOC2, HIPAA, Private VPC",
              href: "/security",
              tag: "Stage 4",
            },
            {
              title: "TCO & Financial Model",
              desc: "Calculate Snowflake/Databricks compute savings",
              href: "/business-case",
              tag: "Stage 5",
            },
            {
              title: "Why IOMETE?",
              desc: "Factual comparison with Snowflake, Databricks & BigQuery",
              href: "/competitors",
              tag: "Stage 6",
            },
            {
              title: "Meeting Summary & MAP",
              desc: "Generate mutual action plan & PoC charter",
              href: "/meeting-summary",
              tag: "Stage 7",
            },
            {
              title: "Knowledge & Learn Hub",
              desc: "Technical whitepapers, FAQs, objection handling",
              href: "/learn",
              tag: "Resource",
            },
          ].map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="group p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:scale-[1.01]"
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-sky-400">{item.tag}</span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors">
                {item.title}
              </h4>
              <p className="text-xs text-slate-400 mt-1 line-clamp-1">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>
      </ScrollReveal>
    </div>
  );
}
