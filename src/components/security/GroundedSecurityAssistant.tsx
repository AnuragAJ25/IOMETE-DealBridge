"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  ShieldCheck,
  Search,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileText,
  HelpCircle,
  ArrowRight,
  ExternalLink,
  Lock,
  RefreshCw,
  Info,
} from "lucide-react";
import { apiClient, SecurityAssistantResponse } from "@/lib/api";

const SUGGESTED_QUESTIONS = [
  "Does IOMETE have access to customer data when deployed in our AWS VPC?",
  "Can we manage our own encryption keys with AWS KMS (CMEK)?",
  "How does Apache Ranger handle column masking and row filtering?",
  "What compliance certifications are supported (SOC 2, HIPAA, GDPR)?",
  "What network ingress and egress ports are required for Kubernetes?",
];

export function GroundedSecurityAssistant() {
  const [question, setQuestion] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SecurityAssistantResponse | null>(null);

  const handleAsk = async (qToAsk?: string) => {
    const activeQ = qToAsk || question;
    if (!activeQ.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.askSecurityAssistant({
        question: activeQ,
      });
      setResult(response);
    } catch (err: any) {
      console.warn("Security Assistant error:", err);
      setError(
        err.message ||
          "Unable to connect to the backend Security Assistant. Please check FastAPI server."
      );
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSuggested = (q: string) => {
    setQuestion(q);
    handleAsk(q);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="success" size="sm">
              Documentation-Grounded AI
            </Badge>
            <span className="text-xs text-slate-400">
              Grounded in IOMETE InfoSec Whitepapers
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Enterprise Security & Compliance Assistant
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Ask technical InfoSec, compliance, or network isolation questions.
            All answers are strictly verified against official IOMETE documentation.
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs self-start sm:self-auto font-mono">
          <Lock className="h-3.5 w-3.5 text-slate-500" />
          <span>Zero-Hallucination Guardrails</span>
        </div>
      </div>

      {/* Suggested Questions Chips */}
      <div className="space-y-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
          Suggested InfoSec Questions:
        </span>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_QUESTIONS.map((sq, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectSuggested(sq)}
              className="text-left text-xs px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-700 hover:bg-sky-50 hover:border-sky-300 hover:text-sky-800 transition-colors cursor-pointer"
            >
              {sq}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="flex flex-col sm:flex-row items-stretch gap-2 pt-1">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAsk()}
            placeholder="e.g. Does IOMETE support Customer-Managed KMS keys (CMEK) for S3 storage?"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
          />
        </div>
        <Button
          onClick={() => handleAsk()}
          disabled={isLoading || !question.trim()}
          variant="primary"
          size="md"
          className="shrink-0 bg-sky-600 hover:bg-sky-500 text-white font-bold"
        >
          {isLoading ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              <span>Verifying Docs...</span>
            </>
          ) : (
            <>
              <span>Ask Security Assistant</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>
      </div>

      {/* Error / Backend Offline State */}
      {error && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1.5">
          <div className="flex items-center gap-2 font-bold text-amber-900">
            <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
            <span>AI Assistant Connection Notice</span>
          </div>
          <p className="leading-relaxed text-amber-800">
            {error}
          </p>
          <div className="text-[11px] text-amber-700 pt-1">
            Note: As per our design policy, we do not fake or simulate artificial AI
            responses. You can review the verified security specifications and
            Apache Ranger RBAC permissions in the interactive panels below.
          </div>
        </div>
      )}

      {/* Answer Panel */}
      {result && (
        <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-5 sm:p-6 space-y-4 transition-all">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900">
                Official Security Response
              </span>
            </div>

            {/* Verified vs Needs Confirmation Badge */}
            {result.needs_confirmation ? (
              <Badge variant="warning" size="sm">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Needs Confirmation • Custom Review Required
              </Badge>
            ) : (
              <Badge variant="success" size="sm">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Verified from Documentation
              </Badge>
            )}
          </div>

          {/* Answer Text */}
          <div className="text-xs sm:text-sm text-slate-800 leading-relaxed font-sans space-y-2">
            <p>{result.answer}</p>
          </div>

          {/* Unknown / Needs Confirmation state warning card */}
          {result.needs_confirmation && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
              <Info className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block mb-0.5">
                  Unknown or Unconfirmed Claim Flagged:
                </span>
                <span>
                  The official documentation does not conclusively verify this claim.
                  Our anti-hallucination guardrails have flagged this item for
                  confirmation with an IOMETE Solution Architect rather than
                  stating an unverified assumption.
                </span>
              </div>
            </div>
          )}

          {/* Source References */}
          {result.source_references && result.source_references.length > 0 && (
            <div className="pt-3 border-t border-slate-200/60 space-y-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                Supporting Documentation Citations:
              </span>
              <div className="flex flex-wrap gap-2">
                {result.source_references.map((ref, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-mono text-slate-700 shadow-2xs"
                  >
                    <FileText className="h-3 w-3 text-sky-600" />
                    <span>{ref}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
