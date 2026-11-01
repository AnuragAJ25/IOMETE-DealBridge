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
  Sliders,
  ExternalLink,
  Presentation,
  Compass,
  MonitorPlay,
  Play,
  GraduationCap,
  Calculator,
  Swords,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";
  const { isNotesOpen, setIsNotesOpen } = usePresentation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Overview", href: "/overview" },
    { label: "Why IOMETE?", href: "/why-iomete" },
    { label: "Demo Tour", href: "/demo" },
    { label: "Architecture", href: "/architecture" },
    { label: "Use Cases", href: "/use-cases" },
    { label: "Calculator", href: "/business-case" },
    { label: "Comparison", href: "/competitors" },
    { label: "Learn", href: "/learn" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 text-sky-400 shadow-md shadow-sky-950/10 border border-slate-800">
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
        </div>

        {/* Center: Clean Marketing Links (on landing) or Current Breadcrumb (on workspace) */}
        {isLandingPage ? (
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/why-iomete"
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors"
            >
              Why IOMETE?
            </Link>
            <Link
              href="/architecture"
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors"
            >
              Architecture
            </Link>
            <Link
              href="/demo"
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors"
            >
              Platform Tour
            </Link>
            <Link
              href="/competitors"
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors"
            >
              Comparison
            </Link>
            <Link
              href="/learn"
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors"
            >
              Expert Videos
            </Link>
          </nav>
        ) : (
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-500">
            <Link href="/overview" className="hover:text-slate-900 font-medium">
              DealBridge Workspace
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-300" />
            <span className="font-semibold text-slate-900 capitalize">
              {pathname.replace("/", "").replace(/-/g, " ") || "Overview"}
            </span>
          </div>
        )}

        {/* Right Action Area */}
        <div className="flex items-center gap-2.5">
          {isLandingPage ? (
            <>
              <Link
                href="/why-iomete"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors"
              >
                Explore Story
              </Link>
              <Link
                href="/overview"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold shadow-sm shadow-sky-600/20 transition-all hover:shadow"
              >
                <span>Get Started</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </>
          ) : (
            <>
              {/* Optional Seller Meeting Tools Drawer Toggle */}
              <button
                onClick={() => setIsNotesOpen(!isNotesOpen)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                  isNotesOpen
                    ? "bg-sky-50 border-sky-300 text-sky-700 font-semibold"
                    : "bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
                title="Toggle optional sales meeting tools & notes"
              >
                <FileText className="h-3.5 w-3.5 text-sky-600" />
                <span className="hidden sm:inline">Meeting Tools</span>
              </button>

              <Link
                href="/"
                className="text-xs text-slate-500 hover:text-slate-800 px-2.5 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Home
              </Link>
            </>
          )}

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2 shadow-lg">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2">
            Navigation
          </p>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-sky-50 text-sky-700 font-semibold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
              </Link>
            );
          })}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <Link
              href="https://iomete.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-sky-600 flex items-center gap-1 font-semibold"
            >
              <span>Visit iomete.com</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
