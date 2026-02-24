## 2025-05-21 - [Security Hardening for Office Add-ins]
**Vulnerability:** Lack of Content Security Policy (CSP) and permissive permissions in an Office Add-in.
**Learning:** Office Add-ins are often simple static sites but they run within the context of a host application (like PowerPoint). They are susceptible to XSS if not properly hardened. Adding a CSP meta tag is a primary defense.
**Prevention:** Always include a strict CSP that only allows necessary domains (like appsforoffice.microsoft.com for Office.js) and prefer 'textContent' for DOM updates.
