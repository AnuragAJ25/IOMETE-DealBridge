"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePresentation } from "@/context/PresentationContext";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Presentation,
  Compass,
  Layers,
  Cpu,
  MonitorPlay,
  Calculator,
  ShieldCheck,
  GraduationCap,
  FileCheck,
  Swords,
  User,
  Users,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "success" | "warning" | "indigo";
}

interface NavGroup {
  groupName: string;
  items: NavItem[];
}

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const { sessionData, role } = usePresentation();

  const navGroups: NavGroup[] = [
    {
      groupName: "Session Hub",
      items: [
        {
          label: "Executive Dashboard",
          href: "/dashboard",
          icon: <LayoutDashboard className="h-4 w-4" />,
        },
        {
          label: "Guided Meeting Room",
          href: "/meeting",
          icon: <Presentation className="h-4 w-4" />,
          badge: "Live",
          badgeVariant: "success",
        },
        {
          label: "Presenter Console",
          href: "/presenter",
          icon: <User className="h-4 w-4" />,
          badge: "Seller",
          badgeVariant: "indigo",
        },
        {
          label: "Buyer Interactive Portal",
          href: "/buyer",
          icon: <Users className="h-4 w-4" />,
          badge: "Client",
          badgeVariant: "secondary",
        },
      ],
    },
    {
      groupName: "Technical Story",
      items: [
        {
          label: "Use-Case Discovery",
          href: "/use-cases",
          icon: <Compass className="h-4 w-4" />,
        },
        {
          label: "Lakehouse Architecture",
          href: "/architecture",
          icon: <Layers className="h-4 w-4" />,
          badge: "Iceberg",
          badgeVariant: "default",
        },
        {
          label: "Interactive Demo Tour",
          href: "/demo",
          icon: <MonitorPlay className="h-4 w-4" />,
        },
        {
          label: "Security & Trust",
          href: "/security",
          icon: <ShieldCheck className="h-4 w-4" />,
          badge: "SOC2",
          badgeVariant: "success",
        },
        {
          label: "Knowledge & Learn Hub",
          href: "/learn",
          icon: <GraduationCap className="h-4 w-4" />,
        },
      ],
    },
    {
      groupName: "Deal Economics",
      items: [
        {
          label: "Business Case & TCO",
          href: "/business-case",
          icon: <Calculator className="h-4 w-4" />,
          badge: "ROI",
          badgeVariant: "warning",
        },
        {
          label: "Why IOMETE?",
          href: "/competitors",
          icon: <Swords className="h-4 w-4" />,
        },
        {
          label: "Meeting Summary & MAP",
          href: "/meeting-summary",
          icon: <FileCheck className="h-4 w-4" />,
          badge: "Close",
          badgeVariant: "indigo",
        },
      ],
    },
  ];

  return (
    <aside
      className={cn(
        "w-64 shrink-0 border-r border-slate-200/80 bg-white/70 backdrop-blur-sm flex flex-col justify-between hidden md:flex min-h-[calc(100vh-4rem)] p-4",
        className
      )}
    >
      <div className="space-y-6">
        {navGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            <h3 className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              {group.groupName}
            </h3>
            <div className="space-y-0.5 pt-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150",
                      isActive
                        ? "bg-sky-50 text-sky-700 font-semibold shadow-xs border border-sky-100"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={cn(
                          "transition-colors",
                          isActive
                            ? "text-sky-600"
                            : "text-slate-400 group-hover:text-slate-700"
                        )}
                      >
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <Badge variant={item.badgeVariant || "default"} size="sm">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Target Buyer Snapshot Card */}
      <div className="mt-6 rounded-xl bg-slate-50 border border-slate-200/80 p-3 text-xs">
        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
          <span>Active Deal</span>
          <span className="text-emerald-600 font-bold">In Progress</span>
        </div>
        <p className="font-bold text-slate-900 truncate">{sessionData.buyerCompany}</p>
        <p className="text-slate-500 text-[11px] truncate">
          {sessionData.buyerName} • {sessionData.buyerRole}
        </p>
        <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
          <span className="text-slate-400">Current stack:</span>
          <span className="font-semibold text-slate-700">{sessionData.currentWarehouse}</span>
        </div>
      </div>
    </aside>
  );
}
