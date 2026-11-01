---
title: "IOMETE Platform Capabilities & Developer Experience"
category: "Platform Capabilities"
source_url: "https://iomete.com/docs/developer-guide"
tags: ["sql-editor", "notebooks", "spark-jobs", "dbt", "bi-integration", "lakehouse-manager", "streaming"]
---

# IOMETE Platform Capabilities & Developer Experience

## Interactive SQL Editor & Studio
IOMETE provides a built-in, browser-based SQL Studio designed for data analysts and engineers:
- **Rich Code Editor**: Syntax highlighting, auto-completion of table and column names, SQL formatting, and error linting.
- **Visual Explain Plans**: Deep inspection of Spark execution plans, physical operators, partition pruning metrics, and scan costs.
- **Query History & Caching**: Searchable log of past queries, runtime statistics, execution timelines, and exportable results (CSV, JSON, Parquet).
- **Scheduled Queries**: Create cron-based query schedules to refresh reporting tables or send automated alerts.

## Lakehouse Manager (Automated Table Maintenance)
A common pitfall with Apache Iceberg is manual maintenance overhead. IOMETE Lakehouse Manager completely automates table hygiene:
- **Auto-Compaction**: Periodically merges small data files into uniform, query-optimized target files (e.g., 128 MB or 512 MB Parquet files) to prevent the "small-file problem" without blocking active write transactions.
- **Snapshot Expiration**: Automatically purges historical metadata and snapshots older than a configurable retention window (e.g., 7 days) to reclaim object storage capacity.
- **Orphan File Cleanup**: Detects and deletes orphaned uncommitted data files left behind by failed writes or aborted jobs.
- **Automated Statistics & Column Profiling**: Computes Iceberg column min/max metrics, null counts, and value cardinality to power cost-based query optimization.

## Data Ingestion & Transformation Engines
1. **Spark Batch Jobs**:
   - Run Python, Scala, or Java Spark applications using declarative YAML job manifests or REST API triggers.
   - Dynamic executor allocation: spin up 100+ executors on demand and release them upon job completion.
2. **Streaming Pipelines**:
   - Native Spark Structured Streaming integration with Apache Kafka, AWS Kinesis, Azure Event Hubs, and Google Cloud Pub/Sub.
   - Low-latency ingestion directly into Apache Iceberg ACID tables with checkpointing and exactly-once semantics.
3. **dbt Integration (`dbt-iomete`)**:
   - Official dbt adapter for IOMETE enabling modern analytics engineering workflows.
   - Supports incremental models, snapshots, tests, documentation generation, and seed loading on top of Apache Iceberg.
4. **Interactive Notebooks**:
   - Integrated JupyterLab-compatible notebooks supporting Python, SQL, and PySpark kernels for exploratory data analysis, data science, and ML model training.

## BI & Analytics Connectivity
IOMETE exposes standard JDBC and ODBC interfaces, allowing frictionless connection to enterprise BI and visualization tools:
- **Tableau**: Certified JDBC/ODBC connector with live and extract query support.
- **Power BI**: Native connection via JDBC driver with DirectQuery and Import modes.
- **Apache Superset, Metabase, Looker, ThoughtSpot**: Out-of-the-box compatibility via standard SQL drivers.
- **Python Data Ecosystem**: Direct connection from pandas, polars, duckdb, and pyiceberg via SQLAlchemy or PyHive/Thrift interfaces.
