const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const cspMatch = html.match(/<meta http-equiv="Content-Security-Policy" content="([^"]+)">/);

if (!cspMatch) {
  console.error('CSP meta tag not found');
  process.exit(1);
}

const cspContent = cspMatch[1];
if (cspContent.includes("default-src 'self'") && cspContent.includes("https://appsforoffice.microsoft.com")) {
  console.log('CSP check passed');
} else {
  console.error('CSP content is insufficient:', cspContent);
  process.exit(1);
}
