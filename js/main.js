/**
 * Main JavaScript file for BONOBO BAR website
 * Handles core functionality including:
 * - Time-based menu adaptation
 * - Section visibility
 * - General UI interactions
 */

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize the current year in the footer
  document.getElementById("current-year").textContent =
    new Date().getFullYear();

  // Initialize UI components
  initializeUI();

  // Set up time-based button ordering
  arrangeButtonsByTime();

  // Initial language setup
  setLanguage(localStorage.getItem("preferredLanguage") || "en");
});

/**
 * Initialize UI components and event listeners
 */
function initializeUI() {
  // Side menu functionality
  const hamburgerButton = document.getElementById("hamburger-menu");
  const sideMenu = document.getElementById("side-menu");
  const closeMenuButton = document.querySelector(".close-menu");
  const overlay = document.getElementById("overlay");

  hamburgerButton.addEventListener("click", function () {
    sideMenu.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  });

  closeMenuButton.addEventListener("click", closeSideMenu);
  overlay.addEventListener("click", closeSideMenu);

  // Close side menu when a menu item is clicked
  const menuLinks = sideMenu.querySelectorAll("a");
  menuLinks.forEach((link) => {
    link.addEventListener("click", function () {
      closeSideMenu();

      // If link points to a section, handle the navigation
      const targetId = this.getAttribute("href");
      if (targetId.startsWith("#") && targetId.length > 1) {
        const targetSection = document.getElementById(targetId.substring(1));
        if (targetSection) {
          event.preventDefault();
          showSection(targetId.substring(1));

          // Scroll to the section
          setTimeout(() => {
            targetSection.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
      }
    });
  });

  // Category button functionality
  const categoryButtons = document.querySelectorAll(".category-btn");
  categoryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetSection = this.getAttribute("data-target");
      showSection(targetSection);

      // Scroll to the section
      document
        .getElementById(targetSection)
        .scrollIntoView({ behavior: "smooth" });
    });
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
  }
}

/**
 * Arrange category buttons based on the time of day
 * Morning (6-11): Coffee, Food, Spirits, Cocktails
 * Afternoon (11-17): Food, Coffee, Cocktails, Spirits
 * Evening (17-22): Cocktails, Food, Spirits, Coffee
 * Night (22-6): Cocktails, Spirits, Food, Coffee
 */
function arrangeButtonsByTime() {
  const buttonContainer = document.getElementById("dynamic-buttons");
  const coffeeBtn = document.getElementById("coffee-btn");
  const foodBtn = document.getElementById("food-btn");
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
    buttonOrder = [coffeeBtn, foodBtn, spiritsBtn, cocktailsBtn];
  } else if (currentHour >= 11 && currentHour < 17) {
    // Afternoon
    buttonOrder = [foodBtn, coffeeBtn, cocktailsBtn, spiritsBtn];
  } else if (currentHour >= 17 && currentHour < 22) {
    // Evening
    buttonOrder = [cocktailsBtn, foodBtn, spiritsBtn, coffeeBtn];
  } else {
    // Night
    buttonOrder = [cocktailsBtn, spiritsBtn, foodBtn, coffeeBtn];
  }

  // Append buttons in the determined order
  buttonOrder.forEach((button) => {
    buttonContainer.appendChild(button.cloneNode(true));
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
      showSection(targetSection);

      // Scroll to the section
      document
        .getElementById(targetSection)
        .scrollIntoView({ behavior: "smooth" });
    });
  });
}

/**
 * Updates the UI based on selected language
 * @param {string} lang - The language code ('en' or 'el')
 */
function setLanguage(lang) {
  // This function will be implemented in language.js
  // It's referenced here for clarity in the main logic flow
}
