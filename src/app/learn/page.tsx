"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductIntroduction } from "@/components/storytelling/ProductIntroduction";
import Link from "next/link";
import { usePresentation } from "@/context/PresentationContext";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionHeader } from "@/components/common/SectionHeader";
import { FeatureCard } from "@/components/common/FeatureCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  GraduationCap,
  BookOpen,
  Layers,
  FileCode,
  Download,
  HelpCircle,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
  category: "Architecture" | "Economics" | "Migration" | "Security";
}

export default function LearnPage() {
  const { sessionData } = usePresentation();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      category: "Architecture",
      q: "How does Apache Iceberg differ from raw Parquet files on S3?",
      a: "While Parquet is an open file format, Apache Iceberg is an open table format. Iceberg tracks snapshots, manifests, and schema versions, providing full ACID transactions, row-level deletes, hidden partitioning, and time-travel querying without race conditions.",
    },
    {
      category: "Economics",
      q: "Where does the 70% cost reduction come from?",
      a: "Proprietary cloud warehouses apply hefty 300% to 500% markups on top of raw cloud compute and charge inflated storage fees. IOMETE runs optimized distributed Apache Spark directly inside your own cloud account at near-raw AWS EC2 spot/on-demand pricing with zero credit markup.",
    },
    {
      category: "Migration",
      q: "Do we have to reload our entire dataset or rewrite existing SQL queries?",
      a: "No! IOMETE supports 100% standard ANSI SQL. Furthermore, because Iceberg is an open format, you can convert existing Parquet data in-place without moving a single byte (Zero-Copy In-Place Registration).",
    },
    {
      category: "Security",
      q: "Can IOMETE employees see or access our customer financial records?",
      a: "Never. IOMETE adheres to a strict Zero-Data-Retention architecture. Data planes reside in your private VPC, and data encryption is managed with your own AWS KMS Customer-Managed Keys (CMEK).",
    },
  ];

  const learningCards = [
    {
      icon: <Layers className="h-5 w-5" />,
      badge: "Primer",
      badgeVariant: "default" as const,
      title: "The Apache Iceberg Revolution",
      description:
        "Understand why tech giants like Apple, Netflix, and Airbnb transitioned from proprietary warehouses to Iceberg open tables.",
      bulletPoints: [
        "Decoupled metadata manifests",
        "Hidden partition pruning",
        "Zero proprietary table lock-in",
      ],
      actionText: "Read Deep Dive",
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      badge: "Economics",
      badgeVariant: "warning" as const,
      title: "The Economics of Modern Lakehouses",
      description:
        "A financial breakdown of compute markup in Snowflake credits versus transparent serverless execution in customer VPCs.",
      bulletPoints: [
        "Eliminating idle warehouse credits",
        "Predictable flat-rate scaling",
        "Zero data egress transit fees",
      ],
      actionText: "Inspect Math",
    },
    {
      icon: <FileCode className="h-5 w-5" />,
      badge: "Engineering",
      badgeVariant: "indigo" as const,
      title: "Zero-Downtime Migration Blueprint",
      description:
        "A proven 3-phase roadmap to transition analytics workloads without disrupting Tableau, Looker, or dbt production pipelines.",
      bulletPoints: [
        "Phase 1: Dual-run parallel validation",
        "Phase 2: In-place Iceberg catalog sync",
        "Phase 3: Seamless cutover & decommission",
      ],
      actionText: "View Blueprint",
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        badge="Buyer Enablement Hub"
        badgeVariant="indigo"
        title="Knowledge, Architecture Blueprints & FAQs"
        subtitle="Deep-dive technical resources and architectural whitepapers for data architects, engineers, and financial leaders."
        breadcrumbs={[{ label: "DealBridge", href: "/" }, { label: "Learn" }]}
        actions={
          <div className="flex items-center gap-2">
            <Link href="/meeting">
              <Button variant="secondary" size="sm">
                <span>Return to Presentation</span>
              </Button>
            </Link>
          </div>
        }
      />

      {/* Product Introduction Primer */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <ProductIntroduction />
      </motion.div>

      {/* 3 Core Learning Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {learningCards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: idx * 0.1 }}
          >
            <FeatureCard
              icon={card.icon}
              badge={card.badge}
              badgeVariant={card.badgeVariant}
              title={card.title}
              description={card.description}
              bulletPoints={card.bulletPoints}
              actionText={card.actionText}
            />
          </motion.div>
        ))}
      </div>

      {/* Technical FAQ Accordion */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <Badge variant="indigo" size="sm">
              Architectural Knowledgebase
            </Badge>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mt-1">
              Frequently Asked Technical Questions
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Validated by IOMETE Solutions Architects
          </span>
        </div>

        <div className="space-y-3 pt-2">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200/80 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between bg-white hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-100">
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

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 bg-slate-50/70 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
