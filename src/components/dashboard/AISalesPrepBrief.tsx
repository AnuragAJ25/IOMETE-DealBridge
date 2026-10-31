"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Sparkles,
  RefreshCw,
  Target,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ShieldAlert,
  Zap,
  Building2,
  FileText,
} from "lucide-react";
import { usePresentation } from "@/context/PresentationContext";
import { apiClient, SalesCallPrepResponse } from "@/lib/api";

export function AISalesPrepBrief() {
  const { sessionData } = usePresentation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [prepData, setPrepData] = useState<SalesCallPrepResponse | null>(null);

  const handleGenerateBrief = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.generateSalesCallPrep({
        company_name: sessionData.buyerCompany || "Northstar FinTech",
        industry: sessionData.industry || "FinTech & Financial Services",
        buyer_role: sessionData.buyerRole || "VP of Data & Infrastructure",
        known_challenges: [
          `Compute credit overruns on ${sessionData.currentWarehouse} exceeding budget by 40%`,
          "Dashboard refresh latency delays on Monday mornings during peak market open",
          "InfoSec requirements for 100% in-VPC data residency with zero egress",
        ],
        meeting_objective:
          "Secure technical consensus for a 14-day production PoC on top 5 Tableau executive dashboards.",
      });

      setPrepData(response);
    } catch (err: any) {
      console.warn("Sales Call Prep error:", err);
      setError(
        err.message ||
          "Unable to connect to the backend Sales Call Prep AI service. Please verify FastAPI backend."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="indigo" size="sm">
              AI Sales Intelligence
            </Badge>
            <span className="text-xs text-slate-400">
              Account-Grounded Pre-Call Brief
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            AI Sales Strategy Brief & Objection Traps
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Generates strategic discovery questions, persuasive narrative hooks, and
            objection counters tailored for {sessionData.buyerName} at{" "}
            {sessionData.buyerCompany}.
          </p>
        </div>

        <Button
          onClick={handleGenerateBrief}
          disabled={isLoading}
          variant="primary"
          size="md"
          className="self-start sm:self-auto bg-sky-600 hover:bg-sky-500 text-white font-bold"
        >
          {isLoading ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              <span>Synthesizing Strategy...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              <span>Generate AI Call Strategy</span>
            </>
          )}
        </Button>
      </div>

      {/* Error / Offline Notice */}
      {error && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1.5">
          <div className="flex items-center gap-2 font-bold text-amber-900">
            <AlertCircle className="h-4 w-4 text-amber-600 shrink-0" />
            <span>AI Service Notice</span>
          </div>
          <p className="leading-relaxed text-amber-800">{error}</p>
          <div className="text-[11px] text-amber-700">
            Ensure backend server is running on port 8000. Static seller
            teleprompter notes remain available in the Presenter Console.
          </div>
        </div>
      )}

      {/* Generated Strategy Brief */}
      {prepData && (
        <div className="space-y-6 pt-2">
          {/* Executive Brief Box */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-slate-800 shadow-md space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                Executive Strategy Brief
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                Persona: {sessionData.buyerRole}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
              {prepData.meeting_brief}
            </p>
          </div>

          {/* Discovery Questions & Talking Points */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Discovery Questions */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Target Discovery Questions
              </span>
              <ul className="space-y-2.5">
                {prepData.discovery_questions.map((q, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-slate-800">
                    <span className="h-5 w-5 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center text-[10px] font-bold font-mono shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed font-medium">{q}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Persuasive Talking Points */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Seller Persuasion Hooks
              </span>
              <ul className="space-y-2.5">
                {prepData.talking_points.map((tp, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <Zap className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{tp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Objections & Recommended Responses */}
          {prepData.potential_objections && prepData.potential_objections.length > 0 && (
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Likely Buyer Objections & Counter-Arguments
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {prepData.potential_objections.map((obj, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700">
                      <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
                      <span>Objection: {obj.objection}</span>
                    </div>
                    <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                      <span className="font-semibold text-slate-800 block mb-0.5">
                        Recommended Seller Response:
                      </span>
                      {obj.recommended_response}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Verification Notes */}
          {prepData.verification_notes && prepData.verification_notes.length > 0 && (
            <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200/80 space-y-1.5 text-xs text-sky-950">
              <span className="font-bold block">
                Items to Confirm with Buyer (Do Not Assume):
              </span>
              <ul className="list-disc list-inside space-y-1 text-sky-900">
                {prepData.verification_notes.map((vn, i) => (
                  <li key={i}>{vn}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
