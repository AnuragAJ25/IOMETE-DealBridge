"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { usePresentation } from "@/context/PresentationContext";
import { Check, Clock } from "lucide-react";

interface ProgressIndicatorProps {
  className?: string;
  variant?: "horizontal" | "compact" | "stepper";
}

export function ProgressIndicator({
  className,
  variant = "horizontal",
}: ProgressIndicatorProps) {
  const { stages, currentStageIndex, goToStage, role } = usePresentation();

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-1.5", className)}>
        {stages.map((stage, idx) => {
          const isDone = idx < currentStageIndex;
          const isCurrent = idx === currentStageIndex;
          return (
            <button
              key={stage.id}
              onClick={() => goToStage(idx)}
              title={`${stage.number}. ${stage.title}`}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                isCurrent
                  ? "w-7 bg-sky-600 shadow-sm shadow-sky-500/30"
                  : isDone
                  ? "w-2.5 bg-sky-300 hover:bg-sky-400"
                  : "w-2 bg-slate-200 hover:bg-slate-300"
              )}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn("w-full overflow-x-auto py-2", className)}>
      <div className="flex items-center min-w-[700px] justify-between relative px-3">
        {/* Background connector line */}
        <div className="absolute top-4 left-6 right-6 h-0.5 bg-slate-200 -z-0" />
        <div
          className="absolute top-4 left-6 h-0.5 bg-sky-600 transition-all duration-500 -z-0"
          style={{
            width: `${(currentStageIndex / (stages.length - 1)) * 100}%`,
          }}
        />

        {stages.map((stage, idx) => {
          const isDone = idx < currentStageIndex;
          const isCurrent = idx === currentStageIndex;

          return (
            <button
              key={stage.id}
              onClick={() => goToStage(idx)}
              className="group relative z-10 flex flex-col items-center focus:outline-none cursor-pointer"
            >
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-all duration-200 border-2",
                  isCurrent
                    ? "bg-sky-600 border-sky-600 text-white shadow-md shadow-sky-500/25 scale-110"
                    : isDone
                    ? "bg-sky-50 border-sky-500 text-sky-700"
                    : "bg-white border-slate-300 text-slate-400 group-hover:border-slate-400"
                )}
              >
                {isDone ? (
                  <Check className="h-4 w-4 stroke-[2.5]" />
                ) : (
                  <span>{stage.number}</span>
                )}
              </div>

              <div className="mt-2 text-center">
                <p
                  className={cn(
                    "text-xs font-semibold whitespace-nowrap transition-colors",
                    isCurrent
                      ? "text-sky-600"
                      : isDone
                      ? "text-slate-700"
                      : "text-slate-400 group-hover:text-slate-600"
                  )}
                >
                  {stage.shortTitle}
                </p>
                <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 mt-0.5">
                  <Clock className="h-2.5 w-2.5" />
                  <span>{stage.durationMin}m</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
