## 2026-03-08 - Content Security Policy for Office Add-ins
**Vulnerability:** Office Add-ins load external scripts (like office.js) and run in the context of the host application (PowerPoint), making them targets for XSS and data exfiltration.
**Learning:** Adding a CSP meta tag in the head of index.html provides a defense-in-depth layer. It must allow 'https://appsforoffice.microsoft.com' for the Office.js library and 'self' for internal scripts.
**Prevention:** Always implement a restrictive CSP that explicitly allows only trusted domains and 'self' for scripts and styles.

## 2026-06-05 - Hardening style-src by Externalizing Inline Styles
**Vulnerability:** Use of 'unsafe-inline' in style-src directive allows for potential CSS injection attacks and bypasses standard CSP protections.
**Learning:** Moving inline styles from index.html to index.css allows for the removal of 'unsafe-inline' from the Content Security Policy, significantly hardening the add-in against style-based attacks without affecting functionality.
**Prevention:** Avoid inline <style> blocks and 'style' attributes. Always use external stylesheets and a restrictive style-src 'self' CSP directive.

## 2026-07-27 - Mitigating Transitive Vulnerabilities in HTTP-Server via Package Overrides
**Vulnerability:** The devDependency `http-server` transitively pulls in older versions of `follow-redirects` (<=1.15.11) with an Authentication Header Leakage vulnerability (GHSA-r4q5-vmmm-2653 / CVE-2025-24357) and `qs` (6.11.1 - 6.15.1) vulnerable to a Remotely Triggerable Denial of Service (GHSA-q8mj-m7cp-5q26).
**Learning:** Adding comments or key documentation directly inside the `overrides` block of `package.json` results in `npm install` failures due to 'Override without name' errors. Additionally, simple transitive overrides must be fully synchronized by executing a fresh clean install to regenerate the dependency tree in `package-lock.json`, which properly pulls in transitive sub-dependencies (such as `es-define-property` for `qs@6.15.3`).
**Prevention:** When pinning transitive dependency versions via `overrides` in `package.json`, place the descriptive documentation at the root level using a custom key (e.g., `"//SentinelOverrides"`) rather than inside the `overrides` block. Always execute `rm -rf node_modules package-lock.json && npm install` to cleanly regenerate the lockfile and verify integrity.
