/**
 * Theme management functionality for BONOBO BAR website
 * Handles:
 * - Dark/light theme toggle
 * - Theme persistence
 * - OS preference detection
 */

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize theme
  initializeTheme();
});

/**
 * Initialize theme functionality
 * Detects OS preferences and loads saved preferences
 */
function initializeTheme() {
  // Check if user has a saved preference
  const savedTheme = localStorage.getItem("theme");

  // If no saved preference, check if OS prefers dark mode
  if (!savedTheme) {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setTheme(prefersDarkMode ? "dark" : "light");
  } else {
    setTheme(savedTheme);
  }

  // Listen for OS preference changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => {
      // Only apply OS preference if user hasn't set a preference
      if (!localStorage.getItem("theme")) {
        setTheme(event.matches ? "dark" : "light");
      }
    });

  // Set up theme toggle button
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }
}

/**
 * Toggle between light and dark themes
 */
function toggleTheme() {
  const currentTheme = document.body.classList.contains("dark-theme")
    ? "dark"
    : "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(newTheme);
}

/**
 * Set the theme and update UI elements
 * @param {string} theme - The theme to set ('light' or 'dark')
 */
function setTheme(theme) {
  // Update body class
  if (theme === "dark") {
    document.body.classList.remove("light-theme");
    document.body.classList.add("dark-theme");
    document.getElementById("theme-toggle").innerHTML =
      '<i class="fas fa-moon"></i>';
  } else {
    document.body.classList.remove("dark-theme");
    document.body.classList.add("light-theme");
    document.getElementById("theme-toggle").innerHTML =
      '<i class="fas fa-sun"></i>';
  }

  // Save to localStorage
  localStorage.setItem("theme", theme);

  // Dispatch event for other scripts
  document.dispatchEvent(
    new CustomEvent("themeChanged", {
      detail: { theme },
    })
  );
}

// Expose functions globally
window.setTheme = setTheme;
window.toggleTheme = toggleTheme;
