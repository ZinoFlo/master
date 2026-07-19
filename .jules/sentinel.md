## 2026-03-08 - Content Security Policy for Office Add-ins
**Vulnerability:** Office Add-ins load external scripts (like office.js) and run in the context of the host application (PowerPoint), making them targets for XSS and data exfiltration.
**Learning:** Adding a CSP meta tag in the head of index.html provides a defense-in-depth layer. It must allow 'https://appsforoffice.microsoft.com' for the Office.js library and 'self' for internal scripts.
**Prevention:** Always implement a restrictive CSP that explicitly allows only trusted domains and 'self' for scripts and styles.

## 2026-06-05 - Hardening style-src by Externalizing Inline Styles
**Vulnerability:** Use of 'unsafe-inline' in style-src directive allows for potential CSS injection attacks and bypasses standard CSP protections.
**Learning:** Moving inline styles from index.html to index.css allows for the removal of 'unsafe-inline' from the Content Security Policy, significantly hardening the add-in against style-based attacks without affecting functionality.
**Prevention:** Avoid inline <style> blocks and 'style' attributes. Always use external stylesheets and a restrictive style-src 'self' CSP directive.

## 2026-07-19 - Mitigating Transitive Vulnerabilities via package.json Overrides
**Vulnerability:** Transitive dependencies `follow-redirects` (<=1.15.11) and `qs` (6.11.1 - 6.15.1) introduced security vulnerabilities (GHSA-r4q5-vmmm-2653, GHSA-q8mj-m7cp-5q26) into `http-server` devDependencies.
**Learning:** Pinning transitive dependency versions with npm `overrides` successfully mitigates `npm audit` findings. However, placing comments directly inside the `overrides` object causes `npm install` failures due to "Override without name" errors. Rationale comments must be placed at the root level of `package.json`.
**Prevention:** Use the `overrides` field in `package.json` for security pinning and place explanatory comments as a root-level property (e.g. `//SentinelOverrides`) to ensure npm compliance and clear audit documentation.
