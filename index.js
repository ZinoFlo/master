/**
 * Eco-growth Discovery Project
 * Client-side script for the Office Add-in.
 */

Office.onReady((info) => {
  if (info.host === Office.HostType.PowerPoint || !info.host) {
    const initialsDisplay = document.getElementById("initials-display");
    if (initialsDisplay) {
      initialsDisplay.textContent = "JV";
    }
  }
});
