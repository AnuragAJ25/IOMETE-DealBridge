"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePresentation } from "@/context/PresentationContext";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionHeader } from "@/components/common/SectionHeader";
import { FeatureCard } from "@/components/common/FeatureCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Sliders,
  DollarSign,
  TrendingDown,
  Layers,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Database,
  Lock,
  Download,
} from "lucide-react";

export default function BuyerPortalPage() {
  const { sessionData, updateSessionData, role, setRole } = usePresentation();

  const [questionText, setQuestionText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Derived financial calculation
  const annualSpend = sessionData.monthlyCloudSpend * 12;
  const estimatedAnnualSavings = Math.round(annualSpend * 0.684);
  const threeYearSavings = estimatedAnnualSavings * 3;

  const handleSliderChange = (field: keyof typeof sessionData, value: number) => {
    updateSessionData({ [field]: value });
  };

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;
    updateSessionData({
      bookmarkedQuestions: [...sessionData.bookmarkedQuestions, questionText.trim()],
    });
    setQuestionText("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        badge="Buyer Self-Service Sandbox"
        badgeVariant="success"
        title={`Welcome to Your Evaluation Portal, ${sessionData.buyerName}`}
        subtitle={`Interactive sandbox prepared for ${sessionData.buyerCompany}. Test our financial models and explore the private cloud architecture.`}
        breadcrumbs={[{ label: "DealBridge", href: "/" }, { label: "Buyer Portal" }]}
        actions={
          <div className="flex items-center gap-2">
            <Link href="/business-case">
              <Button variant="primary" size="sm">
                <DollarSign className="h-4 w-4" />
                <span>Full TCO Calculator</span>
              </Button>
            </Link>
          </div>
        }
      />

      {/* Interactive Value Estimator Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-sky-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Badge variant="indigo" size="sm">
              Live Custom Value Model
            </Badge>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
              Adjust Your Cloud Parameters Live
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Move the sliders below to see projected savings versus {sessionData.currentWarehouse}.
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-sky-400 font-medium uppercase tracking-wider block">
              Projected 3-Year Savings
            </span>
            <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400">
              ${(threeYearSavings / 1000).toFixed(0)}k
            </span>
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Slider 1: Monthly Spend */}
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-medium">Monthly Cloud Spend</span>
              <span className="font-bold text-sky-400">
                ${sessionData.monthlyCloudSpend.toLocaleString()}/mo
              </span>
            </div>
            <input
              type="range"
              min={10000}
              max={200000}
              step={5000}
              value={sessionData.monthlyCloudSpend}
              onChange={(e) => handleSliderChange("monthlyCloudSpend", Number(e.target.value))}
              className="w-full accent-sky-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>$10k/mo</span>
              <span>$200k/mo</span>
            </div>
          </div>

          {/* Slider 2: Data Volume */}
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-medium">Data Footprint</span>
              <span className="font-bold text-sky-400">{sessionData.dataSizeTB} TB Raw</span>
            </div>
            <input
              type="range"
              min={10}
              max={1000}
              step={10}
              value={sessionData.dataSizeTB}
              onChange={(e) => handleSliderChange("dataSizeTB", Number(e.target.value))}
              className="w-full accent-sky-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>10 TB</span>
              <span>1 PB</span>
            </div>
          </div>

          {/* Slider 3: Active Analysts */}
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-medium">Active BI Analysts</span>
              <span className="font-bold text-sky-400">{sessionData.activeAnalysts} Users</span>
            </div>
            <input
              type="range"
              min={5}
              max={250}
              step={5}
              value={sessionData.activeAnalysts}
              onChange={(e) => handleSliderChange("activeAnalysts", Number(e.target.value))}
              className="w-full accent-sky-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>5 Users</span>
              <span>250 Users</span>
            </div>
          </div>
        </div>

        {/* Dynamic Metric Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10 text-center">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
              Incumbent Annual Spend
            </span>
            <span className="text-lg font-bold text-slate-200">
              ${(annualSpend / 1000).toFixed(0)}k/yr
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
              IOMETE Projected Spend
            </span>
            <span className="text-lg font-bold text-sky-300">
              ${((annualSpend - estimatedAnnualSavings) / 1000).toFixed(0)}k/yr
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
              Annual Cash Savings
            </span>
            <span className="text-lg font-bold text-emerald-400">
              ${(estimatedAnnualSavings / 1000).toFixed(0)}k/yr
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
              Effective ROI
            </span>
            <span className="text-lg font-bold text-emerald-400">3.2x ROI</span>
          </div>
        </div>
      </div>

      {/* Buyer Guided Modules */}
      <div className="space-y-4">
        <SectionHeader
          title="Recommended Evaluation Steps for Your Team"
          description="Explore the architecture, security safeguards, and feature benchmarks."
          icon={<Sparkles className="h-4 w-4" />}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FeatureCard
            icon={<Layers className="h-5 w-5" />}
            badge="Architecture"
            title="Inspect Data Plane"
            description="See how IOMETE connects directly to your AWS S3 bucket without copying data outside your VPC."
            actionText="Explore Architecture"
            onClick={() => window.location.assign("/architecture")}
          />

          <FeatureCard
            icon={<ShieldCheck className="h-5 w-5" />}
            badge="Compliance"
            badgeVariant="success"
            title="InfoSec & Security"
            description="SOC2 Type II, HIPAA, Apache Ranger fine-grained column masking and customer-managed keys."
            actionText="Review Security"
            onClick={() => window.location.assign("/security")}
          />

          <FeatureCard
            icon={<Database className="h-5 w-5" />}
            badge="Interactive"
            badgeVariant="indigo"
            title="Feature Benchmarks"
            description="Test simulated queries on 100M+ Iceberg rows and inspect cluster auto-scaling speeds."
            actionText="Try Live Demo"
            onClick={() => window.location.assign("/demo")}
          />
        </div>
      </div>

      {/* Buyer Question / Request Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Have a Specific Technical Question for the IOMETE Architect?
            </h3>
            <p className="text-xs text-slate-500">
              Submit your inquiry below. It syncs directly to the presenter&apos;s console in real-time.
            </p>
          </div>
          {submitted && (
            <Badge variant="success" size="sm">
              <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
              Question Received!
            </Badge>
          )}
        </div>

        <form onSubmit={handleAskQuestion} className="flex gap-2">
          <input
            type="text"
            placeholder="e.g. Can we bring our existing dbt Cloud pipelines to IOMETE without modification?"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            className="flex-1 text-xs px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500"
          />
          <Button type="submit" variant="primary" size="sm">
            <span>Send Question</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
