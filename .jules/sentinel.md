## 2026-03-08 - Content Security Policy for Office Add-ins
**Vulnerability:** Office Add-ins load external scripts (like office.js) and run in the context of the host application (PowerPoint), making them targets for XSS and data exfiltration.
**Learning:** Adding a CSP meta tag in the head of index.html provides a defense-in-depth layer. It must allow 'https://appsforoffice.microsoft.com' for the Office.js library and 'self' for internal scripts.
**Prevention:** Always implement a restrictive CSP that explicitly allows only trusted domains and 'self' for scripts and styles.

## 2026-06-05 - Hardening style-src by Externalizing Inline Styles
**Vulnerability:** Use of 'unsafe-inline' in style-src directive allows for potential CSS injection attacks and bypasses standard CSP protections.
**Learning:** Moving inline styles from index.html to index.css allows for the removal of 'unsafe-inline' from the Content Security Policy, significantly hardening the add-in against style-based attacks without affecting functionality.
**Prevention:** Avoid inline <style> blocks and 'style' attributes. Always use external stylesheets and a restrictive style-src 'self' CSP directive.

## 2026-07-13 - Mitigating Transitive Vulnerabilities via Overrides
**Vulnerability:** Transitive dependencies `follow-redirects` (auth header leakage) and `qs` (DoS) were flagged with moderate vulnerabilities.
**Learning:** In projects where direct dependencies (like `http-server`) pull in vulnerable transitive packages, the `overrides` field in `package.json` provides a clean way to force safer versions without waiting for upstream updates.
**Prevention:** Regularly run `npm audit` and use the `overrides` field to maintain a secure dependency tree, especially for development tools that might expose the environment during local testing.
