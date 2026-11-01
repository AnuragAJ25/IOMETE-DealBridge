---
title: "IOMETE Total Cost of Ownership (TCO) & Sizing Guidelines"
category: "Pricing & Sizing"
source_url: "https://iomete.com/pricing"
tags: ["tco", "sizing", "pricing", "cost-considerations", "benchmarks", "minimum-commitment"]
---

# IOMETE Total Cost of Ownership (TCO) & Sizing Guidelines

## Sizing and Pricing Structure
Official IOMETE software pricing (https://iomete.com/pricing):
- **Free Tier**: Up to 100 vCPUs with community support at $0/month.
- **Enterprise Plan**: $500 per vCPU per year with a **$100,000 per year minimum commitment** (200 vCPUs).
- **Business Critical Plan**: Custom pricing with a **$250,000 per year minimum commitment**.
- **Infrastructure Charges**: Cloud infrastructure (VMs, object storage, and data transfer) is billed separately and directly by the customer's cloud provider (AWS, Azure, GCP).

## Pricing Models: Virtual Warehouse Credits vs. vCPU Licensing
- **Credit-Based Consumption (Snowflake, Databricks)**: Customers purchase proprietary compute credits or DBUs per cluster hour. Costs fluctuate based on usage, cluster sizing, and query concurrency.
- **Capacity-Based Licensing (IOMETE)**: Customers license a fixed pool of vCPUs for the IOMETE software layer, while running nodes on their cloud provider at direct infrastructure rates.
- **TCO Trade-Offs**:
  - For steady-state, continuous analytics and heavy batch transformations, capacity licensing can offer cost predictability and reduce compute expenditure.
  - However, customers are responsible for managing their Kubernetes cluster and paying all underlying cloud compute and network bills.
  - Total savings vary depending on workload concurrency, usage patterns, cluster auto-suspend efficiency, and customer-negotiated cloud discounts.

## Cluster Sizing Guidelines
- **Small Cluster (Development / Pilot)**: 16-32 vCPUs, 64-128GB RAM. Suitable for up to 10 concurrent analysts and datasets under 5TB. Can run within the 100 vCPU Free Tier.
- **Medium Cluster (Enterprise Departmental BI)**: 32-128 vCPUs, 128-512GB RAM. Suitable for 20-50 concurrent analysts and datasets ranging from 10TB to 50TB.
- **Large Cluster (Production Lakehouse)**: 128-500+ vCPUs with auto-scaling executor pools to handle morning reporting bursts and heavy scheduled dbt/Spark transformations.
