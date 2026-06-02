## 2026-03-08 - Content Security Policy for Office Add-ins
**Vulnerability:** Office Add-ins load external scripts (like office.js) and run in the context of the host application (PowerPoint), making them targets for XSS and data exfiltration.
**Learning:** Adding a CSP meta tag in the head of index.html provides a defense-in-depth layer. It must allow 'https://appsforoffice.microsoft.com' for the Office.js library and 'self' for internal scripts.
**Prevention:** Always implement a restrictive CSP that explicitly allows only trusted domains and 'self' for scripts and styles.

## 2026-03-09 - Hardening CSP by Externalizing Styles
**Vulnerability:** Use of 'unsafe-inline' in style-src CSP directive allows for certain CSS-based injection attacks and reduces the overall effectiveness of the policy.
**Learning:** Externalizing inline styles to a dedicated CSS file allows for the removal of 'unsafe-inline' without breaking the UI. This provides a cleaner and more secure policy.
**Prevention:** Move all inline styles and scripts to external files to enable a strict Content Security Policy.
