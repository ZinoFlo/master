## 2026-03-08 - Content Security Policy for Office Add-ins
**Vulnerability:** Office Add-ins load external scripts (like office.js) and run in the context of the host application (PowerPoint), making them targets for XSS and data exfiltration.
**Learning:** Adding a CSP meta tag in the head of index.html provides a defense-in-depth layer. It must allow 'https://appsforoffice.microsoft.com' for the Office.js library and 'self' for internal scripts.
**Prevention:** Always implement a restrictive CSP that explicitly allows only trusted domains and 'self' for scripts and styles.

## 2026-03-31 - Brittle Hash-based CSP for Inline Styles
**Vulnerability:** Use of 'unsafe-inline' in CSP for styles allows for CSS injection and potential data exfiltration via CSS.
**Learning:** Hardening CSP by replacing 'unsafe-inline' with a SHA-256 hash is effective but brittle. Any whitespace or character change in the <style> block will invalidate the hash and break the UI. Automated frontend verification is essential to ensure the hash matches the content exactly.
**Prevention:** Consider moving inline styles to external CSS files to allow 'self' in CSP, or automate CSP hash generation during the build process.
