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
  spirits: [],
  cocktails: [],
};

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Load menu data
  loadMenuData();

  // Initialize menu sections
  initializeMenuSections();
});

/**
 * Load menu data from sources
 * In a production environment, this would fetch from JSON files or an API
 */
function loadMenuData() {
  // Sample data for development purposes
  // In production, this would be loaded from external files or an API

  // Coffee menu items
  menuData.coffee = [
    {
      name: {
        en: "Espresso",
        el: "Εσπρέσσο",
      },
      description: {
        en: "Short black coffee",
        el: "Δυνατός μαύρος καφές",
      },
      price: 2.5,
    },
    {
      name: {
        en: "Cappuccino",
        el: "Καπουτσίνο",
      },
      description: {
        en: "Espresso with steamed milk and foam",
        el: "Εσπρέσσο με αφρόγαλα",
      },
      price: 3.5,
    },
    {
      name: {
        en: "Freddo Espresso",
        el: "Φρέντο Εσπρέσσο",
      },
      description: {
        en: "Chilled espresso served over ice",
        el: "Κρύος εσπρέσσο με πάγο",
      },
      price: 3.0,
    },
  ];

  // Food menu items
  menuData.food = [
    {
      name: {
        en: "Greek Salad",
        el: "Χωριάτικη Σαλάτα",
      },
      description: {
        en: "Fresh tomatoes, cucumber, onion, feta cheese and olives",
        el: "Φρέσκες ντομάτες, αγγούρι, κρεμμύδι, φέτα και ελιές",
      },
      price: 8.5,
    },
    {
      name: {
        en: "Club Sandwich",
        el: "Κλαμπ Σάντουιτς",
      },
      description: {
        en: "Chicken, bacon, egg, tomato, lettuce and mayo",
        el: "Κοτόπουλο, μπέικον, αυγό, ντομάτα, μαρούλι και μαγιονέζα",
      },
      price: 9.0,
    },
  ];

  // Spirits menu items
  menuData.spirits = [
    {
      name: {
        en: "House Wine (Glass)",
        el: "Κρασί Σπιτιού (Ποτήρι)",
      },
      description: {
        en: "Local Cretan wine, red or white",
        el: "Τοπικό Κρητικό κρασί, κόκκινο ή λευκό",
      },
      price: 4.5,
    },
    {
      name: {
        en: "Mythos Beer",
        el: "Μπύρα Μύθος",
      },
      description: {
        en: "Greek lager beer (330ml)",
        el: "Ελληνική λάγκερ μπύρα (330ml)",
      },
      price: 4.0,
    },
    {
      name: {
        en: "Ouzo",
        el: "Ούζο",
      },
      description: {
        en: "Traditional Greek anise-flavored spirit",
        el: "Παραδοσιακό Ελληνικό απόσταγμα με άρωμα γλυκάνισου",
      },
      price: 5.0,
    },
  ];

  // Cocktails menu items
  menuData.cocktails = [
    {
      name: {
        en: "Mojito",
        el: "Μοχίτο",
      },
      description: {
        en: "White rum, sugar, lime, soda water and mint",
        el: "Λευκό ρούμι, ζάχαρη, λάιμ, σόδα και δυόσμος",
      },
      price: 8.0,
    },
    {
      name: {
        en: "Margarita",
        el: "Μαργαρίτα",
      },
      description: {
        en: "Tequila, triple sec and lime juice",
        el: "Τεκίλα, τριπλ σεκ και χυμός λάιμ",
      },
      price: 8.5,
    },
    {
      name: {
        en: "Bonobo Special",
        el: "Bonobo Special",
      },
      description: {
        en: "House specialty cocktail with secret ingredients",
        el: "Ειδικό κοκτέιλ του μαγαζιού με μυστικά συστατικά",
      },
      price: 10.0,
    },
  ];
}

/**
 * Initialize menu sections with data
 */
function initializeMenuSections() {
  // Get container elements
  const coffeeContainer = document.querySelector("#coffee-section .menu-items");
  const foodContainer = document.querySelector("#food-section .menu-items");
  const spiritsContainer = document.querySelector(
    "#spirits-section .menu-items"
  );
  const cocktailsContainer = document.querySelector(
    "#cocktails-section .menu-items"
  );

  // Clear existing content
  coffeeContainer.innerHTML = "";
  foodContainer.innerHTML = "";
  spiritsContainer.innerHTML = "";
  cocktailsContainer.innerHTML = "";

  // Populate menu sections
  populateMenuSection(coffeeContainer, menuData.coffee);
  populateMenuSection(foodContainer, menuData.food);
  populateMenuSection(spiritsContainer, menuData.spirits);
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
    nameElement.textContent = item.getAttribute(`data-name-${lang}`);

    // Update description
    const descElement = item.querySelector(".menu-item-description");
    descElement.textContent = item.getAttribute(`data-desc-${lang}`);
  });

  // Update empty messages if any
  const emptyMessages = document.querySelectorAll(".empty-menu-message");
  emptyMessages.forEach((msg) => {
    msg.textContent =
      lang === "en"
        ? "Menu items coming soon!"
        : "Τα στοιχεία του μενού έρχονται σύντομα!";
  });
}

// Expose this function globally so it can be called from language.js
window.updateMenuLanguage = updateMenuLanguage;

// Add listener for language changes
document.addEventListener("languageChanged", function (e) {
  updateMenuLanguage(e.detail.language);
});

// Apply menu filtering functionality (if needed)
function filterMenuItems(category, filter) {
  // Implementation would go here if filtering is required
  // For example, filtering by dietary requirements or price range
}
