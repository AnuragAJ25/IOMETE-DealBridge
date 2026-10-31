"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePresentation } from "@/context/PresentationContext";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionHeader } from "@/components/common/SectionHeader";
import { FeatureCard } from "@/components/common/FeatureCard";
import { GroundedSecurityAssistant } from "@/components/security/GroundedSecurityAssistant";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  ShieldCheck,
  Lock,
  Key,
  FileCheck,
  CheckCircle2,
  EyeOff,
  Users,
  Server,
  Cloud,
  ArrowRight,
  Download,
  AlertCircle,
  FileText,
} from "lucide-react";

interface RolePermission {
  role: string;
  tableAccess: string;
  columnMasking: string;
  rowFiltering: string;
  auditTrail: string;
}

export default function SecurityPage() {
  const { sessionData } = usePresentation();
  const [selectedRole, setSelectedRole] = useState<string>("BI Analyst");

  const permissions: RolePermission[] = [
    {
      role: "BI Analyst",
      tableAccess: "Read Only (Curated Marts)",
      columnMasking: "Full Hashing (SSN, Card Number masked)",
      rowFiltering: "Filtered to assigned regional portfolio",
      auditTrail: "100% Logged with Query ID",
    },
    {
      role: "Lead Data Engineer",
      tableAccess: "Read / Write (Raw & Staging)",
      columnMasking: "Decrypted with KMS token permission",
      rowFiltering: "Unrestricted within engineering VPC",
      auditTrail: "DDL & DML modification audit stream",
    },
    {
      role: "Security & Compliance Auditor",
      tableAccess: "Metadata & Audit Logs Only",
      columnMasking: "Zero Plaintext Access",
      rowFiltering: "Access to complete immutable audit log",
      auditTrail: "Read-only SIEM export stream",
    },
    {
      role: "External Vendor / Contractor",
      tableAccess: "Sandboxed Temporary Tables",
      columnMasking: "Synthetic & Differential Privacy applied",
      rowFiltering: "Restricted to anonymized test tenants",
      auditTrail: "Strict 14-day token expiration",
    },
  ];

  const activePerm = permissions.find((p) => p.role === selectedRole) || permissions[0];

  return (
    <div className="space-y-8">
      <PageHeader
        badge="Stage 4 of 7 • Security & Governance"
        badgeVariant="success"
        title="Enterprise Trust, Security & Compliance"
        subtitle={`Zero-data-retention SaaS and private VPC architecture designed for regulated FinTech environments like ${sessionData.buyerCompany}.`}
        breadcrumbs={[{ label: "DealBridge", href: "/" }, { label: "Security" }]}
        actions={
          <div className="flex items-center gap-2">
            <Link href="/business-case">
              <Button variant="primary" size="sm">
                <span>Next: TCO & ROI Model</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        }
      />

      {/* Trust & Compliance Certifications Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Audit & Verification Standards
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mt-1">
              Enterprise Grade Compliance Suite
            </h3>
          </div>
          <Badge variant="success" size="md">
            Zero Customer Data Retention
          </Badge>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {[
            { name: "SOC 2 Type II", desc: "Annual independent AICPA audit", status: "Certified" },
            { name: "HIPAA Compliant", desc: "BAA agreement ready for healthcare data", status: "Verified" },
            { name: "GDPR & CCPA", desc: "Right-to-forget with Iceberg delete vectors", status: "Compliant" },
            { name: "ISO 27001", desc: "Information security management controls", status: "Certified" },
          ].map((cert, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">{cert.name}</span>
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">{cert.desc}</p>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-1">
                {cert.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3 Core Security Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard
          icon={<Server className="h-5 w-5" />}
          badge="Network"
          badgeVariant="default"
          title="Private VPC Deployment"
          description="Deploy compute clusters directly inside your AWS, Azure, or GCP private subnet. No public IP exposure."
          bulletPoints={[
            "Customer-Managed VPC peering",
            "Zero outbound Internet access",
            "Direct AWS PrivateLink support",
          ]}
        />

        <FeatureCard
          icon={<Key className="h-5 w-5" />}
          badge="Encryption"
          badgeVariant="indigo"
          title="Customer-Managed Keys (CMEK)"
          description="Encrypt all Iceberg data at rest using your own AWS KMS or Azure Key Vault keys. IOMETE cannot decrypt without your KMS grant."
          bulletPoints={[
            "AES-256 envelope encryption",
            "Instant key revocation support",
            "Hardware Security Module (HSM) backing",
          ]}
        />

        <FeatureCard
          icon={<EyeOff className="h-5 w-5" />}
          badge="Governance"
          badgeVariant="success"
          title="Apache Ranger RBAC"
          description="Fine-grained column masking and row filtering applied at the execution layer. Protect PII without creating duplicate data views."
          bulletPoints={[
            "Dynamic SQL hashing & masking",
            "Centralized policy definitions",
            "Exportable JSON audit logs",
          ]}
        />
      </div>

      {/* Grounded Security & Compliance Assistant */}
      <GroundedSecurityAssistant />

      {/* Interactive RBAC Simulator */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Badge variant="indigo" size="sm">
              Apache Ranger RBAC Simulator
            </Badge>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mt-1">
              Inspect Fine-Grained Policy Enforcement by Role
            </h3>
            <p className="text-xs text-slate-500">
              Select an enterprise persona to verify how IOMETE masks sensitive financial data.
            </p>
          </div>

          {/* Role selector */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-2xl">
            {permissions.map((p) => (
              <button
                key={p.role}
                onClick={() => setSelectedRole(p.role)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedRole === p.role
                    ? "bg-white text-slate-900 shadow-xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {p.role}
              </button>
            ))}
          </div>
        </div>

        {/* Permission matrix for selected persona */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
              Table Access Level
            </span>
            <span className="text-xs font-bold text-slate-800 block">
              {activePerm.tableAccess}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
              Column-Level Masking
            </span>
            <span className="text-xs font-bold text-slate-800 block">
              {activePerm.columnMasking}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
              Row-Level Filtering
            </span>
            <span className="text-xs font-bold text-slate-800 block">
              {activePerm.rowFiltering}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
              Audit Stream
            </span>
            <span className="text-xs font-bold text-slate-800 block">
              {activePerm.auditTrail}
            </span>
          </div>
        </div>

        {/* Masked Data Preview Simulation */}
        <div className="p-4 rounded-2xl bg-slate-900 text-white font-mono text-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-[11px] pb-2 border-b border-slate-800 font-sans">
            <span>Query Result Viewport for: <strong>{selectedRole}</strong></span>
            <Badge variant="indigo" size="sm">Ranger Rule Enforced</Badge>
          </div>
          <div className="space-y-1 text-slate-300">
            <p>
              account_id: <span className="text-sky-300">&quot;acc_49012&quot;</span> | balance: <span className="text-emerald-400">&quot;$14,200.00&quot;</span>
            </p>
            <p>
              customer_ssn:{" "}
              <span className={selectedRole === "BI Analyst" ? "text-amber-400 font-bold" : "text-sky-300"}>
                {selectedRole === "BI Analyst" ? '"***-**-6721" (MASKED)' : '"459-21-6721" (DECRYPTED)'}
              </span>
            </p>
            <p>
              region_tenant: <span className="text-sky-300">&quot;US-EAST-FINTECH&quot;</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
