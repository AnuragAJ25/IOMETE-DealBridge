---
title: "IOMETE Pricing Model & Total Cost of Ownership (TCO)"
category: "Pricing & TCO"
source_url: "https://iomete.com/pricing"
tags: ["pricing", "tco", "free-tier", "enterprise", "minimum-commitment", "vcpu", "cloud-costs"]
---

# IOMETE Pricing Model & Total Cost of Ownership (TCO)

## Official Pricing Structure

According to official IOMETE documentation (https://iomete.com/pricing), IOMETE licenses its software platform based on active vCPU compute capacity, decoupled from raw cloud infrastructure spend:

### 1. Free Plan
- **License Cost**: $0 / month (Free forever)
- **Included Capacity**: Up to 100 vCPUs
- **Features**: Complete access to lakehouse management, Spark SQL engines, SQL Studio, community support.
- **Ideal For**: Development environments, proofs of concept (PoCs), and small workloads.

### 2. Enterprise Plan
- **License Cost**: $500 per vCPU per year (billed annually).
- **Minimum Annual Commitment**: **$100,000 per year** (equivalent to a baseline commitment of 200 vCPUs).
- **Features**:
  - Full Apache Ranger enterprise RBAC, row-level filtering, and dynamic column masking.
  - Automated Lakehouse Manager (background compaction, orphan file cleanup, snapshot expiration).
  - High Availability (HA) deployment configuration.
  - Enterprise SLA support (24x7 phone, dedicated Slack/Teams channel, enterprise ticketing).
  - Multi-namespace isolation and enterprise SSO/SCIM federation.

### 3. Business Critical Plan
- **License Cost**: Custom enterprise pricing.
- **Minimum Annual Commitment**: **$250,000 per year**.
- **Features**: Dedicated Technical Account Manager (TAM), custom SLA guarantees, architectural review assistance, and custom roadmaps.

## Cloud Infrastructure Costs are Additional
- **Separation of Software and Infrastructure**: IOMETE licenses software only. Customers pay their cloud provider (AWS, Azure, Google Cloud) or on-premise hardware vendor directly for all underlying infrastructure:
  - Kubernetes worker node virtual machines (e.g., AWS EC2, Azure VMs, Google Cloud Compute Engine).
  - Object storage (AWS S3, Azure ADLS Gen2, Google Cloud Storage, or MinIO/Ceph).
  - Network egress, inter-zone data transfer, NAT gateways, and load balancers.
- **Direct Cloud Discounts Apply**: Because infrastructure is billed directly by the cloud provider, customers apply their own Enterprise Discount Programs (AWS EDP, Azure Enterprise Agreements), Savings Plans, Reserved Instances, and Spot instances directly to their compute and storage usage.

## TCO Comparison and Savings Considerations
- **Consumption Models**: Traditional cloud data warehouses (such as Snowflake and Google BigQuery) bill primarily on consumption units (e.g. virtual warehouse credits or scanned byte volume), whereas IOMETE uses fixed annual vCPU software licensing.
- **Variable vs. Predictable Spend**: In high-concurrency or continuous long-running ETL environments, fixed vCPU licensing combined with direct cloud VM rates can reduce total platform spend compared to credit-based models. However, actual cost differences depend significantly on specific workload profiles, concurrency patterns, query volumes, cluster idle-suspension policies, and existing cloud provider discount tiers. Savings are not guaranteed and must be evaluated against customer-specific benchmark workloads.
