"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePresentation } from "@/context/PresentationContext";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionHeader } from "@/components/common/SectionHeader";
import { FeatureCard } from "@/components/common/FeatureCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Building2,
  Users,
  DollarSign,
  TrendingDown,
  CheckSquare,
  Square,
  Play,
  ArrowRight,
  Database,
  Cloud,
  FileText,
  AlertCircle,
  HelpCircle,
  Sparkles,
  BarChart,
  Target,
} from "lucide-react";

export default function DashboardPage() {
  const { sessionData, updateSessionData, stages, goToStage } = usePresentation();

  const [objectives, setObjectives] = useState([
    { id: 1, text: "Uncover primary frustration with Snowflake compute credits & concurrency lockups", completed: true },
    { id: 2, text: "Validate open Apache Iceberg format requirement without proprietary table lock-in", completed: true },
    { id: 3, text: "Demonstrate live sub-second SQL performance on 100M+ row dataset", completed: false },
    { id: 4, text: "Present tailored 3-year TCO comparison showing >$300k annual savings", completed: false },
    { id: 5, text: "Agree on 14-day production PoC scope & security sign-off requirements", completed: false },
  ]);

  const toggleObjective = (id: number) => {
    setObjectives((prev) =>
      prev.map((obj) => (obj.id === id ? { ...obj, completed: !obj.completed } : obj))
    );
  };

  const annualCurrentSpend = sessionData.monthlyCloudSpend * 12;
  const estimatedSavings = Math.round(annualCurrentSpend * 0.68);

  return (
    <div className="space-y-8">
      <PageHeader
        badge="Executive Deal Command Center"
        badgeVariant="indigo"
        title="Sales Engagement Hub"
        subtitle={`Managing technical evaluation and mutual action plan for ${sessionData.buyerCompany}.`}
        breadcrumbs={[{ label: "DealBridge", href: "/" }, { label: "Executive Dashboard" }]}
        actions={
          <div className="flex items-center gap-2">
            <Link href="/meeting">
              <Button variant="primary">
                <Play className="h-4 w-4" />
                <span>Resume Guided Meeting</span>
              </Button>
            </Link>
          </div>
        }
      />

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0 }}
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Account</span>
            <Building2 className="h-4 w-4 text-sky-600" />
          </div>
          <div className="text-xl font-bold text-slate-900 truncate">{sessionData.buyerCompany}</div>
          <div className="text-xs text-slate-500 mt-1">Tier-1 FinTech • Series C</div>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.07 }}
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Current Cloud Spend</span>
            <DollarSign className="h-4 w-4 text-amber-500" />
          </div>
          <div className="text-xl font-bold text-slate-900">
            ${(annualCurrentSpend / 1000).toFixed(0)}k<span className="text-xs font-normal text-slate-400">/year</span>
          </div>
          <div className="text-xs text-amber-600 font-medium mt-1">
            40% over budget on {sessionData.currentWarehouse}
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.14 }}
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Target IOMETE Savings</span>
            <TrendingDown className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-xl font-bold text-emerald-600">
            ${(estimatedSavings / 1000).toFixed(0)}k<span className="text-xs font-normal text-slate-400">/year</span>
          </div>
          <div className="text-xs text-emerald-700 font-medium mt-1">68.4% compute cost reduction</div>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.21 }}
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Evaluation Health</span>
            <Target className="h-4 w-4 text-indigo-600" />
          </div>
          <div className="text-xl font-bold text-indigo-600">High Conviction</div>
          <div className="text-xs text-slate-500 mt-1">78% Win Probability • 14d to close</div>
        </motion.div>
      </div>

      {/* Main Grid: Account Snapshot & Meeting Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Buyer Dossier & Tech Context */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-5">
            <SectionHeader
              title="Target Buyer Profile & Environment"
              description="Critical technical parameters collected during discovery."
              icon={<Users className="h-4 w-4" />}
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Lead Stakeholder
                </span>
                <span className="text-sm font-bold text-slate-800 block mt-1">
                  {sessionData.buyerName}
                </span>
                <span className="text-xs text-slate-500">{sessionData.buyerRole}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Data Footprint
                </span>
                <span className="text-sm font-bold text-slate-800 block mt-1">
                  {sessionData.dataSizeTB} TB Raw
                </span>
                <span className="text-xs text-slate-500">Parquet / S3 Object Store</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  User Scale
                </span>
                <span className="text-sm font-bold text-slate-800 block mt-1">
                  {sessionData.activeAnalysts} BI Analysts
                </span>
                <span className="text-xs text-slate-500">Tableau & dbt core workflows</span>
              </div>
            </div>

            {/* Buyer Interaction Signals */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>Buyer Environment & Priorities</span>
                <Badge variant="indigo" size="sm">
                  Target: {sessionData.deploymentTarget.toUpperCase()}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {sessionData.selectedRequirements && sessionData.selectedRequirements.length > 0 ? (
                  sessionData.selectedRequirements.map((req, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-medium text-slate-700 shadow-2xs"
                    >
                      {req}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400 italic">
                    No custom requirements flagged yet. Configure in Buyer Interaction Sandbox.
                  </span>
                )}
              </div>
            </div>

            {/* Seller Notes & Observations */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <FileText className="h-3.5 w-3.5 text-sky-600" />
                <span>Discovery Notes (Seller Telemetry)</span>
              </div>
              <div className="space-y-1.5">
                {sessionData.notes.map((note, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-sky-50/60 border border-sky-100 text-xs text-sky-950 flex items-start gap-2"
                  >
                    <span className="text-sky-600 font-bold shrink-0">•</span>
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Presentation Flow Launcher */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <SectionHeader
              title="Presentation Stages & Narrative Progress"
              description="Click any stage to begin presenting or rehearse key arguments."
              icon={<Play className="h-4 w-4" />}
            />

            <div className="space-y-2.5">
              {stages.map((stage, idx) => (
                <div
                  key={stage.id}
                  onClick={() => goToStage(idx)}
                  className="group flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:border-sky-300 hover:bg-sky-50/40 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 group-hover:bg-sky-600 group-hover:text-white text-slate-600 text-xs font-bold transition-colors">
                      {stage.number}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-800 group-hover:text-sky-700 transition-colors">
                          {stage.title}
                        </span>
                        <Badge variant="outline" size="sm">
                          {stage.durationMin} min
                        </Badge>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                        Goal: {stage.sellerGoal}
                      </p>
                    </div>
                  </div>

                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Meeting Objectives & Questions Log */}
        <div className="space-y-6">
          {/* Meeting Objectives Checklist */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Session Objectives
              </h3>
              <span className="text-xs font-semibold text-sky-600">
                {objectives.filter((o) => o.completed).length}/{objectives.length} Done
              </span>
            </div>

            <div className="space-y-2.5">
              {objectives.map((obj) => (
                <button
                  key={obj.id}
                  onClick={() => toggleObjective(obj.id)}
                  className="w-full text-left flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  {obj.completed ? (
                    <CheckSquare className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <Square className="h-4 w-4 text-slate-300 shrink-0 mt-0.5" />
                  )}
                  <span
                    className={`text-xs leading-relaxed ${
                      obj.completed ? "text-slate-400 line-through" : "text-slate-700 font-medium"
                    }`}
                  >
                    {obj.text}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Bookmarked Buyer Questions */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                <HelpCircle className="h-4 w-4 text-amber-500" />
                <span>Logged Buyer Questions</span>
              </div>
              <Badge variant="warning" size="sm">
                {sessionData.bookmarkedQuestions.length} Items
              </Badge>
            </div>

            <p className="text-[11px] text-slate-500">
              Questions logged during the live pitch to be addressed in the Executive Summary.
            </p>

            <div className="space-y-2 pt-1">
              {sessionData.bookmarkedQuestions.map((q, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-amber-50/50 border border-amber-200/60 text-xs text-amber-950 font-medium"
                >
                  &ldquo;{q}&rdquo;
                </div>
              ))}
            </div>

            <Link href="/meeting-summary" className="block pt-2">
              <Button variant="outline" size="sm" className="w-full justify-center">
                <span>View Mutual Action Plan</span>
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
