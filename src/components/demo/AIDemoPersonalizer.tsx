"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Sparkles,
  RefreshCw,
  Sliders,
  CheckCircle2,
  AlertCircle,
  Terminal,
  Play,
  ArrowRight,
  Tv,
  Layers,
} from "lucide-react";
import { usePresentation } from "@/context/PresentationContext";
import { apiClient, DemoPersonalizerResponse } from "@/lib/api";

export function AIDemoPersonalizer() {
  const { sessionData } = usePresentation();
  const [industry, setIndustry] = useState<string>("FinTech");
  const [technicalLevel, setTechnicalLevel] = useState<string>("Intermediate");
  const [useCase, setUseCase] = useState<string>(
    "Sub-second executive Tableau BI queries and in-VPC data sovereignty"
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [demoPlan, setDemoPlan] = useState<DemoPersonalizerResponse | null>(null);

  const handleGeneratePlan = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.generateDemoPersonalizer({
        industry,
        use_case: useCase,
        buyer_requirements: [
          "Sub-second Tableau dashboard latency",
          "Customer private VPC deployment on AWS",
          "Automated Iceberg compaction with zero maintenance",
        ],
        technical_level: technicalLevel,
      });

      setDemoPlan(response);
    } catch (err: any) {
      console.warn("Demo Personalizer error:", err);
      setError(
        err.message ||
          "Unable to connect to Demo Personalizer service. Please verify FastAPI server."
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
              AI Demo Tailor
            </Badge>
            <span className="text-xs text-slate-400">
              Personalized Storyline & Script
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            AI Demo Journey Personalizer
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Generate an audience-tailored demo script, storyline, and UI click-path
            grounded in {sessionData.buyerCompany}'s technical requirements.
          </p>
        </div>

        <Button
          onClick={handleGeneratePlan}
          disabled={isLoading}
          variant="primary"
          size="md"
          className="self-start sm:self-auto bg-sky-600 hover:bg-sky-500 text-white font-bold"
        >
          {isLoading ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              <span>Tailoring Demo...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              <span>Tailor Demo Journey</span>
            </>
          )}
        </Button>
      </div>

      {/* Input Parameter Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
        <div>
          <label className="font-bold text-slate-600 block mb-1">Target Industry:</label>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 font-medium"
          >
            <option value="FinTech">Banking & FinTech</option>
            <option value="Healthcare">Healthcare & Life Sciences</option>
            <option value="Retail">Retail & E-Commerce</option>
            <option value="Manufacturing">Manufacturing & Supply Chain</option>
            <option value="Telecommunications">Telecommunications</option>
          </select>
        </div>

        <div>
          <label className="font-bold text-slate-600 block mb-1">Audience Depth:</label>
          <select
            value={technicalLevel}
            onChange={(e) => setTechnicalLevel(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 font-medium"
          >
            <option value="Executive">Executive / Economic Buyer</option>
            <option value="Intermediate">Intermediate (Data Lead/Architect)</option>
            <option value="Hands-On Data Engineer">Hands-On Data Engineer</option>
          </select>
        </div>

        <div>
          <label className="font-bold text-slate-600 block mb-1">Target Workload Focus:</label>
          <input
            type="text"
            value={useCase}
            onChange={(e) => setUseCase(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-800"
          />
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

      {/* Generated Demo Plan */}
      {demoPlan && (
        <div className="space-y-6 pt-2">
          {/* Storyline Narrative */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-slate-800 shadow-md space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                Tailored Demo Storyline
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                Level: {technicalLevel}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
              {demoPlan.demo_storyline}
            </p>
          </div>

          {/* Grid: Components & Talking Points */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Components to Showcase */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Platform Screens to Showcase
              </span>
              <ul className="space-y-2">
                {demoPlan.relevant_components.map((comp, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-800">
                    <CheckCircle2 className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
                    <span className="font-medium">{comp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Seller Narration Points */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Seller Narration Points
              </span>
              <ul className="space-y-2">
                {demoPlan.seller_talking_points.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <Sparkles className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sample Scenario & Suggested Next Step */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 text-xs space-y-1">
              <span className="font-bold text-slate-900 block">
                Sample Data Scenario Context:
              </span>
              <p className="text-slate-600 leading-relaxed">
                {demoPlan.sample_data_scenario}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200/80 text-xs space-y-1">
              <span className="font-bold text-sky-950 block">
                Transition to Next Step:
              </span>
              <p className="text-sky-900 leading-relaxed">
                {demoPlan.suggested_next_step}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
