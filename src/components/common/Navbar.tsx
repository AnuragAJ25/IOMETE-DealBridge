"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePresentation } from "@/context/PresentationContext";
import {
  Layers,
  Sparkles,
  Menu,
  X,
  FileText,
  Clock,
  Shield,
  BarChart3,
  MonitorPlay,
  Cpu,
  BookOpen,
  Users,
  Compass,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Tooltip } from "@/components/ui/Tooltip";
import { ProgressIndicator } from "./ProgressIndicator";

export function Navbar() {
  const pathname = usePathname();
  const {
    role,
    setRole,
    currentStage,
    currentStageIndex,
    stages,
    isNotesOpen,
    setIsNotesOpen,
    meetingTimeElapsed,
  } = usePresentation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const navLinks = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Guided Meeting", href: "/meeting" },
    { label: "Architecture", href: "/architecture" },
    { label: "Use Cases", href: "/use-cases" },
    { label: "Live Demo", href: "/demo" },
    { label: "Business Case", href: "/business-case" },
    { label: "Security", href: "/security" },
    { label: "Battlecards", href: "/competitors" },
    { label: "Executive Summary", href: "/meeting-summary" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 text-sky-400 shadow-md shadow-sky-900/10 border border-slate-800">
              <Layers className="h-5 w-5 group-hover:scale-105 transition-transform" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-bold tracking-tight text-slate-900">
                  IOMETE
                </span>
                <span className="text-sm font-semibold text-sky-600">DealBridge</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide">
                Sales Companion
              </p>
            </div>
          </Link>

          {/* Role badge */}
          <div className="hidden sm:block ml-2">
            <Badge
              variant={role === "seller" ? "default" : "success"}
              size="sm"
              className="cursor-pointer"
              onClick={() => setRole(role === "seller" ? "buyer" : "seller")}
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-current animate-pulse mr-1" />
              {role === "seller" ? "Seller Pilot" : "Buyer Sandbox"}
            </Badge>
          </div>
        </div>

        {/* Center: Stage Progress Tracker (Desktop) */}
        <div className="hidden lg:flex items-center gap-3 bg-slate-50 border border-slate-200/80 px-3.5 py-1.5 rounded-full">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Stage {currentStageIndex + 1}/{stages.length}:
          </span>
          <span className="text-xs font-semibold text-slate-800 max-w-[150px] truncate">
            {currentStage.shortTitle}
          </span>
          <ProgressIndicator variant="compact" />
        </div>

        {/* Right: Actions & Role switcher */}
        <div className="flex items-center gap-2.5">
          {/* Pacing Clock */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-mono font-medium">
            <Clock className="h-3.5 w-3.5 text-sky-600" />
            <span>{formatTime(meetingTimeElapsed)}</span>
          </div>

          {/* Teleprompter Notes Toggle */}
          <Tooltip content="Toggle Seller Talking Points">
            <button
              onClick={() => setIsNotesOpen(!isNotesOpen)}
              className={`p-2 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                isNotesOpen
                  ? "bg-sky-50 text-sky-700 border-sky-300 shadow-sm"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }`}
            >
              <FileText className="h-4 w-4" />
            </button>
          </Tooltip>

          {/* Quick Presenter Console Link */}
          <Link href="/presenter" className="hidden sm:inline-block">
            <Button variant="secondary" size="sm">
              <Sparkles className="h-3.5 w-3.5 text-sky-600" />
              <span>Console</span>
            </Button>
          </Link>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 border border-slate-200"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-150">
          <div className="p-2 mb-2 bg-slate-50 rounded-xl flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600">Active View Mode</span>
            <div className="flex gap-1">
              <button
                onClick={() => setRole("seller")}
                className={`px-2 py-1 text-xs rounded-md ${
                  role === "seller" ? "bg-sky-600 text-white" : "text-slate-600"
                }`}
              >
                Seller
              </button>
              <button
                onClick={() => setRole("buyer")}
                className={`px-2 py-1 text-xs rounded-md ${
                  role === "buyer" ? "bg-emerald-600 text-white" : "text-slate-600"
                }`}
              >
                Buyer
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-sky-50 text-sky-700 font-semibold"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
