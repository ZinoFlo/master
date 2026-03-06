## 2026-03-04 - [CSP for Office Add-in]
**Vulnerability:** Potential Cross-Site Scripting (XSS) due to missing Content Security Policy.
**Learning:** Office Add-ins load scripts from external CDNs (like `appsforoffice.microsoft.com`), which must be explicitly allowed in the CSP.
**Prevention:** Always implement a restrictive CSP that includes necessary Office.js domains.
