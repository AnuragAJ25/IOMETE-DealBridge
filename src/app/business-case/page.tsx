"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePresentation } from "@/context/PresentationContext";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  DollarSign,
  TrendingDown,
  Calculator,
  Download,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  PieChart,
  BarChart2,
  Calendar,
  Layers,
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

  const [monthlySpend, setMonthlySpend] = useState<number>(sessionData.monthlyCloudSpend || 42000);
  const [dataSizeTB, setDataSizeTB] = useState<number>(sessionData.dataSizeTB || 120);
  const [selectedProvider, setSelectedProvider] = useState<string>(sessionData.currentWarehouse || "Snowflake");
  const [growthRatePercent, setGrowthRatePercent] = useState<number>(20);

  // Sync back to session
  const handleSpendChange = (val: number) => {
    setMonthlySpend(val);
    updateSessionData({ monthlyCloudSpend: val });
  };

  const handleDataSizeChange = (val: number) => {
    setDataSizeTB(val);
    updateSessionData({ dataSizeTB: val });
  };

  // Calculations
  const currentAnnualSpend = monthlySpend * 12;
  const iometeSavingsRate = selectedProvider === "Snowflake" ? 0.68 : selectedProvider === "Databricks" ? 0.62 : 0.58;
  const annualSavings = Math.round(currentAnnualSpend * iometeSavingsRate);
  const iometeAnnualSpend = currentAnnualSpend - annualSavings;

  // 3-Year Projections with growth
  const year1Incumbent = Math.round(currentAnnualSpend);
  const year2Incumbent = Math.round(currentAnnualSpend * (1 + growthRatePercent / 100));
  const year3Incumbent = Math.round(year2Incumbent * (1 + growthRatePercent / 100));
  const totalIncumbent3Year = year1Incumbent + year2Incumbent + year3Incumbent;

  const year1Iomete = Math.round(iometeAnnualSpend);
  const year2Iomete = Math.round(iometeAnnualSpend * (1 + (growthRatePercent * 0.7) / 100));
  const year3Iomete = Math.round(year2Iomete * (1 + (growthRatePercent * 0.7) / 100));
  const totalIomete3Year = year1Iomete + year2Iomete + year3Iomete;

  const threeYearCumulativeSavings = totalIncumbent3Year - totalIomete3Year;
  const paybackMonths = 1.6;

  const chartData = [
    { name: "Year 1", [selectedProvider]: Math.round(year1Incumbent / 1000), IOMETE: Math.round(year1Iomete / 1000) },
    { name: "Year 2", [selectedProvider]: Math.round(year2Incumbent / 1000), IOMETE: Math.round(year2Iomete / 1000) },
    { name: "Year 3", [selectedProvider]: Math.round(year3Incumbent / 1000), IOMETE: Math.round(year3Iomete / 1000) },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        badge="Stage 5 of 7 • Business Case"
        badgeVariant="default"
        title="Total Cost of Ownership (TCO) & ROI Model"
        subtitle={`Quantifying annual compute savings and 3-year return on investment for ${sessionData.buyerCompany}.`}
        breadcrumbs={[{ label: "DealBridge", href: "/" }, { label: "Business Case" }]}
        actions={
          <div className="flex items-center gap-2">
            <Link href="/competitors">
              <Button variant="primary" size="sm">
                <span>Next: Competitive Landscape</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        }
      />

      {/* Top 3 High-Impact Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Annual Cash Savings</span>
            <TrendingDown className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-600">
            ${(annualSavings / 1000).toFixed(0)}k<span className="text-xs font-normal text-slate-400">/year</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            {Math.round(iometeSavingsRate * 100)}% lower compute cost vs {selectedProvider}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">3-Year Cumulative Savings</span>
            <DollarSign className="h-4 w-4 text-sky-600" />
          </div>
          <div className="text-3xl font-extrabold text-sky-600">
            ${(threeYearCumulativeSavings / 1000).toFixed(0)}k
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Assuming {growthRatePercent}% annual data volume expansion
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Payback Period</span>
            <Calendar className="h-4 w-4 text-indigo-600" />
          </div>
          <div className="text-3xl font-extrabold text-indigo-600">
            {paybackMonths} Months
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Zero-copy migration yields immediate ROI within Q1
          </p>
        </div>
      </div>

      {/* Main Grid: Interactive Parameters & Recharts Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 5 Cols: Financial Sliders */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Model Parameters
              </h3>
              <Badge variant="indigo" size="sm">
                Live Sliders
              </Badge>
            </div>

            {/* Incumbent Picker */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Incumbent Data Warehouse:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["Snowflake", "Databricks", "BigQuery"].map((prov) => (
                  <button
                    key={prov}
                    onClick={() => {
                      setSelectedProvider(prov);
                      updateSessionData({ currentWarehouse: prov });
                    }}
                    className={`py-2 px-2 text-xs font-semibold rounded-xl border text-center transition-all ${
                      selectedProvider === prov
                        ? "bg-sky-50 border-sky-400 text-sky-800 shadow-xs"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {prov}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider 1: Monthly Spend */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-600 font-medium">Monthly Cloud Spend</span>
                <span className="font-extrabold text-slate-900">
                  ${monthlySpend.toLocaleString()}/mo
                </span>
              </div>
              <input
                type="range"
                min={10000}
                max={250000}
                step={5000}
                value={monthlySpend}
                onChange={(e) => handleSpendChange(Number(e.target.value))}
                className="w-full accent-sky-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>$10k/mo</span>
                <span>$250k/mo</span>
              </div>
            </div>

            {/* Slider 2: Data Volume */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-600 font-medium">Data Footprint</span>
                <span className="font-extrabold text-slate-900">{dataSizeTB} TB Raw</span>
              </div>
              <input
                type="range"
                min={10}
                max={1500}
                step={10}
                value={dataSizeTB}
                onChange={(e) => handleDataSizeChange(Number(e.target.value))}
                className="w-full accent-sky-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>10 TB</span>
                <span>1.5 PB</span>
              </div>
            </div>

            {/* Slider 3: Projected Data Growth Rate */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-600 font-medium">Annual Data Growth</span>
                <span className="font-extrabold text-slate-900">{growthRatePercent}% per year</span>
              </div>
              <input
                type="range"
                min={5}
                max={60}
                step={5}
                value={growthRatePercent}
                onChange={(e) => setGrowthRatePercent(Number(e.target.value))}
                className="w-full accent-sky-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>5% Moderate</span>
                <span>60% Hyper-Growth</span>
              </div>
            </div>

            {/* Quick summary bullet */}
            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Executive Takeaway</span>
              </div>
              <p className="leading-relaxed">
                Reallocating this ${(annualSavings / 1000).toFixed(0)}k annual savings funds 2 additional senior data engineers or new GenAI initiatives.
              </p>
            </div>
          </div>
        </div>

        {/* Right 7 Cols: 3-Year Recharts Visualizer & Cost Breakdown */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  3-Year TCO Comparison ($ in Thousands)
                </h3>
                <p className="text-xs text-slate-500">
                  Side-by-side cumulative spend projection.
                </p>
              </div>
              <Badge variant="success" size="sm">
                 ${(threeYearCumulativeSavings / 1000).toFixed(0)}k Total Delta
              </Badge>
            </div>

            {/* Recharts BarChart */}
            <div className="h-72 w-full pt-4">
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
                    formatter={(val) => [`$${Number(val)}k`, "Spend"]}
                  />
                  <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
                  <Bar dataKey={selectedProvider} fill="#94a3b8" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="IOMETE" fill="#0284c7" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Annual Breakdown Table */}
            <div className="overflow-x-auto pt-2 border-t border-slate-100">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-[10px]">
                  <tr>
                    <th className="p-2.5">Timeline</th>
                    <th className="p-2.5">{selectedProvider}</th>
                    <th className="p-2.5">IOMETE</th>
                    <th className="p-2.5 text-right font-bold text-emerald-600">Net Savings</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  <tr>
                    <td className="p-2.5 font-sans font-medium text-slate-700">Year 1</td>
                    <td className="p-2.5 text-slate-500">${(year1Incumbent / 1000).toFixed(0)}k</td>
                    <td className="p-2.5 text-sky-700 font-semibold">${(year1Iomete / 1000).toFixed(0)}k</td>
                    <td className="p-2.5 text-right text-emerald-600 font-bold">+${((year1Incumbent - year1Iomete) / 1000).toFixed(0)}k</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-sans font-medium text-slate-700">Year 2</td>
                    <td className="p-2.5 text-slate-500">${(year2Incumbent / 1000).toFixed(0)}k</td>
                    <td className="p-2.5 text-sky-700 font-semibold">${(year2Iomete / 1000).toFixed(0)}k</td>
                    <td className="p-2.5 text-right text-emerald-600 font-bold">+${((year2Incumbent - year2Iomete) / 1000).toFixed(0)}k</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-sans font-medium text-slate-700">Year 3</td>
                    <td className="p-2.5 text-slate-500">${(year3Incumbent / 1000).toFixed(0)}k</td>
                    <td className="p-2.5 text-sky-700 font-semibold">${(year3Iomete / 1000).toFixed(0)}k</td>
                    <td className="p-2.5 text-right text-emerald-600 font-bold">+${((year3Incumbent - year3Iomete) / 1000).toFixed(0)}k</td>
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
