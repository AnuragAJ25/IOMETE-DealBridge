"use client";

import React, { useState } from "react";
import { usePresentation } from "@/context/PresentationContext";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  FileText,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  UserCheck,
  HelpCircle,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Tooltip } from "@/components/ui/Tooltip";
import Link from "next/navigation";

export function PresenterControls() {
  const {
    role,
    setRole,
    currentStageIndex,
    currentStage,
    nextStage,
    prevStage,
    stages,
    isNotesOpen,
    setIsNotesOpen,
    meetingTimeElapsed,
    isTimerRunning,
    toggleTimer,
    resetTimer,
    sessionData,
    updateSessionData,
  } = usePresentation();

  const [newQuestion, setNewQuestion] = useState("");
  const [showQuestionInput, setShowQuestionInput] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    updateSessionData({
      bookmarkedQuestions: [...sessionData.bookmarkedQuestions, newQuestion.trim()],
    });
    setNewQuestion("");
    setShowQuestionInput(false);
  };

  return (
    <aside
      aria-label="Presenter remote navigation controls"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-4xl"
    >
      <div className="glass-panel-dark rounded-2xl p-2.5 sm:px-4 sm:py-3 shadow-2xl border border-slate-700/70 text-white flex flex-wrap items-center justify-between gap-3">
        {/* Left: Stage info & Navigation */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
            <Tooltip content="Previous Stage">
              <button
                type="button"
                onClick={prevStage}
                disabled={currentStageIndex === 0}
                aria-label="Previous Stage"
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/60 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            </Tooltip>

            <span className="text-xs font-semibold px-2 text-slate-200 whitespace-nowrap">
              {currentStageIndex + 1} / {stages.length}
            </span>

            <Tooltip content="Next Stage">
              <button
                type="button"
                onClick={nextStage}
                disabled={currentStageIndex === stages.length - 1}
                aria-label="Next Stage"
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/60 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </Tooltip>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-sky-400">
                {currentStage.category}
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-xs font-semibold text-slate-100 truncate max-w-[200px]">
                {currentStage.title}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate max-w-xs">
              Target: {currentStage.sellerGoal}
            </p>
          </div>
        </div>

        {/* Center: Meeting Pacing Timer */}
        <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/60 text-xs">
          <Clock className="h-3.5 w-3.5 text-sky-400" />
          <span className="font-mono font-medium text-slate-100">
            {formatTime(meetingTimeElapsed)}
          </span>
          <button
            type="button"
            onClick={toggleTimer}
            aria-label={isTimerRunning ? "Pause meeting timer" : "Resume meeting timer"}
            className="text-slate-400 hover:text-white ml-1 transition-colors"
          >
            {isTimerRunning ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
          </button>
          <button
            type="button"
            onClick={resetTimer}
            aria-label="Reset meeting timer"
            className="text-slate-400 hover:text-white transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
          </button>
        </div>

        {/* Right: Seller Tools & Role Switcher */}
        <div className="flex items-center gap-2">
          {/* Bookmark Question Trigger */}
          <Tooltip content="Log Buyer Question">
            <button
              type="button"
              onClick={() => setShowQuestionInput(!showQuestionInput)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-colors relative"
            >
              <HelpCircle className="h-4 w-4" />
              {sessionData.bookmarkedQuestions.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] font-bold text-slate-900">
                  {sessionData.bookmarkedQuestions.length}
                </span>
              )}
            </button>
          </Tooltip>

          {/* Speaker Notes Drawer Toggle */}
          <Tooltip content={isNotesOpen ? "Close Talking Points" : "Open Speaker Notes"}>
            <button
              type="button"
              onClick={() => setIsNotesOpen(!isNotesOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                isNotesOpen
                  ? "bg-sky-500 text-white border-sky-400 shadow-md shadow-sky-500/20"
                  : "bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700"
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Talking Points</span>
            </button>
          </Tooltip>

          {/* Role Indicator / Switcher */}
          <div className="flex items-center bg-slate-900 p-0.5 rounded-xl border border-slate-700">
            <button
              type="button"
              onClick={() => setRole("seller")}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                role === "seller"
                  ? "bg-sky-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Seller
            </button>
            <button
              type="button"
              onClick={() => setRole("buyer")}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                role === "buyer"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Buyer
            </button>
          </div>
        </div>
      </div>

      {/* Quick Question Input Popover */}
      {showQuestionInput && (
        <form
          onSubmit={handleAddQuestion}
          className="mt-2 glass-panel-dark rounded-xl p-3 border border-slate-700 flex items-center gap-2 animate-in slide-in-from-bottom-2"
        >
          <input
            type="text"
            placeholder="Type buyer objection or question (e.g. 'Can we encrypt columns with our own KMS key?')"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            className="flex-1 bg-slate-900/90 text-xs text-white px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-sky-500"
            autoFocus
          />
          <Button type="submit" size="sm" variant="primary">
            Save
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => setShowQuestionInput(false)}
          >
            Cancel
          </Button>
        </form>
      )}
    </aside>
  );
}
