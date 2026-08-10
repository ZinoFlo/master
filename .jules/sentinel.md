## 2026-08-06 - Dependency Pinning and Package Overrides Constraints
**Vulnerability:** Outdated transitive dependencies (`follow-redirects` leaking authentication headers via GHSA-r4q5-vmmm-2653 / CVE-2025-24357 and `qs` DoS vulnerability via GHSA-q8mj-m7cp-5q26) introduced security risks through the `http-server` development dependency.
**Learning:** Overriding transitive dependencies requires modifying `package.json` using the `overrides` block. However, placing documenting comments (e.g., using a `"//"` key) directly inside the `overrides` object causes npm to fail with an 'Override without name' error. Such documentation must reside at the root level of `package.json`. Additionally, combining dependency-based overrides with defense-in-depth fixes (like CSP/Referrer policy changes) in a single pull request is rejected as 'out of scope', requiring strict isolation of security tasks to maintain small diff sizes.
**Prevention:** Always place security comments documenting dependency overrides at the root level of `package.json` (e.g., using `"//SentinelOverrides"`), run `npm install` to synchronize `package-lock.json` completely, and isolate dependency-pinning fixes from other structural or defense-in-depth changes into separate PRs.

## 2026-03-08 - Content Security Policy for Office Add-ins
**Vulnerability:** Office Add-ins load external scripts (like office.js) and run in the context of the host application (PowerPoint), making them targets for XSS and data exfiltration.
**Learning:** Adding a CSP meta tag in the head of index.html provides a defense-in-depth layer. It must allow 'https://appsforoffice.microsoft.com' for the Office.js library and 'self' for internal scripts.
**Prevention:** Always implement a restrictive CSP that explicitly allows only trusted domains and 'self' for scripts and styles.

## 2026-06-05 - Hardening style-src by Externalizing Inline Styles
**Vulnerability:** Use of 'unsafe-inline' in style-src directive allows for potential CSS injection attacks and bypasses standard CSP protections.
**Learning:** Moving inline styles from index.html to index.css allows for the removal of 'unsafe-inline' from the Content Security Policy, significantly hardening the add-in against style-based attacks without affecting functionality.
**Prevention:** Avoid inline <style> blocks and 'style' attributes. Always use external stylesheets and a restrictive style-src 'self' CSP directive.

## 2026-07-11 - Mitigating Transitive Dependency Vulnerabilities via Overrides
**Vulnerability:** Transitive dependencies like `follow-redirects` (auth header leakage) and `qs` (DoS) introduced by dev tools like `http-server` can expose the development environment or build pipeline to risks.
**Learning:** Using the `overrides` field in `package.json` allows pinning safe versions of transitive dependencies without needing the direct parent to update. This effectively resolves `npm audit` warnings while maintaining a lean dependency tree.
**Prevention:** Regularly run `npm audit` and use `overrides` to pin secure versions of transitive dependencies when direct updates are not available. Always ensure `package-lock.json` is fully synchronized after applying overrides.
