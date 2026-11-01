---
title: "IOMETE Architecture & Technology Stack"
category: "Architecture"
source_url: "https://iomete.com/docs/architecture"
tags: ["architecture", "kubernetes", "apache-iceberg", "apache-spark", "rest-catalog", "compute-storage-separation"]
---

# IOMETE Architecture & Technology Stack

## 3-Tier Architecture Overview
IOMETE is architected across three distinct, decoupled tiers that ensure horizontal scalability, performance isolation, and total data privacy:

### Tier 1: Infrastructure & Storage Tier
- **Underlying Substrate**: Deployed on Kubernetes (EKS on AWS, AKS on Azure, GKE on Google Cloud, or on-premises Red Hat OpenShift / vanilla Kubernetes).
- **Storage Layer**: Customer-owned object storage—AWS S3, Azure Data Lake Storage (ADLS) Gen2, Google Cloud Storage (GCS), or S3-compatible on-premise storage (MinIO, Ceph, Apache Ozone).
- **Physical Data Format**: Apache Parquet files organized into Apache Iceberg table specifications.

### Tier 2: Platform Services & Control Plane (IOMETE Data Plane Services)
The platform services run inside the customer's Kubernetes cluster and orchestrate platform operations:
- **IOM-Identity**: Authentication, identity federation (OIDC, SAML, LDAP, Azure AD, Okta), and session lifecycle.
- **IOM-Core**: Central platform control service, project orchestration, and user management.
- **IOM-Cluster**: Lifecycle manager for compute clusters, managing dynamic autoscaling, auto-suspend, and Kubernetes pod provisioning.
- **IOM-SQL**: Query coordination service, query history, visual query plan inspection, and client session routing.
- **IOM-Gateway**: Secure API routing, reverse proxy, and SSL/TLS termination.
- **Iceberg REST Catalog**: Standards-compliant Apache Iceberg REST Catalog managing snapshot isolation, ACID transactions, table commits, schema evolution, and time-travel operations.
- **Governance & Policy Engine**: Apache Ranger integrated daemon enforcing cell-level access control, data masking, and row-level filtering policies.

### Tier 3: Workload & Compute Engines
- **Interactive SQL Warehouses**: Highly optimized Apache Spark SQL compute clusters tailored for low-latency BI dashboards and ad-hoc analytical queries.
- **Batch Processing & ETL Clusters**: Ephemeral, autoscaling Spark clusters for high-throughput data ingestion, transformation, and compaction.
- **Streaming Ingestion**: Continuous Spark Streaming pipelines consuming from Kafka, Event Hubs, Kinesis, or messaging queues directly into Iceberg tables.
- **Notebook & Machine Learning Workloads**: Embedded Jupyter notebook environments and Spark MLlib/PySpark runtimes accessing the same governed Iceberg catalog without data movement.

## Apache Iceberg: The Core Lakehouse Foundation
IOMETE treats Apache Iceberg as a first-class table format standard:
- **ACID Transactions**: Serializable isolation ensuring multi-writer and concurrent query consistency without corrupt reads or partial writes.
- **Full Schema Evolution**: Add, drop, rename, or reorder columns and nested fields with zero table rewrites or side-effects.
- **Hidden Partitioning**: Avoids accidental partition mistakes by abstracting date/timestamp transformations (days, months, bucketing, identity) away from user queries.
- **Time Travel & Rollbacks**: Every commit produces an immutable metadata snapshot. Query historical data via `TIMESTAMP AS OF` or `VERSION AS OF` and rollback accidental deletes instantly.
- **Automated Table Maintenance**: IOMETE automated Lakehouse Manager continuously runs compaction (bin-packing small files into optimal target sizes), orphan file deletion, and snapshot expiration in the background to ensure query performance does not degrade over time.

## Compute-Storage Separation
Unlike legacy shared-disk or tightly-coupled architectures:
- Storage scales independently to petabyte and exabyte scale at raw cloud object storage costs.
- Compute clusters scale up or down dynamically based on user load and query concurrency.
- Compute clusters can be completely suspended (auto-pause down to 0 replicas) when idle, dropping compute spend to zero.
- Workload isolation prevents heavy data engineering transformations or ETL from starving executive BI dashboards of CPU and memory resources.
