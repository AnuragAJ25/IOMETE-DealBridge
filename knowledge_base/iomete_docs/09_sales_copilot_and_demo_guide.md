---
title: "IOMETE Sales Copilot & Evaluation Playbook"
category: "Sales Enablement"
source_url: "https://iomete.com/why-iomete"
tags: ["sales-copilot", "objection-handling", "evaluation-playbook", "personas", "cto", "cio", "finops", "data-engineer"]
---

# IOMETE Sales Copilot & Evaluation Playbook

## Buyer Persona Value Framing

### 1. Chief Technology Officer (CTO)
- **Top Priority**: Architectural control, open standards (Apache Iceberg, Spark), multi-cloud portability, avoiding proprietary engine lock-in.
- **Value Framing**: "IOMETE provides an enterprise data lakehouse platform that deploys into your own Kubernetes cluster and cloud VPC. By using native Apache Iceberg tables and Spark SQL, your data remains in standard open formats in your storage buckets, giving your engineering team architectural freedom while reducing reliance on proprietary storage formats."
- **Key Proof Points**: Customer-hosted deployment, native Apache Iceberg REST catalog, open table format accessibility.

### 2. Chief Information Officer (CIO) / Chief Information Security Officer (CISO)
- **Top Priority**: Compliance, data privacy, auditability, reducing risk of third-party data breaches.
- **Value Framing**: "With IOMETE's customer-hosted architecture, customer records and query processing remain inside your Virtual Private Cloud (VPC). Integrated Apache Ranger provides fine-grained Role-Based Access Control (RBAC), cell-level dynamic column masking, and row-level filtering to help satisfy regulatory requirements such as GDPR, HIPAA, and SOC 2."
- **Key Proof Points**: Zero-Data-Retention outside customer VPC, Customer-Managed Encryption Keys (CMEK), Apache Ranger audit logging.

### 3. Data Architect / Principal Engineer
- **Top Priority**: Performance, clean separation of compute and storage, unified catalog, automated table hygiene.
- **Value Framing**: "IOMETE decouples compute and storage using Apache Iceberg tables queried by Spark SQL clusters. The built-in Lakehouse Manager handles table maintenance—including scheduled file compaction, orphan file deletion, and snapshot expiration—automatically in the background so engineers don't have to write custom maintenance jobs."
- **Key Proof Points**: ACID transactions, schema evolution, automated Lakehouse Manager maintenance, dbt adapter.

### 4. Data Engineer / Analytics Engineer
- **Top Priority**: Developer ergonomics, reliable pipelines, SQL editor, notebooks, fast debugging.
- **Value Framing**: "You get a modern, collaborative SQL Studio, native dbt support (`dbt-iomete`), embedded Jupyter notebooks, and scalable Spark batch and streaming jobs. IOMETE handles Kubernetes pod scaling and lifecycle management so you can focus on building pipelines."
- **Key Proof Points**: Interactive SQL editor, visual explain plans, cron scheduling, native dbt models.

### 5. FinOps & Procurement Leader
- **Top Priority**: Cost predictability, capacity planning, transparent licensing.
- **Value Framing**: "IOMETE uses a transparent capacity-based licensing model: Free Tier up to 100 vCPUs, and Enterprise Edition at $500 per vCPU per year with a $100,000/year minimum commitment (200 vCPUs). Customers pay cloud providers directly for underlying infrastructure at their own negotiated discount rates. For continuous, high-volume analytical workloads, capacity licensing provides budget predictability."
- **Key Proof Points**: Capacity-based vCPU licensing, $100k/yr Enterprise minimum commitment, direct cloud billing, auto-suspend clusters to reduce idle compute spend.

## Objection Handling Guide

### Objection 1: "We are already using Snowflake. Why should we consider IOMETE?"
- **Balanced Response**: "Snowflake is an established, feature-rich cloud data warehouse that officially supports Apache Iceberg tables and customer-managed external storage. However, Snowflake's primary model runs as a vendor-managed SaaS service with consumption credits. IOMETE is designed for organizations that want or need to run their lakehouse platform directly inside their own Kubernetes cluster or VPC for data sovereignty, or who prefer fixed annual vCPU software licensing over variable credit consumption. Many organizations evaluate IOMETE specifically for high-volume batch ETL or steady-state analytical workloads."

### Objection 2: "Is running Kubernetes and a customer-hosted data plane an operational burden?"
- **Balanced Response**: "There is a real operational trade-off. In a customer-hosted deployment, your infrastructure team is responsible for managing the underlying Kubernetes cluster (EKS/AKS/GKE), networking, and cloud IAM roles. IOMETE simplifies this by packaging platform microservices in an enterprise Helm chart (`iomete-data-plane-enterprise`) and automating cluster scaling, pod suspend, and table compaction. However, if your team has zero Kubernetes experience or requires a completely serverless vendor-managed solution, self-hosting may require platform engineering bandwidth."

### Objection 3: "How does IOMETE compare to Databricks?"
- **Balanced Response**: "Databricks is a comprehensive data and AI platform centered on Delta Lake, offering deep capabilities across MLflow, data science, and unified governance with Unity Catalog. IOMETE focuses squarely on modern lakehouse SQL analytics, data engineering, and automated Apache Iceberg table maintenance. While Databricks bills via DBU units alongside cloud VM charges, IOMETE charges a flat $500/vCPU/year for its Enterprise Edition."

### Objection 4: "Can we migrate away from IOMETE if our requirements change?"
- **Balanced Response**: "Because IOMETE writes data as standard Parquet files according to open Apache Iceberg table specifications, your underlying data tables are not locked into a proprietary storage container. Other engines—such as Trino, Athena, DuckDB, or Snowflake Iceberg external tables—can query the same data files. However, platform-specific configurations like Apache Ranger policies, SQL Studio saved queries, and automated maintenance schedules would need to be migrated to replacement tools."
