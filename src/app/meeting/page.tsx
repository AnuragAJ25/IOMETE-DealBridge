"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePresentation } from "@/context/PresentationContext";
import { PageHeader } from "@/components/common/PageHeader";
import { ProgressIndicator } from "@/components/common/ProgressIndicator";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Clock,
  Sparkles,
  FileText,
  HelpCircle,
  ExternalLink,
  Laptop,
  Users,
  Eye,
  CheckCircle2,
  ArrowRight,
  Database,
  Cpu,
  Layers,
  Shield,
  Calculator,
} from "lucide-react";

export default function MeetingRoomPage() {
  const {
    currentStage,
    currentStageIndex,
    nextStage,
    prevStage,
    stages,
    role,
    setRole,
    meetingTimeElapsed,
    isTimerRunning,
    toggleTimer,
    isNotesOpen,
    setIsNotesOpen,
    sessionData,
    updateSessionData,
  } = usePresentation();

  const [activeTab, setActiveTab] = useState<"viewport" | "engagement" | "notes">("viewport");
  const [syncedBuyerAction, setSyncedBuyerAction] = useState<string>("Viewing live compute nodes");

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        badge="Live Presentation Room"
        badgeVariant="success"
        title="Guided Sales Meeting Runner"
        subtitle={`Live session with ${sessionData.buyerName} at ${sessionData.buyerCompany}. Seller controls stage progression.`}
        breadcrumbs={[{ label: "DealBridge", href: "/" }, { label: "Meeting Room" }]}
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant={isNotesOpen ? "primary" : "secondary"}
              size="sm"
              onClick={() => setIsNotesOpen(!isNotesOpen)}
            >
              <FileText className="h-4 w-4" />
              <span>{isNotesOpen ? "Hide Script" : "Show Script"}</span>
            </Button>

            <Link href={currentStage.route}>
              <Button variant="outline" size="sm">
                <span>Open Full Stage View</span>
                <ExternalLink className="h-3.5 w-3.5 ml-1" />
              </Button>
            </Link>
          </div>
        }
      />

      {/* Stepper Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
        <ProgressIndicator variant="stepper" />
      </div>

      {/* Stage Control & Telemetry Bar */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400 border border-sky-400/30 font-bold">
            {currentStage.number}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider">
                {currentStage.category}
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-300">
                Pacing: {currentStage.durationMin} minutes
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              {currentStage.title}
            </h2>
          </div>
        </div>

        {/* Remote Navigation controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={prevStage}
            disabled={currentStageIndex === 0}
            className="text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span>Previous</span>
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={nextStage}
            disabled={currentStageIndex === stages.length - 1}
            className="shadow-sm shadow-sky-500/20"
          >
            <span>Next Stage</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* Main Split View: Seller Command & Live Stage Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Interactive Stage Viewport */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            {/* Viewport Top Bar */}
            <div className="p-3.5 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-600 font-medium">
                <Laptop className="h-4 w-4 text-sky-600" />
                <span>Presentation Canvas: <strong>{currentStage.shortTitle}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-slate-500 text-[11px]">Synced with Buyer Screen</span>
              </div>
            </div>

            {/* Simulated Stage Viewport Canvas */}
            <div className="p-6 sm:p-8 space-y-6 min-h-[380px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStageIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="space-y-3"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="default" size="sm">
                        Active Module: {currentStage.route}
                      </Badge>
                      <span className="text-xs text-slate-400">
                        Step {currentStageIndex + 1} of {stages.length}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                      {currentStage.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
                      {currentStage.sellerGoal}
                    </p>
                  </div>

                  {/* Dynamic Stage Highlights preview based on active stage */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-3">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                      <span>Interactive Highlights Available in this Module:</span>
                      <Link
                        href={currentStage.route}
                        className="text-sky-600 hover:text-sky-700 flex items-center gap-1"
                      >
                        <span>Launch Full Interactive Module</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-lg bg-white border border-slate-200/60 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span className="text-slate-700">Buyer Can Experiment with Sliders</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white border border-slate-200/60 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span className="text-slate-700">Live Telemetry & Notes Docked</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Quick Jump to Module */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs text-slate-500">
                  Buyer Focus: <span className="font-medium text-slate-700">{currentStage.buyerFocus}</span>
                </div>
                <Link href={currentStage.route}>
                  <Button variant="primary" size="sm">
                    <span>Enter {currentStage.shortTitle}</span>
                    <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Live Meeting Telemetry & Buyer Signals */}
        <div className="space-y-4">
          {/* Buyer Engagement Signal */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <Users className="h-4 w-4 text-sky-600" />
                <span>Buyer Engagement Tracker</span>
              </div>
              <Badge variant="success" size="sm">
                Active
              </Badge>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-500 text-[11px]">
                <span>Viewer</span>
                <span className="font-semibold text-slate-700">{sessionData.buyerName}</span>
              </div>
              <div className="flex justify-between text-slate-500 text-[11px]">
                <span>Target Cloud</span>
                <span className="font-semibold text-sky-700 uppercase">{sessionData.deploymentTarget}</span>
              </div>
              <div className="flex justify-between text-slate-500 text-[11px]">
                <span>Spend / Footprint</span>
                <span className="font-semibold text-slate-800">
                  ${sessionData.monthlyCloudSpend.toLocaleString()}/mo • {sessionData.dataSizeTB} TB
                </span>
              </div>
              <div className="flex justify-between text-slate-500 text-[11px]">
                <span>Active Priorities</span>
                <span className="font-semibold text-emerald-700">
                  {sessionData.selectedRequirements.length} Criteria Selected
                </span>
              </div>
              <div className="flex justify-between text-slate-500 text-[11px]">
                <span>Logged Questions</span>
                <span className="font-semibold text-amber-700">
                  {sessionData.bookmarkedQuestions.length} Questions
                </span>
              </div>
              <div className="flex justify-between text-slate-500 text-[11px]">
                <span>Meeting Elapsed</span>
                <span className="font-mono font-medium text-slate-800">
                  {formatTime(meetingTimeElapsed)}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                Simulate Buyer Action:
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  "Viewing Iceberg Tiers",
                  "Testing TCO Slider",
                  "Inspecting RBAC",
                  "Reading Battlecard",
                ].map((act, i) => (
                  <button
                    key={i}
                    onClick={() => setSyncedBuyerAction(act)}
                    className="p-1.5 text-[11px] rounded-lg border border-slate-200 hover:border-sky-300 hover:bg-sky-50 text-slate-600 text-left transition-colors"
                  >
                    {act}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Presenter Action Sheet */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Presenter Shortkeys
            </h3>

            <div className="space-y-1.5">
              <Link href="/presenter" className="block">
                <Button variant="secondary" size="sm" className="w-full justify-start text-xs">
                  <Sparkles className="h-3.5 w-3.5 text-sky-600 mr-2" />
                  <span>Open Dedicated Teleprompter View</span>
                </Button>
              </Link>
              <Link href="/buyer" className="block">
                <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                  <Eye className="h-3.5 w-3.5 text-emerald-600 mr-2" />
                  <span>Switch to Buyer Sandbox View</span>
                </Button>
              </Link>
              <Link href="/meeting-summary" className="block">
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs text-slate-600">
                  <CheckCircle2 className="h-3.5 w-3.5 text-slate-400 mr-2" />
                  <span>Conclude & Generate MAP</span>
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-indigo-50 rounded-2xl p-4 border border-indigo-200/80 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Storytelling Views
            </h3>
            <div className="space-y-1.5">
              <Link href="/use-cases" className="block">
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs text-indigo-800 hover:bg-indigo-100">
                  <Layers className="h-3.5 w-3.5 text-indigo-600 mr-2" />
                  <span>Platform Dilemma Story</span>
                </Button>
              </Link>
              <Link href="/learn" className="block">
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs text-indigo-800 hover:bg-indigo-100">
                  <Database className="h-3.5 w-3.5 text-indigo-600 mr-2" />
                  <span>Product Introduction</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
