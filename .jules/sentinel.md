## 2026-03-08 - Content Security Policy for Office Add-ins
**Vulnerability:** Office Add-ins load external scripts (like office.js) and run in the context of the host application (PowerPoint), making them targets for XSS and data exfiltration.
**Learning:** Adding a CSP meta tag in the head of index.html provides a defense-in-depth layer. It must allow 'https://appsforoffice.microsoft.com' for the Office.js library and 'self' for internal scripts.
**Prevention:** Always implement a restrictive CSP that explicitly allows only trusted domains and 'self' for scripts and styles.

## 2026-06-05 - Hardening style-src by Externalizing Inline Styles
**Vulnerability:** Use of 'unsafe-inline' in style-src directive allows for potential CSS injection attacks and bypasses standard CSP protections.
**Learning:** Moving inline styles from index.html to index.css allows for the removal of 'unsafe-inline' from the Content Security Policy, significantly hardening the add-in against style-based attacks without affecting functionality.
**Prevention:** Avoid inline <style> blocks and 'style' attributes. Always use external stylesheets and a restrictive style-src 'self' CSP directive.

## 2026-07-22 - Mitigating Transitive Dependency Vulnerabilities in HTTP-Server
**Vulnerability:** Transitive dependencies of dev-dependency `http-server` (namely `follow-redirects` and `qs`) were flagged with moderate vulnerabilities: `follow-redirects` leaked auth headers (GHSA-r4q5-vmmm-2653) and `qs` had a remotely triggerable denial-of-service vulnerability (GHSA-q8mj-m7cp-5q26).
**Learning:** For `npm` package manager setups, using the `overrides` block in `package.json` provides an elegant and robust mechanism to pin transitive dependencies to secure versions. However, placing comment keys inside `overrides` breaks `npm install` with "Override without name" errors; comments must be placed as a root-level key.
**Prevention:** Pin transitive dependencies using the root `overrides` field in `package.json`, document the change using root-level metadata/comment keys, and regenerate `package-lock.json` via a fresh `npm install` to ensure lockfile consistency.
