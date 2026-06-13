## 2026-03-08 - Content Security Policy for Office Add-ins
**Vulnerability:** Office Add-ins load external scripts (like office.js) and run in the context of the host application (PowerPoint), making them targets for XSS and data exfiltration.
**Learning:** Adding a CSP meta tag in the head of index.html provides a defense-in-depth layer. It must allow 'https://appsforoffice.microsoft.com' for the Office.js library and 'self' for internal scripts.
**Prevention:** Always implement a restrictive CSP that explicitly allows only trusted domains and 'self' for scripts and styles.

## 2026-06-05 - Hardening style-src by Externalizing Inline Styles
**Vulnerability:** Use of 'unsafe-inline' in style-src directive allows for potential CSS injection attacks and bypasses standard CSP protections.
**Learning:** Moving inline styles from index.html to index.css allows for the removal of 'unsafe-inline' from the Content Security Policy, significantly hardening the add-in against style-based attacks without affecting functionality.
**Prevention:** Avoid inline <style> blocks and 'style' attributes. Always use external stylesheets and a restrictive style-src 'self' CSP directive.

## 2026-06-11 - Mitigating Transitive Dependency Vulnerabilities via Overrides
**Vulnerability:** Moderate severity vulnerabilities in `follow-redirects` (GHSA-r4q5-vmmm-2653, auth header leak) and `qs` (GHSA-q8mj-m7cp-5q26, DoS) were present in the dependency tree.
**Learning:** Standard `npm audit fix` updates `package-lock.json` but doesn't prevent future regressions if dependencies are re-evaluated. Using `overrides` in `package.json` provides a more robust enforcement of safe versions for transitive dependencies.
**Prevention:** Use the `overrides` field in `package.json` to explicitly define minimum safe versions for vulnerable transitive dependencies, ensuring security fixes persist through dependency updates.
