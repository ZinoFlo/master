# Eco-growth Discovery

Uncover your story with Eco-growth Discovery, a PowerPoint Add-in designed to explore data and narratives.

## New Features: Jules API Integration
The add-in now integrates with the **Jules API** to fetch and display "sources" directly within PowerPoint.

### How it works:
1. **Authentication**: Uses `Office.auth.getAccessToken()` to securely retrieve an OAuth2 token.
2. **Data Retrieval**: Fetches sources from `https://jules.googleapis.com/v1alpha/sources` using the authenticated token.
3. **Visualization**: Dynamically renders the retrieved sources in the task pane.

## Getting Started
1. Run `npm install` to install dependencies (including `jest` for testing).
2. Run `npm start` to start the local development server on port 3000.
3. Run `npm test` to execute unit tests.
4. Side-load the `manifest.xml` in PowerPoint to start using the extension.

## Development
- `index.html`: The main task pane UI.
- `index.js`: Core logic for authentication, API calls, and UI rendering.
- `api.test.js`: Unit tests for the API integration.
