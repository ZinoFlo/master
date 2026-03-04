# 🛡️ Sentinel Security Journal

## Critical Security Learnings
- **CSP for Office Add-ins**: The 'https://appsforoffice.microsoft.com' domain must be explicitly allowed in the Content Security Policy to enable the Office.js library.
- **XSS Mitigation**: Using 'textContent' for DOM updates is essential for preventing DOM-based XSS in the Office Add-in UI.
- **Private Reporting**: SECURITY.md should always direct users to private reporting channels (like GitHub's Private Vulnerability Reporting) to protect against zero-day disclosures.

## Vulnerability Patterns
- **Insecure Resource Loading**: Unrestricted loading of external scripts can lead to code injection. A strict CSP is the primary defense.
- **Excessive Scaffolding**: Avoid unzipping entire source archives into the repository root to maintain a clean diff and prevent unintentional security regressions.
