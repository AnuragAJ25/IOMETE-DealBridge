---
title: "IOMETE Deployment Models & Private Cloud Architecture"
category: "Deployment"
source_url: "https://iomete.com/docs/installation"
tags: ["deployment", "vpc", "private-cloud", "aws", "azure", "gcp", "on-premise"]
---

# IOMETE Deployment Models & Private Cloud Architecture

## Section: Deployment Options
IOMETE supports two primary enterprise deployment models depending on customer security, data sovereignty, and regulatory constraints:

1. **Customer-Hosted VPC (Self-Hosted Data Plane)**:
   - Data plane runs completely inside the customer's AWS, Azure, or GCP Virtual Private Cloud (VPC / VNet).
   - Control plane is managed by IOMETE as a SaaS service with secure, outbound-only agent communication.
   - Ideal for financial institutions, healthcare providers, and enterprises with strict data residency mandates.
   - S3/Blob access is gated via IAM Roles and VPC endpoints (AWS PrivateLink).

2. **Dedicated Single-Tenant SaaS Cloud**:
   - IOMETE provisions dedicated, single-tenant infrastructure in the cloud region of the customer's choice.
   - Isolated VPC per customer; zero multi-tenant resource sharing or cross-talk.
   - Fully managed maintenance, updates, and cluster health monitoring by the IOMETE operations team.

## Section: Cloud Provider Compatibility
- **Amazon Web Services (AWS)**: EKS / EC2, Amazon S3, AWS KMS, AWS IAM, AWS PrivateLink, AWS Glue Catalog.
- **Microsoft Azure**: AKS / Azure VMs, Azure Data Lake Storage (ADLS) Gen2, Azure Key Vault, Azure Entra ID, Azure Private Endpoints.
- **Google Cloud Platform (GCP)**: GKE / Compute Engine, Google Cloud Storage (GCS), Google Cloud KMS, Workload Identity.
- **On-Premises / Bare Metal**: Kubernetes (OpenShift, Rancher, upstream K8s) with S3-compatible storage (MinIO, Ceph, Dell ECS).

## Section: Non-Disruptive Migration Workflow
- **Phase 1: Zero-Copy Registration**: Register existing parquet datasets into the IOMETE Apache Iceberg catalog without moving or copying existing data.
- **Phase 2: Dual-Run Query Validation**: Run production BI dashboards in parallel against both incumbent warehouse and IOMETE to verify result parity and query latency.
- **Phase 3: Production Cutover**: Redirect BI ODBC/JDBC connection endpoints to IOMETE cluster. Decommission expensive proprietary warehouse compute.
