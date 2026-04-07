## 2026-03-08 - Content Security Policy for Office Add-ins
**Vulnerability:** Office Add-ins load external scripts (like office.js) and run in the context of the host application (PowerPoint), making them targets for XSS and data exfiltration.
**Learning:** Adding a CSP meta tag in the head of index.html provides a defense-in-depth layer. It must allow 'https://appsforoffice.microsoft.com' for the Office.js library and 'self' for internal scripts.
**Prevention:** Always implement a restrictive CSP that explicitly allows only trusted domains and 'self' for scripts and styles.

## 2026-03-08 - Principle of Least Privilege in Office Add-in Manifests
**Vulnerability:** Office Add-ins with overly permissive manifests (e.g., ReadWriteDocument) can be exploited to exfiltrate or modify sensitive document content if an XSS or supply chain attack occurs.
**Learning:** Downgrading permissions to 'Restricted' when the add-in only needs basic initialization reduces the attack surface significantly. However, this may require ensuring certain mandatory elements (like IconUrl) are present for schema validation.
**Prevention:** Regularly audit the manifest.xml and adhere to the principle of least privilege by using the minimum permission level required for the add-in's functionality.
