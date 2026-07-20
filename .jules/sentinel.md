## 2026-03-08 - Content Security Policy for Office Add-ins
**Vulnerability:** Office Add-ins load external scripts (like office.js) and run in the context of the host application (PowerPoint), making them targets for XSS and data exfiltration.
**Learning:** Adding a CSP meta tag in the head of index.html provides a defense-in-depth layer. It must allow 'https://appsforoffice.microsoft.com' for the Office.js library and 'self' for internal scripts.
**Prevention:** Always implement a restrictive CSP that explicitly allows only trusted domains and 'self' for scripts and styles.

## 2026-06-05 - Hardening style-src by Externalizing Inline Styles
**Vulnerability:** Use of 'unsafe-inline' in style-src directive allows for potential CSS injection attacks and bypasses standard CSP protections.
**Learning:** Moving inline styles from index.html to index.css allows for the removal of 'unsafe-inline' from the Content Security Policy, significantly hardening the add-in against style-based attacks without affecting functionality.
**Prevention:** Avoid inline <style> blocks and 'style' attributes. Always use external stylesheets and a restrictive style-src 'self' CSP directive.

## 2026-07-20 - Transitive Dependency Vulnerability Mitigation in DevDependencies
**Vulnerability:** Transitive dependencies of development dependencies (e.g., `follow-redirects` under `http-server`'s `http-proxy`, and `qs` under `union`) had moderate-severity security vulnerabilities (GHSA-r4q5-vmmm-2653 and GHSA-q8mj-m7cp-5q26).
**Learning:** While these are devDependencies used for the local server, they are still reported by npm audit and could pose minor security risks during development or testing. Using the `overrides` block in `package.json` allows us to pin safe versions of transitive dependencies (`1.16.0` for `follow-redirects` and `6.15.3` for `qs`) without having to manually promote them to direct devDependencies. Additionally, adding a comment block inside the `overrides` object causes npm install to fail, so documenting the reasoning is best done as a root-level `"//SentinelOverrides"` key in `package.json`.
**Prevention:** Use root-level package.json `overrides` to safely pin sub-dependencies and run `rm -rf node_modules package-lock.json && npm install` to cleanly generate a lockfile that includes required sub-dependencies (e.g., `es-define-property` for `qs`).
