# Security Policy

## Reporting a Vulnerability

The Eco-growth Discovery project team takes security seriously. If you discover a security vulnerability, we would appreciate it if you could report it to us responsibly.

**Please do not report security vulnerabilities via public GitHub issues.**

Instead, please report any security-related concerns by:

1.  **Private Vulnerability Reporting:** Use the GitHub "Report a vulnerability" feature if enabled for this repository.
2.  **Email:** Send an email to security@example.com (placeholder) with a detailed description of the vulnerability and steps to reproduce it.

We will acknowledge your report within 48 hours and provide a timeline for the fix.

## Security Practices

- We follow the principle of least privilege in our Office Add-in manifest.
- We use a Content Security Policy (CSP) to mitigate XSS risks.
- We use `textContent` instead of `innerHTML` for DOM updates to prevent XSS.
