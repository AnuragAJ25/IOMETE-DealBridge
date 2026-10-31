"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Play, Pause, Maximize2, Sparkles, CheckCircle, Volume2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface VideoCardProps {
  title: string;
  duration?: string;
  category?: string;
  description?: string;
  thumbnailGradient?: string;
  chapters?: { time: string; title: string }[];
  className?: string;
}

export function VideoCard({
  title,
  duration = "3:45",
  category = "Interactive Walkthrough",
  description,
  thumbnailGradient = "from-slate-900 via-sky-950 to-slate-900",
  chapters = [
    { time: "0:00", title: "Lakehouse Storage Architecture" },
    { time: "1:15", title: "Sub-Second SQL Benchmarks" },
    { time: "2:30", title: "Apache Ranger RBAC Governance" },
  ],
  className,
}: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);

  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow",
        className
      )}
    >
      {/* Video Simulated Screen */}
      <div
        className={cn(
          "relative aspect-video w-full bg-gradient-to-br flex flex-col justify-between p-4 sm:p-6 text-white overflow-hidden",
          thumbnailGradient
        )}
      >
        {/* Subtle grid lines overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

        {/* Top bar inside screen */}
        <div className="relative z-10 flex items-center justify-between">
          <Badge variant="indigo" size="sm">
            {category}
          </Badge>
          <div className="flex items-center gap-1.5 text-xs bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 font-mono">
            <span>{duration}</span>
          </div>
        </div>

        {/* Center Play Button & Active Chapter Title */}
        <div className="relative z-10 text-center my-auto">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="group mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sky-500 hover:bg-sky-400 text-white shadow-xl shadow-sky-500/40 transition-transform active:scale-95 cursor-pointer"
          >
            {isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6 ml-1" />
            )}
          </button>
          <div className="mt-3">
            <p className="text-xs font-medium text-sky-300">
              {isPlaying ? "Live Simulation Running" : "Click to Play Demo Tour"}
            </p>
            <p className="text-sm font-semibold text-slate-100 mt-0.5">
              {chapters[activeChapter]?.title}
            </p>
          </div>
        </div>

        {/* Bottom scrub bar inside video */}
        <div className="relative z-10 space-y-2">
          <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full bg-sky-400 transition-all duration-700 ${
                isPlaying ? "w-2/3" : "w-1/4"
              }`}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-300">
            <span className="flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-sky-400" />
              <span>Full HD 1080p Interactive Stream</span>
            </span>
            <div className="flex items-center gap-2">
              <Volume2 className="h-3.5 w-3.5" />
              <Maximize2 className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Info & Chapter navigation */}
      <div className="p-4 sm:p-5">
        <h4 className="text-base font-bold text-slate-900 tracking-tight">{title}</h4>
        {description && (
          <p className="mt-1 text-xs text-slate-500 leading-relaxed">{description}</p>
        )}

        {/* Chapters timeline */}
        <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Key Video Markers
          </p>
          {chapters.map((chap, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveChapter(idx);
                setIsPlaying(true);
              }}
              className={cn(
                "w-full flex items-center justify-between p-2 rounded-lg text-xs transition-colors text-left",
                activeChapter === idx
                  ? "bg-sky-50 text-sky-800 font-semibold"
                  : "text-slate-600 hover:bg-slate-50"
              )}
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-slate-400">{chap.time}</span>
                <span>{chap.title}</span>
              </div>
              {activeChapter === idx && (
                <CheckCircle className="h-3.5 w-3.5 text-sky-600" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
