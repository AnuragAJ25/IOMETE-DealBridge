---
title: "IOMETE Security & Governance"
category: "Security"
source_url: "https://iomete.com/docs/data-security/ranger"
tags: ["security", "governance", "apache-ranger", "rbac", "data-masking", "row-filtering", "cmek", "zero-data-retention"]
---

# IOMETE Security & Governance

## Zero-Data-Retention (ZDR) Architecture
Security in IOMETE is founded on the principle of Zero Data Retention:
- **No Data Ingestion to Vendor Clouds**: Customer data resides strictly inside customer-owned S3, ADLS Gen2, GCS, or on-premise storage.
- **No Query Caching Outside Boundary**: Query results, temporary spill files, and cached partitions remain exclusively within the customer's Kubernetes pods and ephemeral volumes.
- **Telemetry Only**: The control plane communicates strictly operational metadata (cluster status, health heartbeats, billing vCPU counts). Customer dataset contents, raw records, table values, or PII never transit to IOMETE servers.

## Access Control & Governance Engine: Apache Ranger
IOMETE integrates Apache Ranger directly into its platform services, providing battle-tested enterprise authorization:
- **Fine-Grained Role-Based Access Control (RBAC)**: Define granular permissions at the catalog, database, table, view, column, and row levels.
- **Dynamic Column Masking**: Mask sensitive personal identifiers (PII, SSN, Credit Card numbers, email addresses) using hashing, partial masking (e.g., showing only the last 4 digits), nullification, or custom SQL expressions based on user roles and group memberships.
- **Row-Level Filtering**: Restrict data access dynamically based on user identity or region (e.g., `country = CURRENT_USER_COUNTRY()` or `department = 'FINANCE'`) without creating multiple redundant physical tables or views.
- **Centralized Audit Logging**: Every query execution, authorization check, policy violation, and administrative change produces a tamper-evident audit record compatible with standard SIEM collectors (Splunk, Datadog, Elastic).

## Encryption & Key Management
- **Encryption at Rest**: Storage buckets utilize Customer-Managed Encryption Keys (CMEK) via AWS KMS, Azure Key Vault, or Google Cloud KMS. Keys remain in the customer's exclusive control and can be rotated or revoked at any time.
- **Encryption in Transit**: All communication channels between microservices, client applications (BI tools, notebooks), and Kubernetes pods enforce TLS 1.3 encryption.
- **Secrets Management**: Integration with cloud secrets managers (AWS Secrets Manager, Azure Key Vault Secrets, HashiCorp Vault, Kubernetes Secrets) to prevent credentials from being stored in plaintext.

## Identity Federation & Single Sign-On (SSO)
- **Supported Standards**: OpenID Connect (OIDC), SAML 2.0, OAuth 2.0, and LDAP.
- **Identity Providers**: Native integration with Okta, Microsoft Entra ID (Azure AD), Google Workspace, Ping Identity, and Keycloak.
- **SCIM Provisioning**: Automatic user provisioning, deprovisioning, and team synchronization from enterprise identity directories.

## Regulatory Compliance & Certification Boundaries
- **Documented Compliance Posture**: IOMETE is architected for **SOC 2 Type II**, **ISO 27001**, **HIPAA** (BAA-ready deployment), and **GDPR/CCPA** data residency and right-to-be-forgotten deletion workflows.
- **Unverified Certifications & Partnerships**: Any compliance framework or certification not explicitly published in official IOMETE documentation—such as FedRAMP High, PCI-DSS Level 1 merchant certification, or unannounced defense/government partnerships—is unverified and requires formal confirmation from the IOMETE security and executive team.
