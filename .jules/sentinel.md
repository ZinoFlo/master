# Sentinel Security Journal - eco-growth-discovery

## Learnings and Patterns

### 1. Office Add-in Security (CSP)
- **Pattern**: Office Add-ins require specific CSP configurations to function correctly while maintaining security.
- **Insight**: Must allow `https://appsforoffice.microsoft.com` in `script-src` and `default-src` to enable the Office.js library.
- **Implementation**: Added CSP meta tag to `index.html`.

### 2. Information Leakage in README
- **Pattern**: Avoid committing sensitive prefixes or internal metadata to the README.
- **Insight**: Prefixes like `codexeng1L` can leak environment or project-specific internal information.
- **Correction**: Cleaned up the root `README.md`.

### 3. Vulnerability Reporting
- **Pattern**: Prioritize private reporting channels for security vulnerabilities.
- **Insight**: GitHub Private Vulnerability Reporting is the preferred mechanism over public issues or generic placeholder emails.
- **Implementation**: Created `SECURITY.md` with tailored instructions.

### 4. DOM-based XSS Prevention
- **Pattern**: Use `textContent` instead of `innerHTML` when updating the UI with dynamic data.
- **Insight**: Even if the data is static (`"JV"`), using `textContent` provides a baseline of defense-in-depth against potential future vulnerabilities.
- **Verification**: Audited `index.js` for compliance.

### 5. Docker MCP Gateway Compatibility
- **Observation**: Running `docker/mcp-gateway` fails in this specific environment due to `overlayfs` mount errors.
- **Insight**: This likely indicates a lack of support for container nesting or specific `overlay` storage driver limitations in the host kernel.
- **Documentation**: Added Troubleshooting section to `README.md`.
