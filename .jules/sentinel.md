## 2026-03-08 - Content Security Policy for Office Add-ins
**Vulnerability:** Office Add-ins load external scripts (like office.js) and run in the context of the host application (PowerPoint), making them targets for XSS and data exfiltration.
**Learning:** Adding a CSP meta tag in the head of index.html provides a defense-in-depth layer. It must allow 'https://appsforoffice.microsoft.com' for the Office.js library and 'self' for internal scripts.
**Prevention:** Always implement a restrictive CSP that explicitly allows only trusted domains and 'self' for scripts and styles.

## 2026-06-05 - Hardening style-src by Externalizing Inline Styles
**Vulnerability:** Use of 'unsafe-inline' in style-src directive allows for potential CSS injection attacks and bypasses standard CSP protections.
**Learning:** Moving inline styles from index.html to index.css allows for the removal of 'unsafe-inline' from the Content Security Policy, significantly hardening the add-in against style-based attacks without affecting functionality.
**Prevention:** Avoid inline <style> blocks and 'style' attributes. Always use external stylesheets and a restrictive style-src 'self' CSP directive.

## 2026-08-03 - Mitigating Transitive Vulnerabilities via package.json Overrides
**Vulnerability:** Transitive dependency follow-redirects (<=1.15.11) was vulnerable to custom authentication headers leakage to cross-domain redirect targets (GHSA-r4q5-vmmm-2653 / CVE-2025-24357) and qs (6.11.1 - 6.15.1) was vulnerable to a remotely triggerable Denial of Service (GHSA-q8mj-m7cp-5q26).
**Learning:** Dev dependencies like http-server pull in vulnerable packages transitively. Specifying comments within the `overrides` object in package.json causes `npm install` to fail with "Override without name". Instead, comments must be added at the root level using a key like `//SentinelOverrides`.
**Prevention:** Use npm overrides in package.json to explicitly pin secure transitive dependency versions (e.g. follow-redirects@1.16.0 and qs@6.15.3) and run `npm install` to regenerate package-lock.json ensuring sub-dependencies are fully resolved.
