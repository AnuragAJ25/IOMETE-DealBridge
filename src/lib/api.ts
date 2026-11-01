/**
 * IOMETE DealBridge - Centralized Backend API Client
 * Strongly-typed HTTP client for FastAPI + Google Gemini AI microservices.
 * Supports configurable timeouts, automatic retries with exponential backoff,
 * and robust error normalization.
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

const DEFAULT_TIMEOUT_MS = 25000; // 25 seconds for LLM inference
const MAX_RETRIES = 1;

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
  explanation_preference?:
    | "Analogy-Driven"
    | "Financial/ROI-Focused"
    | "Deep Architecture"
    | "Bullet Points"
    | string;
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
// 6. Comprehensive AI Knowledge Assistant & Sales Copilot
// ---------------------------------------------------------------------------
export interface AssistantChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface AssistantCitation {
  doc_title: string;
  section_title: string;
  filename: string;
  source_url: string;
}

export interface KnowledgeAssistantRequest {
  message: string;
  history?: AssistantChatMessage[];
  persona?: string | null;
  current_page?: string | null;
}

export interface KnowledgeAssistantResponse {
  answer: string;
  citations: AssistantCitation[];
  suggested_followups: string[];
  evidence_status: "Verified from Documentation" | "Needs Confirmation" | string;
  needs_confirmation: boolean;
}

// ---------------------------------------------------------------------------
// Fetch Helpers with Timeout & Retry
// ---------------------------------------------------------------------------
async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeoutMs: number = DEFAULT_TIMEOUT_MS
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return res;
  } catch (error: any) {
    if (error.name === "AbortError") {
      throw new ApiError(
        408,
        `Request to ${url} timed out after ${timeoutMs / 1000} seconds. The AI model may be under load.`
      );
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function apiPost<TRequest, TResponse>(
  endpoint: string,
  body: TRequest,
  retries: number = MAX_RETRIES
): Promise<TResponse> {
  const url = `${API_BASE_URL}${endpoint}`;
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetchWithTimeout(url, {
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

        // Retry on 502 or 503 only once
        if ((res.status === 502 || res.status === 503) && attempt < retries) {
          await new Promise((resolve) => setTimeout(resolve, 1000 * (attempt + 1)));
          continue;
        }

        throw new ApiError(
          res.status,
          `Backend API error (${res.status}): ${errorDetail}`,
          errorDetail
        );
      }

      const data = await res.json();
      if (!data) {
        throw new ApiError(204, "Received empty response body from backend.");
      }

      return data as TResponse;
    } catch (error: any) {
      lastError = error;
      if (error instanceof ApiError && error.status !== 408) {
        throw error;
      }
      if (attempt < retries) {
        await new Promise((resolve) => setTimeout(resolve, 800));
        continue;
      }
    }
  }

  if (lastError instanceof ApiError) throw lastError;
  throw new ApiError(
    0,
    `Unable to connect to backend service at ${url}. Please ensure the FastAPI server is running on port 8000. (${
      (lastError as Error)?.message || "Unknown error"
    })`
  );
}

async function apiGet<TResponse>(endpoint: string): Promise<TResponse> {
  const url = `${API_BASE_URL}${endpoint}`;
  try {
    const res = await fetchWithTimeout(
      url,
      { method: "GET" },
      8000 // 8s timeout for health
    );

    if (!res.ok) {
      const text = await res.text();
      throw new ApiError(res.status, `Health check returned ${res.status}: ${text}`);
    }

    return (await res.json()) as TResponse;
  } catch (error: any) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(
      0,
      `Network connection failed to ${url}. Is FastAPI running? (${error.message})`
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

  askKnowledgeAssistant: (
    req: KnowledgeAssistantRequest
  ): Promise<KnowledgeAssistantResponse> =>
    apiPost<KnowledgeAssistantRequest, KnowledgeAssistantResponse>(
      "/api/ai/assistant",
      req
    ),
};
