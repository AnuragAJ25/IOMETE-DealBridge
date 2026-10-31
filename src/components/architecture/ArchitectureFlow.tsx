"use client";

import React, { useState, useCallback, useMemo } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
  Panel,
  MarkerType,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Database,
  Cloud,
  Cpu,
  ShieldCheck,
  Server,
  Layers,
  ArrowRight,
  CheckCircle2,
  Info,
  Maximize2,
  RotateCcw,
  Sparkles,
  Smartphone,
  Monitor,
  Activity,
  Lock,
} from "lucide-react";

export interface ComponentDetails {
  id: string;
  name: string;
  layer: string;
  shortDesc: string;
  fullDesc: string;
  specs: { label: string; value: string }[];
  advantages: string[];
  roleInIomete: string;
}

export const ARCHITECTURE_COMPONENTS: Record<string, ComponentDetails> = {
  "data-sources": {
    id: "data-sources",
    name: "Enterprise Data Sources",
    layer: "Ingestion Tier",
    shortDesc: "Databases, REST APIs, Object Files, and Event Logs",
    fullDesc:
      "Operational databases (PostgreSQL, MySQL, Oracle), Kafka/Kinesis real-time event streams, external APIs, and raw files (CSV, JSON, Parquet) feeding into the enterprise ecosystem.",
    specs: [
      { label: "Supported Protocols", value: "JDBC, CDC, REST, Kafka" },
      { label: "Data Formats", value: "Structured, Semi-Structured, Raw" },
      { label: "Throughput", value: "Up to 500k events/sec per worker" },
    ],
    advantages: [
      "Zero format lock-in: ingest raw or staged data directly",
      "Seamless CDC pipeline integration via Debezium or Spark Streaming",
      "No proprietary staging fees before landing into Iceberg",
    ],
    roleInIomete:
      "Feeds initial data streams without requiring transformation into closed warehouse formats.",
  },
  ingestion: {
    id: "ingestion",
    name: "Data Ingestion & Streaming Engine",
    layer: "Ingestion Tier",
    shortDesc: "Automated batch loaders, micro-batch Spark & connectors",
    fullDesc:
      "Orchestrated ingestion pipelines that validate schemas, apply initial cleansing, and batch records directly into Apache Iceberg table files.",
    specs: [
      { label: "Engines", value: "Spark Streaming, Airflow, dbt" },
      { label: "Ingest Frequency", value: "Micro-batch (sub-minute) or Scheduled" },
      { label: "Schema Validation", value: "Automatic drift detection" },
    ],
    advantages: [
      "Writes directly to open Parquet/Iceberg files",
      "No intermediate proprietary staging area required",
      "Automatic schema validation avoids silent data corruption",
    ],
    roleInIomete:
      "Moves data cleanly into customer-owned storage with instant Iceberg table registration.",
  },
  "iceberg-tables": {
    id: "iceberg-tables",
    name: "Apache Iceberg Open Tables",
    layer: "Table Format Tier",
    shortDesc: "High-performance open metadata, snapshots & ACID transactions",
    fullDesc:
      "The open standard table format designed by Netflix for huge analytic tables. Provides serializable isolation, row-level mutations, time-travel queries, and automatic metadata pruning.",
    specs: [
      { label: "Specification", value: "Apache Iceberg v2" },
      { label: "Data Files", value: "Apache Parquet (Columnar)" },
      { label: "Transactions", value: "Full ACID (Snapshot Isolation)" },
      { label: "Compaction", value: "Automated background small-file merge" },
    ],
    advantages: [
      "Zero vendor lock-in: readable by Spark, Trino, Flink, DuckDB, Python",
      "Hidden partitioning eliminates partition-key maintenance overhead",
      "Snapshot time-travel permits point-in-time state rollback",
    ],
    roleInIomete:
      "Forms the foundation of the IOMETE lakehouse, guaranteeing open ownership and zero proprietary lock-in.",
  },
  storage: {
    id: "storage",
    name: "S3-Compatible Cloud Storage",
    layer: "Storage Tier",
    shortDesc: "AWS S3 / Azure Blob / GCS / MinIO inside customer account",
    fullDesc:
      "Customer-owned object storage where all raw data and Iceberg Parquet files reside. Data never leaves your designated cloud account or datacenter.",
    specs: [
      { label: "Data Ownership", value: "100% Customer Cloud Boundary" },
      { label: "Durability", value: "99.999999999% (11 9s)" },
      { label: "Encryption", value: "AWS KMS / Azure Key Vault (CMEK)" },
      { label: "Storage Cost", value: "Direct AWS pricing (~$0.023/GB/mo)" },
    ],
    advantages: [
      "Zero storage markup: you pay cloud provider directly",
      "Zero egress penalty: compute runs in the same VPC/region",
      "Direct retention & lifecycle management policies",
    ],
    roleInIomete:
      "Houses all data files under your exclusive governance with KMS customer-managed keys.",
  },
  spark: {
    id: "spark",
    name: "Apache Spark Elastic Compute",
    layer: "Compute Engine Tier",
    shortDesc: "Vectorized SQL, batch ETL, and PySpark distributed engine",
    fullDesc:
      "High-performance distributed compute engine compiled with vectorized Parquet readers and intelligent query caches, scaling dynamically on Kubernetes.",
    specs: [
      { label: "Engine", value: "Optimized Apache Spark 3.5+" },
      { label: "Scaling", value: "Dynamic auto-scaling from 0 to 100+ nodes" },
      { label: "Auto-Suspend", value: "Shuts down when idle (configurable)" },
      { label: "Latency", value: "Sub-second P95 for cached BI queries" },
    ],
    advantages: [
      "Slashing compute bills by auto-suspending idle clusters",
      "Runs directly on Kubernetes spot instances for max cost savings",
      "Multi-workload: BI SQL, machine learning, and heavy ETL unified",
    ],
    roleInIomete:
      "Delivers rapid analytics without paying expensive proprietary warehouse compute credits.",
  },
  workloads: {
    id: "workloads",
    name: "Analytics, ETL & AI Workloads",
    layer: "Consumption Tier",
    shortDesc: "Tableau, PowerBI, dbt, Looker, Python & ML models",
    fullDesc:
      "Direct SQL, JDBC, ODBC, and Python connectivity for all enterprise business intelligence dashboards, semantic layers, and generative AI agents.",
    specs: [
      { label: "Drivers", value: "JDBC, ODBC, Flight SQL, REST" },
      { label: "BI Tools", value: "Tableau, PowerBI, Looker, Superset" },
      { label: "Code", value: "dbt-iomete, PySpark, Python Pandas" },
    ],
    advantages: [
      "Zero migration friction: works with existing BI and dbt models",
      "Native support for Python and AI feature engineering",
      "No data duplication required for data science teams",
    ],
    roleInIomete:
      "Empowers business users and data scientists to query the lakehouse using their favorite tools.",
  },
  governance: {
    id: "governance",
    name: "Governance, RBAC & Audit",
    layer: "Security & Governance Tier",
    shortDesc: "Apache Ranger, fine-grained access control, column masking",
    fullDesc:
      "Centralized enterprise security layer managing user identities, role-based and attribute-based permissions, dynamic column-level masking, and immutable query audit trails.",
    specs: [
      { label: "RBAC Engine", value: "Apache Ranger" },
      { label: "Masking", value: "Dynamic column hashing & row filtering" },
      { label: "Audit Trails", value: "Immutable query logs with user attribution" },
      { label: "SSO / Identity", value: "Okta, Azure AD, SAML 2.0, OIDC" },
    ],
    advantages: [
      "Fine-grained row/column masking without creating duplicate views",
      "Unified access policies across all analytical engines",
      "SOC2 Type II and HIPAA ready compliance guardrails",
    ],
    roleInIomete:
      "Protects sensitive PII and financial records before data reaches analyst queries.",
  },
  infrastructure: {
    id: "infrastructure",
    name: "Customer Cloud Infrastructure",
    layer: "Infrastructure Tier",
    shortDesc: "Private VPC / VNet / On-Premise Enterprise Boundary",
    fullDesc:
      "Your dedicated network perimeter on AWS, Azure, Google Cloud, or bare-metal data centers. All compute nodes, storage buckets, and caches remain within this perimeter.",
    specs: [
      { label: "Deployment", value: "Customer VPC or On-Premise" },
      { label: "Network", value: "Private subnets, no public ingress" },
      { label: "Egress", value: "Zero data egress to external vendors" },
    ],
    advantages: [
      "Complete data sovereignty: strict isolation guaranteed",
      "Satisfies strict financial and healthcare InfoSec requirements",
      "Direct leverage of existing cloud enterprise discounts (EDP)",
    ],
    roleInIomete:
      "Guarantees that your data never touches IOMETE or multi-tenant third-party infrastructure.",
  },
  kubernetes: {
    id: "kubernetes",
    name: "Kubernetes Orchestration Plane",
    layer: "Infrastructure Tier",
    shortDesc: "EKS / AKS / GKE / OpenShift cluster manager",
    fullDesc:
      "Cloud-native orchestration managing Spark driver and executor pods, monitoring node health, scaling worker pools, and running automated maintenance jobs.",
    specs: [
      { label: "K8s Engines", value: "EKS, AKS, GKE, OpenShift, Vanilla K8s" },
      { label: "Autoscaling", value: "Kubernetes Cluster Autoscaler / Karpenter" },
      { label: "Control Plane", value: "Single-tenant managed control plane" },
    ],
    advantages: [
      "Instant elasticity: boots worker pods in seconds during peak queries",
      "Self-healing: automatically replaces failed executor nodes",
      "Native container packaging with zero OS drift",
    ],
    roleInIomete:
      "Orchestrates compute fleets elastically on top of your existing cloud infrastructure.",
  },
};

