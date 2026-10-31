"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export interface PresentationStage {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  route: string;
  durationMin: number;
  category: "Discovery" | "Architecture" | "Validation" | "Economics" | "Close";
  sellerGoal: string;
  buyerFocus: string;
}

export const PRESENTATION_STAGES: PresentationStage[] = [
  {
    id: "use-cases",
    number: 1,
    title: "Discovery & Use-Case Mapping",
    shortTitle: "Use Cases",
    route: "/use-cases",
    durationMin: 7,
    category: "Discovery",
    sellerGoal: "Diagnose warehouse pain points, query latency, and runaway compute bills.",
    buyerFocus: "Map existing team bottlenecks to Iceberg-powered solutions.",
  },
  {
    id: "architecture",
    number: 2,
    title: "Modern Lakehouse Architecture",
    shortTitle: "Architecture",
    route: "/architecture",
    durationMin: 10,
    category: "Architecture",
    sellerGoal: "Demonstrate open Apache Iceberg storage decoupled from elastic compute.",
    buyerFocus: "Verify private VPC deployment, no vendor lock-in, zero egress fees.",
  },
  {
    id: "demo",
    number: 3,
    title: "Live Platform Tour & Experience",
    shortTitle: "Product Demo",
    route: "/demo",
    durationMin: 12,
    category: "Validation",
    sellerGoal: "Showcase sub-second SQL, automated cluster auto-scaling & Apache Spark.",
    buyerFocus: "Assess UX simplicity for data engineers, analysts, and business users.",
  },
  {
    id: "security",
    number: 4,
    title: "Enterprise Trust & Governance",
    shortTitle: "Security",
    route: "/security",
    durationMin: 6,
    category: "Validation",
    sellerGoal: "Highlight Apache Ranger RBAC, SOC2 Type II, HIPAA, and Zero Data Retention.",
    buyerFocus: "Satisfy InfoSec compliance and data sovereignty in client's own cloud.",
  },
  {
    id: "business-case",
    number: 5,
    title: "TCO Reduction & ROI Modeling",
    shortTitle: "TCO & ROI",
    route: "/business-case",
    durationMin: 8,
    category: "Economics",
    sellerGoal: "Prove 70%+ compute savings versus Snowflake or Databricks on identical workloads.",
    buyerFocus: "Calculate annual budget impact and 3-year Total Cost of Ownership.",
  },
  {
    id: "competitors",
    number: 6,
    title: "Competitive Landscape & Battlecards",
    shortTitle: "Comparison",
    route: "/competitors",
    durationMin: 5,
    category: "Economics",
    sellerGoal: "Address proprietary warehouse lock-in and excessive credit markups.",
    buyerFocus: "Examine clear contrast with Snowflake, Databricks, and AWS Athena.",
  },
  {
    id: "meeting-summary",
    number: 7,
    title: "Executive Summary & Next Steps",
    shortTitle: "Summary & MAP",
    route: "/meeting-summary",
    durationMin: 5,
    category: "Close",
    sellerGoal: "Secure agreement on 14-day production PoC with Mutual Action Plan.",
    buyerFocus: "Review auto-generated recap, quantified ROI, and implementation timeline.",
  },
];

export interface SessionData {
  buyerCompany: string;
  buyerName: string;
  buyerRole: string;
  currentWarehouse: string;
  dataSizeTB: number;
  monthlyCloudSpend: number;
  activeAnalysts: number;
  notes: string[];
  bookmarkedQuestions: string[];
}

interface PresentationContextType {
  role: "seller" | "buyer";
  setRole: (role: "seller" | "buyer") => void;
  currentStageIndex: number;
  currentStage: PresentationStage;
  nextStage: () => void;
  prevStage: () => void;
  goToStage: (index: number) => void;
  isNotesOpen: boolean;
  setIsNotesOpen: (open: boolean) => void;
  sessionData: SessionData;
  updateSessionData: (updates: Partial<SessionData>) => void;
  meetingTimeElapsed: number;
  isTimerRunning: boolean;
  toggleTimer: () => void;
  resetTimer: () => void;
  stages: PresentationStage[];
}

