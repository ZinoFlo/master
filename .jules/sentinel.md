## 2026-03-08 - Content Security Policy for Office Add-ins
**Vulnerability:** Office Add-ins load external scripts (like office.js) and run in the context of the host application (PowerPoint), making them targets for XSS and data exfiltration.
**Learning:** Adding a CSP meta tag in the head of index.html provides a defense-in-depth layer. It must allow 'https://appsforoffice.microsoft.com' for the Office.js library and 'self' for internal scripts.
**Prevention:** Always implement a restrictive CSP that explicitly allows only trusted domains and 'self' for scripts and styles.

## 2026-03-15 - Limitations of CSP Meta Tags
**Vulnerability:** Clickjacking (via 'frame-ancestors').
**Learning:** The 'frame-ancestors' directive is IGNORED when delivered via a <meta http-equiv="Content-Security-Policy"> tag. It must be delivered as an HTTP response header to be effective.
**Prevention:** Do not rely on meta tags for clickjacking protection. Use server-side headers or a frame-busting script as a fallback if headers are not configurable.
