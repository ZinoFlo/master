## 2026-03-08 - Content Security Policy for Office Add-ins
**Vulnerability:** Office Add-ins load external scripts (like office.js) and run in the context of the host application (PowerPoint), making them targets for XSS and data exfiltration.
**Learning:** Adding a CSP meta tag in the head of index.html provides a defense-in-depth layer. It must allow 'https://appsforoffice.microsoft.com' for the Office.js library and 'self' for internal scripts.
**Prevention:** Always implement a restrictive CSP that explicitly allows only trusted domains and 'self' for scripts and styles.

## 2026-03-16 - SRI Anti-pattern for Evergreen Office.js
**Vulnerability:** Subresource Integrity (SRI) mismatch causing application denial-of-service.
**Learning:** Implementing SRI on evergreen scripts like `office.js` (v1) is a security anti-pattern. Microsoft updates the content of these files without changing the URL, which causes the static SRI hash to fail and the script to be blocked, breaking the add-in.
**Prevention:** Do not use SRI for evergreen resources. Rely on a strict Content Security Policy (CSP) and trusted CDN providers instead. Use hash-based CSP for internal styles to eliminate `'unsafe-inline'` without breaking external dependencies.
