"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/common/Navbar";
import { Sidebar } from "@/components/common/Sidebar";
import { AIGuideCharacter } from "@/components/common/AIGuideCharacter";
import { PresenterNotesDrawer } from "@/components/common/PresenterNotesDrawer";
import { PresenterControls } from "@/components/common/PresenterControls";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";
  // Presenter controls bar only appears if seller is on dedicated meeting room or presenter console
  const isDedicatedMeetingPage = pathname === "/meeting" || pathname === "/presenter";

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 gradient-mesh selection:bg-sky-500 selection:text-white relative">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {!isLandingPage && <Sidebar />}
        <main
          className={`flex-1 flex flex-col min-w-0 ${
            isLandingPage ? "px-4 sm:px-6 lg:px-8 py-6" : "p-4 sm:p-6 lg:p-8"
          } ${isDedicatedMeetingPage ? "pb-28" : "pb-16"}`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex flex-col flex-1"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Global AI Guide Character on all pages */}
      <AIGuideCharacter />

      {/* Optional seller tools drawer on demand */}
      <PresenterNotesDrawer />

      {/* Presenter controls bar ONLY on dedicated meeting and presenter console routes */}
      {isDedicatedMeetingPage && <PresenterControls />}
    </div>
  );
}
