# Sentinel Security Journal

## Security Learnings & Observations

- **Content Security Policy (CSP):** Implemented a CSP in `index.html` to restrict resource loading. Specifically:
  - Allowed `self` and `https://appsforoffice.microsoft.com` for scripts and default resources.
  - Allowed `unsafe-inline` for styles to support existing CSS blocks.
- **Vulnerability Reporting:** Established a private reporting channel via `SECURITY.md` using GitHub's Private Vulnerability Reporting mechanism.
- **Secure Coding:** Confirmed that `index.js` uses `textContent` for DOM updates, which helps prevent DOM-based XSS.
