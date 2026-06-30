## 2026-03-08 - Content Security Policy for Office Add-ins
**Vulnerability:** Office Add-ins load external scripts (like office.js) and run in the context of the host application (PowerPoint), making them targets for XSS and data exfiltration.
**Learning:** Adding a CSP meta tag in the head of index.html provides a defense-in-depth layer. It must allow 'https://appsforoffice.microsoft.com' for the Office.js library and 'self' for internal scripts.
**Prevention:** Always implement a restrictive CSP that explicitly allows only trusted domains and 'self' for scripts and styles.

## 2026-06-05 - Hardening style-src by Externalizing Inline Styles
**Vulnerability:** Use of 'unsafe-inline' in style-src directive allows for potential CSS injection attacks and bypasses standard CSP protections.
**Learning:** Moving inline styles from index.html to index.css allows for the removal of 'unsafe-inline' from the Content Security Policy, significantly hardening the add-in against style-based attacks without affecting functionality.
**Prevention:** Avoid inline <style> blocks and 'style' attributes. Always use external stylesheets and a restrictive style-src 'self' CSP directive.

## 2026-06-30 - Defense in Depth: CSP Hardening and Referrer-Policy
**Vulnerability:** Office Add-ins can be susceptible to unintended data leakage through Referer headers and unauthorized form submissions if the environment is compromised.
**Learning:** Hardening the Content Security Policy with `form-action 'none'` (as there are no forms) and implementing a strict `no-referrer` policy adds significant defense-in-depth layers with zero impact on the specialized functionality of this add-in.
**Prevention:** Implement `form-action 'none'` in CSP for applications that do not use HTML forms to prevent data exfiltration. Use `no-referrer` to prevent leakage of internal URL structures or sensitive context via Referer headers.