const defaultSession: SessionData = {
  buyerCompany: "Northstar FinTech",
  buyerName: "Alex Vance",
  buyerRole: "VP of Data & Infrastructure",
  currentWarehouse: "Snowflake",
  dataSizeTB: 120,
  monthlyCloudSpend: 42000,
  activeAnalysts: 35,
  notes: [
    "Buyer expressed high urgency around Q4 budget cuts; compute credits 40% over budget.",
    "Interested in Apache Iceberg table format to avoid vendor lock-in.",
  ],
  bookmarkedQuestions: [
    "How does IOMETE handle automated Iceberg compaction?",
    "Can we bring our existing AWS IAM roles directly to private clusters?",
  ],
};

const PresentationContext = createContext<PresentationContextType | undefined>(undefined);

export function PresentationProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [role, setRoleState] = useState<"seller" | "buyer">("seller");
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false);
  const [sessionData, setSessionData] = useState<SessionData>(defaultSession);
  const [meetingTimeElapsed, setMeetingTimeElapsed] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  // Sync current stage index based on route
  useEffect(() => {
    const stageIdx = PRESENTATION_STAGES.findIndex((s) => s.route === pathname);
    if (stageIdx !== -1) {
      setCurrentStageIndex(stageIdx);
    }
  }, [pathname]);

  // Load persisted session from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("iomete_dealbridge_session");
      if (saved) {
        try {
          setSessionData(JSON.parse(saved));
        } catch {
          // ignore parsing error
        }
      }
      const savedRole = localStorage.getItem("iomete_dealbridge_role") as "seller" | "buyer";
      if (savedRole) {
        setRoleState(savedRole);
      }
    }
  }, []);

  const setRole = (newRole: "seller" | "buyer") => {
    setRoleState(newRole);
    if (typeof window !== "undefined") {
      localStorage.setItem("iomete_dealbridge_role", newRole);
    }
  };

  const updateSessionData = (updates: Partial<SessionData>) => {
    setSessionData((prev) => {
      const next = { ...prev, ...updates };
      if (typeof window !== "undefined") {
        localStorage.setItem("iomete_dealbridge_session", JSON.stringify(next));
      }
      return next;
    });
  };

  // Timer tick
  useEffect(() => {
    if (!isTimerRunning) return;
    const interval = setInterval(() => {
      setMeetingTimeElapsed((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const toggleTimer = () => setIsTimerRunning((v) => !v);
  const resetTimer = () => setMeetingTimeElapsed(0);

  const goToStage = (index: number) => {
    if (index >= 0 && index < PRESENTATION_STAGES.length) {
      setCurrentStageIndex(index);
      router.push(PRESENTATION_STAGES[index].route);
    }
  };

  const nextStage = () => {
    if (currentStageIndex < PRESENTATION_STAGES.length - 1) {
      goToStage(currentStageIndex + 1);
    }
  };

  const prevStage = () => {
    if (currentStageIndex > 0) {
      goToStage(currentStageIndex - 1);
    }
  };

  const currentStage = PRESENTATION_STAGES[currentStageIndex] || PRESENTATION_STAGES[0];

  return (
    <PresentationContext.Provider
      value={{
        role,
        setRole,
        currentStageIndex,
        currentStage,
        nextStage,
        prevStage,
        goToStage,
        isNotesOpen,
        setIsNotesOpen,
        sessionData,
        updateSessionData,
        meetingTimeElapsed,
        isTimerRunning,
        toggleTimer,
        resetTimer,
        stages: PRESENTATION_STAGES,
      }}
    >
      {children}
    </PresentationContext.Provider>
  );
}

export function usePresentation() {
  const context = useContext(PresentationContext);
  if (!context) {
    throw new Error("usePresentation must be used within a PresentationProvider");
  }
  return context;
}
