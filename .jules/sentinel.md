## 2026-03-08 - Content Security Policy for Office Add-ins
**Vulnerability:** Office Add-ins load external scripts (like office.js) and run in the context of the host application (PowerPoint), making them targets for XSS and data exfiltration.
**Learning:** Adding a CSP meta tag in the head of index.html provides a defense-in-depth layer. It must allow 'https://appsforoffice.microsoft.com' for the Office.js library and 'self' for internal scripts.
**Prevention:** Always implement a restrictive CSP that explicitly allows only trusted domains and 'self' for scripts and styles.

## 2026-06-05 - Hardening style-src by Externalizing Inline Styles
**Vulnerability:** Use of 'unsafe-inline' in style-src directive allows for potential CSS injection attacks and bypasses standard CSP protections.
**Learning:** Moving inline styles from index.html to index.css allows for the removal of 'unsafe-inline' from the Content Security Policy, significantly hardening the add-in against style-based attacks without affecting functionality.
**Prevention:** Avoid inline <style> blocks and 'style' attributes. Always use external stylesheets and a restrictive style-src 'self' CSP directive.

## 2026-06-28 - Dependency Pinning via Overrides and Lockfile Integrity
**Vulnerability:** Transitive dependencies `follow-redirects` (GHSA-r4q5-vmmm-2653) and `qs` (GHSA-q8mj-m7cp-5q26) were flagged with moderate vulnerabilities.
**Learning:** Using the `overrides` field in `package.json` is effective for patching transitive vulnerabilities in an `npm` environment. However, ensuring the `package-lock.json` is fully updated and consistent (including all new sub-dependencies like `es-define-property`) is critical to avoid broken builds. Manual edits to lockfiles should be avoided in favor of running `npm install`.
**Prevention:** Always use `npm install` after modifying `overrides` in `package.json` and commit the entire resulting change to the lockfile to maintain dependency tree integrity.
