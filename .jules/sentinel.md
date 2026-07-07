## 2026-03-08 - Content Security Policy for Office Add-ins
**Vulnerability:** Office Add-ins load external scripts (like office.js) and run in the context of the host application (PowerPoint), making them targets for XSS and data exfiltration.
**Learning:** Adding a CSP meta tag in the head of index.html provides a defense-in-depth layer. It must allow 'https://appsforoffice.microsoft.com' for the Office.js library and 'self' for internal scripts.
**Prevention:** Always implement a restrictive CSP that explicitly allows only trusted domains and 'self' for scripts and styles.

## 2026-06-05 - Hardening style-src by Externalizing Inline Styles
**Vulnerability:** Use of 'unsafe-inline' in style-src directive allows for potential CSS injection attacks and bypasses standard CSP protections.
**Learning:** Moving inline styles from index.html to index.css allows for the removal of 'unsafe-inline' from the Content Security Policy, significantly hardening the add-in against style-based attacks without affecting functionality.
**Prevention:** Avoid inline <style> blocks and 'style' attributes. Always use external stylesheets and a restrictive style-src 'self' CSP directive.

## 2026-07-07 - Mitigating Transitive Vulnerabilities via Overrides
**Vulnerability:** Transitive dependencies (like 'follow-redirects' or 'qs' used by 'http-server') can introduce security risks such as authentication header leakage or DoS, even if not directly listed in the project's dependencies.
**Learning:** Using the 'overrides' field in 'package.json' allows for pinning safe versions of transitive dependencies. Running 'npm install' after adding overrides is crucial to ensure 'package-lock.json' is fully synchronized, including new sub-dependencies like 'es-define-property' required by newer 'qs' versions.
**Prevention:** Regularly run 'npm audit' and use 'overrides' to proactively patch known vulnerabilities in the entire dependency tree.
