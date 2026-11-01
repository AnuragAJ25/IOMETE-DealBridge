"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/common/PageHeader";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { UseCaseFinder } from "@/components/use-cases/UseCaseFinder";
import {
  Compass,
  Landmark,
  ShoppingCart,
  HeartPulse,
  Factory,
  Radio,
  ArrowRight,
  CheckCircle2,
  Layers,
  Database,
  Cpu,
  ShieldCheck,
  BarChart3,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";

interface IndustryCard {
  id: string;
  industry: string;
  icon: React.ReactNode;
  accentColor: string;
  challenge: string;
  fit: string;
  dataJourney: string[];
  components: string[];
  scenarioRoute: string;
}

export default function UseCasesPage() {
  const [activeTab, setActiveTab] = useState<"cards" | "finder">("cards");

  const industries: IndustryCard[] = [
    {
      id: "banking",
      industry: "Banking and Financial Services",
      icon: <Landmark className="h-5 w-5 text-sky-600" />,
      accentColor: "border-sky-200 bg-sky-50/40",
      challenge:
        "Strict banking regulations prohibit storing core transaction records in multi-tenant SaaS environments. Teams struggle with high credit markups for large-scale nightly fraud models.",
      fit: "Deploy IOMETE in a private AWS/Azure VPC with Apache Ranger column masking, KMS CMEK encryption, and sub-second SQL on Apache Iceberg with zero data egress.",
      dataJourney: [
        "Core Banking CDC & SWIFT Logs",
        "Encrypted S3 Private Bucket",
        "Apache Iceberg ACID Tables",
        "PySpark Fraud Risk Models",
      ],
      components: ["Apache Iceberg", "Apache Ranger RBAC", "AWS KMS CMEK", "PySpark"],
      scenarioRoute: "/demo",
    },
    {
      id: "retail",
      industry: "Retail and E-Commerce",
      icon: <ShoppingCart className="h-5 w-5 text-emerald-600" />,
      accentColor: "border-emerald-200 bg-emerald-50/40",
      challenge:
        "High query concurrency during promotional events (Black Friday) causes sudden cloud warehouse cluster auto-scaling spikes and massive credit bills.",
      fit: "Elastic auto-scaling Spark clusters run directly on raw cloud compute instances with automatic suspend after 5 minutes of inactivity, slashing idle spend.",
      dataJourney: [
        "Store POS & Clickstream Kafka",
        "Micro-batch Ingestion",
        "Iceberg Partitioned by Date",
        "PowerBI Merchant Dashboards",
      ],
      components: ["Kafka Streaming", "Dynamic Cluster Sleep", "Iceberg Hidden Partitioning", "Tableau/PowerBI"],
      scenarioRoute: "/demo",
    },
    {
      id: "healthcare",
      industry: "Healthcare and Life Sciences",
      icon: <HeartPulse className="h-5 w-5 text-rose-600" />,
      accentColor: "border-rose-200 bg-rose-50/40",
      challenge:
        "HIPAA and patient privacy guidelines mandate zero data retention by third-party vendors. Genomic and clinical trial files are too massive for proprietary warehouse ingestion.",
      fit: "Zero Data Retention architecture where data planes remain 100% inside the hospital or pharma cloud account. Native Iceberg format allows direct Python/R analysis.",
      dataJourney: [
        "EHR Records & DICOM Metadata",
        "On-Prem / Private VPC Lake",
        "Fine-Grained Patient Anonymization",
        "Clinical Research Analytics",
      ],
      components: ["HIPAA Compliance", "Zero Data Retention", "Ranger Row Filtering", "Python/Pandas/R"],
      scenarioRoute: "/demo",
    },
    {
      id: "manufacturing",
      industry: "Manufacturing and Supply Chain",
      icon: <Factory className="h-5 w-5 text-amber-600" />,
      accentColor: "border-amber-200 bg-amber-50/40",
      challenge:
        "IoT sensor streams from global plant machinery generate terabytes of time-series telemetry. Extracting historical sensor data from proprietary warehouses is cost-prohibitive.",
      fit: "Stream IoT telemetry directly into Iceberg tables. Query years of historical equipment logs using Iceberg snapshot time-travel to predict component wear.",
      dataJourney: [
        "Plant IoT Telemetry & MQTT",
        "Blob / S3 Tiered Storage",
        "Iceberg Time-Travel Snapshots",
        "Predictive Maintenance Alerts",
      ],
      components: ["Iceberg Time-Travel", "Distributed Spark Engine", "MQTT Stream Connector", "Grafana Alerting"],
      scenarioRoute: "/demo",
    },
    {
      id: "telecom",
      industry: "Telecommunications",
      icon: <Radio className="h-5 w-5 text-indigo-600" />,
      accentColor: "border-indigo-200 bg-indigo-50/40",
      challenge:
        "Call Detail Records (CDRs) and network traffic logs exceed hundreds of billions of rows monthly. Traditional data warehouses become unmanageably expensive at this scale.",
      fit: "Decoupled architecture scales storage on low-cost cloud object storage while running vectorized Spark queries only when running network performance analysis.",
      dataJourney: [
        "Tower CDRs & NetFlow Packets",
        "Object Storage Deep Archive",
        "Compacted Iceberg Tables",
        "Network Optimization Analytics",
      ],
      components: ["Vectorized Query Cache", "High-Throughput Ingestion", "Auto-Compaction", "Network QoS Dashboard"],
      scenarioRoute: "/demo",
    },
  ];

  return (
    <div className="space-y-12 max-w-6xl mx-auto">
      {/* Page Header */}
      <PageHeader
        title="Industry Use Cases & Discovery"
        subtitle="Explore how IOMETE's sovereign lakehouse architecture fits real-world industry requirements and operational constraints."
        badgeText="Vertical Discovery"
      />

      {/* View Switcher: Use-Case Cards vs. Finder */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("cards")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "cards"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            5 Industry Blueprints
          </button>
          <button
            onClick={() => setActiveTab("finder")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "finder"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Compass className="h-3.5 w-3.5" />
            <span>Interactive Use-Case Finder</span>
          </button>
        </div>
        <span className="text-xs text-slate-500 hidden sm:inline">
          Grounded in enterprise customer architectures
        </span>
      </div>

      {/* View 1: 5 Industry Cards */}
      {activeTab === "cards" ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind) => (
              <ScrollReveal key={ind.id}>
                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5 h-full">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                        {ind.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">
                          {ind.industry}
                        </h3>
                        <span className="text-[10px] text-slate-400 font-mono">
                          Enterprise Blueprint
                        </span>
                      </div>
                    </div>

                    {/* Challenge */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600">
                        Industry Challenge:
                      </span>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {ind.challenge}
                      </p>
                    </div>

                    {/* How IOMETE Fits */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600">
                        How IOMETE Fits:
                      </span>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {ind.fit}
                      </p>
                    </div>

                    {/* Simplified Data Journey */}
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                        Simplified Data Journey:
                      </span>
                      <div className="space-y-1 text-[11px] text-slate-700">
                        {ind.dataJourney.map((step, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-2">
                            <span className="text-sky-500 font-bold text-[10px]">{sIdx + 1}.</span>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Components & CTA */}
                  <div className="pt-3 border-t border-slate-100 space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {ind.components.map((c, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-mono text-[9px]"
                        >
                          {c}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={ind.scenarioRoute}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
                    >
                      <span>Explore Scenario in Demo</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      ) : (
        /* View 2: Deterministic Use-Case Finder */
        <div className="space-y-6">
          <UseCaseFinder />
        </div>
      )}
    </div>
  );
}
