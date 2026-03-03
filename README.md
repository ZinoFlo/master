# eco-growth
uncover your story
ontdek je verhaal

## About
`Template.pptm` is a PowerPoint macro-enabled template for Microsoft Office Web Extensions.

## Getting Started
1. Run `npm install` to install dependencies.
2. Run `npm start` to start the local development server.
3. Side-load the `manifest.xml` in PowerPoint to start using the extension.

## Troubleshooting
### Docker MCP Gateway
Attempts to run the Docker MCP Gateway (`docker/mcp-gateway`) in this environment may fail with `overlayfs` mount errors:
```
docker: Error response from daemon: failed to mount ... err: invalid argument
```
This is typically due to environment-specific limitations with the `overlay` storage driver or kernel configurations for container nesting.
