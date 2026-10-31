# IOMETE Total Cost of Ownership (TCO) & Sizing Guidelines

## Section: The Economics of the Modern Lakehouse
Traditional cloud data warehouses (Snowflake, Google BigQuery, Amazon Redshift) charge massive markups on compute and proprietary storage.
- **Compute Markups in Proprietary Warehouses**: In Snowflake, a credit can cost $2.00 to $4.00, representing a 300% to 500% markup over raw AWS EC2 or Google Cloud compute.
- **Storage Markups**: Proprietary warehouses charge $23 to $40 per TB/month for storage that actually costs $10 to $23 per TB/month on raw cloud object storage.
- **Egress & Vendor Lock-In**: Moving data out of proprietary warehouse tables requires expensive unload exports and egress bandwidth fees.

## Section: IOMETE Sizing and Cost Advantage
- **Transparent Compute**: Compute instances run directly in the customer's cloud account at native cloud provider rates (e.g., standard EC2 on-demand or Spot/Savings Plans), plus a flat, predictable IOMETE platform subscription.
- **Zero Storage Markup**: Customers pay AWS, Azure, or GCP directly for S3/ADLS/GCS storage at raw baseline tier prices.
- **Expected Customer Savings**:
  - Typical compute cost reduction: 60% to 75% versus Snowflake.
  - Typical savings versus Databricks SQL: 40% to 55% (eliminating heavy DBU surcharges and cluster management overhead).
  - Typical payback period: 1.5 to 3 months.

## Section: Workload Sizing Benchmarks
- **Small Cluster (Development / Light BI)**: 2-4 worker nodes (16 vCPU, 64GB RAM). Ideal for up to 10 concurrent analysts and sub-5TB datasets.
- **Medium Cluster (Enterprise Departmental BI)**: 4-8 worker nodes (32-64 vCPU, 128-256GB RAM). Ideal for 20-50 concurrent analysts and 10TB - 50TB datasets. Sub-second P95 query response time.
- **Large Cluster (Enterprise Production Lakehouse)**: 8-16+ worker nodes with automated auto-scaling up to 32 nodes for morning dashboard bursts and heavy dbt transformations.
