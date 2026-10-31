"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/common/Navbar";
import { Sidebar } from "@/components/common/Sidebar";
import { PresenterControls } from "@/components/common/PresenterControls";
import { PresenterNotesDrawer } from "@/components/common/PresenterNotesDrawer";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 gradient-mesh selection:bg-sky-500 selection:text-white">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {!isLandingPage && <Sidebar />}
        <main
          className={`flex-1 flex flex-col min-w-0 pb-28 sm:pb-32 ${
            isLandingPage ? "px-4 sm:px-6 lg:px-8 py-8" : "p-4 sm:p-6 lg:p-8"
          }`}
        >
          {children}
        </main>
      </div>

      <PresenterControls />
      <PresenterNotesDrawer />
    </div>
  );
}
