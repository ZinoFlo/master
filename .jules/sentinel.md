## 2026-03-08 - Content Security Policy for Office Add-ins
**Vulnerability:** Office Add-ins load external scripts (like office.js) and run in the context of the host application (PowerPoint), making them targets for XSS and data exfiltration.
**Learning:** Adding a CSP meta tag in the head of index.html provides a defense-in-depth layer. It must allow 'https://appsforoffice.microsoft.com' for the Office.js library and 'self' for internal scripts.
**Prevention:** Always implement a restrictive CSP that explicitly allows only trusted domains and 'self' for scripts and styles.

## 2026-03-08 - Externalizing Styles for Maintainable CSP
**Vulnerability:** Use of `'unsafe-inline'` in CSP allows CSS injection and certain XSS vectors.
**Learning:** Hardcoding SHA-256 hashes for inline style blocks is brittle and hinders development. Moving inline styles to an external CSS file (e.g., `index.css`) allows for a strict `style-src 'self'` policy that is both secure and maintainable.
**Prevention:** Prefer externalizing CSS over using CSP style hashes for core application styling to ensure security doesn't block agility.
