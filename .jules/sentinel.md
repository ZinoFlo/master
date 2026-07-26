## 2026-03-08 - Content Security Policy for Office Add-ins
**Vulnerability:** Office Add-ins load external scripts (like office.js) and run in the context of the host application (PowerPoint), making them targets for XSS and data exfiltration.
**Learning:** Adding a CSP meta tag in the head of index.html provides a defense-in-depth layer. It must allow 'https://appsforoffice.microsoft.com' for the Office.js library and 'self' for internal scripts.
**Prevention:** Always implement a restrictive CSP that explicitly allows only trusted domains and 'self' for scripts and styles.

## 2026-06-05 - Hardening style-src by Externalizing Inline Styles
**Vulnerability:** Use of 'unsafe-inline' in style-src directive allows for potential CSS injection attacks and bypasses standard CSP protections.
**Learning:** Moving inline styles from index.html to index.css allows for the removal of 'unsafe-inline' from the Content Security Policy, significantly hardening the add-in against style-based attacks without affecting functionality.
**Prevention:** Avoid inline <style> blocks and 'style' attributes. Always use external stylesheets and a restrictive style-src 'self' CSP directive.

## 2026-07-26 - Transitive Dependency Hardening with Overrides
**Vulnerability:** Moderate severity security risks (GHSA-r4q5-vmmm-2653 / CVE-2025-24357 and GHSA-q8mj-m7cp-5q26) inside transitively referenced npm packages (`follow-redirects` and `qs` respectively) introduced by `http-server`.
**Learning:** Utilizing npm's root-level `overrides` field inside `package.json` to pin safe versions (`1.16.0` and `6.15.3` respectively) eliminates these vulnerabilities cleanly without introducing unnecessary devDependencies promotion or breaking the dependency resolution tree.
**Prevention:** Constantly run `npm audit` and handle transitive security issues with explicit package overrides rather than promoting devDependencies or manually hacking lockfiles.
