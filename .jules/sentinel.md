## 2026-03-08 - Content Security Policy for Office Add-ins
**Vulnerability:** Office Add-ins load external scripts (like office.js) and run in the context of the host application (PowerPoint), making them targets for XSS and data exfiltration.
**Learning:** Adding a CSP meta tag in the head of index.html provides a defense-in-depth layer. It must allow 'https://appsforoffice.microsoft.com' for the Office.js library and 'self' for internal scripts.
**Prevention:** Always implement a restrictive CSP that explicitly allows only trusted domains and 'self' for scripts and styles.

## 2026-06-05 - Hardening style-src by Externalizing Inline Styles
**Vulnerability:** Use of 'unsafe-inline' in style-src directive allows for potential CSS injection attacks and bypasses standard CSP protections.
**Learning:** Moving inline styles from index.html to index.css allows for the removal of 'unsafe-inline' from the Content Security Policy, significantly hardening the add-in against style-based attacks without affecting functionality.
**Prevention:** Avoid inline <style> blocks and 'style' attributes. Always use external stylesheets and a restrictive style-src 'self' CSP directive.

## 2026-07-24 - Transitive Dependency Overrides with Root-Level Comments
**Vulnerability:** Transitive dependencies of dev-dependencies like http-server (such as follow-redirects <=1.15.11 and qs 6.11.1 - 6.15.1) introduced moderate vulnerabilities (GHSA-r4q5-vmmm-2653 and GHSA-q8mj-m7cp-5q26) that cannot be resolved directly.
**Learning:** Using the `overrides` field in `package.json` successfully pins transitive dependencies. However, placing comments directly inside the `overrides` object causes parser failures during `npm install`. To document the rationale safely without breaking toolchains, comments should be added at the root level of `package.json` under keys like `//SentinelOverrides`. Additionally, a full clean and reinstall is required to correctly resolve deep transitive sub-dependencies in `package-lock.json`.
**Prevention:** Use `overrides` for pinning transitive dependency versions and document security reasons with root-level comment keys in `package.json`. Always run `rm -rf node_modules package-lock.json && npm install` to regenerate lockfiles properly.
