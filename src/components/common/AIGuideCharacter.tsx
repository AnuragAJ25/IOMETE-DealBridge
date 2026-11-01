"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  X,
  Send,
  MessageSquare,
  Bot,
  ExternalLink,
  ShieldCheck,
  HelpCircle,
  ChevronDown,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { apiClient, SecurityAssistantResponse } from "@/lib/api";

interface ChatMessage {
  id: string;
  sender: "user" | "guide";
  text: string;
  sources?: string[];
  evidenceStatus?: string;
  needsConfirmation?: boolean;
  timestamp: string;
}

export function AIGuideCharacter() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showSpeechBubble, setShowSpeechBubble] = useState(true);
  const [inputQuery, setInputQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Dismiss greeting bubble after 12 seconds or on interaction
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpeechBubble(false);
    }, 12000);
    return () => clearTimeout(timer);
  }, []);

  // Context-specific suggested questions depending on the active route
  const getContextualQuestions = (): string[] => {
    if (pathname.includes("architecture")) {
      return [
        "How does IOMETE decouple compute and storage?",
        "What cloud storage providers does IOMETE support?",
        "How does Apache Iceberg prevent data lock-in?",
      ];
    }
    if (pathname.includes("why-iomete")) {
      return [
        "What makes IOMETE different from proprietary warehouses?",
        "How does self-hosting work inside our private VPC?",
        "Can we run IOMETE on existing on-premises Kubernetes?",
      ];
    }
    if (pathname.includes("demo")) {
      return [
        "How does cluster auto-scaling and suspend work?",
        "What query languages and tools are supported in the SQL editor?",
        "How are Apache Iceberg metadata snapshots accessed?",
      ];
    }
    if (pathname.includes("business-case")) {
      return [
        "Why is there zero credit markup on raw cloud compute?",
        "How do customer-owned EC2/GCE instances lower monthly spend?",
        "How is IOMETE software pricing structured?",
      ];
    }
    if (pathname.includes("competitors")) {
      return [
        "How does IOMETE compare to Snowflake on data sovereignty?",
        "What is the difference between Databricks and IOMETE?",
        "Can IOMETE query tables written by BigQuery or Athena?",
      ];
    }
    if (pathname.includes("security")) {
      return [
        "What is IOMETE's Zero Data Retention policy?",
        "Does IOMETE support Customer-Managed Encryption Keys (CMEK)?",
        "What access controls and RBAC does IOMETE provide?",
      ];
    }
    if (pathname.includes("learn")) {
      return [
        "What are the main topics in Shyaamal's Platform Overview?",
        "How does IOMETE support AI and LLM query workflows?",
        "Where can I find documentation on Apache Iceberg migrations?",
      ];
    }
    return [
      "What is IOMETE and how does it deploy?",
      "How does IOMETE provide data sovereignty in our VPC?",
      "What are the core benefits of Apache Iceberg with IOMETE?",
    ];
  };

  const handleSend = async (questionText?: string) => {
    const query = (questionText || inputQuery).trim();
    if (!query || isLoading) return;

    setShowSpeechBubble(false);
    if (!isOpen) setIsOpen(true);

    const userMsg: ChatMessage = {
      id: "u-" + Date.now(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setIsLoading(true);

    try {
      const res: SecurityAssistantResponse = await apiClient.askSecurityAssistant({
        question: query,
        documentation_context: `Current page context: ${pathname}`,
      });

      const guideMsg: ChatMessage = {
        id: "g-" + Date.now(),
        sender: "guide",
        text: res.answer,
        sources: res.source_references,
        evidenceStatus: res.evidence_status,
        needsConfirmation: res.needs_confirmation,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, guideMsg]);
    } catch (err: unknown) {
      const errorMsg: ChatMessage = {
        id: "err-" + Date.now(),
        sender: "guide",
        text: "I couldn't reach the IOMETE documentation service at this moment. You can verify your questions directly in the official docs at https://iomete.com or speak with the sales representative.",
        needsConfirmation: true,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end pointer-events-auto">
      {/* Speech bubble on first visit or collapsed greeting */}
      <AnimatePresence>
        {!isOpen && showSpeechBubble && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 5 }}
            transition={{ duration: 0.25 }}
            className="mb-3 max-w-xs bg-white rounded-2xl p-4 shadow-xl border border-sky-200/80 text-xs text-slate-700 relative"
          >
            <button
              onClick={() => setShowSpeechBubble(false)}
              className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-600 rounded-md"
              aria-label="Close greeting"
            >
              <X className="h-3 w-3" />
            </button>
            <div className="flex items-center gap-2 mb-1.5 font-semibold text-slate-900">
              <span className="flex h-2 w-2 rounded-full bg-sky-500 animate-pulse" />
              <span>DealBridge AI Guide</span>
            </div>
            <p className="leading-relaxed text-slate-600">
              Hi! I&apos;m your DealBridge Guide. I can help you understand IOMETE, explore its architecture, compare platforms, or prepare for customer conversations.
            </p>
            <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  setShowSpeechBubble(false);
                  setIsOpen(true);
                }}
                className="text-[11px] font-semibold text-sky-600 hover:text-sky-700 underline"
              >
                Ask a question →
              </button>
              <span className="text-[10px] text-slate-400">Grounded in IOMETE docs</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Chat Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mb-3 w-[calc(100vw-2.5rem)] sm:w-96 max-h-[580px] h-[520px] bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3.5 bg-gradient-to-r from-slate-900 via-slate-800 to-sky-950 text-white flex items-center justify-between border-b border-slate-700/50">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-500 to-cyan-400 text-white shadow-sm">
                  <Bot className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold tracking-tight text-white flex items-center gap-1.5">
                    DealBridge AI Guide
                    <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-sky-500/30 text-sky-300 border border-sky-400/30">
                      Doc Grounded
                    </span>
                  </h4>
                  <p className="text-[10px] text-slate-300">
                    Official IOMETE Architecture &amp; Platform Assistant
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    onClick={() => setMessages([])}
                    title="Clear history"
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50 text-xs">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col justify-center space-y-4 text-center px-2">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-slate-900 text-sm">
                      How can I help you today?
                    </h5>
                    <p className="text-slate-500 text-xs mt-1">
                      Ask any question about IOMETE architecture, deployments, pricing models, or security.
                    </p>
                  </div>

                  {/* Context-aware suggestions */}
                  <div className="space-y-1.5 text-left pt-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">
                      Suggested for this page:
                    </p>
                    {getContextualQuestions().map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(q)}
                        className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-sky-50 border border-slate-200/80 hover:border-sky-300 text-slate-700 text-xs transition-colors shadow-xs"
                      >
                        💡 {q}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${
                        msg.sender === "user" ? "items-end" : "items-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl p-3 leading-relaxed ${
                          msg.sender === "user"
                            ? "bg-sky-600 text-white rounded-br-none shadow-sm"
                            : "bg-white border border-slate-200/90 text-slate-800 rounded-bl-none shadow-xs"
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{msg.text}</p>

                        {/* Verified documentation sources */}
                        {msg.sources && msg.sources.length > 0 && (
                          <div className="mt-2.5 pt-2 border-t border-slate-100 text-[10px]">
                            <span className="font-semibold text-slate-500 block mb-1">
                              Supporting Documentation:
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {msg.sources.map((src, i) => (
                                <span
                                  key={i}
                                  className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 font-mono text-[9px]"
                                >
                                  {src}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Fallback warning if needs confirmation */}
                        {msg.needsConfirmation && (
                          <div className="mt-2 text-[10px] text-amber-700 bg-amber-50 rounded-lg p-1.5 border border-amber-200/70">
                            ⚠️ This specific topic is not verified in official IOMETE documentation. Please confirm with the IOMETE engineering team.
                          </div>
                        )}
                      </div>
                      <span className="text-[9px] text-slate-400 mt-1 px-1">
                        {msg.timestamp}
                      </span>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex items-center gap-2 p-3 bg-white rounded-2xl border border-slate-200/80 text-slate-500 w-fit">
                      <Loader2 className="h-3.5 w-3.5 animate-spin text-sky-600" />
                      <span className="text-xs">Checking official IOMETE documentation...</span>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-white border-t border-slate-200/80 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask about architecture, security, TCO..."
                disabled={isLoading}
                className="flex-1 text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white text-slate-800 transition-all placeholder:text-slate-400"
              />
              <button
                type="submit"
                disabled={!inputQuery.trim() || isLoading}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-40 text-white transition-all shadow-sm shrink-0"
                aria-label="Send query"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating 3D-Style Guide Character Trigger Button */}
      <motion.button
        onClick={() => {
          setShowSpeechBubble(false);
          setIsOpen(!isOpen);
        }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex items-center gap-2.5 p-2 rounded-full bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 text-white shadow-xl shadow-sky-950/20 border-2 border-sky-400/40 focus:outline-none focus:ring-4 focus:ring-sky-400/20 transition-all"
        aria-label="Toggle DealBridge AI Guide"
      >
        {/* Animated Glow Halo */}
        <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-sky-400 to-cyan-300 opacity-30 blur-sm group-hover:opacity-60 transition duration-300 animate-pulse pointer-events-none" />

        {/* 3D-styled Avatar Face */}
        <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 via-cyan-500 to-sky-600 text-white shadow-inner">
          <Bot className="h-6 w-6 transform group-hover:rotate-6 transition-transform" />
          <span className="absolute top-0 right-0 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-400 border-2 border-slate-900" />
          </span>
        </div>

        {/* Text Pill (shown on hover or initial state) */}
        <div className="hidden sm:flex flex-col text-left pr-3">
          <span className="text-xs font-bold tracking-tight text-white flex items-center gap-1">
            DealBridge Guide
            <Sparkles className="h-3 w-3 text-cyan-300" />
          </span>
          <span className="text-[10px] text-sky-200/80 font-medium">
            Ask questions anytime
          </span>
        </div>
      </motion.button>
    </div>
  );
}
