## 2026-03-08 - Content Security Policy for Office Add-ins
**Vulnerability:** Office Add-ins load external scripts (like office.js) and run in the context of the host application (PowerPoint), making them targets for XSS and data exfiltration.
**Learning:** Adding a CSP meta tag in the head of index.html provides a defense-in-depth layer. It must allow 'https://appsforoffice.microsoft.com' for the Office.js library and 'self' for internal scripts.
**Prevention:** Always implement a restrictive CSP that explicitly allows only trusted domains and 'self' for scripts and styles.

## 2026-06-05 - Hardening style-src by Externalizing Inline Styles
**Vulnerability:** Use of 'unsafe-inline' in style-src directive allows for potential CSS injection attacks and bypasses standard CSP protections.
**Learning:** Moving inline styles from index.html to index.css allows for the removal of 'unsafe-inline' from the Content Security Policy, significantly hardening the add-in against style-based attacks without affecting functionality.
**Prevention:** Avoid inline <style> blocks and 'style' attributes. Always use external stylesheets and a restrictive style-src 'self' CSP directive.

## 2026-07-17 - Resolving Transitive Vulnerabilities in DevDependencies via Overrides
**Vulnerability:** Transitive dependencies of devDependencies can introduce moderate-to-severe security vulnerabilities. In this project, `http-server` pulled in vulnerable versions of `follow-redirects` (GHSA-r4q5-vmmm-2653, custom authorization header leakage) and `qs` (GHSA-q8mj-m7cp-5q26, remotely triggerable DoS).
**Learning:** Pinning transitive dependencies via `overrides` in `package.json` is the standard and preferred way to secure them in an npm environment without manually modifying or promoting them to devDependencies. Additionally, using root-level explanatory keys (e.g., `"//SentinelOverrides"`) allows documenting security rationale without breaking `npm install`, which fails if comments are placed directly inside the `overrides` block.
**Prevention:** Always use the `overrides` field in `package.json` to explicitly pin secure versions of transitive dependencies. Run `npm install` afterwards to regenerate `package-lock.json` and ensure nested sub-dependencies (e.g., `es-define-property` for `qs`) are correctly populated.
