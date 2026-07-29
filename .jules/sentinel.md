## 2026-03-08 - Content Security Policy for Office Add-ins
**Vulnerability:** Office Add-ins load external scripts (like office.js) and run in the context of the host application (PowerPoint), making them targets for XSS and data exfiltration.
**Learning:** Adding a CSP meta tag in the head of index.html provides a defense-in-depth layer. It must allow 'https://appsforoffice.microsoft.com' for the Office.js library and 'self' for internal scripts.
**Prevention:** Always implement a restrictive CSP that explicitly allows only trusted domains and 'self' for scripts and styles.

## 2026-06-05 - Hardening style-src by Externalizing Inline Styles
**Vulnerability:** Use of 'unsafe-inline' in style-src directive allows for potential CSS injection attacks and bypasses standard CSP protections.
**Learning:** Moving inline styles from index.html to index.css allows for the removal of 'unsafe-inline' from the Content Security Policy, significantly hardening the add-in against style-based attacks without affecting functionality.
**Prevention:** Avoid inline <style> blocks and 'style' attributes. Always use external stylesheets and a restrictive style-src 'self' CSP directive.

## 2026-07-29 - Transitive Vulnerabilities Mitigation via package.json Overrides
**Vulnerability:** Moderate severity transitive vulnerabilities identified in `follow-redirects` (Custom Authentication Headers Leakage - CVE-2025-24357 / GHSA-r4q5-vmmm-2653) and `qs` (remotely triggerable DoS - GHSA-q8mj-m7cp-5q26).
**Learning:** Pinning transitive dependencies via the `overrides` field in `package.json` is highly effective. However, placing comment keys (such as `"//"`) inside the `overrides` block causes `npm install` to crash with an 'Override without name' error. Comments explaining security overrides must be placed at the root level of `package.json` (e.g., using `"//SentinelOverrides"`). Additionally, a clean `npm install` (or deleting node_modules and running `npm install`) ensures that transitive sub-dependencies are correctly populated in the lockfile.
**Prevention:** Always place security documentation comments at the root level of `package.json`, and run a clean dependency installation to ensure `package-lock.json` contains a fully consistent dependency tree.
