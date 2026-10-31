"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Sparkles,
  RefreshCw,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Layers,
  ArrowRight,
  BookOpen,
  DollarSign,
  Cpu,
  ShieldCheck,
} from "lucide-react";
import { apiClient, ProductExplainerResponse } from "@/lib/api";

const TOPIC_OPTIONS = [
  "Decoupled Compute & Storage on Apache Iceberg",
  "Zero-Copy In-Place Migration from Parquet",
  "Automated Background Compaction & Vacuuming",
  "Data Sovereignty & Zero-Data-Retention in Customer VPC",
  "Transparent Infrastructure Pricing vs Opaque Snowflake Credits",
];

export function AIProductExplainer() {
  const [buyerRole, setBuyerRole] = useState<string>("VP Data Platform");
  const [technicalLevel, setTechnicalLevel] = useState<string>("Intermediate");
  const [topic, setTopic] = useState<string>(TOPIC_OPTIONS[0]);
  const [style, setStyle] = useState<string>("Analogy-Driven");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<ProductExplainerResponse | null>(null);

  const handleGenerateExplanation = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.generateProductExplainer({
        buyer_role: buyerRole,
        technical_level: technicalLevel,
        topic,
        explanation_preference: style,
      });

      setExplanation(response);
    } catch (err: any) {
      console.warn("Product Explainer error:", err);
      setError(
        err.message ||
          "Unable to connect to the Product Explainer service. Please verify FastAPI backend."
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
              Persona-Tailored Pitch AI
            </Badge>
            <span className="text-xs text-slate-400">
              Grounded Lakehouse Primer
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Audience-Tailored Product Explainer
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Generate custom Lakehouse technical explanations, business ROI
            rationales, and analogies specifically adapted to your prospect's
            seniority and focus.
          </p>
        </div>

        <Button
          onClick={handleGenerateExplanation}
          disabled={isLoading}
          variant="primary"
          size="md"
          className="self-start sm:self-auto bg-sky-600 hover:bg-sky-500 text-white font-bold"
        >
          {isLoading ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              <span>Tailoring Explanation...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              <span>Explain for Persona</span>
            </>
          )}
        </Button>
      </div>

      {/* Selectors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
        <div>
          <label className="font-bold text-slate-600 block mb-1">Buyer Persona:</label>
          <select
            value={buyerRole}
            onChange={(e) => setBuyerRole(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 font-medium"
          >
            <option value="CIO / CTO">CIO / CTO (Strategic)</option>
            <option value="VP Data Platform">VP of Data Platform (Architectural)</option>
            <option value="Lead Data Engineer">Lead Data Engineer (Hands-On)</option>
            <option value="Head of FinOps">Head of FinOps (Financial)</option>
            <option value="Chief Information Security Officer">CISO (Security)</option>
          </select>
        </div>

        <div>
          <label className="font-bold text-slate-600 block mb-1">Technical Depth:</label>
          <select
            value={technicalLevel}
            onChange={(e) => setTechnicalLevel(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 font-medium"
          >
            <option value="Executive">Executive (High-Level)</option>
            <option value="Intermediate">Intermediate (Standard)</option>
            <option value="Deep Technical">Deep Technical (Protocol Level)</option>
          </select>
        </div>

        <div>
          <label className="font-bold text-slate-600 block mb-1">Topic to Explain:</label>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 font-medium"
          >
            {TOPIC_OPTIONS.map((top, idx) => (
              <option key={idx} value={top}>
                {top}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-bold text-slate-600 block mb-1">Explanation Style:</label>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 font-medium"
          >
            <option value="Analogy-Driven">Analogy-Driven</option>
            <option value="Financial/ROI-Focused">Financial / ROI-Focused</option>
            <option value="Deep Architecture">Deep Architecture</option>
            <option value="Bullet Points">Bullet Points</option>
          </select>
        </div>
      </div>

      {/* Error / Offline Notice */}
      {error && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1.5">
          <div className="flex items-center gap-2 font-bold text-amber-900">
            <AlertCircle className="h-4 w-4 text-amber-600 shrink-0" />
            <span>AI Service Notice</span>
          </div>
          <p className="leading-relaxed text-amber-800">{error}</p>
        </div>
      )}

      {/* Generated Response */}
      {explanation && (
        <div className="space-y-6 pt-2">
          {/* Plain-Language Simple Explanation */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-slate-800 shadow-md space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                Tailored Explanation for {buyerRole}
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                Style: {style}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
              {explanation.simple_explanation}
            </p>
          </div>

          {/* 2-Column: Business Relevance vs Technical Architecture */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                <DollarSign className="h-4 w-4 text-emerald-600" />
                <span>Business & Economic Relevance</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {explanation.business_relevance}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                <Cpu className="h-4 w-4 text-indigo-600" />
                <span>Technical Architecture Details</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {explanation.technical_explanation}
              </p>
            </div>
          </div>

          {/* Practical Example & Follow-Up Question */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 text-xs space-y-1">
              <span className="font-bold text-slate-900 block">
                Practical Real-World Example:
              </span>
              <p className="text-slate-600 leading-relaxed">
                {explanation.practical_example}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200/80 text-xs space-y-1">
              <span className="font-bold text-sky-950 block">
                Impactful Follow-Up Question to Ask:
              </span>
              <p className="text-sky-900 leading-relaxed font-medium">
                "{explanation.follow_up_question}"
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
