## 2026-03-08 - Content Security Policy for Office Add-ins
**Vulnerability:** Office Add-ins load external scripts (like office.js) and run in the context of the host application (PowerPoint), making them targets for XSS and data exfiltration.
**Learning:** Adding a CSP meta tag in the head of index.html provides a defense-in-depth layer. It must allow 'https://appsforoffice.microsoft.com' for the Office.js library and 'self' for internal scripts.
**Prevention:** Always implement a restrictive CSP that explicitly allows only trusted domains and 'self' for scripts and styles.

## 2026-04-05 - Brittle CSP Hashes for Inline Styles
**Vulnerability:** XSS and CSS injection via unauthorized inline styles.
**Learning:** While hash-based CSPs provide strong protection for inline styles, they are considered a "footgun" in this project because any minor change to the style block (including whitespace) breaks the UI. They also block all inline style attributes unless 'unsafe-hashes' or specific hashes for every attribute are used.
**Prevention:** Prefer moving internal styles to an external CSS file served from 'self' to maintain security without the fragility of hashes.
