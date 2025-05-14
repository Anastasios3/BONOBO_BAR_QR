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
    {
      name: {
        en: "Greek Coffee",
        el: "Ελληνικός Καφές",
      },
      description: {
        en: "Traditional Greek coffee brewed in a copper pot",
        el: "Παραδοσιακός ελληνικός καφές παρασκευασμένος σε μπρίκι",
      },
      price: 2.5,
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
    {
      name: {
        en: "Cheese Platter",
        el: "Πλατό Τυριών",
      },
      description: {
        en: "Selection of local Cretan cheeses with crackers and fruit",
        el: "Επιλογή τοπικών κρητικών τυριών με κράκερ και φρούτα",
      },
      price: 12.5,
    },
  ];

  // Beer menu items
  menuData.beer = [
    {
      name: {
        en: "Mythos",
        el: "Μύθος",
      },
      description: {
        en: "Greek lager beer (330ml)",
        el: "Ελληνική λάγκερ μπύρα (330ml)",
      },
      price: 4.0,
    },
    {
      name: {
        en: "Alfa",
        el: "Άλφα",
      },
      description: {
        en: "Hellenic lager (330ml)",
        el: "Ελληνική λάγκερ (330ml)",
      },
      price: 4.0,
    },
    {
      name: {
        en: "Charma Cretan Ale",
        el: "Χάρμα Κρητική Έιλ",
      },
      description: {
        en: "Locally brewed Cretan craft beer (330ml)",
        el: "Τοπική κρητική μπύρα μικροζυθοποιίας (330ml)",
      },
      price: 5.5,
    },
  ];

  // Wine menu items
  menuData.wine = [
    {
      name: {
        en: "House White Wine",
        el: "Λευκό Κρασί Σπιτιού",
      },
      description: {
        en: "Local Cretan Vidiano (Glass)",
        el: "Τοπικό Κρητικό Βιδιανό (Ποτήρι)",
      },
      price: 4.5,
    },
    {
      name: {
        en: "House Red Wine",
        el: "Κόκκινο Κρασί Σπιτιού",
      },
      description: {
        en: "Local Cretan Kotsifali blend (Glass)",
        el: "Τοπικό Κρητικό χαρμάνι Κοτσιφάλι (Ποτήρι)",
      },
      price: 4.5,
    },
    {
      name: {
        en: "Boutari Moschofilero",
        el: "Μπουτάρη Μοσχοφίλερο",
      },
      description: {
        en: "Aromatic white wine with floral notes (Bottle)",
        el: "Αρωματικό λευκό κρασί με ανθώδεις νότες (Φιάλη)",
      },
      price: 22.0,
    },
  ];

  // Spirits menu items
  menuData.spirits = [
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
    {
      name: {
        en: "Tsikoudia/Raki",
        el: "Τσικουδιά/Ρακί",
      },
      description: {
        en: "Traditional Cretan spirit, potent and pure",
        el: "Παραδοσιακό Κρητικό απόσταγμα, δυνατό και αγνό",
      },
      price: 4.5,
    },
    {
      name: {
        en: "Premium Whiskey",
        el: "Εκλεκτό Ουίσκι",
      },
      description: {
        en: "Selection of single malt whiskeys",
        el: "Επιλογή από μονοβαρέλα ουίσκι",
      },
      price: 8.0,
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
    {
      name: {
        en: "Mediterranean Sunset",
        el: "Μεσογειακό Ηλιοβασίλεμα",
      },
      description: {
        en: "Gin, Aperol, fresh orange juice, rosemary syrup",
        el: "Τζιν, Απερόλ, φρέσκος χυμός πορτοκάλι, σιρόπι δενδρολίβανου",
      },
      price: 9.5,
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
