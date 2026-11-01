"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePresentation } from "@/context/PresentationContext";
import { PageHeader } from "@/components/common/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  DollarSign,
  TrendingDown,
  Calculator,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  SlidersHorizontal,
  Info,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function BusinessCasePage() {
  const { sessionData, updateSessionData } = usePresentation();

  // User-entered assumption inputs
  const [currentInfraCost, setCurrentInfraCost] = useState<number>(36000);
  const [currentOperationalCost, setCurrentOperationalCost] = useState<number>(6000);
  const [workloadGrowthPercent, setWorkloadGrowthPercent] = useState<number>(20);
  const [proposedPlatformCost, setProposedPlatformCost] = useState<number>(11500);
  const [proposedOperationalCost, setProposedOperationalCost] = useState<number>(2500);
  const [selectedProvider, setSelectedProvider] = useState<string>(
    sessionData.currentWarehouse || "Snowflake"
  );

  // Derived Monthly Outputs
  const currentTotalMonthly = currentInfraCost + currentOperationalCost;
  const proposedTotalMonthly = proposedPlatformCost + proposedOperationalCost;
  const monthlySavings = currentTotalMonthly - proposedTotalMonthly;
  const monthlySavingsPercent =
    currentTotalMonthly > 0
      ? Math.round((monthlySavings / currentTotalMonthly) * 100)
      : 0;

  // Derived Annualized Estimates
  const currentAnnualTotal = currentTotalMonthly * 12;
  const proposedAnnualTotal = proposedTotalMonthly * 12;
  const annualSavings = currentAnnualTotal - proposedAnnualTotal;

  // 3-Year Projections with User-entered Growth
  const growthRate = workloadGrowthPercent / 100;
  const year1Current = currentAnnualTotal;
  const year2Current = Math.round(year1Current * (1 + growthRate));
  const year3Current = Math.round(year2Current * (1 + growthRate));
  const total3YearCurrent = year1Current + year2Current + year3Current;

  // Proposed growth applies at lower infra overhead due to automated Iceberg compaction
  const proposedGrowthRate = growthRate * 0.7;
  const year1Proposed = proposedAnnualTotal;
  const year2Proposed = Math.round(year1Proposed * (1 + proposedGrowthRate));
  const year3Proposed = Math.round(year2Proposed * (1 + proposedGrowthRate));
  const total3YearProposed = year1Proposed + year2Proposed + year3Proposed;

  const threeYearCumulativeDifference = total3YearCurrent - total3YearProposed;

  const chartData = [
    {
      name: "Year 1",
      [selectedProvider]: Math.round(year1Current / 1000),
      "Proposed (IOMETE)": Math.round(year1Proposed / 1000),
    },
    {
      name: "Year 2",
      [selectedProvider]: Math.round(year2Current / 1000),
      "Proposed (IOMETE)": Math.round(year2Proposed / 1000),
    },
    {
      name: "Year 3",
      [selectedProvider]: Math.round(year3Current / 1000),
      "Proposed (IOMETE)": Math.round(year3Proposed / 1000),
    },
  ];

  const handleResetDefaults = () => {
    setCurrentInfraCost(36000);
    setCurrentOperationalCost(6000);
    setWorkloadGrowthPercent(20);
    setProposedPlatformCost(11500);
    setProposedOperationalCost(2500);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <PageHeader
        title="Pricing & Business Case Calculator"
        subtitle="Evaluate potential monthly and annualized financial models based on editable operational assumptions. Contact IOMETE for a tailored quote."
        badgeText="Commercial Evaluation"
      />

      {/* Mandatory Pricing & Guarantee Disclaimer */}
      <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 text-xs space-y-1">
        <div className="flex items-center gap-2 font-bold text-amber-900">
          <AlertCircle className="h-4 w-4 text-amber-600 shrink-0" />
          <span>Non-Binding Financial Estimate & Pricing Disclaimer</span>
        </div>
        <p className="leading-relaxed">
          All financial figures, projections, and calculations presented on this page are
          <strong> non-binding estimates based strictly on user-entered assumptions</strong>.
          IOMETE does not publish invented or fixed list prices in this sales model, and does not claim
          guaranteed savings. Actual platform expenditures depend on customer-chosen cloud VM configurations,
          regional compute rates, spot instance utilization, and live query workload volume.
        </p>
      </div>

      {/* Top 4 Core Output KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Output 1: Current Estimated Monthly */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
            Current Est. Monthly
          </span>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">
            ${currentTotalMonthly.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-500 block">
            ${currentInfraCost.toLocaleString()} infra + ${currentOperationalCost.toLocaleString()} ops
          </span>
        </div>

        {/* Output 2: Proposed Estimated Monthly */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-sky-600 block">
            Proposed Est. Monthly
          </span>
          <div className="text-2xl font-extrabold text-sky-700 font-mono">
            ${proposedTotalMonthly.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-500 block">
            ${proposedPlatformCost.toLocaleString()} platform + ${proposedOperationalCost.toLocaleString()} ops
          </span>
        </div>

        {/* Output 3: Estimated Monthly Difference */}
        <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-800 block">
              Estimated Monthly Delta
            </span>
            <Badge variant="success" size="sm">
              -{monthlySavingsPercent}%
            </Badge>
          </div>
          <div className="text-2xl font-extrabold text-emerald-700 font-mono">
            -${monthlySavings.toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-800 block">
            Estimated monthly operational reduction
          </span>
        </div>

        {/* Output 4: Annualized Estimate */}
        <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
            Annualized Net Delta
          </span>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono">
            -${annualSavings.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-400 block">
            ${currentAnnualTotal.toLocaleString()} vs ${proposedAnnualTotal.toLocaleString()} est/yr
          </span>
        </div>
      </div>

      {/* Main Interactive Controls + Visualizer Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 5 Cols: Editable Assumptions Form */}
        <div className="lg:col-span-5 space-y-5 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-sky-600" />
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Editable Assumptions
              </h3>
            </div>
            <button
              onClick={handleResetDefaults}
              className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Incumbent Provider Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Current Platform to Compare:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["Snowflake", "Databricks", "BigQuery"].map((prov) => (
                <button
                  key={prov}
                  onClick={() => setSelectedProvider(prov)}
                  className={`py-2 px-2 text-xs font-semibold rounded-xl border text-center transition-all cursor-pointer ${
                    selectedProvider === prov
                      ? "bg-sky-50 border-sky-400 text-sky-800 shadow-xs font-bold"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {prov}
                </button>
              ))}
            </div>
          </div>

          {/* Input 1: Current Infrastructure Cost */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <div className="flex justify-between text-xs">
              <span className="text-slate-600 font-medium">
                Current Infrastructure Cost ($/mo)
              </span>
              <span className="font-bold text-slate-900 font-mono">
                ${currentInfraCost.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={5000}
              max={150000}
              step={2500}
              value={currentInfraCost}
              onChange={(e) => setCurrentInfraCost(Number(e.target.value))}
              className="w-full accent-sky-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>$5,000/mo</span>
              <span>$150,000/mo</span>
            </div>
          </div>

          {/* Input 2: Current Operational Cost */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <div className="flex justify-between text-xs">
              <span className="text-slate-600 font-medium">
                Current Operational Cost ($/mo)
              </span>
              <span className="font-bold text-slate-900 font-mono">
                ${currentOperationalCost.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={1000}
              max={30000}
              step={1000}
              value={currentOperationalCost}
              onChange={(e) => setCurrentOperationalCost(Number(e.target.value))}
              className="w-full accent-sky-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>$1,000/mo</span>
              <span>$30,000/mo</span>
            </div>
          </div>

          {/* Input 3: Workload Growth Rate */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <div className="flex justify-between text-xs">
              <span className="text-slate-600 font-medium">
                Annual Workload Growth Rate (%)
              </span>
              <span className="font-bold text-slate-900 font-mono">
                {workloadGrowthPercent}% per year
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={60}
              step={5}
              value={workloadGrowthPercent}
              onChange={(e) => setWorkloadGrowthPercent(Number(e.target.value))}
              className="w-full accent-sky-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>5% Baseline</span>
              <span>60% Fast-Growth</span>
            </div>
          </div>

          {/* Input 4: Estimated Proposed Platform Cost */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <div className="flex justify-between text-xs">
              <span className="text-slate-600 font-medium">
                Est. Proposed Platform Cost ($/mo)
              </span>
              <span className="font-bold text-sky-700 font-mono">
                ${proposedPlatformCost.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={3000}
              max={60000}
              step={1000}
              value={proposedPlatformCost}
              onChange={(e) => setProposedPlatformCost(Number(e.target.value))}
              className="w-full accent-sky-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>$3,000/mo</span>
              <span>$60,000/mo</span>
            </div>
          </div>

          {/* Input 5: Estimated Proposed Operational Cost */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <div className="flex justify-between text-xs">
              <span className="text-slate-600 font-medium">
                Est. Proposed Operational Cost ($/mo)
              </span>
              <span className="font-bold text-sky-700 font-mono">
                ${proposedOperationalCost.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={500}
              max={15000}
              step={500}
              value={proposedOperationalCost}
              onChange={(e) => setProposedOperationalCost(Number(e.target.value))}
              className="w-full accent-sky-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>$500/mo</span>
              <span>$15,000/mo</span>
            </div>
          </div>
        </div>

        {/* Right 7 Cols: 3-Year Recharts Visual Comparison & Detailed Table */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  3-Year Visual Comparison Chart ($ in Thousands)
                </h3>
                <p className="text-xs text-slate-500">
                  Projected cumulative spend including {workloadGrowthPercent}% annual growth.
                </p>
              </div>
              <Badge variant="success" size="sm">
                ${(threeYearCumulativeDifference / 1000).toFixed(0)}k 3-Year Total Delta
              </Badge>
            </div>

            {/* Recharts BarChart */}
            <div className="h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#64748b" }} />
                  <YAxis tick={{ fontSize: 12, fill: "#64748b" }} unit="k" />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      color: "#fff",
                      borderRadius: "0.75rem",
                      fontSize: "12px",
                      border: "none",
                    }}
                    formatter={(val) => [`$${Number(val)}k`, "Spend Estimate"]}
                  />
                  <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
                  <Bar dataKey={selectedProvider} fill="#94a3b8" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="Proposed (IOMETE)" fill="#0284c7" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Detailed Annualized Estimates Table */}
            <div className="overflow-x-auto pt-3 border-t border-slate-100">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-[10px]">
                  <tr>
                    <th className="p-2.5">Timeline</th>
                    <th className="p-2.5">{selectedProvider} (Est.)</th>
                    <th className="p-2.5">Proposed (Est.)</th>
                    <th className="p-2.5 text-right font-bold text-emerald-600">
                      Estimated Difference
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  <tr>
                    <td className="p-2.5 font-sans font-medium text-slate-700">Year 1</td>
                    <td className="p-2.5 text-slate-500">
                      ${(year1Current / 1000).toFixed(0)}k
                    </td>
                    <td className="p-2.5 text-sky-700 font-semibold">
                      ${(year1Proposed / 1000).toFixed(0)}k
                    </td>
                    <td className="p-2.5 text-right text-emerald-600 font-bold">
                      -${((year1Current - year1Proposed) / 1000).toFixed(0)}k
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-sans font-medium text-slate-700">Year 2</td>
                    <td className="p-2.5 text-slate-500">
                      ${(year2Current / 1000).toFixed(0)}k
                    </td>
                    <td className="p-2.5 text-sky-700 font-semibold">
                      ${(year2Proposed / 1000).toFixed(0)}k
                    </td>
                    <td className="p-2.5 text-right text-emerald-600 font-bold">
                      -${((year2Current - year2Proposed) / 1000).toFixed(0)}k
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-sans font-medium text-slate-700">Year 3</td>
                    <td className="p-2.5 text-slate-500">
                      ${(year3Current / 1000).toFixed(0)}k
                    </td>
                    <td className="p-2.5 text-sky-700 font-semibold">
                      ${(year3Proposed / 1000).toFixed(0)}k
                    </td>
                    <td className="p-2.5 text-right text-emerald-600 font-bold">
                      -${((year3Current - year3Proposed) / 1000).toFixed(0)}k
                    </td>
                  </tr>
                  <tr className="bg-slate-50/80 font-bold">
                    <td className="p-2.5 font-sans text-slate-900">3-Year Cumulative</td>
                    <td className="p-2.5 text-slate-700">
                      ${(total3YearCurrent / 1000).toFixed(0)}k
                    </td>
                    <td className="p-2.5 text-sky-800">
                      ${(total3YearProposed / 1000).toFixed(0)}k
                    </td>
                    <td className="p-2.5 text-right text-emerald-700">
                      -${(threeYearCumulativeDifference / 1000).toFixed(0)}k
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
