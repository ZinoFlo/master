## 2026-03-08 - Content Security Policy for Office Add-ins
**Vulnerability:** Office Add-ins load external scripts (like office.js) and run in the context of the host application (PowerPoint), making them targets for XSS and data exfiltration.
**Learning:** Adding a CSP meta tag in the head of index.html provides a defense-in-depth layer. It must allow 'https://appsforoffice.microsoft.com' for the Office.js library and 'self' for internal scripts.
**Prevention:** Always implement a restrictive CSP that explicitly allows only trusted domains and 'self' for scripts and styles.

## 2026-06-05 - Hardening style-src by Externalizing Inline Styles
**Vulnerability:** Use of 'unsafe-inline' in style-src directive allows for potential CSS injection attacks and bypasses standard CSP protections.
**Learning:** Moving inline styles from index.html to index.css allows for the removal of 'unsafe-inline' from the Content Security Policy, significantly hardening the add-in against style-based attacks without affecting functionality.
**Prevention:** Avoid inline <style> blocks and 'style' attributes. Always use external stylesheets and a restrictive style-src 'self' CSP directive.

## 2026-07-28 - Transitive Dependency Security Mitigation in Office Add-ins
**Vulnerability:** Development tools and static servers like `http-server` carry transitive dependencies such as `follow-redirects` (vulnerable to Custom Authentication Header leak) and `qs` (vulnerable to Denial of Service).
**Learning:** Direct package overrides in `package.json` combined with dependency tree regeneration can effectively solve security audit failures of transitive dependencies. The documentation block for overrides must reside outside the overrides block to prevent npm parsing errors.
**Prevention:** Use npm `overrides` in `package.json` and run a full clean install to propagate dependency resolution to the lockfile without manually promoting transitives to direct dependencies.
