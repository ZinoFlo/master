## 2026-03-08 - Content Security Policy for Office Add-ins
**Vulnerability:** Office Add-ins load external scripts (like office.js) and run in the context of the host application (PowerPoint), making them targets for XSS and data exfiltration.
**Learning:** Adding a CSP meta tag in the head of index.html provides a defense-in-depth layer. It must allow 'https://appsforoffice.microsoft.com' for the Office.js library and 'self' for internal scripts.
**Prevention:** Always implement a restrictive CSP that explicitly allows only trusted domains and 'self' for scripts and styles.

## 2026-04-10 - Principle of Least Privilege in Office Add-in Manifests
**Vulnerability:** Office Add-ins often default to 'ReadWriteDocument' permissions, which is excessive for add-ins that only need to initialize or display information.
**Learning:** Downgrading permissions to 'Restricted' in the manifest.xml significantly reduces the attack surface by blocking APIs that read or write document content. However, this may require uncommenting 'IconUrl' and 'HighResolutionIconUrl' to maintain schema validity.
**Prevention:** Always apply the principle of least privilege by setting the most restrictive permission level possible in the manifest.xml.
