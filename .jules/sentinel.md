## 2026-03-08 - Content Security Policy for Office Add-ins
**Vulnerability:** Office Add-ins load external scripts (like office.js) and run in the context of the host application (PowerPoint), making them targets for XSS and data exfiltration.
**Learning:** Adding a CSP meta tag in the head of index.html provides a defense-in-depth layer. It must allow 'https://appsforoffice.microsoft.com' for the Office.js library and 'self' for internal scripts.
**Prevention:** Always implement a restrictive CSP that explicitly allows only trusted domains and 'self' for scripts and styles.

## 2026-06-05 - Hardening style-src by Externalizing Inline Styles
**Vulnerability:** Use of 'unsafe-inline' in style-src directive allows for potential CSS injection attacks and bypasses standard CSP protections.
**Learning:** Moving inline styles from index.html to index.css allows for the removal of 'unsafe-inline' from the Content Security Policy, significantly hardening the add-in against style-based attacks without affecting functionality.
**Prevention:** Avoid inline <style> blocks and 'style' attributes. Always use external stylesheets and a restrictive style-src 'self' CSP directive.

## 2026-06-08 - Transitive Dependency Security Updates via Overrides
**Vulnerability:** Transitive dependencies like 'follow-redirects' (GHSA-r4q5-vmmm-2653) and 'qs' (GHSA-q8mj-m7cp-5q26) can introduce moderate vulnerabilities such as authentication header leaks and DoS risks.
**Learning:** Running 'npm audit fix' only updates the 'package-lock.json', which is fragile. Using the 'overrides' field in 'package.json' ensures that these security fixes are persisted in the manifest and enforced across different environments.
**Prevention:** Regularly audit dependencies and use the 'overrides' (npm) or 'resolutions' (yarn/pnpm) field to pin safe versions of transitive dependencies.
