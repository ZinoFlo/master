## 2026-03-08 - Content Security Policy for Office Add-ins
**Vulnerability:** Office Add-ins load external scripts (like office.js) and run in the context of the host application (PowerPoint), making them targets for XSS and data exfiltration.
**Learning:** Adding a CSP meta tag in the head of index.html provides a defense-in-depth layer. It must allow 'https://appsforoffice.microsoft.com' for the Office.js library and 'self' for internal scripts.
**Prevention:** Always implement a restrictive CSP that explicitly allows only trusted domains and 'self' for scripts and styles.

## 2026-06-05 - Hardening style-src by Externalizing Inline Styles
**Vulnerability:** Use of 'unsafe-inline' in style-src directive allows for potential CSS injection attacks and bypasses standard CSP protections.
**Learning:** Moving inline styles from index.html to index.css allows for the removal of 'unsafe-inline' from the Content Security Policy, significantly hardening the add-in against style-based attacks without affecting functionality.
**Prevention:** Avoid inline <style> blocks and 'style' attributes. Always use external stylesheets and a restrictive style-src 'self' CSP directive.

## 2026-08-04 - Mitigating Transitive Dependency Vulnerabilities via Package Overrides
**Vulnerability:** Moderate vulnerabilities in transitive dependencies (follow-redirects <=1.15.11 leaks Auth Headers on cross-domain redirect, and qs <6.15.2 has remotely triggerable DoS) are introduced via development dependencies like http-server.
**Learning:** Overriding transitive dependencies directly in package.json using the overrides field pins dependencies (e.g., follow-redirects@1.16.0 and qs@6.15.3) securely. A root-level comment key must be used in package.json instead of placing comments inside the overrides block to avoid causing npm install failures.
**Prevention:** Use package.json overrides for transitive vulnerability mitigation, and always regenerate package-lock.json with a clean install to ensure all required peer and sub-dependencies are properly resolved.
