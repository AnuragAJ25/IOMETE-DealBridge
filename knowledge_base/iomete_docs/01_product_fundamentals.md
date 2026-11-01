---
title: "IOMETE Product Fundamentals"
category: "Product Overview"
source_url: "https://iomete.com/docs/architecture"
tags: ["overview", "lakehouse", "architecture", "data-platform", "apache-iceberg", "apache-spark"]
---

# IOMETE Product Fundamentals

## What is IOMETE?
IOMETE is a fully-managed modern Data Lakehouse software platform built on open standards—specifically Apache Iceberg and Apache Spark—designed to be deployed inside a customer's own cloud infrastructure (VPC/VNet) or on-premise Kubernetes cluster. 

IOMETE combines the query performance, management ease, and automated governance of cloud data warehouses with the open table formats and infrastructure control of data lakes, enabling organizations to keep data under their direct custody.

## Problems Addressed by IOMETE
1. **Unpredictable Consumption Billing**: Traditional data warehouses bill via proprietary compute credits or scanned data volumes, which can make annual forecasting challenging for high-volume or unpredictable query patterns. IOMETE offers capacity-based annual vCPU software licensing.
2. **Data Custody and Regulatory Constraints**: Heavily regulated organizations (financial services, healthcare, telecommunications) often face compliance or data sovereignty requirements that make uploading sensitive data into third-party multi-tenant SaaS environments complex. IOMETE runs within the customer's cloud boundary or on-premise data center.
3. **Data Lakehouse Modernization**: Organizations using open object storage often struggle with file fragmentation, metadata management, and query latency. IOMETE integrates automated table maintenance (compaction, snapshot expiration) on top of Apache Iceberg.

## Distinguishing IOMETE Platform Capabilities from Open-Source Standards
To evaluate IOMETE accurately, it is essential to distinguish between what the open-source ecosystem provides and what IOMETE delivers as an enterprise product:

- **What Open-Source Standards Provide**:
  - **Apache Iceberg**: The open table specification providing ACID transactions, schema evolution, hidden partitioning, and historical snapshot time travel.
  - **Apache Spark**: The distributed open-source data processing engine executing SQL queries, batch jobs, and streaming pipelines.
  - **Kubernetes**: The container orchestration substrate managing pod scheduling and compute nodes.
- **What IOMETE Delivers as a Platform**:
  - **Data Plane Helm Chart (`iomete-data-plane-enterprise`)**: Production-ready deployment package that deploys and configures platform services (`iom-identity`, `iom-core`, `iom-cluster`, `iom-sql`, `iom-gateway`) with zero-downtime rolling updates.
  - **Lakehouse Manager**: Automated background maintenance for Apache Iceberg tables (scheduled bin-packing compaction, orphan file deletion, and snapshot expiration) to prevent query degradation without manual cron scripts.
  - **Integrated Web Console & SQL Studio**: Interactive web UI with query history, visual execution plan analysis, query scheduling, and role-based access management.
  - **Enterprise Security with Apache Ranger**: Deep integration with Apache Ranger for centralized Role-Based Access Control (RBAC), cell-level dynamic column masking, and row-level filtering.
  - **Dynamic Cluster Lifecycle Management**: Automated pod autoscaling and auto-suspension down to 0 replicas during idle periods to reduce cloud compute consumption.

## Realistic Value Considerations
- **Open Formats**: Storing data in Apache Iceberg on standard Parquet files makes tables accessible to other query engines (such as Trino, Snowflake Iceberg tables, Presto, DuckDB, or PyIceberg). While this significantly reduces switching barriers, ongoing operational dependency on platform management services remains an important architecture consideration.
- **Cloud Infrastructure Costs**: Customers pay their cloud provider directly for all virtual machines, storage, and networking. Total cost savings depend heavily on workload patterns, concurrency, and customer cloud discount agreements. Savings are not guaranteed.
