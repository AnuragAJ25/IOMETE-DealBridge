"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/common/PageHeader";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { AIProductExplainer } from "@/components/storytelling/AIProductExplainer";
import {
  GraduationCap,
  Play,
  ExternalLink,
  Sparkles,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Video,
  User,
  HelpCircle,
  BookOpen,
} from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
  category: "Architecture" | "Economics" | "Migration" | "Security";
}

export default function LearnPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      category: "Architecture",
      q: "How does Apache Iceberg differ from raw Parquet files on cloud storage?",
      a: "While Parquet is an open file format, Apache Iceberg is an open table format. Iceberg tracks snapshots, manifests, and schema versions, providing full ACID transactions, row-level deletes, hidden partitioning, and time-travel querying without race conditions.",
    },
    {
      category: "Economics",
      q: "Where does the compute cost reduction come from with IOMETE?",
      a: "Proprietary cloud warehouses apply hefty credit markups on top of raw cloud compute and charge inflated storage fees. IOMETE runs optimized distributed Apache Spark directly inside your own cloud account at raw cloud instance pricing with zero credit markup, paired with automatic cluster suspension.",
    },
    {
      category: "Migration",
      q: "Do we have to reload our entire dataset or rewrite existing SQL queries?",
      a: "No. IOMETE supports standard ANSI SQL and connects directly to existing S3 or Blob storage. Furthermore, because Iceberg is an open format, you can register existing Parquet datasets in-place without moving data.",
    },
    {
      category: "Security",
      q: "Can IOMETE employees see or access customer data?",
      a: "Never. IOMETE adheres to a strict Zero-Data-Retention architecture. Data planes reside in your private VPC, and data encryption is managed with your own AWS KMS Customer-Managed Keys (CMEK).",
    },
  ];

  return (
    <div className="space-y-12 max-w-6xl mx-auto">
      {/* 1. Page Header */}
      <PageHeader
        title="Learn IOMETE from the Experts"
        subtitle="Explore IOMETE's architecture, capabilities and real-world workflows through product walkthroughs."
        badgeText="Media & Product Walkthroughs"
      />

      {/* 2. THE FIRST THING: TWO LARGE VIDEO CARDS SIDE-BY-SIDE */}
      <section className="space-y-6">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
                Featured Product Walkthroughs
              </span>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                Original Product Sessions by IOMETE Team
              </h2>
            </div>
            {/* Creator Attribution */}
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs">
              <div className="h-6 w-6 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-[10px]">
                ST
              </div>
              <div>
                <span className="font-bold text-slate-900">Shyaamal Tripathi</span>
                <span className="text-slate-500 text-[10px] block">
                  GTM &amp; Developer Advocacy · IOMETE
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 2 Large Video Cards: Side-by-Side on Desktop, Stacked on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Video 1: IOMETE Platform Overview */}
          <ScrollReveal delay={0.1}>
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-100">
                  Video 1 · Platform Overview
                </span>
                <span className="text-xs text-slate-400 font-medium">MP4 Walkthrough</span>
              </div>

              {/* 16:9 HTML5 Video Player */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner">
                <video
                  controls
                  preload="metadata"
                  className="w-full h-full object-cover"
                >
                  <source src="/videos/iomete-overview.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  IOMETE Platform Overview
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  An architectural walkthrough exploring the core philosophy of IOMETE: decoupling compute from storage on open Apache Iceberg, eliminating vendor lock-in, and securing workloads inside your private cloud perimeter.
                </p>
              </div>

              {/* Creator Attribution & LinkedIn Link */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="text-slate-500 text-[11px]">
                  Featured creator: <span className="font-semibold text-slate-800">Shyaamal Tripathi</span>
                </div>
                <Link
                  href="https://www.linkedin.com/posts/shyaamal-tripathi-a389051b3_iomete-activity-7448057759524216834-pONN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 hover:text-sky-700 hover:underline"
                >
                  <span>Watch original on LinkedIn</span>
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Video 2: IOMETE Demo & AI Exploration */}
          <ScrollReveal delay={0.2}>
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-600 bg-cyan-50 px-2.5 py-1 rounded-full border border-cyan-100">
                  Video 2 · Live Demo &amp; AI
                </span>
                <span className="text-xs text-slate-400 font-medium">MP4 Hands-on</span>
              </div>

              {/* 16:9 HTML5 Video Player */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner">
                <video
                  controls
                  preload="metadata"
                  className="w-full h-full object-cover"
                >
                  <source src="/videos/iomete-demo.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  IOMETE Demo &amp; AI Exploration
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Interactive session featuring live query execution on IOMETE, exploring how teams pair Anthropic Claude with lakehouse tables for automated SQL generation, smart analytics, and zero-data-movement AI workloads.
                </p>
              </div>

              {/* Creator Attribution & LinkedIn Link */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="text-slate-500 text-[11px]">
                  Featured creator: <span className="font-semibold text-slate-800">Shyaamal Tripathi</span>
                </div>
                <Link
                  href="https://www.linkedin.com/posts/shyaamal-tripathi-a389051b3_was-playing-around-with-anthropic-claude-activity-7450094945597562880-f3Rd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 hover:text-sky-700 hover:underline"
                >
                  <span>Watch original on LinkedIn</span>
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. AI Product Explainer (Preserved Functionality) */}
      <section className="space-y-4 pt-4">
        <ScrollReveal>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
              Interactive AI Learning
            </span>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              AI-Assisted Concept Explainer
            </h2>
            <p className="text-xs text-slate-500">
              Generate tailored explanations for different stakeholder personas grounded in official documentation.
            </p>
          </div>
        </ScrollReveal>
        <AIProductExplainer />
      </section>

      {/* 4. Frequently Asked Questions */}
      <section className="space-y-4 pt-4">
        <ScrollReveal>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
              Knowledge Base
            </span>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-slate-500">
              Key technical, operational, and commercial questions answered from official documentation.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                      {faq.category}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900">
                      {faq.q}
                    </span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
