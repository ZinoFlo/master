## 2026-03-08 - Content Security Policy for Office Add-ins
**Vulnerability:** Office Add-ins load external scripts (like office.js) and run in the context of the host application (PowerPoint), making them targets for XSS and data exfiltration.
**Learning:** Adding a CSP meta tag in the head of index.html provides a defense-in-depth layer. It must allow 'https://appsforoffice.microsoft.com' for the Office.js library and 'self' for internal scripts.
**Prevention:** Always implement a restrictive CSP that explicitly allows only trusted domains and 'self' for scripts and styles.

## 2026-06-05 - Hardening style-src by Externalizing Inline Styles
**Vulnerability:** Use of 'unsafe-inline' in style-src directive allows for potential CSS injection attacks and bypasses standard CSP protections.
**Learning:** Moving inline styles from index.html to index.css allows for the removal of 'unsafe-inline' from the Content Security Policy, significantly hardening the add-in against style-based attacks without affecting functionality.
**Prevention:** Avoid inline <style> blocks and 'style' attributes. Always use external stylesheets and a restrictive style-src 'self' CSP directive.

## 2026-08-05 - Mitigating Transitive Vulnerabilities via package.json Overrides
**Vulnerability:** Transitive dependencies like `follow-redirects` (vulnerability: leaking Auth headers) and `qs` (vulnerability: DoS) are introduced by devDependencies like `http-server` but are not directly listed in package.json dependencies.
**Learning:** Overrides can be used in package.json to pin transitive dependencies to secure versions. However, documentation comments describing the overrides should not be placed inside the `overrides` block as it causes `npm install` to fail with 'Override without name'. Place comments as a root-level key (e.g., `"//SentinelOverrides"`).
**Prevention:** Utilize root-level comment keys in package.json to document override decisions while avoiding placement inside the overrides block itself, and regenerate the lockfile with `npm install` to verify.
