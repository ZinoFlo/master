## 2026-03-08 - Content Security Policy for Office Add-ins
**Vulnerability:** Office Add-ins load external scripts (like office.js) and run in the context of the host application (PowerPoint), making them targets for XSS and data exfiltration.
**Learning:** Adding a CSP meta tag in the head of index.html provides a defense-in-depth layer. It must allow 'https://appsforoffice.microsoft.com' for the Office.js library and 'self' for internal scripts.
**Prevention:** Always implement a restrictive CSP that explicitly allows only trusted domains and 'self' for scripts and styles.

## 2026-04-11 - Minimalist Security Patching
**Vulnerability:** Not a direct vulnerability, but a process failure: over-reaching project scaffolding.
**Learning:** In this environment, attempting to bootstrap a full project structure (adding `manifest.xml`, `package.json`, etc.) in the repository root to support a security fix is considered "noise" and over-scoping if those files aren't already there.
**Prevention:** Focus exclusively on the target file(s). Use temporary local files for verification but ensure they are deleted before submission to keep the security patch minimal and focused.
