/**
 * Menu management functionality for BONOBO BAR website
 * Handles:
 * - Loading menu items from data sources
 * - Displaying menu items in the appropriate sections
 * - Filtering and sorting menu items
 */

// Menu data storage
const menuData = {
  coffee: [],
  food: [],
  beer: [],
  wine: [],
  spirits: [],
  cocktails: [],
};

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Load menu data
  loadMenuData();

  // Initialize menu sections
  initializeMenuSections();

  // Listen for language changes
  document.addEventListener("languageChanged", function (e) {
    updateMenuLanguage(e.detail.language);
  });

  // Listen for theme changes
  document.addEventListener("themeChanged", function () {
    // Any theme-specific menu adjustments would go here
  });
});

/**
 * Load menu data from external JSON files
 */
async function loadMenuData() {
  const categories = ["coffee", "food", "beer", "wine", "spirits", "cocktails"];

  try {
    const promises = categories.map((category) =>
      fetch(`data/menu/${category}.json`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to load ${category} menu`);
          }
          return response.json();
        })
        .then((data) => {
          menuData[category] = data.items || [];
        })
        .catch((error) => {
          console.error(`Error loading ${category} menu:`, error);
          menuData[category] = [];
        })
    );

    await Promise.all(promises);

    // Initialize menu sections after all data is loaded
    initializeMenuSections();
  } catch (error) {
    console.error("Error loading menu data:", error);
  }
}

/**
 * Initialize menu sections with data
 */
function initializeMenuSections() {
  // Get container elements
  const coffeeContainer = document.querySelector("#coffee-section .menu-items");
  const foodContainer = document.querySelector("#food-section .menu-items");
  const beerContainer = document.querySelector("#beer-section .menu-items");
  const wineContainer = document.querySelector("#wine-section .menu-items");
  const spiritsContainer = document.querySelector(
    "#spirits-section .menu-items"
  );
  const cocktailsContainer = document.querySelector(
    "#cocktails-section .menu-items"
  );

  // Clear existing content
  if (coffeeContainer) coffeeContainer.innerHTML = "";
  if (foodContainer) foodContainer.innerHTML = "";
  if (beerContainer) beerContainer.innerHTML = "";
  if (wineContainer) wineContainer.innerHTML = "";
  if (spiritsContainer) spiritsContainer.innerHTML = "";
  if (cocktailsContainer) cocktailsContainer.innerHTML = "";

  // Populate menu sections
  if (coffeeContainer) populateMenuSection(coffeeContainer, menuData.coffee);
  if (foodContainer) populateMenuSection(foodContainer, menuData.food);
  if (beerContainer) populateMenuSection(beerContainer, menuData.beer);
  if (wineContainer) populateMenuSection(wineContainer, menuData.wine);
  if (spiritsContainer) populateMenuSection(spiritsContainer, menuData.spirits);
  if (cocktailsContainer)
    populateMenuSection(cocktailsContainer, menuData.cocktails);
}

/**
 * Populate a menu section with items
 * @param {HTMLElement} container - The container element
 * @param {Array} items - The menu items
 */
function populateMenuSection(container, items) {
  // Get current language
  const currentLang = localStorage.getItem("preferredLanguage") || "en";

  // Create items
  items.forEach((item) => {
    const menuItem = document.createElement("div");
    menuItem.className = "menu-item";

    const header = document.createElement("div");
    header.className = "menu-item-header";

    const name = document.createElement("h3");
    name.className = "menu-item-name";
    name.textContent = item.name[currentLang];

    const price = document.createElement("span");
    price.className = "menu-item-price";
    price.textContent = `€${item.price.toFixed(2)}`;

    const description = document.createElement("p");
    description.className = "menu-item-description";
    description.textContent = item.description[currentLang];

    // Assemble menu item
    header.appendChild(name);
    header.appendChild(price);
    menuItem.appendChild(header);
    menuItem.appendChild(description);

    // Add data attributes for language switching
    menuItem.setAttribute("data-name-en", item.name.en);
    menuItem.setAttribute("data-name-el", item.name.el);
    menuItem.setAttribute("data-desc-en", item.description.en);
    menuItem.setAttribute("data-desc-el", item.description.el);

    // Add to container
    container.appendChild(menuItem);
  });

  // If no items, show message
  if (items.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "empty-menu-message";
    emptyMessage.textContent =
      currentLang === "en"
        ? "Menu items coming soon!"
        : "Τα στοιχεία του μενού έρχονται σύντομα!";
    container.appendChild(emptyMessage);
  }
}

/**
 * Update menu items language
 * Called when language is changed
 * @param {string} lang - The new language code
 */
function updateMenuLanguage(lang) {
  // Get all menu items
  const menuItems = document.querySelectorAll(".menu-item");

  menuItems.forEach((item) => {
    // Update name
    const nameElement = item.querySelector(".menu-item-name");
    if (nameElement) {
      nameElement.textContent = item.getAttribute(`data-name-${lang}`);
    }

    // Update description
    const descElement = item.querySelector(".menu-item-description");
    if (descElement) {
      descElement.textContent = item.getAttribute(`data-desc-${lang}`);
    }
  });

  // Update empty messages if any
  const emptyMessages = document.querySelectorAll(".empty-menu-message");
  emptyMessages.forEach((msg) => {
    msg.textContent =
      lang === "en"
        ? "Menu items coming soon!"
        : "Τα στοιχεία του μενού έρχονται σύντομα!";
  });

  // Update ingredient labels
  const ingredientLabels = document.querySelectorAll(".ingredient-label");
  const ingredientsText = lang === "en" ? "Ingredients" : "Συστατικά";
  ingredientLabels.forEach((label) => {
    label.textContent = ingredientsText;
  });

  // Also reinitialize sections in case they need updating
  initializeMenuSections();
}

// Expose updateMenuLanguage function globally
window.updateMenuLanguage = updateMenuLanguage;

/**
 * Filter menu items by tag or property
 * @param {string} category - The menu category to filter
 * @param {string|Object} filter - The filter criteria
 */
function filterMenuItems(category, filter) {
  const container = document.querySelector(`#${category}-section .menu-items`);
  if (!container) return;

  // Clear container
  container.innerHTML = "";

  // Apply filter
  let filteredItems = [];

  if (typeof filter === "string") {
    // Filter by tag
    filteredItems = menuData[category].filter(
      (item) => item.tags && item.tags.includes(filter)
    );
  } else if (typeof filter === "object") {
    // Filter by properties (e.g., { price: { min: 5, max: 10 } })
    filteredItems = menuData[category].filter((item) => {
      let match = true;

      // Check each filter property
      for (const [prop, value] of Object.entries(filter)) {
        if (prop === "price") {
          // Price range
          if (value.min && item.price < value.min) match = false;
          if (value.max && item.price > value.max) match = false;
        } else if (item[prop] !== value) {
          match = false;
        }
      }

      return match;
    });
  } else {
    // No filter or invalid filter, show all items
    filteredItems = menuData[category];
  }

  // Populate with filtered items
  populateMenuSection(container, filteredItems);
}

// Expose filterMenuItems function globally
window.filterMenuItems = filterMenuItems;
