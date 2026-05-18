## 2026-03-08 - Content Security Policy for Office Add-ins
**Vulnerability:** Office Add-ins load external scripts (like office.js) and run in the context of the host application (PowerPoint), making them targets for XSS and data exfiltration.
**Learning:** Adding a CSP meta tag in the head of index.html provides a defense-in-depth layer. It must allow 'https://appsforoffice.microsoft.com' for the Office.js library and 'self' for internal scripts.
**Prevention:** Always implement a restrictive CSP that explicitly allows only trusted domains and 'self' for scripts and styles.

## 2026-05-18 - Hardening CSP and Referrer Policy
**Vulnerability:** Inline styles in index.html required 'unsafe-inline' in Content Security Policy, and a missing Referrer-Policy could leak sensitive data via HTTP headers.
**Learning:** Moving styles to an external CSS file allows for a stricter CSP (style-src 'self'). Adding 'upgrade-insecure-requests' and 'no-referrer' provides defense-in-depth without breaking the PowerPoint Add-in functionality.
**Prevention:** Externalize all inline styles and scripts, and implement restrictive security meta tags as a standard security enhancement for web-based Office Add-ins.
