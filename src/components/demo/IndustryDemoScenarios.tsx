"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Building2,
  ShoppingCart,
  HeartPulse,
  Factory,
  Radio,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  Play,
  RotateCcw,
} from "lucide-react";

export interface DemoScenario {
  id: string;
  industry: string;
  icon: React.ReactNode;
  scenarioTitle: string;
  businessProblem: string;
  exampleDataJourney: {
    step: number;
    title: string;
    detail: string;
  }[];
  platformComponents: string[];
  sellerExplanation: string;
  demoSequence: {
    step: number;
    action: string;
    screenToShow: string;
    talkingPoint: string;
  }[];
  sampleQuery: string;
}

export const INDUSTRY_SCENARIOS: DemoScenario[] = [
  {
    id: "fintech",
    industry: "Banking and Financial Services",
    icon: <Building2 className="h-4 w-4" />,
    scenarioTitle: "Real-Time Fraud & AML Risk Analytics in Customer VPC",
    businessProblem:
      "Legacy warehouse batch pipelines arrive 4 hours late; risk analysts cannot detect rogue wire transactions during peak trading windows, while Snowflake compute credit costs surge 45% during quarterly audits.",
    exampleDataJourney: [
      {
        step: 1,
        title: "Streaming Event Ingestion",
        detail: "Kafka payment streams land into customer-owned AWS S3 buckets in micro-batches.",
      },
      {
        step: 2,
        title: "Iceberg ACID Table Registration",
        detail: "IOMETE commits rows with snapshot isolation, ensuring zero write contention.",
      },
      {
        step: 3,
        title: "Vectorized Query Acceleration",
        detail: "In-memory cache delivers sub-second risk aggregations to Tableau analysts.",
      },
      {
        step: 4,
        title: "Governance Enforcement",
        detail: "Apache Ranger hashes SSNs and account numbers for unauthorized personas dynamically.",
      },
    ],
    platformComponents: [
      "Catalog Explorer (Iceberg Metadata)",
      "SQL Workbench (Sub-Second Engine)",
      "Apache Ranger (Column-Level PII Masking)",
      "Customer VPC Storage (AES-256 KMS CMEK)",
    ],
    sellerExplanation:
      "Notice how transaction logs stream directly into Iceberg tables inside your private cloud perimeter. Data never leaves your AWS account, and fraud analysts query 120M records in 412ms without paying runaway warehouse credits.",
    demoSequence: [
      {
        step: 1,
        action: "Inspect Partitioned Table in Catalog Explorer",
        screenToShow: "Catalog Explorer -> fin_lakehouse.iceberg_transactions",
        talkingPoint:
          "Show how Iceberg hidden partitioning organizes data by year and month with zero maintenance overhead.",
      },
      {
        step: 2,
        action: "Execute 128M Row SQL Aggregation Query",
        screenToShow: "SQL Studio -> Query Editor",
        talkingPoint:
          "Point out the 412ms execution speed and the fact that compute nodes auto-suspend after queries complete.",
      },
      {
        step: 3,
        action: "Demonstrate Dynamic Column Masking",
        screenToShow: "Security Center -> Apache Ranger RBAC Simulator",
        talkingPoint:
          "Switch roles from Lead Engineer to Junior Analyst to show real-time SSN hashing with zero duplicate views.",
      },
    ],
    sampleQuery: `SELECT 
    DATE_TRUNC('month', transaction_ts) AS month,
    account_tier,
    COUNT(1) AS transaction_count,
    ROUND(SUM(amount_usd), 2) AS total_volume_usd,
    ROUND(AVG(latency_ms), 1) AS avg_gateway_latency
FROM fin_lakehouse.iceberg_transactions
WHERE transaction_ts >= CURRENT_DATE - INTERVAL '12 months'
GROUP BY 1, 2
ORDER BY 1 DESC, 4 DESC;`,
  },
  {
    id: "retail",
    industry: "Retail & E-Commerce",
    icon: <ShoppingCart className="h-4 w-4" />,
    scenarioTitle: "Omnichannel Inventory Allocation & Flash Sale Scaling",
    businessProblem:
      "Disconnected store POS and online e-commerce catalogs cause costly stockouts during promotional events; compute billing spikes 300% on holiday peak days with 24/7 cluster over-provisioning.",
    exampleDataJourney: [
      {
        step: 1,
        title: "Store & Web Inventory Feeds",
        detail: "POS terminals and web store events land into open Parquet files on cloud storage.",
      },
      {
        step: 2,
        title: "Automated Compaction",
        detail: "IOMETE merges small files in the background without locking active inventory tables.",
      },
      {
        step: 3,
        title: "High-Concurrency BI Serving",
        detail: "45 regional supply chain planners query inventory simultaneously with zero queue delay.",
      },
    ],
    platformComponents: [
      "Dynamic Auto-Scaler (0 to 50 nodes)",
      "Automated Compaction Engine",
      "Tableau / PowerBI JDBC Connector",
      "S3 Object Storage",
    ],
    sellerExplanation:
      "During flash sales, IOMETE scales compute executors in seconds to serve 40+ concurrent Tableau dashboards, then drops to zero cost overnight when traffic subsides.",
    demoSequence: [
      {
        step: 1,
        action: "Simulate Concurrency Surge",
        screenToShow: "Spark Auto-Scaler -> Concurrency Slider (35 users)",
        talkingPoint:
          "Watch worker nodes boot dynamically on Kubernetes spot instances, keeping infrastructure bills low.",
      },
      {
        step: 2,
        action: "Inspect Background Compaction",
        screenToShow: "Maintenance Center -> Table Compaction Jobs",
        talkingPoint:
          "Demonstrate how IOMETE compacts millions of small POS files into optimized 128MB chunks automatically.",
      },
    ],
    sampleQuery: `SELECT 
    store_region,
    product_category,
    SUM(units_in_stock) AS available_inventory,
    COUNT(DISTINCT store_id) AS reporting_locations
FROM retail_lakehouse.inventory_snapshot
WHERE last_replenished_date >= CURRENT_DATE - 3
GROUP BY 1, 2
HAVING SUM(units_in_stock) < 500
ORDER BY 3 ASC;`,
  },
  {
    id: "healthcare",
    industry: "Healthcare & Life Sciences",
    icon: <HeartPulse className="h-4 w-4" />,
    scenarioTitle: "HIPAA-Compliant Genomic & Clinical Trials Analytics",
    businessProblem:
      "Biotech researchers need direct PySpark access to patient cohort tables, but exporting data out of the warehouse violates HIPAA transmission policies and incurs massive egress fees.",
    exampleDataJourney: [
      {
        step: 1,
        title: "Diagnostic Lab Instruments",
        detail: "Sequencing and clinical trial logs written directly to hospital's private S3 bucket.",
      },
      {
        step: 2,
        title: "Zero-Copy Table Registration",
        detail: "Iceberg metadata catalogs tables in-place without moving or duplicating a single byte.",
      },
      {
        step: 3,
        title: "Native Python / PySpark Model Training",
        detail: "Bioinformatics data scientists read Iceberg tables directly into Jupyter notebooks.",
      },
    ],
    platformComponents: [
      "In-VPC Private Deployment",
      "Zero-Copy Iceberg Engine",
      "PySpark & Jupyter Drivers",
      "Customer-Managed KMS CMEK Keys",
    ],
    sellerExplanation:
      "Patient health records never leave the healthcare provider's dedicated AWS tenant. Researchers train models with native PySpark without external data exfiltration risk.",
    demoSequence: [
      {
        step: 1,
        action: "Verify In-VPC Data Sovereignty",
        screenToShow: "Architecture -> Customer Perimeter Diagram",
        talkingPoint:
          "Show how data at rest is encrypted with the hospital's own AWS KMS Customer-Managed Keys.",
      },
      {
        step: 2,
        action: "Run PySpark Zero-Copy Query",
        screenToShow: "SQL Studio -> Time-Travel Clinical Cohort Query",
        talkingPoint:
          "Inspect how Iceberg snapshots allow researchers to reproduce clinical trial states exactly.",
      },
    ],
    sampleQuery: `SELECT 
    trial_phase,
    biomarker_cohort,
    COUNT(DISTINCT patient_id) AS cohort_size,
    ROUND(AVG(efficacy_score), 2) AS avg_efficacy
FROM clinical_lakehouse.trial_patient_observations
FOR SYSTEM_TIME AS OF '2026-09-01 00:00:00'
WHERE compliance_verified = TRUE
GROUP BY 1, 2
ORDER BY 1, 3 DESC;`,
  },
  {
    id: "manufacturing",
    industry: "Manufacturing & Supply Chain",
    icon: <Factory className="h-4 w-4" />,
    scenarioTitle: "High-Velocity IoT Telemetry & Predictive Maintenance",
    businessProblem:
      "50,000 factory sensors generate 100k events/second. Traditional data warehouses suffer from severe micro-partition write locks and runaway storage costs.",
    exampleDataJourney: [
      {
        step: 1,
        title: "Factory Edge Gateways",
        detail: "Sensor telemetry streams into object storage using micro-batch Spark loaders.",
      },
      {
        step: 2,
        title: "ACID Snapshot Isolation",
        detail: "High-frequency writes land without locking tables or interrupting live analytics.",
      },
      {
        step: 3,
        title: "Predictive Equipment Monitoring",
        detail: "Engineers query historical sensor drifts using Iceberg time-travel to identify wear.",
      },
    ],
    platformComponents: [
      "Micro-Batch Streaming Engine",
      "Apache Iceberg Time-Travel",
      "Spark Kubernetes Auto-Scaler",
      "S3 Commodity Storage",
    ],
    sellerExplanation:
      "Iceberg handles continuous sensor streams with ACID snapshot isolation, eliminating table locks. Engineers query machine vibrations back in time without slowing ingestion.",
    demoSequence: [
      {
        step: 1,
        action: "Inspect Streaming Write Ingestion",
        screenToShow: "Catalog Explorer -> iot_lakehouse.assembly_sensor_logs",
        talkingPoint:
          "Demonstrate high-frequency concurrent writes without pipeline stalls or lock contention.",
      },
      {
        step: 2,
        action: "Execute Time-Travel Machine Anomaly Query",
        screenToShow: "SQL Studio -> Timestamp Filtered Scan",
        talkingPoint:
          "Reconstruct exact sensor state right before an assembly line failure occurred.",
      },
    ],
    sampleQuery: `SELECT 
    machine_id,
    sensor_type,
    ROUND(AVG(reading_value), 3) AS avg_vibration,
    MAX(reading_value) AS peak_anomaly
FROM iot_lakehouse.assembly_sensor_logs
WHERE reading_timestamp >= CURRENT_TIMESTAMP - INTERVAL '2 hours'
GROUP BY 1, 2
HAVING MAX(reading_value) > 95.0
ORDER BY 4 DESC;`,
  },
  {
    id: "telecom",
    industry: "Telecommunications & Media",
    icon: <Radio className="h-4 w-4" />,
    scenarioTitle: "Network QoS Latency & 50TB Daily CDR Log Processing",
    businessProblem:
      "40 million subscribers generate 50TB of daily Call Detail Records (CDRs). Storing and querying raw logs in proprietary warehouses costs over $600k/year in vendor fees.",
    exampleDataJourney: [
      {
        step: 1,
        title: "Cell Tower CDR Feeds",
        detail: "Raw network records stream directly into customer S3/GCS buckets.",
      },
      {
        step: 2,
        title: "Iceberg Open Catalog",
        detail: "Metadata catalogs open Parquet tables at raw cloud commodity storage prices.",
      },
      {
        step: 3,
        title: "Vectorized Network QoS Analysis",
        detail: "Network Operation Centers (NOC) analyze dropped call frequencies across cell towers.",
      },
    ],
    platformComponents: [
      "S3 Commodity Storage (Zero Markup)",
      "Vectorized Parquet Query Engine",
      "Apache Ranger Multi-Tenant Isolation",
      "dbt-iomete Transformation Runner",
    ],
    sellerExplanation:
      "By storing CDR records as open Iceberg files on commodity cloud storage, the telco saves 80% on storage licensing while querying half a billion records in 1.2 seconds.",
    demoSequence: [
      {
        step: 1,
        action: "Inspect 50TB Lakehouse Storage Cost",
        screenToShow: "TCO Calculator -> Commodity Storage Comparison",
        talkingPoint:
          "Compare raw S3 storage ($0.023/GB) vs proprietary warehouse inflated storage ($0.040+/GB).",
      },
      {
        step: 2,
        action: "Run 500M Row CDR Scan",
        screenToShow: "SQL Studio -> 500M Row Query",
        talkingPoint:
          "Show sub-second partition pruning across millions of cell tower events.",
      },
    ],
    sampleQuery: `SELECT 
    cell_tower_zone,
    handover_type,
    COUNT(1) AS total_connections,
    ROUND(AVG(latency_ms), 1) AS avg_packet_delay,
    SUM(CASE WHEN status_code = 'DROPPED' THEN 1 ELSE 0 END) AS dropped_calls
FROM telco_lakehouse.network_cdr_events
WHERE event_date = CURRENT_DATE
GROUP BY 1, 2
ORDER BY 5 DESC
LIMIT 20;`,
  },
];

