## 2026-03-08 - Content Security Policy for Office Add-ins
**Vulnerability:** Office Add-ins load external scripts (like office.js) and run in the context of the host application (PowerPoint), making them targets for XSS and data exfiltration.
**Learning:** Adding a CSP meta tag in the head of index.html provides a defense-in-depth layer. It must allow 'https://appsforoffice.microsoft.com' for the Office.js library and 'self' for internal scripts.
**Prevention:** Always implement a restrictive CSP that explicitly allows only trusted domains and 'self' for scripts and styles.

## 2026-03-08 - Hash-based CSP for Internal Styles
**Vulnerability:** Using `'unsafe-inline'` in `style-src` allows any inline style to execute, which can be exploited for CSS-based data exfiltration or UI redressing if an attacker can inject HTML.
**Learning:** For Office Add-ins with static internal styles, replacing `'unsafe-inline'` with a SHA-256 hash in the CSP meta tag provides a more secure, granular control without requiring external stylesheets.
**Prevention:** Calculate the SHA-256 hash of internal `<style>` blocks and use it in the `style-src` directive to eliminate the need for `'unsafe-inline'`.