// Custom React Flow node rendering
function CustomArchNode({ data }: { data: any }) {
  const isSelected = data.isSelected;
  return (
    <div
      onClick={data.onClick}
      className={`px-4 py-3 rounded-2xl border-2 transition-all cursor-pointer shadow-md min-w-[200px] max-w-[240px] text-left ${
        isSelected
          ? "border-sky-500 bg-sky-50 ring-4 ring-sky-500/20 shadow-lg scale-105"
          : "border-slate-200 bg-white hover:border-sky-300 hover:bg-slate-50/80"
      }`}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {data.layer}
        </span>
        <span
          className={`h-2 w-2 rounded-full ${
            isSelected ? "bg-sky-500" : "bg-slate-300"
          }`}
        />
      </div>
      <div className="font-bold text-xs text-slate-900 leading-tight">
        {data.label}
      </div>
      <div className="text-[11px] text-slate-500 mt-1 line-clamp-2">
        {data.shortDesc}
      </div>
    </div>
  );
}

const nodeTypes = {
  customNode: CustomArchNode,
};

export function ArchitectureFlow() {
  const [selectedComponentId, setSelectedComponentId] =
    useState<string>("iceberg-tables");
  const [viewMode, setViewMode] = useState<"canvas" | "stacked">("canvas");

  const selectedDetails =
    ARCHITECTURE_COMPONENTS[selectedComponentId] ||
    ARCHITECTURE_COMPONENTS["iceberg-tables"];

  // Initial Nodes Layout (Canvas Coordinates)
  const initialNodes: Node[] = useMemo(
    () => [
      // Top layer: Data Sources
      {
        id: "data-sources",
        type: "customNode",
        position: { x: 50, y: 40 },
        data: {
          label: "Data Sources",
          layer: "1. Sources",
          shortDesc: "Databases, APIs, Files, Logs",
          isSelected: selectedComponentId === "data-sources",
          onClick: () => setSelectedComponentId("data-sources"),
        },
      },
      // Ingestion
      {
        id: "ingestion",
        type: "customNode",
        position: { x: 330, y: 40 },
        data: {
          label: "Data Ingestion",
          layer: "2. Pipelines",
          shortDesc: "Batch & Streaming loaders",
          isSelected: selectedComponentId === "ingestion",
          onClick: () => setSelectedComponentId("ingestion"),
        },
      },
      // S3 Storage
      {
        id: "storage",
        type: "customNode",
        position: { x: 610, y: 40 },
        data: {
          label: "S3-Compatible Storage",
          layer: "3. Object Storage",
          shortDesc: "Customer-owned AWS S3 / MinIO",
          isSelected: selectedComponentId === "storage",
          onClick: () => setSelectedComponentId("storage"),
        },
      },
      // Apache Iceberg Tables
      {
        id: "iceberg-tables",
        type: "customNode",
        position: { x: 610, y: 190 },
        data: {
          label: "Apache Iceberg Tables",
          layer: "4. Open Table Format",
          shortDesc: "ACID metadata & snapshots",
          isSelected: selectedComponentId === "iceberg-tables",
          onClick: () => setSelectedComponentId("iceberg-tables"),
        },
      },
      // Apache Spark Compute
      {
        id: "spark",
        type: "customNode",
        position: { x: 330, y: 190 },
        data: {
          label: "Apache Spark Compute",
          layer: "5. Elastic Engine",
          shortDesc: "Vectorized SQL & Auto-Scaler",
          isSelected: selectedComponentId === "spark",
          onClick: () => setSelectedComponentId("spark"),
        },
      },
      // Governance & Ranger
      {
        id: "governance",
        type: "customNode",
        position: { x: 50, y: 190 },
        data: {
          label: "Governance & RBAC",
          layer: "6. Security Plane",
          shortDesc: "Apache Ranger & Column Masking",
          isSelected: selectedComponentId === "governance",
          onClick: () => setSelectedComponentId("governance"),
        },
      },
      // Analytics & Workloads
      {
        id: "workloads",
        type: "customNode",
        position: { x: 330, y: 340 },
        data: {
          label: "Analytics & AI Workloads",
          layer: "7. Consumption",
          shortDesc: "Tableau, PowerBI, dbt, Python",
          isSelected: selectedComponentId === "workloads",
          onClick: () => setSelectedComponentId("workloads"),
        },
      },
      // Kubernetes Orchestration
      {
        id: "kubernetes",
        type: "customNode",
        position: { x: 610, y: 340 },
        data: {
          label: "Kubernetes Orchestration",
          layer: "8. Cluster Plane",
          shortDesc: "EKS / AKS / Cloud-native nodes",
          isSelected: selectedComponentId === "kubernetes",
          onClick: () => setSelectedComponentId("kubernetes"),
        },
      },
      // Customer Infrastructure Boundary
      {
        id: "infrastructure",
        type: "customNode",
        position: { x: 50, y: 340 },
        data: {
          label: "Customer Cloud Perimeter",
          layer: "9. Infrastructure",
          shortDesc: "Private VPC / Zero Data Egress",
          isSelected: selectedComponentId === "infrastructure",
          onClick: () => setSelectedComponentId("infrastructure"),
        },
      },
    ],
    [selectedComponentId]
  );

  // Animated flow edges connecting the architecture
  const initialEdges: Edge[] = useMemo(
    () => [
      {
        id: "e1-2",
        source: "data-sources",
        target: "ingestion",
        animated: true,
        style: { stroke: "#0284c7", strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#0284c7" },
      },
      {
        id: "e2-3",
        source: "ingestion",
        target: "storage",
        animated: true,
        style: { stroke: "#0284c7", strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#0284c7" },
      },
      {
        id: "e3-4",
        source: "storage",
        target: "iceberg-tables",
        animated: true,
        style: { stroke: "#0d9488", strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#0d9488" },
      },
      {
        id: "e4-5",
        source: "iceberg-tables",
        target: "spark",
        animated: true,
        style: { stroke: "#6366f1", strokeWidth: 2.5 },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#6366f1" },
      },
      {
        id: "e6-5",
        source: "governance",
        target: "spark",
        animated: true,
        style: { stroke: "#10b981", strokeWidth: 2, strokeDasharray: "5,5" },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#10b981" },
      },
      {
        id: "e5-7",
        source: "spark",
        target: "workloads",
        animated: true,
        style: { stroke: "#8b5cf6", strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#8b5cf6" },
      },
      {
        id: "e8-5",
        source: "kubernetes",
        target: "spark",
        animated: false,
        style: { stroke: "#64748b", strokeWidth: 1.5, strokeDasharray: "4,4" },
      },
      {
        id: "e9-6",
        source: "infrastructure",
        target: "governance",
        animated: false,
        style: { stroke: "#64748b", strokeWidth: 1.5, strokeDasharray: "4,4" },
      },
    ],
    []
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Sync selection to nodes
  React.useEffect(() => {
    setNodes((nds) =>
      nds.map((n) => ({
        ...n,
        data: {
          ...n.data,
          isSelected: n.id === selectedComponentId,
        },
      }))
    );
  }, [selectedComponentId, setNodes]);

  return (
    <div className="space-y-4">
      {/* Disclaimer Banner Required by Specification */}
      <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
        <Info className="h-4 w-4 shrink-0 text-amber-600" />
        <span>
          <strong>Illustrative Architecture Explanation:</strong> This diagram is
          a conceptual architecture model designed for technical evaluation, not
          a live telemetry feed of a customer production deployment.
        </span>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8 Cols: React Flow Canvas or Mobile Stacked View */}
        <div className="lg:col-span-8 space-y-3">
          {/* Controls Bar */}
          <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-2">
              <Badge variant="indigo" size="sm">
                Interactive Model
              </Badge>
              <span className="text-xs text-slate-500 hidden sm:inline">
                Click any node to inspect specifications
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Toggle Canvas vs Stacked for Mobile */}
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs">
                <button
                  onClick={() => setViewMode("canvas")}
                  className={`px-2.5 py-1 rounded-md font-medium transition-all flex items-center gap-1 ${
                    viewMode === "canvas"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <Monitor className="h-3 w-3" />
                  <span>Canvas</span>
                </button>
                <button
                  onClick={() => setViewMode("stacked")}
                  className={`px-2.5 py-1 rounded-md font-medium transition-all flex items-center gap-1 ${
                    viewMode === "stacked"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <Smartphone className="h-3 w-3" />
                  <span>Stacked</span>
                </button>
              </div>
            </div>
          </div>

          {viewMode === "canvas" ? (
            /* React Flow Canvas */
            <div className="h-[520px] w-full rounded-3xl border border-slate-200/80 bg-slate-50/50 shadow-inner overflow-hidden relative">
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                fitView
                fitViewOptions={{ padding: 0.2 }}
                minZoom={0.5}
                maxZoom={1.5}
                attributionPosition="bottom-left"
              >
                <Background color="#cbd5e1" gap={20} size={1} />
                <Controls className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden" />
                <MiniMap
                  nodeColor={(n) =>
                    n.id === selectedComponentId ? "#0284c7" : "#e2e8f0"
                  }
                  maskColor="rgba(241, 245, 249, 0.7)"
                  className="rounded-xl border border-slate-200 shadow-sm overflow-hidden hidden sm:block"
                />

                <Panel
                  position="top-right"
                  className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 text-[11px] text-slate-600 shadow-xs"
                >
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    Animated Data-Flow Active
                  </span>
                </Panel>
              </ReactFlow>
            </div>
          ) : (
            /* Mobile-Friendly Stacked Fallback */
            <div className="space-y-2.5">
              {Object.values(ARCHITECTURE_COMPONENTS).map((comp, idx) => {
                const isSelected = comp.id === selectedComponentId;
                return (
                  <div
                    key={comp.id}
                    onClick={() => setSelectedComponentId(comp.id)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      isSelected
                        ? "border-sky-500 bg-sky-50 shadow-md"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="h-6 w-6 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center text-xs font-bold font-mono">
                          {idx + 1}
                        </span>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            {comp.layer}
                          </div>
                          <div className="font-bold text-sm text-slate-900">
                            {comp.name}
                          </div>
                        </div>
                      </div>
                      <ArrowRight
                        className={`h-4 w-4 transition-transform ${
                          isSelected ? "text-sky-600 translate-x-1" : "text-slate-300"
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right 4 Cols: Side Panel with Deep Component Explanation */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-5 sticky top-20">
            <div>
              <div className="flex items-center justify-between mb-1">
                <Badge variant="indigo" size="sm">
                  {selectedDetails.layer}
                </Badge>
                <span className="text-[10px] font-mono text-slate-400 uppercase">
                  ID: {selectedDetails.id}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight mt-2">
                {selectedDetails.name}
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {selectedDetails.shortDesc}
              </p>
            </div>

            {/* Full Architectural Description */}
            <div className="pt-3 border-t border-slate-100">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
                Component Overview
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">
                {selectedDetails.fullDesc}
              </p>
            </div>

            {/* Technical Specifications */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                Technical Specifications
              </span>
              <div className="space-y-1.5">
                {selectedDetails.specs.map((spec, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                  >
                    <span className="text-slate-500">{spec.label}:</span>
                    <span className="font-bold text-slate-800 font-mono text-[11px]">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Architectural Value / Advantages */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                Key Benefits & Safeguards
              </span>
              <ul className="space-y-2">
                {selectedDetails.advantages.map((adv, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs text-slate-700"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{adv}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Role in IOMETE Lakehouse */}
            <div className="p-3 rounded-2xl bg-sky-50 border border-sky-100 text-xs text-sky-900">
              <span className="font-bold block mb-0.5">Role in IOMETE:</span>
              <span>{selectedDetails.roleInIomete}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
