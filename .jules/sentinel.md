# Sentinel Journal - Critical Security Learnings

## 2025-05-15 - Establishing Private Vulnerability Reporting Channels

**Vulnerability:**
The project lacked a clear security policy, which could lead to researchers disclosing vulnerabilities through public issues, potentially exposing users to zero-day risks.

**Learning:**
Prioritizing a 'SECURITY.md' with instructions for private reporting (e.g., via GitHub Private Vulnerability Reporting) is a foundational security enhancement that encourages responsible disclosure while protecting the codebase.

**Prevention:**
Always include a minimal 'SECURITY.md' file that clearly defines private reporting mechanisms to ensure vulnerabilities are addressed before public disclosure.
## 2026-03-08 - Content Security Policy for Office Add-ins
**Vulnerability:** Office Add-ins load external scripts (like office.js) and run in the context of the host application (PowerPoint), making them targets for XSS and data exfiltration.
**Learning:** Adding a CSP meta tag in the head of index.html provides a defense-in-depth layer. It must allow 'https://appsforoffice.microsoft.com' for the Office.js library and 'self' for internal scripts.
**Prevention:** Always implement a restrictive CSP that explicitly allows only trusted domains and 'self' for scripts and styles.
