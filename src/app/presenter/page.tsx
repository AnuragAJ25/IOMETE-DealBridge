"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePresentation } from "@/context/PresentationContext";
import { PageHeader } from "@/components/common/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Sparkles,
  Clock,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  HelpCircle,
  Play,
  RotateCcw,
  Pause,
  ExternalLink,
  Target,
  FileCheck,
} from "lucide-react";

export default function PresenterConsolePage() {
  const {
    currentStage,
    currentStageIndex,
    nextStage,
    prevStage,
    stages,
    goToStage,
    meetingTimeElapsed,
    isTimerRunning,
    toggleTimer,
    resetTimer,
    sessionData,
    updateSessionData,
  } = usePresentation();

  const [questionInput, setQuestionInput] = useState("");

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionInput.trim()) return;
    updateSessionData({
      bookmarkedQuestions: [...sessionData.bookmarkedQuestions, questionInput.trim()],
    });
    setQuestionInput("");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        badge="Seller Command HUD"
        badgeVariant="indigo"
        title="Presenter Teleprompter & Live Console"
        subtitle="Private seller screen with live talking points, objection handles, pacing radar, and question logger."
        breadcrumbs={[{ label: "DealBridge", href: "/" }, { label: "Presenter Console" }]}
        actions={
          <div className="flex items-center gap-2">
            <Link href="/meeting">
              <Button variant="secondary" size="sm">
                <span>Meeting Room</span>
              </Button>
            </Link>
            <Link href={currentStage.route}>
              <Button variant="primary" size="sm">
                <span>View Stage as Buyer</span>
                <ExternalLink className="h-3.5 w-3.5 ml-1" />
              </Button>
            </Link>
          </div>
        }
      />

      {/* Top Banner: Stage Nav & Pacing Clock */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="indigo" size="sm">
              Stage {currentStage.number} of {stages.length}
            </Badge>
            <span className="text-xs text-sky-400 font-medium">
              {currentStage.category}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            {currentStage.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Strategic Objective: <span className="text-slate-200">{currentStage.sellerGoal}</span>
          </p>
        </div>

        {/* Meeting Timer & Remote Navigation */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700 font-mono text-sm">
            <Clock className="h-4 w-4 text-sky-400" />
            <span className="font-bold text-white">{formatTime(meetingTimeElapsed)}</span>
            <button
              onClick={toggleTimer}
              className="p-1 text-slate-400 hover:text-white transition-colors"
            >
              {isTimerRunning ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            </button>
            <button
              onClick={resetTimer}
              className="p-1 text-slate-400 hover:text-white transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              variant="secondary"
              size="sm"
              onClick={prevStage}
              disabled={currentStageIndex === 0}
              className="bg-slate-800 hover:bg-slate-700 text-white border-slate-700 disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Prev</span>
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={nextStage}
              disabled={currentStageIndex === stages.length - 1}
              className="disabled:opacity-30"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Grid: Teleprompter Pitch, Objections, & Question Logger */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Main Talking Points & Script */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <MessageSquare className="h-4 w-4 text-sky-600" />
                <span>Primary Talking Points & Slide Script</span>
              </div>
              <Badge variant="default" size="sm">
                Target: {currentStage.durationMin} mins
              </Badge>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
                  Step 1 • Hook & Reframe
                </span>
                <p className="text-sm text-slate-800 leading-relaxed font-medium">
                  &ldquo;Alex, you mentioned Snowflake credits are 40% over budget. Today we want to show
                  how decoupling your compute from storage with Apache Iceberg preserves your BI speed while
                  permanently fixing your budget.&rdquo;
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
                  Step 2 • Technical Proof Point
                </span>
                <p className="text-sm text-slate-800 leading-relaxed font-medium">
                  &ldquo;Notice on the architecture screen: IOMETE spins up zero-copy Spark compute directly
                  against your existing AWS S3 buckets. Your data stays 100% inside your VPC.&rdquo;
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
                  Step 3 • Call-to-Action Bridge
                </span>
                <p className="text-sm text-slate-800 leading-relaxed font-medium">
                  &ldquo;Let&apos;s plug your 120 TB dataset into the TCO model together right now to see the exact
                  annual impact for Northstar FinTech.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Objection Rapid Response */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 pb-3 border-b border-slate-100">
              <AlertTriangle className="h-4 w-4 text-rose-500" />
              <span>Likely Buyer Objections & Recommended Pivot</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-rose-50/50 border border-rose-200/60 space-y-1.5">
                <p className="text-xs font-bold text-rose-950">
                  &ldquo;Is Iceberg maintenance going to overload our team?&rdquo;
                </p>
                <p className="text-xs text-rose-900/80 leading-relaxed">
                  <strong>Answer:</strong> IOMETE automates file compaction, snapshot expiration, and metadata pruning in the background. Zero maintenance overhead for your engineers.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-rose-50/50 border border-rose-200/60 space-y-1.5">
                <p className="text-xs font-bold text-rose-950">
                  &ldquo;Can we migrate without rewriting our BI dashboards?&rdquo;
                </p>
                <p className="text-xs text-rose-900/80 leading-relaxed">
                  <strong>Answer:</strong> Yes. Standard JDBC/ODBC connectors plug straight into Tableau and Looker. ANSI SQL compatibility means zero SQL rewrite.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Live Question Intake & Deal Telemetry */}
        <div className="space-y-6">
          {/* Question Logger */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <HelpCircle className="h-4 w-4 text-amber-500" />
                <span>Live Buyer Question Log</span>
              </div>
              <Badge variant="warning" size="sm">
                {sessionData.bookmarkedQuestions.length} Saved
              </Badge>
            </div>

            <p className="text-xs text-slate-500">
              Log questions during the conversation. They will automatically be compiled into the executive recap packet.
            </p>

            <form onSubmit={handleAddQuestion} className="space-y-2">
              <textarea
                rows={2}
                placeholder="Log question or objection here..."
                value={questionInput}
                onChange={(e) => setQuestionInput(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500 resize-none"
              />
              <Button type="submit" size="sm" variant="primary" className="w-full justify-center">
                <span>Save Question to MAP</span>
              </Button>
            </form>

            <div className="space-y-2 pt-2 border-t border-slate-100 max-h-56 overflow-y-auto">
              {sessionData.bookmarkedQuestions.map((q, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-700 font-medium"
                >
                  &ldquo;{q}&rdquo;
                </div>
              ))}
            </div>
          </div>

          {/* Deal Target Snapshot */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <Target className="h-4 w-4 text-sky-600" />
              <span>Target Account Summary</span>
            </div>
            <div className="text-xs space-y-1.5 text-slate-600">
              <div className="flex justify-between">
                <span>Account:</span>
                <span className="font-bold text-slate-900">{sessionData.buyerCompany}</span>
              </div>
              <div className="flex justify-between">
                <span>Current Monthly Cloud:</span>
                <span className="font-bold text-slate-900">${sessionData.monthlyCloudSpend.toLocaleString()}/mo</span>
              </div>
              <div className="flex justify-between">
                <span>Dataset:</span>
                <span className="font-bold text-slate-900">{sessionData.dataSizeTB} TB Iceberg</span>
              </div>
            </div>

            <Link href="/meeting-summary" className="block pt-3">
              <Button variant="outline" size="sm" className="w-full justify-center">
                <FileCheck className="h-3.5 w-3.5 mr-1" />
                <span>Open Follow-Up Charter</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
