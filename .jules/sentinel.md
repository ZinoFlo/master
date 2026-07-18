## 2026-03-08 - Content Security Policy for Office Add-ins
**Vulnerability:** Office Add-ins load external scripts (like office.js) and run in the context of the host application (PowerPoint), making them targets for XSS and data exfiltration.
**Learning:** Adding a CSP meta tag in the head of index.html provides a defense-in-depth layer. It must allow 'https://appsforoffice.microsoft.com' for the Office.js library and 'self' for internal scripts.
**Prevention:** Always implement a restrictive CSP that explicitly allows only trusted domains and 'self' for scripts and styles.

## 2026-06-05 - Hardening style-src by Externalizing Inline Styles
**Vulnerability:** Use of 'unsafe-inline' in style-src directive allows for potential CSS injection attacks and bypasses standard CSP protections.
**Learning:** Moving inline styles from index.html to index.css allows for the removal of 'unsafe-inline' from the Content Security Policy, significantly hardening the add-in against style-based attacks without affecting functionality.
**Prevention:** Avoid inline <style> blocks and 'style' attributes. Always use external stylesheets and a restrictive style-src 'self' CSP directive.

## 2026-07-18 - Mitigating Transitive Vulnerabilities in Dev Dependencies
**Vulnerability:** Transitive dependencies of `http-server` (namely `follow-redirects` and `qs`) were flagged with moderate security vulnerabilities (GHSA-r4q5-vmmm-2653 and GHSA-q8mj-m7cp-5q26) allowing authentication header leakage and remotely triggerable DoS.
**Learning:** Pinning transitive dependencies via the `overrides` block in `package.json` resolves vulnerability audits while maintaining the main package's configuration. An `npm install` must be executed to cleanly update the lockfile and ensure the new required sub-dependencies (e.g., `es-define-property` for `qs`) are correctly populated.
**Prevention:** Regularly audit dependencies using `npm audit` and utilize root-level `overrides` or `resolutions` to pin transitive packages to safe versions.
