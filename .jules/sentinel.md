## 2026-03-08 - Content Security Policy for Office Add-ins
**Vulnerability:** Office Add-ins load external scripts (like office.js) and run in the context of the host application (PowerPoint), making them targets for XSS and data exfiltration.
**Learning:** Adding a CSP meta tag in the head of index.html provides a defense-in-depth layer. It must allow 'https://appsforoffice.microsoft.com' for the Office.js library and 'self' for internal scripts.
**Prevention:** Always implement a restrictive CSP that explicitly allows only trusted domains and 'self' for scripts and styles.

## 2026-05-25 - Externalizing Styles for Strict CSP
**Vulnerability:** The use of 'unsafe-inline' in Content Security Policy (CSP) directives for styles increases the attack surface for CSS injection and certain XSS vectors.
**Learning:** Externalizing inline styles from 'index.html' to a dedicated 'index.css' file allows for the removal of 'unsafe-inline' while maintaining the Add-in's visual integrity.
**Prevention:** Move all inline styles and scripts to external files to enable a strict CSP that prohibits inline execution.
