"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Layers,
  Database,
  Cloud,
  Server,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  Zap,
  Cpu,
  Radio,
  FileSpreadsheet,
  Network,
  HardDrive,
  Building2,
  Globe,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface DeploymentContext {
  id: "cloud" | "onprem" | "hybrid" | "airgapped";
  name: string;
  badge: string;
  icon: React.ReactNode;
  tagline: string;
  description: string;
  environmentDetails: string[];
  securitySpecs: { label: string; value: string }[];
  idealFor: string;
}

export function ProductIntroduction({
  onSelectMeeting,
  className = "",
}: {
  onSelectMeeting?: () => void;
  className?: string;
}) {
  const [activeDeployment, setActiveDeployment] = useState<
    "cloud" | "onprem" | "hybrid" | "airgapped"
  >("cloud");

  const deploymentContexts: DeploymentContext[] = [
    {
      id: "cloud",
      name: "Public Cloud (AWS, Azure, GCP)",
      badge: "Most Common",
      icon: <Cloud className="h-5 w-5 text-sky-500" />,
      tagline: "Dedicated Private VPC Deployment with Zero Data Egress",
      description:
        "IOMETE deploys into your own AWS Virtual Private Cloud (VPC), Azure VNet, or Google Cloud Project. Compute clusters spin up directly alongside your existing S3 or Blob storage buckets, with zero data movement over public internet.",
      environmentDetails: [
        "Customer-Owned Storage: Direct S3, Azure ADLS Gen2, or GCS object storage.",
        "Zero Egress Fees: Queries execute locally in-region with low-latency private endpoints.",
        "Cloud Native IAM: Integrates with your existing AWS IAM roles or Azure Managed Identities.",
        "Elastic Auto-Scaling: Clusters scale dynamically with query demand and auto-suspend when idle.",
      ],
      securitySpecs: [
        { label: "Data Location", value: "Your Private VPC" },
        { label: "Encryption", value: "Customer KMS (AES-256)" },
        { label: "Transit Egress", value: "0 MB to external servers" },
      ],
      idealFor:
        "Enterprises seeking modern lakehouse agility without proprietary vendor cloud markups.",
    },
    {
      id: "onprem",
      name: "On-Premises Data Centers",
      badge: "Bare Metal & K8s",
      icon: <Server className="h-5 w-5 text-indigo-500" />,
      tagline: "Complete Sovereignty on Customer Bare-Metal & Kubernetes",
      description:
        "For organizations that maintain their own data centers or colocation facilities, IOMETE runs on enterprise Kubernetes (Red Hat OpenShift, SUSE Rancher, VMware Tanzu, or standard K8s) backed by on-prem S3-compatible storage like MinIO, Ceph, or Dell ECS.",
      environmentDetails: [
        "Bare Metal Efficiency: Utilize existing high-density servers and enterprise SAN/NAS.",
        "Any Kubernetes: Works with OpenShift, Rancher, Tanzu, and vanilla K8s clusters.",
        "Enterprise S3 Storage: Native connector support for MinIO, Ceph, Scality, and Pure Storage.",
        "No External Cloud Dependency: Workloads run continuously without public cloud connectivity.",
      ],
      securitySpecs: [
        { label: "Data Location", value: "Your Private Data Center" },
        { label: "Orchestration", value: "Enterprise K8s / OpenShift" },
        { label: "Hardware Ownership", value: "100% Customer Hardware" },
      ],
      idealFor:
        "Financial institutions, telecom operators, and healthcare systems with strict physical server mandates.",
    },
    {
      id: "hybrid",
      name: "Hybrid Cloud Architecture",
      badge: "Multi-Environment",
      icon: <Network className="h-5 w-5 text-teal-500" />,
      tagline: "Unified Querying Across On-Premises & Cloud Repositories",
      description:
        "Many growing enterprises operate in a transition state with critical transactional data on-premises and newer pipelines in the public cloud. IOMETE enables seamless unified querying across both environments without requiring bulk data transfers.",
      environmentDetails: [
        "Unified Iceberg Catalog: A single central metadata catalog spans on-premises and cloud tables.",
        "In-Place Querying: Query on-premises operational databases alongside cloud S3 data lakes.",
        "Phased Migration: Migrate datasets gradually without disrupting running BI reports or pipelines.",
        "Consistent Security: Same Apache Ranger policies apply whether data lives on-prem or in the cloud.",
      ],
      securitySpecs: [
        { label: "Catalog Standard", value: "Open Apache Iceberg REST" },
        { label: "Network Tunnel", value: "Direct Connect / AWS VPN" },
        { label: "Data Movement", value: "Federated Zero-Copy queries" },
      ],
      idealFor:
        "Organizations executing a multi-year cloud migration or maintaining hybrid disaster-recovery topologies.",
    },
    {
      id: "airgapped",
      name: "Air-Gapped & Sovereign Clouds",
      badge: "Maximum Security",
      icon: <Radio className="h-5 w-5 text-emerald-500" />,
      tagline: "100% Isolated Operation with Zero Internet Connectivity",
      description:
        "Designed for defense contractors, national security agencies, and highly regulated banks that require absolute physical and digital disconnection from the public internet. IOMETE can be packaged and deployed offline via secure container registries.",
      environmentDetails: [
        "Zero Internet Dependency: No outbound phone-home pings, telemetry, or external license servers.",
        "Offline Container Distribution: Easy air-gap installation via tarball or internal harbor registry.",
        "Full Feature Parity: ANSI SQL, Apache Ranger RBAC, Spark batch, and Iceberg maintenance all run local.",
        "Strict Audit Compliance: Complies with national defense data sovereignty and classified environment standards.",
      ],
      securitySpecs: [
        { label: "Internet Access", value: "0% (Completely Offline)" },
        { label: "License Validation", value: "Offline Cryptographic Token" },
        { label: "Compliance Profile", value: "Classified / Defense Ready" },
      ],
      idealFor:
        "Government, aerospace, defense, and central banking networks with strict zero-internet security directives.",
    },
  ];

  const currentDep =
    deploymentContexts.find((d) => d.id === activeDeployment) || deploymentContexts[0];

  return (
    <section className={`space-y-12 ${className}`} id="product-intro">
      {/* Overview Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Product Overview for Decision Makers</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 leading-tight">
          What is IOMETE &amp; Why Does It Matter?
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
          Designed for technical and business leaders alike. Here is a clear, simple look at how the
          IOMETE modern lakehouse simplifies enterprise data operations.
        </p>
      </div>

      {/* Concept 1: What is IOMETE & What is a Data Lakehouse? */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 1: What is IOMETE? */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600 border border-sky-100">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-sky-600">
                In Plain English
              </span>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                What is IOMETE?
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            <strong>IOMETE</strong> is a fully managed data lakehouse platform designed to run directly
            inside your organization&apos;s own infrastructure.
          </p>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Instead of locking your business data into closed, proprietary cloud warehouses and
            paying heavy compute markups, IOMETE empowers your team to run high-performance SQL
            analytics, BI dashboards, and data pipelines on open storage standards (Apache Iceberg) —
            with full enterprise governance and customer data control.
          </p>

          <div className="pt-2 border-t border-slate-100 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>Full ANSI SQL compatibility for Tableau, Looker, and PowerBI.</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>No proprietary lock-in: your data stays in standard open formats.</span>
            </div>
          </div>
        </div>

        {/* Card 2: What is a Data Lakehouse? */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">
                Core Technology Concept
              </span>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                What is a Data Lakehouse?
              </h3>
            </div>
          </div>

          {/* Simple Visual Equation */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="space-y-1">
              <span className="font-bold text-slate-700 block">Data Lake</span>
              <p className="text-[11px] text-slate-500">Low-cost storage for all raw data</p>
            </div>
            <div className="flex items-center justify-center font-bold text-sky-600 text-sm">
              +
            </div>
            <div className="space-y-1">
              <span className="font-bold text-slate-700 block">Warehouse</span>
              <p className="text-[11px] text-slate-500">Fast SQL, reliability &amp; security</p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-100 text-center text-xs">
            <span className="font-bold text-sky-900 block text-sm">
              = The Lakehouse (IOMETE)
            </span>
            <p className="text-[11px] text-sky-700 mt-0.5">
              Sub-second query speed &amp; ACID transactions directly on your low-cost open storage.
            </p>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Historically, companies had to copy data twice: once into a cheap data lake, and again into
            an expensive warehouse. A lakehouse unifies this into a single open architecture, saving
            storage, engineering pipelines, and compute budgets.
          </p>
        </div>
      </div>

      {/* Concept 2: Why Organizations Consider IOMETE (4 Key Drivers) */}
      <div className="space-y-4">
        <div className="max-w-2xl space-y-1">
          <Badge variant="default" size="sm">
            Strategic Business Drivers
          </Badge>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            Why Forward-Thinking Organizations Choose IOMETE
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Four practical benefits driving technology evaluations across enterprise data teams.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 space-y-2.5 shadow-xs">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
              <Zap className="h-4 w-4" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Cost Transparency</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Eliminate unexpected monthly billing spikes and opaque credit metering. Compute runs
              transparently at native cloud hardware rates.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 space-y-2.5 shadow-xs">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600 border border-sky-100">
              <Lock className="h-4 w-4" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Total Data Sovereignty</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your sensitive customer data never leaves your VPC or data center. Zero data retention
              on vendor infrastructure satisfies InfoSec and compliance teams.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 space-y-2.5 shadow-xs">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-teal-600 border border-teal-100">
              <Database className="h-4 w-4" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">100% Open Apache Iceberg</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Avoid proprietary lock-in. Because data is stored in open Iceberg Parquet format, you
              can query it with any open-source or commercial analytics tool.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 space-y-2.5 shadow-xs">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
              <Cpu className="h-4 w-4" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Sub-Second Performance</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Vectorized query execution and intelligent memory caching deliver rapid dashboard
              rendering for business users without requiring cluster warm-up delays.
            </p>
          </div>
        </div>
      </div>

      {/* Concept 3: Customer-Controlled Infrastructure & Deployment Contexts */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-800 shadow-2xl space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2">
              <Badge variant="indigo" size="sm">
                Deployment Flexibility
              </Badge>
              <span className="text-xs text-sky-400 font-medium">Customer-Controlled</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Runs Where Your Data Already Lives
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              IOMETE adapts to your existing enterprise topology. Explore how IOMETE deploys across
              cloud, on-premises, hybrid, and air-gapped environments.
            </p>
          </div>

          {/* Separation of Planes visual pill */}
          <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-white/5 border border-white/10 text-xs">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300">Decoupled Planes:</span>
            <span className="font-semibold text-white">Customer Data Plane</span>
          </div>
        </div>

        {/* Deployment Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
          {deploymentContexts.map((dep) => {
            const isSelected = dep.id === activeDeployment;
            return (
              <button
                key={dep.id}
                onClick={() => setActiveDeployment(dep.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-sky-500 text-white shadow-lg shadow-sky-500/25"
                    : "bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
              >
                {dep.icon}
                <span>{dep.name}</span>
                <span className="text-[10px] opacity-75 hidden sm:inline">({dep.badge})</span>
              </button>
            );
          })}
        </div>

        {/* Selected Deployment Detail Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left 8 Cols: Architectural Narrative */}
          <div className="lg:col-span-8 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider">
                  Deployment Topology
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-300">{currentDep.tagline}</span>
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {currentDep.name}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentDep.description}
              </p>
            </div>

            {/* Environment Highlights */}
            <div className="space-y-2 pt-3 border-t border-slate-800">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Deployment Architecture Highlights
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {currentDep.environmentDetails.map((detail, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2"
                  >
                    <CheckCircle2 className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                    <span className="text-slate-200 leading-relaxed">{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right 4 Cols: Security & Fit Snapshot */}
          <div className="lg:col-span-4 bg-slate-800/60 rounded-2xl p-5 border border-slate-700/80 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Security &amp; Residency Specs</span>
            </div>

            <div className="space-y-2">
              {currentDep.securitySpecs.map((spec, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-700/60 flex items-center justify-between text-xs"
                >
                  <span className="text-slate-400">{spec.label}:</span>
                  <span className="font-semibold text-slate-100">{spec.value}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-700 text-xs space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400 block">
                Ideal Organization Profile
              </span>
              <p className="text-slate-300 leading-relaxed text-[11px]">{currentDep.idealFor}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

