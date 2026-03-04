## 2025-05-14 - [Initial Security Hardening]
**Vulnerability:** Lack of a security policy and missing Content Security Policy (CSP).
**Learning:** For Office Add-ins, a CSP is essential to prevent XSS and should specifically allow the Microsoft Office JS CDN (https://appsforoffice.microsoft.com).
**Prevention:** Always include a 'SECURITY.md' with private reporting instructions and a restrictive CSP in the 'index.html' of the extension.
