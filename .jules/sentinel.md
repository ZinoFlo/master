## 2026-03-08 - Content Security Policy for Office Add-ins
**Vulnerability:** Office Add-ins load external scripts (like office.js) and run in the context of the host application (PowerPoint), making them targets for XSS and data exfiltration.
**Learning:** Adding a CSP meta tag in the head of index.html provides a defense-in-depth layer. It must allow 'https://appsforoffice.microsoft.com' for the Office.js library and 'self' for internal scripts.
**Prevention:** Always implement a restrictive CSP that explicitly allows only trusted domains and 'self' for scripts and styles.

## 2026-06-05 - Hardening style-src by Externalizing Inline Styles
**Vulnerability:** Use of 'unsafe-inline' in style-src directive allows for potential CSS injection attacks and bypasses standard CSP protections.
**Learning:** Moving inline styles from index.html to index.css allows for the removal of 'unsafe-inline' from the Content Security Policy, significantly hardening the add-in against style-based attacks without affecting functionality.
**Prevention:** Avoid inline <style> blocks and 'style' attributes. Always use external stylesheets and a restrictive style-src 'self' CSP directive.

## 2026-07-31 - Mitigating Transitive Package Vulnerabilities via Overrides
**Vulnerability:** Transitive dependencies `follow-redirects` (vulnerable to custom authorization header leaks on cross-domain redirects) and `qs` (vulnerable to remotely triggerable Denial of Service crashes) were introduced through development dependencies.
**Learning:** Pinning transitive dependency versions in the `overrides` section of `package.json` resolves sub-dependency vulnerabilities. To keep the package-lock.json clean and robust, we must perform a fresh install (`rm -rf node_modules package-lock.json && npm install`) so that any newly required sub-dependencies are completely resolved and committed. Placing comments inside the overrides block causes parsing failures, so documentation comments must be kept at the package root level.
**Prevention:** Regularly scan for nested dependencies via `npm audit` and utilize root-level `overrides` combined with a complete lockfile clean install to enforce secure package versions without disrupting dev dependencies.
