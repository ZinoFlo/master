## 2026-03-08 - Content Security Policy for Office Add-ins
**Vulnerability:** Office Add-ins load external scripts (like office.js) and run in the context of the host application (PowerPoint), making them targets for XSS and data exfiltration.
**Learning:** Adding a CSP meta tag in the head of index.html provides a defense-in-depth layer. It must allow 'https://appsforoffice.microsoft.com' for the Office.js library and 'self' for internal scripts.
**Prevention:** Always implement a restrictive CSP that explicitly allows only trusted domains and 'self' for scripts and styles.

## 2026-06-05 - Hardening style-src by Externalizing Inline Styles
**Vulnerability:** Use of 'unsafe-inline' in style-src directive allows for potential CSS injection attacks and bypasses standard CSP protections.
**Learning:** Moving inline styles from index.html to index.css allows for the removal of 'unsafe-inline' from the Content Security Policy, significantly hardening the add-in against style-based attacks without affecting functionality.
**Prevention:** Avoid inline <style> blocks and 'style' attributes. Always use external stylesheets and a restrictive style-src 'self' CSP directive.

## 2026-07-23 - Mitigation of Transitive Vulnerabilities via package.json Overrides
**Vulnerability:** The devDependency `http-server` transitively depends on outdated versions of `follow-redirects` (<=1.15.11, vulnerable to custom auth header leak / request body injection CVE-2025-24357) and `qs` (6.11.1 - 6.15.1, vulnerable to remotely triggerable DoS GHSA-q8mj-m7cp-5q26).
**Learning:** For transitive dependency vulnerabilities introduced by development tools, standard `npm` projects can be patched using the `overrides` field in `package.json` with exact pinning (e.g., `1.16.0` and `6.15.3`). Comments cannot be written inside the `overrides` object itself, as this fails with an 'Override without name' error, but can be safely documented at the root level via a custom key like `"//SentinelOverrides"`. Running `rm -rf node_modules package-lock.json && npm install` ensures that the lockfile is fully and cleanly updated with the required sub-dependencies (such as `es-define-property` for `qs`).
**Prevention:** Regularly scan dependencies via `npm audit` and utilize `package.json` overrides with a descriptive root comment to explicitly pin secure transitive versions without disrupting core package trees.
