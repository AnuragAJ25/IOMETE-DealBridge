"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Sparkles,
  RefreshCw,
  FileText,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Send,
  Copy,
  Check,
} from "lucide-react";
import { usePresentation } from "@/context/PresentationContext";
import { apiClient, MeetingSummaryResponse } from "@/lib/api";

export function AIMeetingSummaryGenerator() {
  const { sessionData, updateSessionData } = usePresentation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [summaryData, setSummaryData] = useState<MeetingSummaryResponse | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const handleGenerateSummary = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.generateMeetingSummary({
        buyer_requirements:
          sessionData.selectedRequirements.length > 0
            ? sessionData.selectedRequirements
            : ["Sub-second Tableau dashboard latency", "Private VPC in AWS", "Cost reduction >50%"],
        selected_use_cases:
          sessionData.selectedUseCases && sessionData.selectedUseCases.length > 0
            ? sessionData.selectedUseCases
            : ["Warehouse Cost Deflation & Iceberg Migration", "Sub-Second BI Acceleration"],
        questions_discussed:
          sessionData.bookmarkedQuestions && sessionData.bookmarkedQuestions.length > 0
            ? sessionData.bookmarkedQuestions
            : [
                "How does automated Iceberg file compaction work?",
                "Can we bring existing AWS IAM roles directly to private clusters?",
              ],
        seller_notes: sessionData.sellerNotes || "Buyer facing urgent Q4 CFO budget pressure.",
        next_steps: [
          "Deliver IOMETE Security Whitepaper and SOC2 compliance pack",
          "Conduct 45-minute technical VPC architecture session with infrastructure team",
          "Initiate 14-day production PoC charter",
        ],
      });

      setSummaryData(response);
    } catch (err: any) {
      console.warn("Meeting summary generation error:", err);
      setError(
        err.message ||
          "Unable to connect to the backend AI Meeting Summary service. Please check FastAPI server."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyText = () => {
    if (!summaryData) return;
    const text = `EXECUTIVE MEETING SUMMARY: ${sessionData.buyerCompany}\n\n${summaryData.meeting_summary}\n\nKEY REQUIREMENTS:\n${summaryData.key_requirements.map((r) => `- ${r}`).join("\n")}\n\nDISCUSSED CAPABILITIES:\n${summaryData.discussed_capabilities.map((c) => `- ${c}`).join("\n")}\n\nRECOMMENDED NEXT STEPS:\n${summaryData.recommended_next_steps.map((s) => `- ${s}`).join("\n")}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="indigo" size="sm">
              AI Sales Copilot
            </Badge>
            <span className="text-xs text-slate-400">
              Grounded Post-Call Intelligence
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Grounded AI Executive Meeting Summary
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Synthesizes current session data for {sessionData.buyerCompany} into an
            actionable executive brief, validated requirements list, and mutual
            milestone plan.
          </p>
        </div>

        <Button
          onClick={handleGenerateSummary}
          disabled={isLoading}
          variant="primary"
          size="md"
          className="self-start sm:self-auto bg-sky-600 hover:bg-sky-500 text-white font-bold"
        >
          {isLoading ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              <span>Generating AI Brief...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              <span>Generate AI Summary</span>
            </>
          )}
        </Button>
      </div>

      {/* Seller Notes Context Display */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Current Session Context Fed to AI:
          </span>
          <span className="text-[11px] text-slate-400">
            Account: {sessionData.buyerCompany} ({sessionData.buyerRole})
          </span>
        </div>
        <textarea
          value={sessionData.sellerNotes || ""}
          onChange={(e) => updateSessionData({ sellerNotes: e.target.value })}
          placeholder="Add seller observations or specific buyer objections discussed during the call..."
          rows={2}
          className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all resize-none"
        />
      </div>

      {/* Error / Backend Offline Notice */}
      {error && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1.5">
          <div className="flex items-center gap-2 font-bold text-amber-900">
            <AlertCircle className="h-4 w-4 text-amber-600 shrink-0" />
            <span>AI Service Notification</span>
          </div>
          <p className="leading-relaxed text-amber-800">{error}</p>
          <div className="text-[11px] text-amber-700">
            Ensure the FastAPI backend server is running on port 8000 and has a
            valid GEMINI_API_KEY set. The static Mutual Action Plan below
            remains fully accessible.
          </div>
        </div>
      )}

      {/* Generated Summary Card */}
      {summaryData && (
        <div className="space-y-6 pt-2">
          {/* Executive Summary */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-slate-800 shadow-md space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <Badge variant="indigo" size="sm">
                Executive Synthesis
              </Badge>
              <button
                onClick={handleCopyText}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Summary</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
              {summaryData.meeting_summary}
            </p>
          </div>

          {/* 3 Grid Pillars: Validated Requirements, Discussed Capabilities, Unanswered Questions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Key Requirements */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Validated Buyer Needs
              </span>
              <ul className="space-y-2">
                {summaryData.key_requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Discussed Capabilities */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                IOMETE Capabilities Mapped
              </span>
              <ul className="space-y-2">
                {summaryData.discussed_capabilities.map((cap, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <Sparkles className="h-3.5 w-3.5 text-sky-500 shrink-0 mt-0.5" />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Unanswered Questions */}
            <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block">
                Open Action Items
              </span>
              <ul className="space-y-2">
                {summaryData.unanswered_questions.map((q, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-amber-900">
                    <HelpCircle className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recommended Next Steps */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              AI-Generated Next Steps for Follow-Up
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {summaryData.recommended_next_steps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1 text-xs"
                >
                  <span className="font-mono text-[10px] font-bold text-sky-600 uppercase">
                    Step {idx + 1}
                  </span>
                  <p className="text-slate-800 font-medium">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
