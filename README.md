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

## CSV watcher

`watch_csv_to_json.py` polls an input directory and converts each stable CSV file
to a pretty-printed UTF-8 JSON array in the output directory. It preserves
non-ASCII characters, supports BOM-prefixed files, generates field names when a
CSV has no header row, and writes conversion events to `conversion.log`.

```text
python watch_csv_to_json.py ./incoming ./converted --interval 5
```
