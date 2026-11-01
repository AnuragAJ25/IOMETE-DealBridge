"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  X,
  Send,
  Bot,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  Copy,
  Check,
  Trash2,
  User,
  HelpCircle,
  ChevronRight,
} from "lucide-react";
import {
  apiClient,
  AssistantChatMessage,
  AssistantCitation,
  KnowledgeAssistantResponse,
} from "@/lib/api";

interface ExtendedChatMessage {
  id: string;
  sender: "user" | "guide";
  text: string;
  citations?: AssistantCitation[];
  suggestedFollowups?: string[];
  evidenceStatus?: string;
  needsConfirmation?: boolean;
  timestamp: string;
  isError?: boolean;
  failedQuery?: string;
}

const DEFAULT_STARTER_QUESTIONS = [
  "What makes IOMETE different from Databricks and Snowflake?",
  "How does IOMETE ensure zero data retention?",
  "What is the pricing model and TCO advantage?",
  "How do I deploy IOMETE on our AWS/Azure/GCP Kubernetes cluster?",
  "How does IOMETE manage Apache Iceberg tables?",
  "What role-based access control does IOMETE support?",
];

const BUYER_PERSONAS = [
  { id: "General", label: "General" },
  { id: "CTO", label: "CTO" },
  { id: "Data Engineer", label: "Data Eng" },
  { id: "FinOps", label: "FinOps" },
  { id: "Architect", label: "Architect" },
];

