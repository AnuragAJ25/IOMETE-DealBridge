---
title: "IOMETE Apache Iceberg Management & Open Standards"
category: "Apache Iceberg"
source_url: "https://iomete.com/docs/table-maintenance"
tags: ["iceberg", "compaction", "time-travel", "rest-catalog", "table-maintenance"]
---

# IOMETE Apache Iceberg Management & Open Standards

## Native Apache Iceberg Integration
IOMETE treats Apache Iceberg as its native, foundational table format:
- **Full ACID Transactions**: Atomic commits via optimistic concurrency control, serializable isolation level support, and concurrent writers.
- **Hidden Partitioning**: Partition evolution without rewriting existing datasets. Queries take advantage of partition pruning without users needing to write physical partition column names in SQL filters.
- **Schema Evolution**: Safe column additions, renames, drops, and reorders without breaking historical parquet data or requiring full table rewrites.
- **Time Travel & Auditing**: Query historical table states using `FOR SYSTEM_TIME AS OF` or `FOR SYSTEM_VERSION AS OF` timestamps and snapshot IDs.

## Automated Background Maintenance (Lakehouse Manager)
A frequent operational challenge with self-managed Iceberg is maintenance overhead. IOMETE solves this with built-in automated background maintenance:
1. **Compaction (Bin-Packing & Sorting)**: Automatically combines small micro-batch files into optimal 128MB - 512MB Parquet files, eliminating small file performance degradation.
2. **Snapshot Expiration & Cleanup**: Periodically purges old metadata snapshots based on retention policies to keep metadata footprints minimal.
3. **Orphan File Removal**: Safely deletes unreferenced data and metadata files left behind by interrupted writes.
4. **Manifest Rewriting**: Optimizes manifest files to accelerate planning times on queries scanning millions of files.

## Catalog Support & Interoperability
- **IOMETE Managed Iceberg REST Catalog**: Fully compatible with the open Apache Iceberg REST catalog specification.
- **AWS Glue Data Catalog**: Synchronization with AWS Glue for multi-engine access across Athena, EMR, and SageMaker.
- **Hive Metastore (HMS)**: Metastore connectivity for legacy backwards compatibility.
- **Snowflake Polaris & Nessie**: Support for modern open catalog protocols and multi-cloud catalog federation.
