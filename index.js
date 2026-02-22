/**
 * Eco-growth Discovery Project
 * Client-side script for the Office Add-in.
 */

Office.onReady((info) => {
  // Initialize for PowerPoint or when testing in a browser
  if (info.host === Office.HostType.PowerPoint || !info.host) {
    console.log("Eco-growth Discovery initialized.");

    // Retrieve and display initials
    const initialsDisplay = document.getElementById("initials-display");
    if (initialsDisplay) {
      // Default initials from the project template metadata (Julien Vink)
      let initials = "JV";
      initialsDisplay.textContent = initials;
    }

    // Initialize API integration
    initializeApi();
  }
});

/**
 * Retrieves an OAuth2 token using Office.auth.
 * @returns {Promise<string|null>} The access token or null if failed.
 */
async function getAuthToken() {
  try {
    if (Office.auth && Office.auth.getAccessToken) {
      return await Office.auth.getAccessToken();
    }
    console.warn("Office.auth.getAccessToken is not available in this environment.");
    return null;
  } catch (error) {
    console.error("Error getting access token:", error);
    return null;
  }
}

/**
 * Fetches sources from the Jules API.
 * @param {string} token The OAuth2 access token.
 * @returns {Promise<any>} The API response.
 */
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
    const display = document.getElementById("api-response-display");
    if (display) {
      display.textContent = "Error loading sources: " + error.message;
    }
    return null;
  }
}

/**
 * Initializes the API integration by fetching and displaying sources.
 */
async function initializeApi() {
  const token = await getAuthToken();
  if (token) {
    const data = await fetchSources(token);
    if (data) {
      console.log("Sources fetched successfully:", data);
      renderSources(data);
    }
  } else {
    const display = document.getElementById("api-response-display");
    if (display) {
      display.textContent = "Authentication required to load sources.";
    }
  }
}

/**
 * Renders the fetched source data into the UI.
 * @param {any} data The API response data.
 */
function renderSources(data) {
  const display = document.getElementById("api-response-display");
  if (!display) return;

  display.innerHTML = ""; // Clear loading message

  // Inspect data structure and render accordingly
  const sources = data.sources || (Array.isArray(data) ? data : null);

  if (sources && sources.length > 0) {
    const list = document.createElement("ul");
    list.style.listStyleType = "none";
    list.style.padding = "0";

    sources.forEach(source => {
      const item = document.createElement("li");
      item.className = "source-item";
      // Handle both string arrays and object arrays (e.g., { name: '...' })
      item.textContent = typeof source === 'string' ? source : (source.name || source.displayName || JSON.stringify(source));
      list.appendChild(item);
    });
    display.appendChild(list);
  } else {
    display.textContent = "No sources found.";
  }
}
