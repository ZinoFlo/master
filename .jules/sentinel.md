## 2026-03-04 - [CSP for Office Add-in]
**Vulnerability:** Potential Cross-Site Scripting (XSS) due to missing Content Security Policy.
**Learning:** Office Add-ins load scripts from external CDNs (like `appsforoffice.microsoft.com`), which must be explicitly allowed in the CSP.
**Prevention:** Always implement a restrictive CSP that includes necessary Office.js domains.
## 2026-03-08 - Content Security Policy for Office Add-ins
**Vulnerability:** Office Add-ins load external scripts (like office.js) and run in the context of the host application (PowerPoint), making them targets for XSS and data exfiltration.
**Learning:** Adding a CSP meta tag in the head of index.html provides a defense-in-depth layer. It must allow 'https://appsforoffice.microsoft.com' for the Office.js library and 'self' for internal scripts.
**Prevention:** Always implement a restrictive CSP that explicitly allows only trusted domains and 'self' for scripts and styles.