export function IndustryDemoScenarios({
  onSelectQuery,
}: {
  onSelectQuery?: (sql: string) => void;
}) {
  const [selectedIndustryId, setSelectedIndustryId] =
    useState<string>("fintech");

  const activeScenario =
    INDUSTRY_SCENARIOS.find((s) => s.id === selectedIndustryId) ||
    INDUSTRY_SCENARIOS[0];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="indigo" size="sm">
              Tailored Industry Tour
            </Badge>
            <span className="text-xs text-slate-400">
              5 Pre-Engineered Scenarios
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Personalized Industry Walkthroughs
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Select an industry vertical to inspect authentic business problems,
            end-to-end data journeys, seller scripts, and recommended demo
            sequences.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs self-start sm:self-auto">
          <AlertCircle className="h-3.5 w-3.5 text-amber-600 shrink-0" />
          <span>Sample data & illustrative workflow</span>
        </div>
      </div>

      {/* Industry Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {INDUSTRY_SCENARIOS.map((scenario) => {
          const isSelected = scenario.id === selectedIndustryId;
          return (
            <button
              key={scenario.id}
              onClick={() => setSelectedIndustryId(scenario.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                isSelected
                  ? "bg-sky-600 text-white shadow-md shadow-sky-600/20"
                  : "bg-slate-50 text-slate-600 border border-slate-200/80 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <span>{scenario.icon}</span>
              <span>{scenario.industry}</span>
            </button>
          );
        })}
      </div>

      {/* Main Scenario Details Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
        {/* Left 7 Cols: Business Problem & Data Journey */}
        <div className="lg:col-span-7 space-y-6">
          {/* Scenario Headline & Problem */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="default" size="sm">
                Target Scenario
              </Badge>
              <span className="text-xs font-semibold text-slate-500">
                {activeScenario.industry}
              </span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-slate-900">
              {activeScenario.scenarioTitle}
            </h4>
            <div className="text-xs text-slate-600 leading-relaxed border-t border-slate-200/60 pt-2">
              <span className="font-bold text-slate-800 block mb-0.5">
                Core Business Problem:
              </span>
              <span>{activeScenario.businessProblem}</span>
            </div>
          </div>

          {/* Example Data Journey (Step Timeline) */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Example Data Journey Architecture
            </span>
            <div className="space-y-2.5">
              {activeScenario.exampleDataJourney.map((step) => (
                <div
                  key={step.step}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700 text-xs font-bold font-mono">
                    {step.step}
                  </span>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">
                      {step.title}
                    </h5>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      {step.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Relevant Platform Components */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Relevant IOMETE Platform Components
            </span>
            <div className="flex flex-wrap gap-2">
              {activeScenario.platformComponents.map((comp, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200"
                >
                  {comp}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Seller Script & Demo Sequence */}
        <div className="lg:col-span-5 space-y-5 bg-gradient-to-br from-slate-900 to-slate-950 text-white p-6 sm:p-7 rounded-3xl border border-slate-800 shadow-xl">
          {/* Seller Script */}
          <div className="space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-sky-400 block">
              Seller Narration Hook
            </span>
            <blockquote className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200 italic leading-relaxed">
              "{activeScenario.sellerExplanation}"
            </blockquote>
          </div>

          {/* Suggested Demo Sequence */}
          <div className="space-y-3 pt-3 border-t border-white/10">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
              Recommended Demo Sequence
            </span>
            <div className="space-y-2.5">
              {activeScenario.demoSequence.map((seq) => (
                <div
                  key={seq.step}
                  className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-sky-400 bg-sky-500/20 px-1.5 py-0.5 rounded">
                      Step {seq.step}
                    </span>
                    <span className="text-xs font-bold text-white">
                      {seq.action}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    <span className="text-slate-300 font-medium">Show: </span>
                    {seq.screenToShow}
                  </div>
                  <div className="text-[11px] text-slate-300 italic pt-0.5">
                    "{seq.talkingPoint}"
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Load Sample SQL Query Button */}
          {onSelectQuery && (
            <div className="pt-2">
              <button
                onClick={() => onSelectQuery(activeScenario.sampleQuery)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold shadow-lg transition-transform active:scale-95 cursor-pointer"
              >
                <Terminal className="h-4 w-4" />
                <span>Load Scenario SQL into Workbench</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
