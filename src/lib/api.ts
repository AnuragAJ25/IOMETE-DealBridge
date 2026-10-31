/**
 * IOMETE DealBridge - Backend API Client
 * Centralized, strongly-typed HTTP client for FastAPI + Gemini AI services.
 * Schema definitions mirror backend/app/schemas/ exactly.
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

// ---------------------------------------------------------------------------
// Health
// ---------------------------------------------------------------------------
export interface HealthResponse {
  status: string;
  version: string;
  gemini_configured: boolean;
  gemini_model: string;
  documentation_files_indexed: number;
}

// ---------------------------------------------------------------------------
// 1. Product Explainer
// ---------------------------------------------------------------------------
export interface ProductExplainerRequest {
  buyer_role: string;
  technical_level?: "Executive" | "Intermediate" | "Deep Technical" | string;
  topic: string;
  explanation_preference?: "Analogy-Driven" | "Financial/ROI-Focused" | "Deep Architecture" | "Bullet Points" | string;
}

export interface ProductExplainerResponse {
  simple_explanation: string;
  business_relevance: string;
  technical_explanation: string;
  practical_example: string;
  follow_up_question: string;
}

// ---------------------------------------------------------------------------
// 2. Sales Call Prep
// ---------------------------------------------------------------------------
export interface PotentialObjection {
  objection: string;
  recommended_response: string;
}

export interface SalesCallPrepRequest {
  company_name: string;
  industry: string;
  buyer_role: string;
  known_challenges: string[] | string;
  meeting_objective: string;
}

export interface SalesCallPrepResponse {
  meeting_brief: string;
  discovery_questions: string[];
  relevant_iomete_capabilities: string[];
  talking_points: string[];
  potential_objections: PotentialObjection[];
  verification_notes: string[];
}

// ---------------------------------------------------------------------------
// 3. Demo Personalizer
// ---------------------------------------------------------------------------
export interface DemoPersonalizerRequest {
  industry: string;
  buyer_requirements: string[] | string;
  use_case: string;
  technical_level?: "Executive" | "Intermediate" | "Hands-On Data Engineer" | string;
}

export interface DemoPersonalizerResponse {
  demo_storyline: string;
  relevant_components: string[];
  sample_data_scenario: string;
  seller_talking_points: string[];
  suggested_next_step: string;
}

// ---------------------------------------------------------------------------
// 4. Security Assistant
// ---------------------------------------------------------------------------
export interface SecurityAssistantRequest {
  question: string;
  documentation_context?: string | null;
}

export interface SecurityAssistantResponse {
  answer: string;
  source_references: string[];
  evidence_status: "Verified from Documentation" | "Needs Confirmation" | string;
  needs_confirmation: boolean;
}

// ---------------------------------------------------------------------------
// 5. Meeting Summary
// ---------------------------------------------------------------------------
export interface MeetingSummaryRequest {
  buyer_requirements: string[] | string;
  selected_use_cases: string[];
  questions_discussed: string[];
  seller_notes?: string | null;
  next_steps?: string[] | null;
}

export interface MeetingSummaryResponse {
  meeting_summary: string;
  key_requirements: string[];
  discussed_capabilities: string[];
  unanswered_questions: string[];
  recommended_next_steps: string[];
}

// ---------------------------------------------------------------------------
// Fetch Helpers
// ---------------------------------------------------------------------------
async function apiPost<TRequest, TResponse>(
  endpoint: string,
  body: TRequest
): Promise<TResponse> {
  const url = `${API_BASE_URL}${endpoint}`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      let errorDetail = "";
      try {
        const errJson = await res.json();
        errorDetail = errJson.detail || JSON.stringify(errJson);
      } catch {
        errorDetail = await res.text();
      }
      throw new ApiError(
        res.status,
        `Backend API error (${res.status}): ${errorDetail}`,
        errorDetail
      );
    }

    return (await res.json()) as TResponse;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(
      0,
      `Network connection failed to ${url}. Is FastAPI running? (${(error as Error).message})`
    );
  }
}

async function apiGet<TResponse>(endpoint: string): Promise<TResponse> {
  const url = `${API_BASE_URL}${endpoint}`;
  try {
    const res = await fetch(url, { method: "GET" });
    if (!res.ok) {
      const text = await res.text();
      throw new ApiError(res.status, `Health check failed: ${text}`);
    }
    return (await res.json()) as TResponse;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(
      0,
      `Network connection failed to ${url}. Is FastAPI running? (${(error as Error).message})`
    );
  }
}

// ---------------------------------------------------------------------------
// Exported Client API
// ---------------------------------------------------------------------------
export const apiClient = {
  checkHealth: (): Promise<HealthResponse> => apiGet<HealthResponse>("/health"),

  generateProductExplainer: (
    req: ProductExplainerRequest
  ): Promise<ProductExplainerResponse> =>
    apiPost<ProductExplainerRequest, ProductExplainerResponse>(
      "/api/ai/product-explainer",
      req
    ),

  generateSalesCallPrep: (
    req: SalesCallPrepRequest
  ): Promise<SalesCallPrepResponse> =>
    apiPost<SalesCallPrepRequest, SalesCallPrepResponse>(
      "/api/ai/sales-call-prep",
      req
    ),

  generateDemoPersonalizer: (
    req: DemoPersonalizerRequest
  ): Promise<DemoPersonalizerResponse> =>
    apiPost<DemoPersonalizerRequest, DemoPersonalizerResponse>(
      "/api/ai/demo-personalizer",
      req
    ),

  askSecurityAssistant: (
    req: SecurityAssistantRequest
  ): Promise<SecurityAssistantResponse> =>
    apiPost<SecurityAssistantRequest, SecurityAssistantResponse>(
      "/api/ai/security-assistant",
      req
    ),

  generateMeetingSummary: (
    req: MeetingSummaryRequest
  ): Promise<MeetingSummaryResponse> =>
    apiPost<MeetingSummaryRequest, MeetingSummaryResponse>(
      "/api/ai/meeting-summary",
      req
    ),
};
