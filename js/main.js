/**
 * Main JavaScript file for BONOBO BAR website
 * Handles core functionality including:
 * - Time-based menu adaptation
 * - Section visibility
 * - General UI interactions
 */

// Update at the beginning of the DOMContentLoaded event handler in main.js
document.addEventListener("DOMContentLoaded", function () {
  // Initialize the current year in the footer with error handling
  const currentYearElement = document.getElementById("current-year");
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  // Initialize UI components
  initializeUI();

  // Set up time-based button ordering
  arrangeButtonsByTime();

  // Initial language setup
  if (typeof setLanguage === "function") {
    setLanguage(localStorage.getItem("preferredLanguage") || "en");
  }

  // Initial theme setup
  if (typeof initializeTheme === "function") {
    initializeTheme();
  }
});

/**
 * Initialize UI components and event listeners
 */
// Update the initializeUI function in main.js
function initializeUI() {
  console.log("Initializing UI components...");

  // Side menu functionality
  const hamburgerButton = document.getElementById("hamburger-menu");
  const sideMenu = document.getElementById("side-menu");
  const closeMenuButton = document.querySelector(".close-menu");
  const overlay = document.getElementById("overlay");

  if (hamburgerButton && sideMenu && closeMenuButton && overlay) {
    console.log("Menu elements found, attaching event listeners...");

    hamburgerButton.addEventListener("click", function (event) {
      console.log("Hamburger button clicked");
      event.preventDefault();
      sideMenu.classList.add("active");
      overlay.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    });

    closeMenuButton.addEventListener("click", function (event) {
      event.preventDefault();
      closeSideMenu();
    });

    overlay.addEventListener("click", closeSideMenu);
  } else {
    console.error("Required menu elements not found:");
    console.error("hamburgerButton:", hamburgerButton);
    console.error("sideMenu:", sideMenu);
    console.error("closeMenuButton:", closeMenuButton);
    console.error("overlay:", overlay);
  }

  // Initialize category buttons
  initializeCategoryButtons();
}

// Update the initializeCategoryButtons function
function initializeCategoryButtons() {
  console.log("Initializing category buttons...");
  const categoryButtons = document.querySelectorAll(".category-btn");
  console.log("Found", categoryButtons.length, "category buttons");

  categoryButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      console.log("Category button clicked:", this.getAttribute("data-target"));
      event.preventDefault();
      const targetSection = this.getAttribute("data-target");
      if (targetSection) {
        showSection(targetSection);

        // Scroll to the section
        const sectionElement = document.getElementById(targetSection);
        if (sectionElement) {
          sectionElement.scrollIntoView({ behavior: "smooth" });
        } else {
          console.error("Target section not found:", targetSection);
        }
      }
    });
  });
}
// Newsletter form submission (prevent default for now)
const newsletterForm = document.querySelector(".newsletter-form");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const emailInput = this.querySelector('input[type="email"]');
    if (emailInput && emailInput.value) {
      // In a production environment, you would send this to a server
      alert("Thank you for subscribing!");
      emailInput.value = "";
    }
  });
}

/**
 * Close the side menu and overlay
 */
function closeSideMenu() {
  const sideMenu = document.getElementById("side-menu");
  const overlay = document.getElementById("overlay");

  sideMenu.classList.remove("active");
  overlay.classList.remove("active");
  document.body.style.overflow = ""; // Restore scrolling
}

/**
 * Show a specific section and hide others
 * @param {string} sectionId - The ID of the section to show
 */
function showSection(sectionId) {
  // Hide all sections
  const allSections = document.querySelectorAll(".menu-section");
  allSections.forEach((section) => {
    section.classList.remove("active");
  });

  // Show the selected section
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add("active");

    // Update active state in navigation
    const navLinks = document.querySelectorAll(".side-menu a");
    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href === `#${sectionId}`) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }
}

/**
 * Arrange category buttons based on the time of day
 * Morning (6-11): Coffee, Food, Beer, Wine, Spirits, Cocktails
 * Afternoon (11-17): Food, Coffee, Beer, Wine, Cocktails, Spirits
 * Evening (17-22): Cocktails, Food, Beer, Wine, Spirits, Coffee
 * Night (22-6): Cocktails, Spirits, Wine, Beer, Food, Coffee
 */
function arrangeButtonsByTime() {
  const buttonContainer = document.getElementById("dynamic-buttons");
  const coffeeBtn = document.getElementById("coffee-btn");
  const foodBtn = document.getElementById("food-btn");
  const beerBtn = document.getElementById("beer-btn");
  const wineBtn = document.getElementById("wine-btn");
  const spiritsBtn = document.getElementById("spirits-btn");
  const cocktailsBtn = document.getElementById("cocktails-btn");

  // Get current hour
  const currentHour = new Date().getHours();

  // Clear container
  buttonContainer.innerHTML = "";

  // Define button order based on time
  let buttonOrder;

  if (currentHour >= 6 && currentHour < 11) {
    // Morning
    buttonOrder = [
      coffeeBtn,
      foodBtn,
      beerBtn,
      wineBtn,
      spiritsBtn,
      cocktailsBtn,
    ];
  } else if (currentHour >= 11 && currentHour < 17) {
    // Afternoon
    buttonOrder = [
      foodBtn,
      coffeeBtn,
      beerBtn,
      wineBtn,
      cocktailsBtn,
      spiritsBtn,
    ];
  } else if (currentHour >= 17 && currentHour < 22) {
    // Evening
    buttonOrder = [
      cocktailsBtn,
      foodBtn,
      beerBtn,
      wineBtn,
      spiritsBtn,
      coffeeBtn,
    ];
  } else {
    // Night
    buttonOrder = [
      cocktailsBtn,
      spiritsBtn,
      wineBtn,
      beerBtn,
      foodBtn,
      coffeeBtn,
    ];
  }

  // Append buttons in the determined order
  buttonOrder.forEach((button) => {
    if (button) {
      // Check if button exists
      buttonContainer.appendChild(button.cloneNode(true));
    }
  });

  // Re-add event listeners to the cloned buttons
  initializeCategoryButtons();
}

/**
 * Initialize event listeners for category buttons
 * (Used after rearranging the buttons)
 */
function initializeCategoryButtons() {
  const categoryButtons = document.querySelectorAll(".category-btn");
  categoryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetSection = this.getAttribute("data-target");
      if (targetSection) {
        showSection(targetSection);

        // Scroll to the section
        const sectionElement = document.getElementById(targetSection);
        if (sectionElement) {
          sectionElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });
}

/**
 * Initialize theme functionality
 * Loads saved theme preference from localStorage or sets default
 */
function initializeTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);

  // Add event listener to theme toggle button
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const currentTheme = document.body.classList.contains("dark-theme")
        ? "dark"
        : "light";
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      setTheme(newTheme);
    });
  }
}

/**
 * Set theme and update UI
 * @param {string} theme - The theme to set ('light' or 'dark')
 */
function setTheme(theme) {
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

  // Save theme preference
  localStorage.setItem("theme", theme);

  // Dispatch an event so other scripts can respond to theme change
  document.dispatchEvent(
    new CustomEvent("themeChanged", { detail: { theme } })
  );
}

// Global function to be called from other scripts
window.setTheme = setTheme;
