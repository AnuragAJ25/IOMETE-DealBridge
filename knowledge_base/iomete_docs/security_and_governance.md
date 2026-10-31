# IOMETE Security, Compliance & Governance

## Section: Data Plane Security & Zero-Data-Retention
- **Zero-Data-Retention (ZDR)**: IOMETE operates as a modern hybrid control plane/data plane architecture. Customer data **never** leaves the customer's virtual private cloud (VPC) or cloud storage buckets.
- **No Data Mirroring or Caching outside VPC**: Query processing occurs exclusively within compute instances deployed inside the customer's cloud boundary or dedicated isolated single-tenant compute clusters.
- **Data In Transit**: TLS 1.3 enforced for all internal and external network communication.
- **Data At Rest**: Customer Managed Encryption Keys (CMEK) via AWS KMS, Google Cloud KMS, or Azure Key Vault using AES-256 encryption.

## Section: Access Control & Authorization (Apache Ranger)
- **Role-Based Access Control (RBAC)**: Deeply integrated with Apache Ranger, providing centralized access control across databases, tables, columns, and rows.
- **Dynamic Column Masking**: Mask sensitive columns (e.g. Social Security Numbers, Credit Card Numbers, email addresses, phone numbers) based on user roles and LDAP/IdP group memberships. Masking types include full hashing, partial masking (e.g. show last 4 digits), and NULL replacement.
- **Row-Level Filtering**: Dynamically restrict visible rows based on user attributes, tenant IDs, or geographic regions without having to create separate SQL views.
- **Identity Provider (IdP) Integration**: Native SSO support via SAML 2.0 and OIDC (Okta, Azure AD / Microsoft Entra ID, Google Workspace, Ping Identity).

## Section: Audit Logging & Monitoring
- **Immutable Audit Logs**: Every SQL query, DDL operation, access grant, and policy change is logged with timestamp, user identity, client IP, affected tables, and execution status.
- **SIEM Export**: Real-time log streaming to Datadog, Splunk, AWS CloudWatch, and Amazon S3.

## Section: Compliance Certifications & Verification
- **SOC 2 Type II**: Certified across Security, Availability, and Confidentiality trust service criteria with annual third-party audits.
- **HIPAA**: Ready for protected health information (PHI) workloads with signed Business Associate Agreements (BAAs).
- **GDPR & CCPA**: Compliant by design. Apache Iceberg row-level mutation capabilities (`MERGE INTO` and equality/position delete files) allow complete and verified right-to-be-forgotten deletion workflows.
- **ISO 27001**: Certified information security management system (ISMS).

## Section: Security Boundaries and Disclaimers
*Important Note*: Any compliance frameworks or certifications not explicitly documented above (such as FedRAMP High, PCI-DSS Level 1 merchant certification) require formal confirmation from the IOMETE security team before making binding commitments to enterprise prospects.
