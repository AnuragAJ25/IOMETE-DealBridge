import React from "react";
import { cn } from "@/lib/utils";
import { Database, Loader2, Sparkles } from "lucide-react";

interface LoadingStateProps {
  message?: string;
  submessage?: string;
  variant?: "spinner" | "skeleton" | "lakehouse";
  className?: string;
}

export function LoadingState({
  message = "Loading IOMETE compute clusters...",
  submessage = "Synchronizing Apache Iceberg metadata catalog",
  variant = "lakehouse",
  className,
}: LoadingStateProps) {
  if (variant === "spinner") {
    return (
      <div className={cn("flex flex-col items-center justify-center p-8 text-center", className)}>
        <Loader2 className="h-8 w-8 animate-spin text-sky-600 mb-3" />
        <p className="text-sm font-medium text-slate-700">{message}</p>
        {submessage && <p className="text-xs text-slate-400 mt-1">{submessage}</p>}
      </div>
    );
  }

  if (variant === "skeleton") {
    return (
      <div className={cn("w-full space-y-4 animate-pulse p-4", className)}>
        <div className="h-6 bg-slate-200 rounded-md w-1/3" />
        <div className="h-4 bg-slate-100 rounded-md w-3/4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className="h-32 bg-slate-100 rounded-xl" />
          <div className="h-32 bg-slate-100 rounded-xl" />
          <div className="h-32 bg-slate-100 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-sky-200/80 bg-sky-50/40 p-10 text-center",
        className
      )}
    >
      <div className="relative mb-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-md shadow-sky-500/10 border border-sky-100 text-sky-600">
          <Database className="h-7 w-7 animate-pulse" />
        </div>
        <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-sky-500 text-white shadow-sm">
          <Sparkles className="h-3.5 w-3.5 animate-spin" />
        </div>
      </div>
      <h4 className="text-sm font-semibold text-slate-800 tracking-tight">{message}</h4>
      {submessage && <p className="text-xs text-slate-500 max-w-sm mt-1">{submessage}</p>}
    </div>
  );
}
