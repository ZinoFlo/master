## 2026-03-08 - Content Security Policy for Office Add-ins
**Vulnerability:** Office Add-ins load external scripts (like office.js) and run in the context of the host application (PowerPoint), making them targets for XSS and data exfiltration.
**Learning:** Adding a CSP meta tag in the head of index.html provides a defense-in-depth layer. It must allow 'https://appsforoffice.microsoft.com' for the Office.js library and 'self' for internal scripts.
**Prevention:** Always implement a restrictive CSP that explicitly allows only trusted domains and 'self' for scripts and styles.

## 2026-06-05 - Hardening style-src by Externalizing Inline Styles
**Vulnerability:** Use of 'unsafe-inline' in style-src directive allows for potential CSS injection attacks and bypasses standard CSP protections.
**Learning:** Moving inline styles from index.html to index.css allows for the removal of 'unsafe-inline' from the Content Security Policy, significantly hardening the add-in against style-based attacks without affecting functionality.
**Prevention:** Avoid inline <style> blocks and 'style' attributes. Always use external stylesheets and a restrictive style-src 'self' CSP directive.

## 2026-08-07 - Overriding Transitive Dependencies for Safer Office Add-ins
**Vulnerability:** The devDependency `http-server@14.1.1` introduced moderate vulnerabilities through its transitive dependencies: `follow-redirects` leaking authentication headers (GHSA-r4q5-vmmm-2653 / CVE-2025-24357) and `qs` triggerable DoS (GHSA-q8mj-m7cp-5q26).
**Learning:** Pinning transitive dependencies to safe versions (`1.16.0` and `6.15.3` respectively) via `overrides` in `package.json` successfully mitigates these CVEs without requiring upgrades of direct dependencies. To document the security reasoning cleanly without failing `npm install`, the reasoning must be placed as a root-level `"//SentinelOverrides"` key in `package.json`.
**Prevention:** Regularly run `npm audit` and utilize root-level `overrides` with descriptive metadata comments to keep transitive dependencies secure and lockfiles fully synchronized.
