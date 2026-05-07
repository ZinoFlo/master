## 2026-03-08 - Content Security Policy for Office Add-ins
**Vulnerability:** Office Add-ins load external scripts (like office.js) and run in the context of the host application (PowerPoint), making them targets for XSS and data exfiltration.
**Learning:** Adding a CSP meta tag in the head of index.html provides a defense-in-depth layer. It must allow 'https://appsforoffice.microsoft.com' for the Office.js library and 'self' for internal scripts.
**Prevention:** Always implement a restrictive CSP that explicitly allows only trusted domains and 'self' for scripts and styles.

## 2026-03-08 - Hash-based CSP for Inline Styles
**Vulnerability:** Using 'unsafe-inline' in Content Security Policy (CSP) style-src allows potential CSS injection attacks, which can be used for data exfiltration or UI redressing.
**Learning:** Hardening the CSP by replacing 'unsafe-inline' with a SHA-256 hash of the specific style block provides robust protection while maintaining functionality. Crucially, browsers calculate the hash based on the exact literal content between the <style> tags, including all whitespace and newlines.
**Prevention:** Use subresource integrity (SRI) or CSP hashes for all inline content. Ensure the hash is calculated from the precise character sequence used in the HTML file to avoid blockages.
