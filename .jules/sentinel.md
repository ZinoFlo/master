## 2026-03-08 - Content Security Policy for Office Add-ins
**Vulnerability:** Office Add-ins load external scripts (like office.js) and run in the context of the host application (PowerPoint), making them targets for XSS and data exfiltration.
**Learning:** Adding a CSP meta tag in the head of index.html provides a defense-in-depth layer. It must allow 'https://appsforoffice.microsoft.com' for the Office.js library and 'self' for internal scripts.
**Prevention:** Always implement a restrictive CSP that explicitly allows only trusted domains and 'self' for scripts and styles.

## 2026-03-10 - Principle of Least Privilege in Office Add-in Manifests
**Vulnerability:** Office Add-ins often default to 'ReadWriteDocument' permissions, which allows the add-in to read and modify all document content, increasing the impact of an XSS attack.
**Learning:** Many specialized add-ins only require initialization and basic UI updates. Downgrading permissions to 'Restricted' significantly reduces the attack surface without breaking functionality.
**Prevention:** Audit the 'Permissions' element in the manifest and set it to the minimum level required for the add-in's logic.

## 2026-03-10 - Brittleness of Hash-based CSP for Styles
**Vulnerability:** Using SHA-256 hashes for inline style blocks in CSP.
**Learning:** While secure, hash-based CSPs for styles are brittle because they block all inline style attributes (`style="..."`) on HTML elements, which are commonly used by modern UI frameworks. This can lead to silent UI breakage and high maintenance overhead.
**Prevention:** Prefer nonces or build-time CSP generation over manual hashing for style-src if inline attributes are required.
