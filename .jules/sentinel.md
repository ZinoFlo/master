## 2026-03-08 - Content Security Policy for Office Add-ins
**Vulnerability:** Office Add-ins load external scripts (like office.js) and run in the context of the host application (PowerPoint), making them targets for XSS and data exfiltration.
**Learning:** Adding a CSP meta tag in the head of index.html provides a defense-in-depth layer. It must allow 'https://appsforoffice.microsoft.com' for the Office.js library and 'self' for internal scripts.
**Prevention:** Always implement a restrictive CSP that explicitly allows only trusted domains and 'self' for scripts and styles.

## 2026-06-05 - Hardening style-src by Externalizing Inline Styles
**Vulnerability:** Use of 'unsafe-inline' in style-src directive allows for potential CSS injection attacks and bypasses standard CSP protections.
**Learning:** Moving inline styles from index.html to index.css allows for the removal of 'unsafe-inline' from the Content Security Policy, significantly hardening the add-in against style-based attacks without affecting functionality.
**Prevention:** Avoid inline <style> blocks and 'style' attributes. Always use external stylesheets and a restrictive style-src 'self' CSP directive.

## 2026-08-01 - Transitive Dependency Version Overrides and Lockfile Consistency
**Vulnerability:** Transitive dependencies `follow-redirects` and `qs` introduced moderate vulnerabilities (auth header leakage and DoS) through `http-server` which could not be directly patched via top-level dependency updates.
**Learning:** Pinning nested dependencies via `overrides` in `package.json` mitigates vulnerabilities, but running `npm install` afterwards is crucial to ensure that new transitive sub-dependencies (e.g. `es-define-property` for `qs`) and their integrity hashes are fully resolved and recorded in `package-lock.json` to prevent incomplete patches and broken lockfiles.
**Prevention:** Always declare transitive dependency constraints in the `overrides` section of `package.json` accompanied by a root-level documentation comment, and execute `npm install` to completely regenerate and synchronize the `package-lock.json`.
