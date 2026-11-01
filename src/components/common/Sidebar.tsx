"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Sparkles,
  Layers,
  MonitorPlay,
  Compass,
  Calculator,
  Swords,
  GraduationCap,
  FileCheck,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Presentation,
  ExternalLink,
} from "lucide-react";

interface PrimaryNavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  hint: string;
}

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  // Exactly matching the required 9 primary navigation items
  const primaryNavItems: PrimaryNavItem[] = [
    {
      label: "Overview",
      href: "/overview",
      icon: <LayoutDashboard className="h-4 w-4" />,
      hint: "Workspace hub & journey",
    },
    {
      label: "Why IOMETE?",
      href: "/why-iomete",
      icon: <Sparkles className="h-4 w-4" />,
      hint: "Visual storytelling narrative",
    },
    {
      label: "Product Walkthrough & Demo",
      href: "/demo",
      icon: <MonitorPlay className="h-4 w-4" />,
      hint: "SQL, catalog, lakehouses & AI",
    },
    {
      label: "Interactive Architecture Explorer",
      href: "/architecture",
      icon: <Layers className="h-4 w-4" />,
      hint: "React Flow decoupled diagram",
    },
    {
      label: "Industry Use Cases",
      href: "/use-cases",
      icon: <Compass className="h-4 w-4" />,
      hint: "5 vertical industry journeys",
    },
    {
      label: "Pricing & Business Case Calculator",
      href: "/business-case",
      icon: <Calculator className="h-4 w-4" />,
      hint: "Customer assumptions & TCO",
    },
    {
      label: "Platform Comparison",
      href: "/competitors",
      icon: <Swords className="h-4 w-4" />,
      hint: "Factual documented matrix",
    },
    {
      label: "Learn from the Experts",
      href: "/learn",
      icon: <GraduationCap className="h-4 w-4" />,
      hint: "Videos by Shyaamal Tripathi",
    },
    {
      label: "Meeting Summary",
      href: "/meeting-summary",
      icon: <FileCheck className="h-4 w-4" />,
      hint: "Executive recap & action plan",
    },
  ];

  return (
    <aside
      className={cn(
        "shrink-0 border-r border-slate-200/80 bg-white/80 backdrop-blur-md flex flex-col justify-between hidden md:flex min-h-[calc(100vh-4rem)] transition-all duration-200 p-3",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="space-y-4">
        {/* Collapse / Expand Toggle Button */}
        <div className="flex items-center justify-between px-2 pt-1 pb-2 border-b border-slate-100">
          {!collapsed && (
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Sales Enablement
            </span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors ml-auto"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-label="Toggle sidebar collapse"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Primary Navigation List */}
        <nav className="space-y-1">
          {primaryNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={cn(
                  "group flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150",
                  isActive
                    ? "bg-sky-50 text-sky-800 font-semibold shadow-xs border border-sky-200/80"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                )}
              >
                <div
                  className={cn(
                    "flex items-center justify-center shrink-0 transition-colors",
                    isActive ? "text-sky-600" : "text-slate-400 group-hover:text-slate-600"
                  )}
                >
                  {item.icon}
                </div>
                {!collapsed && (
                  <div className="flex-1 truncate">
                    <span className="block truncate">{item.label}</span>
                    <span className="block text-[10px] text-slate-400 font-normal truncate">
                      {item.hint}
                    </span>
                  </div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Context Support */}
      <div className="pt-3 border-t border-slate-100 space-y-2">
        {!collapsed ? (
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px]">
            <div className="flex items-center gap-1.5 font-semibold text-slate-700 mb-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>Sovereign Lakehouse</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              Customer VPC deployment on Apache Iceberg &amp; Spark.
            </p>
            <div className="mt-2 pt-1.5 border-t border-slate-200/60 flex items-center justify-between text-[10px]">
              <Link
                href="https://iomete.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-600 hover:underline flex items-center gap-1"
              >
                <span>iomete.com</span>
                <ExternalLink className="h-2.5 w-2.5" />
              </Link>
              <Link
                href="/meeting"
                className="text-slate-400 hover:text-slate-700 font-medium"
              >
                Presenter Mode
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex justify-center py-2">
            <Link
              href="https://iomete.com"
              target="_blank"
              rel="noopener noreferrer"
              title="Official IOMETE Website"
              className="p-1.5 text-slate-400 hover:text-sky-600 rounded-lg hover:bg-slate-100"
            >
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}
