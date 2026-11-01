---
title: "IOMETE Modern Lakehouse Architecture Overview"
category: "Architecture"
source_url: "https://iomete.com/docs/architecture"
tags: ["architecture", "iceberg", "spark", "lakehouse", "compute-storage-separation"]
---

# IOMETE Modern Lakehouse Architecture Overview

## Section: Core Architectural Principles
IOMETE is a fully managed modern data lakehouse platform built entirely on open source standards, specifically Apache Iceberg and Apache Spark. The platform decouples compute from storage completely, ensuring that enterprises retain 100% control, ownership, and residency of their data.

Key architectural tenets:
1. **Separation of Compute and Storage**: Storage resides in customer-owned cloud object storage (AWS S3, Google Cloud Storage, or Azure Data Lake Storage Gen2). Compute engines run on demand and automatically scale down to zero when idle.
2. **Open Table Formats**: 100% native Apache Iceberg v2 table format with Parquet data files. Zero proprietary micro-partitions or proprietary format encapsulation.
3. **High-Performance Query Execution**: Distributed vectorized query execution powered by optimized Apache Spark 3.5+, delivering sub-second BI query latency with memory-tier caching.
4. **Unified Processing**: Single data platform supporting both ANSI SQL business intelligence workloads and batch/streaming PySpark, Scala, or Python workflows.

## Section: Storage Layer Specifications
- **Supported Object Stores**: AWS S3, Azure ADLS Gen2, Google Cloud Storage (GCS), MinIO, and Ceph.
- **Data Formats**: Apache Parquet with Snappy or ZSTD compression.
- **Data Ownership**: Data never leaves customer's cloud storage. No data ingestion fees, no data egress fees, and no proprietary lock-in.

## Section: Compute Layer & Elastic Scaling
- **Engine Core**: Customized Apache Spark engine with intelligent cost-based optimization and dynamic partition pruning.
- **Auto-Scaling**: Automatic scaling of worker nodes based on query queue depth and memory pressure.
- **Auto-Suspension**: Configurable auto-suspend timer (defaults to 5 minutes of inactivity) eliminating idle warehouse compute spend.
- **Concurrency Isolation**: Multi-cluster routing prevents long-running ETL batch pipelines from degrading interactive BI dashboards.

## Section: Consumption & Integrations
- **BI Tools**: Native JDBC and ODBC drivers compatible with Tableau, Microsoft Power BI, Looker, Apache Superset, Metabase, and ThoughtSpot.
- **Transformation**: Native dbt adapter (`dbt-iomete`) allowing analytics engineers to run dbt core transformations directly on Iceberg tables.
- **Data Science**: Direct integrations with Jupyter, Databricks, Apache Zeppelin, and Python ecosystem (Pandas, Polars, PySpark).
