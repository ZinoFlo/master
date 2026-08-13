// Wrapper for index.js to allow testing in Node.js
// In a real project, we'd use modules, but here we just copy the functions
// for the sake of the test script.

async function getAuthToken() {
  try {
    if (global.Office && global.Office.auth && global.Office.auth.getAccessToken) {
      return await global.Office.auth.getAccessToken();
    }
    console.warn("Office.auth.getAccessToken is not available in this environment.");
    return null;
  } catch (error) {
    console.error("Error getting access token:", error);
    return null;
  }
}

async function fetchSources(token) {
  try {
    const response = await fetch("https://jules.googleapis.com/v1alpha/sources", {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching sources:", error);
    return null;
  }
}

module.exports = { getAuthToken, fetchSources };
