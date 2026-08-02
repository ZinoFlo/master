## 2026-03-08 - Content Security Policy for Office Add-ins
**Vulnerability:** Office Add-ins load external scripts (like office.js) and run in the context of the host application (PowerPoint), making them targets for XSS and data exfiltration.
**Learning:** Adding a CSP meta tag in the head of index.html provides a defense-in-depth layer. It must allow 'https://appsforoffice.microsoft.com' for the Office.js library and 'self' for internal scripts.
**Prevention:** Always implement a restrictive CSP that explicitly allows only trusted domains and 'self' for scripts and styles.

## 2026-06-05 - Hardening style-src by Externalizing Inline Styles
**Vulnerability:** Use of 'unsafe-inline' in style-src directive allows for potential CSS injection attacks and bypasses standard CSP protections.
**Learning:** Moving inline styles from index.html to index.css allows for the removal of 'unsafe-inline' from the Content Security Policy, significantly hardening the add-in against style-based attacks without affecting functionality.
**Prevention:** Avoid inline <style> blocks and 'style' attributes. Always use external stylesheets and a restrictive style-src 'self' CSP directive.

## 2026-08-02 - Restricting Transitive Vulnerabilities via npm Overrides
**Vulnerability:** Transitive dependencies 'follow-redirects' (under 1.15.11) and 'qs' (under 6.15.1) introduced moderate vulnerabilities (GHSA-r4q5-vmmm-2653 / CVE-2025-24357 and GHSA-q8mj-m7cp-5q26) inside the devDependency tree.
**Learning:** Adding comments inside the 'overrides' block itself causes npm install to fail with an 'Override without name' error. Placing descriptive override comments at the root level of package.json resolves the issue elegantly.
**Prevention:** Declare package overrides at the root of package.json with descriptive keys outside the 'overrides' object to prevent npm parsing issues.
