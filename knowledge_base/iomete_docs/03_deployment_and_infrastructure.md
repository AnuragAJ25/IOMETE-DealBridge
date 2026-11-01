---
title: "IOMETE Deployment Models & Infrastructure Requirements"
category: "Deployment"
source_url: "https://iomete.com/docs/installation"
tags: ["deployment", "helm", "kubernetes", "aws", "azure", "gcp", "on-premise", "trade-offs", "responsibilities"]
---

# IOMETE Deployment Models & Infrastructure Requirements

## Supported Deployment Models

1. **Customer-Hosted VPC / On-Premise (Private Cloud)**:
   - Deployed inside the customer's Amazon VPC, Azure VNet, Google Cloud VPC, or on-premises Kubernetes cluster (Red Hat OpenShift, Rancher, or upstream K8s).
   - Data plane and compute instances run entirely inside the customer's network boundary.
   - Ideal for organizations with strict compliance, data localization, or Zero-Data-Retention mandates.

2. **Dedicated Single-Tenant SaaS Cloud**:
   - IOMETE provisions and maintains dedicated, physically isolated cloud infrastructure in the customer's chosen cloud region.
   - Avoids customer Kubernetes management overhead while maintaining single-tenant isolation.

## Kubernetes Helm Installation Details
- **Helm Chart**: `iomete-data-plane-enterprise`
- **Installation Lifecycle**: Incorporates the `iomete-data-plane-init` pre-install/pre-upgrade hook to validate database connectivity, metadata schema migrations, and storage bucket permissions before rolling out services.
- **Microservices Deployed**:
  - `iom-identity`: Handles user authentication, RBAC tokens, and SSO federation.
  - `iom-core`: Coordinates workspace state and cluster management.
  - `iom-cluster`: Interacts with Kubernetes API to schedule, scale, and suspend Spark driver and executor pods.
  - `iom-sql`: Manages client sessions, JDBC/ODBC routing, and query execution telemetry.
  - `iom-gateway`: Secure API reverse proxy and TLS termination.

## Operational Responsibilities & Trade-Offs of Self-Hosting
When choosing the customer-hosted VPC deployment model, organizations must balance the benefits of data custody against the ongoing operational responsibilities:

| Operational Dimension | Customer Responsibility | IOMETE Automation Responsibility |
| :--- | :--- | :--- |
| **Kubernetes Substrate** | Provisioning cluster (EKS/AKS/GKE), OS patches, node pool AMI upgrades, and K8s version lifecycle. | Deploying and maintaining platform microservices via the `iomete-data-plane-enterprise` Helm chart. |
| **Cloud Networking** | Managing VPCs, subnets, NAT gateways, security groups, firewalls, and ingress controllers. | Internal service routing and TLS encryption between pods via `iom-gateway`. |
| **IAM & Storage Access** | Configuring cloud IAM policies, service accounts (e.g. AWS IRSA / Azure Managed Identity), and S3 bucket policies. | Authenticating query engine access to Iceberg tables via configured storage credentials. |
| **Infrastructure Costs** | Paying cloud provider directly for VM instances, storage volumes, and network data transfer. | Providing auto-suspend and dynamic pod scaling to minimize idle compute runtimes. |
| **Cluster Monitoring & Backup** | Monitoring node health, cluster capacity limits, and backing up persistent database metadata. | Reporting service health metrics and execution telemetry to IOMETE console. |
