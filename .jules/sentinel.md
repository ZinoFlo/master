## 2026-03-08 - Content Security Policy for Office Add-ins
**Vulnerability:** Office Add-ins load external scripts (like office.js) and run in the context of the host application (PowerPoint), making them targets for XSS and data exfiltration.
**Learning:** Adding a CSP meta tag in the head of index.html provides a defense-in-depth layer. It must allow 'https://appsforoffice.microsoft.com' for the Office.js library and 'self' for internal scripts.
**Prevention:** Always implement a restrictive CSP that explicitly allows only trusted domains and 'self' for scripts and styles.

## 2026-06-05 - Hardening style-src by Externalizing Inline Styles
**Vulnerability:** Use of 'unsafe-inline' in style-src directive allows for potential CSS injection attacks and bypasses standard CSP protections.
**Learning:** Moving inline styles from index.html to index.css allows for the removal of 'unsafe-inline' from the Content Security Policy, significantly hardening the add-in against style-based attacks without affecting functionality.
**Prevention:** Avoid inline <style> blocks and 'style' attributes. Always use external stylesheets and a restrictive style-src 'self' CSP directive.

## 2026-06-24 - Mitigating Transitive Vulnerabilities via npm Overrides
**Vulnerability:** Moderate vulnerabilities in `follow-redirects` (GHSA-r4q5-vmmm-2653) and `qs` (GHSA-q8mj-m7cp-5q26) were identified via `npm audit`.
**Learning:** Using the `overrides` field in `package.json` allows for pinning specific versions of transitive dependencies without needing to promote them to top-level dependencies, keeping `package.json` clean while ensuring security.
**Prevention:** Regularly run `npm audit` and use the `overrides` field to address vulnerabilities in sub-dependencies that aren't directly managed by the project.