export function AIGuideCharacter() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showSpeechBubble, setShowSpeechBubble] = useState(true);
  const [inputQuery, setInputQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState<string>("General");
  const [messages, setMessages] = useState<ExtendedChatMessage[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Dismiss greeting bubble after 14 seconds or on interaction
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpeechBubble(false);
    }, 14000);
    return () => clearTimeout(timer);
  }, []);

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSend = async (questionText?: string) => {
    const query = (questionText || inputQuery).trim();
    if (!query || isLoading) return;

    setShowSpeechBubble(false);
    if (!isOpen) setIsOpen(true);

    const userMsg: ExtendedChatMessage = {
      id: "u-" + Date.now(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setIsLoading(true);

    // Build conversation history (excluding error messages)
    const historyPayload: AssistantChatMessage[] = messages
      .filter((m) => !m.isError)
      .slice(-6)
      .map((m) => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text,
      }));

    try {
      const res: KnowledgeAssistantResponse = await apiClient.askKnowledgeAssistant({
        message: query,
        history: historyPayload,
        persona: selectedPersona !== "General" ? selectedPersona : null,
        current_page: pathname,
      });

      const guideMsg: ExtendedChatMessage = {
        id: "g-" + Date.now(),
        sender: "guide",
        text: res.answer,
        citations: res.citations,
        suggestedFollowups: res.suggested_followups,
        evidenceStatus: res.evidence_status,
        needsConfirmation: res.needs_confirmation,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, guideMsg]);
    } catch (err: any) {
      const errorMessage =
        err?.message ||
        "I couldn't reach the IOMETE documentation service at this moment. You can verify your questions directly in the official docs at https://iomete.com or speak with the sales representative.";

      const errorMsg: ExtendedChatMessage = {
        id: "err-" + Date.now(),
        sender: "guide",
        text: errorMessage,
        isError: true,
        failedQuery: query,
        needsConfirmation: true,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = (failedQuery?: string) => {
    if (failedQuery) {
      handleSend(failedQuery);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end pointer-events-auto">
      {/* Speech bubble greeting on first visit */}
      <AnimatePresence>
        {!isOpen && showSpeechBubble && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 5 }}
            transition={{ duration: 0.25 }}
            className="mb-3 max-w-xs bg-slate-900 text-white rounded-2xl p-4 shadow-2xl border border-cyan-500/30 text-xs relative"
          >
            <button
              onClick={() => setShowSpeechBubble(false)}
              className="absolute top-2 right-2 p-1 text-slate-400 hover:text-white rounded-md transition-colors"
              aria-label="Close greeting"
            >
              <X className="h-3 w-3" />
            </button>
            <div className="flex items-center gap-2 mb-1.5 font-semibold text-cyan-300">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>DealBridge AI Guide</span>
            </div>
            <p className="leading-relaxed text-slate-300">
              Ask any question about IOMETE architecture, zero data retention, pricing, Apache Iceberg, or competitive comparison.
            </p>
            <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => {
                  setShowSpeechBubble(false);
                  setIsOpen(true);
                }}
                className="text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group"
              >
                Open Knowledge Assistant <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <span className="text-[10px] text-slate-400">Grounded Docs</span>
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
            className="mb-3 w-[calc(100vw-2.5rem)] sm:w-[440px] max-h-[640px] h-[580px] bg-slate-950 rounded-3xl shadow-2xl border border-cyan-900/40 flex flex-col overflow-hidden text-slate-100"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-slate-900 via-slate-950 to-cyan-950 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold tracking-tight text-white flex items-center gap-1.5">
                    DealBridge AI Guide
                    <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      RAG Grounded
                    </span>
                  </h4>
                  <p className="text-[10px] text-slate-400">
                    Your IOMETE Product &amp; Sales Assistant
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    onClick={() => setMessages([])}
                    title="Clear conversation"
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
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

            {/* Persona Selector Pill Strip */}
            <div className="px-4 py-2 bg-slate-900/70 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
                <User className="h-3 w-3" /> Role:
              </span>
              {BUYER_PERSONAS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPersona(p.id)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-medium transition-all shrink-0 ${
                    selectedPersona === p.id
                      ? "bg-cyan-500 text-slate-950 font-bold shadow-xs shadow-cyan-500/30"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950 text-xs">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col justify-center space-y-4 text-center px-2 py-4">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 shadow-inner">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-slate-100 text-sm">
                      How can I help you understand IOMETE?
                    </h5>
                    <p className="text-slate-400 text-xs mt-1">
                      Ask technical architecture queries, TCO comparisons, security policies, or objection handling scripts. Supports English and Hindi/Hinglish.
                    </p>
                  </div>

                  {/* 6 Core Suggested Questions */}
                  <div className="space-y-1.5 text-left pt-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">
                      Popular Questions:
                    </p>
                    <div className="grid grid-cols-1 gap-1.5">
                      {DEFAULT_STARTER_QUESTIONS.map((q, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(q)}
                          className="w-full text-left p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-cyan-500/40 text-slate-200 text-xs transition-all flex items-start gap-2 shadow-xs group"
                        >
                          <span className="text-cyan-400 group-hover:translate-x-0.5 transition-transform shrink-0">✦</span>
                          <span className="leading-snug">{q}</span>
                        </button>
                      ))}
                    </div>
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
                        className={`max-w-[90%] rounded-2xl p-3.5 leading-relaxed relative group ${
                          msg.sender === "user"
                            ? "bg-blue-600 text-white rounded-br-none shadow-md shadow-blue-600/20"
                            : msg.isError
                            ? "bg-red-950/60 border border-red-800/60 text-red-200 rounded-bl-none"
                            : "bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none shadow-sm"
                        }`}
                      >
                        {/* Copy button for Guide responses */}
                        {msg.sender === "guide" && !msg.isError && (
                          <button
                            onClick={() => handleCopyText(msg.id, msg.text)}
                            title="Copy answer"
                            className="absolute top-2.5 right-2.5 p-1 rounded-md text-slate-400 hover:text-white bg-slate-800/70 hover:bg-slate-700 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            {copiedId === msg.id ? (
                              <Check className="h-3 w-3 text-emerald-400" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </button>
                        )}

                        <div className="whitespace-pre-wrap leading-relaxed pr-6">
                          {msg.text}
                        </div>

                        {/* Evidence Status Pill */}
                        {msg.sender === "guide" && !msg.isError && msg.evidenceStatus && (
                          <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between">
                            <span
                              className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                msg.needsConfirmation
                                  ? "bg-amber-950/80 text-amber-300 border border-amber-800/60"
                                  : "bg-emerald-950/80 text-emerald-300 border border-emerald-800/60"
                              }`}
                            >
                              {msg.needsConfirmation ? (
                                <AlertTriangle className="h-3 w-3 text-amber-400" />
                              ) : (
                                <ShieldCheck className="h-3 w-3 text-emerald-400" />
                              )}
                              {msg.evidenceStatus}
                            </span>
                          </div>
                        )}

                        {/* Structured Citations with Clickable External Links */}
                        {msg.citations && msg.citations.length > 0 && (
                          <div className="mt-2 text-[10px]">
                            <span className="font-semibold text-slate-400 block mb-1">
                              Official Documentation Sources:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {msg.citations.map((cite, i) => (
                                <a
                                  key={i}
                                  href={cite.source_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-800/90 hover:bg-cyan-950/90 text-cyan-300 hover:text-cyan-200 border border-slate-700/80 hover:border-cyan-500/40 font-mono text-[9px] transition-colors"
                                >
                                  <span>{cite.doc_title} &gt; {cite.section_title}</span>
                                  <ExternalLink className="h-2.5 w-2.5 opacity-70" />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Retry button on error */}
                        {msg.isError && (
                          <div className="mt-3 flex items-center justify-between pt-2 border-t border-red-900/50">
                            <span className="text-[10px] text-red-300">
                              Service unavailable or timeout.
                            </span>
                            <button
                              onClick={() => handleRetry(msg.failedQuery)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-red-900/80 hover:bg-red-800 text-white font-medium text-[10px] transition-colors"
                            >
                              <RotateCcw className="h-3 w-3" /> Retry
                            </button>
                          </div>
                        )}

                        {/* Suggested Follow-up Questions */}
                        {msg.suggestedFollowups && msg.suggestedFollowups.length > 0 && (
                          <div className="mt-3 pt-2.5 border-t border-slate-800/90 space-y-1">
                            <span className="text-[10px] font-semibold text-slate-400 block">
                              Suggested Follow-ups:
                            </span>
                            <div className="flex flex-col gap-1">
                              {msg.suggestedFollowups.map((followup, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => handleSend(followup)}
                                  className="text-left px-2 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-cyan-300 hover:text-cyan-200 text-[10px] transition-colors border border-slate-700/50 flex items-center gap-1.5 group"
                                >
                                  <span className="text-cyan-400 group-hover:translate-x-0.5 transition-transform">→</span>
                                  <span>{followup}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <span className="text-[9px] text-slate-500 mt-1 px-1">
                        {msg.timestamp}
                      </span>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isLoading && (
                    <div className="flex items-center gap-2 p-3 bg-slate-900 rounded-2xl border border-slate-800 text-slate-400 w-fit">
                      <div className="flex gap-1 items-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.3s]" />
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.15s]" />
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce" />
                      </div>
                      <span className="text-xs text-slate-300">Searching official IOMETE documentation...</span>
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
              className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask about architecture, security, TCO, or in Hindi..."
                disabled={isLoading}
                className="flex-1 text-xs px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-slate-100 transition-all placeholder:text-slate-500"
              />
              <button
                type="submit"
                disabled={!inputQuery.trim() || isLoading}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-40 text-slate-950 font-bold transition-all shadow-md shadow-cyan-500/20 shrink-0"
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
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex items-center gap-2.5 p-2 rounded-full bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 text-white shadow-2xl shadow-cyan-950/40 border-2 border-cyan-400/40 focus:outline-none focus:ring-4 focus:ring-cyan-400/20 transition-all"
        aria-label="Toggle DealBridge AI Guide"
      >
        {/* Animated Glow Halo */}
        <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-40 blur-sm group-hover:opacity-75 transition duration-300 animate-pulse pointer-events-none" />

        {/* 3D-styled Avatar Face */}
        <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-cyan-600 text-white shadow-inner">
          <Bot className="h-6 w-6 transform group-hover:rotate-6 transition-transform" />
          <span className="absolute top-0 right-0 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-400 border-2 border-slate-950" />
          </span>
        </div>

        {/* Text Pill (shown on hover or initial state) */}
        <div className="hidden sm:flex flex-col text-left pr-3">
          <span className="text-xs font-bold tracking-tight text-white flex items-center gap-1">
            DealBridge AI Guide
            <Sparkles className="h-3 w-3 text-cyan-300" />
          </span>
          <span className="text-[10px] text-cyan-200/80 font-medium">
            Ask questions anytime
          </span>
        </div>
      </motion.button>
    </div>
  );
}
