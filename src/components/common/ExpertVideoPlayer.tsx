"use client";

import React, { useState, useRef } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Play,
  Pause,
  ExternalLink,
  Volume2,
  VolumeX,
  Maximize2,
  AlertCircle,
  Sparkles,
  CheckCircle2,
  Share2,
} from "lucide-react";

export interface ExpertVideo {
  id: string;
  title: string;
  author: string;
  authorTitle: string;
  authorCompany: string;
  description: string;
  videoSrc: string;
  linkedinUrl: string;
  duration: string;
  badge: string;
  highlights: string[];
}

export const EXPERT_VIDEOS: ExpertVideo[] = [
  {
    id: "overview",
    title: "IOMETE Platform Overview & Architecture Walkthrough",
    author: "Shyaamal Tripathi",
    authorTitle: "GTM & Developer Advocacy",
    authorCompany: "IOMETE",
    description:
      "Original walkthrough by Shyaamal Tripathi exploring the core philosophy of IOMETE: decoupling compute from storage on open Apache Iceberg, eliminating vendor lock-in, and securing workloads inside your private cloud perimeter.",
    videoSrc: "/videos/iomete-overview.mp4",
    linkedinUrl:
      "https://www.linkedin.com/posts/shyaamal-tripathi-a389051b3_iomete-activity-7448057759524216834-pONN",
    duration: "Platform Walkthrough",
    badge: "Official Walkthrough",
    highlights: [
      "Decoupled storage and compute on Apache Iceberg",
      "Customer-owned VPC data sovereignty",
      "Zero-markup infrastructure pricing model",
    ],
  },
  {
    id: "demo",
    title: "Hands-on Lakehouse Demo & AI Query Exploration",
    author: "Shyaamal Tripathi",
    authorTitle: "GTM & Developer Advocacy",
    authorCompany: "IOMETE",
    description:
      "Interactive session featuring live query execution on IOMETE, exploring how teams pair Anthropic Claude with lakehouse tables for automated SQL generation, smart analytics, and zero-data-movement AI workloads.",
    videoSrc: "/videos/iomete-demo.mp4",
    linkedinUrl:
      "https://www.linkedin.com/posts/shyaamal-tripathi-a389051b3_was-playing-around-with-anthropic-claude-activity-7450094945597562880-f3Rd",
    duration: "Live Interactive Demo",
    badge: "AI + Lakehouse",
    highlights: [
      "Sub-second SQL execution across 100M+ rows",
      "Dynamic cluster auto-scaling & sleep mode",
      "Claude AI exploration on Iceberg catalog",
    ],
  },
];

export function ExpertVideoSection() {
  const [activeVideoId, setActiveVideoId] = useState<string>("overview");
  const [videoError, setVideoError] = useState<{ [key: string]: boolean }>({});
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const activeVideo =
    EXPERT_VIDEOS.find((v) => v.id === activeVideoId) || EXPERT_VIDEOS[0];

  const handleVideoError = (id: string) => {
    setVideoError((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Verified Expert Video Series
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Learn IOMETE from the Experts
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Watch original product walkthroughs and interactive AI sessions by
            IOMETE's developer advocacy team.
          </p>
        </div>

        {/* Video selector tabs */}
        <div className="flex flex-wrap items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10">
          {EXPERT_VIDEOS.map((video) => {
            const isSelected = video.id === activeVideoId;
            return (
              <button
                key={video.id}
                onClick={() => setActiveVideoId(video.id)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? "bg-sky-500 text-white shadow-lg shadow-sky-500/25"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{video.title.split("&")[0]}</span>
                <span className="text-[10px] opacity-75 font-mono">
                  [{video.id === "overview" ? "1" : "2"}]
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Video Theater */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 8 Cols: HTML5 Video Player */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl aspect-video group">
            {videoError[activeVideo.id] ? (
              /* Fallback Card if Video Decode Fails */
              <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-slate-950 space-y-4">
                <AlertCircle className="h-10 w-10 text-amber-400" />
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white">
                    Video Playback Fallback
                  </h4>
                  <p className="text-xs text-slate-400 max-w-md">
                    Direct local MP4 playback encountered a browser decoding
                    limitation. Watch the original presentation directly on
                    LinkedIn.
                  </p>
                </div>
                <a
                  href={activeVideo.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold rounded-xl shadow-lg transition-transform active:scale-95"
                >
                  <span>Watch on LinkedIn</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            ) : (
              /* Native HTML5 Video Player */
              <video
                key={activeVideo.videoSrc}
                ref={(el) => {
                  videoRefs.current[activeVideo.id] = el;
                }}
                controls
                playsInline
                preload="metadata"
                onError={() => handleVideoError(activeVideo.id)}
                className="w-full h-full object-contain bg-black"
                src={activeVideo.videoSrc}
              >
                Your browser does not support HTML5 video tag.
              </video>
            )}

            {/* Attribution overlay badge */}
            <div className="absolute top-3 left-3 pointer-events-none z-10 flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs">
              <span className="h-2 w-2 rounded-full bg-sky-400" />
              <span className="font-semibold text-slate-200">
                {activeVideo.author}
              </span>
              <span className="text-slate-400 text-[11px]">
                ({activeVideo.authorCompany})
              </span>
            </div>
          </div>

          {/* Under-player quick actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 pt-1">
            <div className="flex items-center gap-2">
              <span className="inline-block px-2 py-0.5 rounded-md bg-white/10 text-slate-300 font-mono text-[11px]">
                Original Creator Walkthrough
              </span>
              <span>•</span>
              <span>High-Definition MP4</span>
            </div>

            <a
              href={activeVideo.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sky-400 hover:text-sky-300 hover:underline transition-colors"
            >
              <span>View Original Post on LinkedIn</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Right 4 Cols: Video Meta, Author Attribution & Highlights */}
        <div className="lg:col-span-4 space-y-5 bg-white/5 p-6 rounded-2xl border border-white/10">
          <div>
            <Badge variant="indigo" size="sm">
              {activeVideo.badge}
            </Badge>
            <h3 className="text-lg font-bold text-white tracking-tight mt-2">
              {activeVideo.title}
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {activeVideo.description}
            </p>
          </div>

          {/* Featured Creator Attribution */}
          <div className="pt-4 border-t border-white/10 space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
              Featured Expert
            </span>
            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white font-bold text-sm shadow-md">
                ST
              </div>
              <div>
                <p className="text-sm font-bold text-white">
                  {activeVideo.author}
                </p>
                <p className="text-xs text-sky-300">
                  {activeVideo.authorTitle}, {activeVideo.authorCompany}
                </p>
              </div>
            </div>
          </div>

          {/* Key Topics Covered in this Video */}
          <div className="pt-4 border-t border-white/10 space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
              Key Session Takeaways
            </span>
            <ul className="space-y-2">
              {activeVideo.highlights.map((point, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-xs text-slate-300"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-sky-400 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* External LinkedIn Link Button */}
          <div className="pt-2">
            <a
              href={activeVideo.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 transition-colors"
            >
              <span>Watch & Comment on LinkedIn</span>
              <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
