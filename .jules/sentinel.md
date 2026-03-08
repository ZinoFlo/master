# Sentinel Security Journal

## 2025-03-05 - Security Audit Findings for Eco-growth Discovery
**Vulnerability:** The Office Add-in's `manifest.xml` requested `ReadWriteDocument` permissions despite being a "discovery" tool, violating the Principle of Least Privilege. Additionally, `index.html` lacked a Content Security Policy (CSP), and `office.js` was loaded without Subresource Integrity (SRI) hashes.
**Learning:** Initial boilerplate and template-based Office Add-in projects often default to overly permissive settings and lack modern web security headers like CSP.
**Prevention:** Always audit the `manifest.xml` for minimal required permissions and implement a restrictive CSP in `index.html` (allowing `self` and `https://appsforoffice.microsoft.com`).
## 2026-03-08 - Content Security Policy for Office Add-ins
**Vulnerability:** Office Add-ins load external scripts (like office.js) and run in the context of the host application (PowerPoint), making them targets for XSS and data exfiltration.
**Learning:** Adding a CSP meta tag in the head of index.html provides a defense-in-depth layer. It must allow 'https://appsforoffice.microsoft.com' for the Office.js library and 'self' for internal scripts.
**Prevention:** Always implement a restrictive CSP that explicitly allows only trusted domains and 'self' for scripts and styles.
