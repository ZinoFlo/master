# Sentinel Security Journal

## 2025-03-05 - Security Audit Findings for Eco-growth Discovery
**Vulnerability:** The Office Add-in's `manifest.xml` requested `ReadWriteDocument` permissions despite being a "discovery" tool, violating the Principle of Least Privilege. Additionally, `index.html` lacked a Content Security Policy (CSP), and `office.js` was loaded without Subresource Integrity (SRI) hashes.
**Learning:** Initial boilerplate and template-based Office Add-in projects often default to overly permissive settings and lack modern web security headers like CSP.
**Prevention:** Always audit the `manifest.xml` for minimal required permissions and implement a restrictive CSP in `index.html` (allowing `self` and `https://appsforoffice.microsoft.com`).
