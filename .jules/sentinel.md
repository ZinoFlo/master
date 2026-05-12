## 2026-03-08 - Content Security Policy for Office Add-ins
**Vulnerability:** Office Add-ins load external scripts (like office.js) and run in the context of the host application (PowerPoint), making them targets for XSS and data exfiltration.
**Learning:** Adding a CSP meta tag in the head of index.html provides a defense-in-depth layer. It must allow 'https://appsforoffice.microsoft.com' for the Office.js library and 'self' for internal scripts.
**Prevention:** Always implement a restrictive CSP that explicitly allows only trusted domains and 'self' for scripts and styles.

## 2026-05-12 - Hardening CSP with External Styles and Privacy Headers
**Vulnerability:** Inline styles in 'index.html' required 'unsafe-inline' in the Content Security Policy, which increases the risk of CSS-based exfiltration. Lack of Referrer Policy and HTTPS upgrade directives left the app open to minor data leakage and downgrade attacks.
**Learning:** Moving inline styles to a dedicated 'index.css' allows for a stricter 'style-src' policy without breaking the Office Add-in's UI. This is verified to be compatible with 'office.js' in a PowerPoint context.
**Prevention:** Favor external CSS files over inline styles to keep CSP policies clean and restrictive. Always include 'no-referrer' and 'upgrade-insecure-requests' in the HTML head as defense-in-depth measures.
