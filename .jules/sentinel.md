## 2026-03-08 - Content Security Policy for Office Add-ins
**Vulnerability:** Office Add-ins load external scripts (like office.js) and run in the context of the host application (PowerPoint), making them targets for XSS and data exfiltration.
**Learning:** Adding a CSP meta tag in the head of index.html provides a defense-in-depth layer. It must allow 'https://appsforoffice.microsoft.com' for the Office.js library and 'self' for internal scripts.
**Prevention:** Always implement a restrictive CSP that explicitly allows only trusted domains and 'self' for scripts and styles.

## 2026-03-08 - Referrer-Policy for Office Add-ins
**Vulnerability:** Browsers may leak the application's URL, which could contain sensitive path information or parameters, via the `Referer` HTTP header to third-party domains.
**Learning:** Implementing a strict Referrer-Policy via a `<meta>` tag provides a simple and effective defense against URL leakage in Office Add-ins.
**Prevention:** Use `<meta name="referrer" content="no-referrer" />` in the `<head>` of HTML files to prevent the browser from sending the `Referer` header.
