# eco-growth
uncover your story
ontdek je verhaal

## About
`Template.pptm` is a PowerPoint macro-enabled template for Microsoft Office Web Extensions.

## Getting Started
1. Run `npm install` to install dependencies.
2. Run `npm start` to start the local development server.
3. Side-load the `manifest.xml` in PowerPoint to start using the extension.

## Dependabot Configuration
This project uses Dependabot to manage version updates for npm and Docker.

```yaml
version: 2
updates:
  # Enable version updates for npm
  - package-ecosystem: "npm"
    # Look for `package.json` and `lock` files in the `root` directory
    directory: "/"
    # Check the npm registry for updates every day (weekdays)
    schedule:
      interval: "daily"

  # Enable version updates for Docker
  - package-ecosystem: "docker"
    # Look for a `Dockerfile` in the `root` directory
    directory: "/"
    # Check for updates once a week
    schedule:
      interval: "weekly"
```
