/**
 * Menu management functionality for BONOBO BAR website
 * Handles:
 * - Loading menu items from JSON files
 * - Displaying menu items in the appropriate sections
 * - Filtering, searching and paginating menu items
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

// Pagination state
const paginationState = {
  coffee: { page: 1, itemsPerPage: 12 },
  food: { page: 1, itemsPerPage: 12 },
  beer: { page: 1, itemsPerPage: 12 },
  wine: { page: 1, itemsPerPage: 12 },
  spirits: { page: 1, itemsPerPage: 12 },
  cocktails: { page: 1, itemsPerPage: 12 },
};

// Current filter
let currentFilter = "all";

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Load menu data
  loadMenuData();

  // Initialize search functionality
  initializeSearch();

  // Initialize filter buttons
  initializeFilters();

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
  const fallbackData = {
    coffee: [
      {
        id: "esp001",
        name: {
          en: "Espresso",
          el: "Εσπρέσσο",
        },
        description: {
          en: "Short black coffee",
          el: "Δυνατός μαύρος καφές",
        },
        price: 2.5,
        image: "espresso.jpg",
        categories: ["hot", "signature"],
        available: true,
      },
      {
        id: "cap001",
        name: {
          en: "Cappuccino",
          el: "Καπουτσίνο",
        },
        description: {
          en: "Espresso with steamed milk and foam",
          el: "Εσπρέσσο με αφρόγαλα",
        },
        price: 3.5,
        image: "cappuccino.jpg",
        categories: ["hot", "popular"],
        available: true,
      },
    ],
    food: [
      {
        id: "sal001",
        name: {
          en: "Greek Salad",
          el: "Χωριάτικη Σαλάτα",
        },
        description: {
          en: "Fresh tomatoes, cucumber, onion, feta cheese and olives",
          el: "Φρέσκες ντομάτες, αγγούρι, κρεμμύδι, φέτα και ελιές",
        },
        price: 8.5,
        image: "greek-salad.jpg",
        categories: ["salad", "popular"],
        available: true,
      },
    ],
    beer: [
      {
        id: "beer001",
        name: {
          en: "Mythos",
          el: "Μύθος",
        },
        description: {
          en: "Greek lager beer (330ml)",
          el: "Ελληνική λάγκερ μπύρα (330ml)",
        },
        price: 4.0,
        image: "mythos.jpg",
        categories: ["local", "popular"],
        available: true,
      },
    ],
    wine: [
      {
        id: "wine001",
        name: {
          en: "House White Wine",
          el: "Λευκό Κρασί Σπιτιού",
        },
        description: {
          en: "Local Cretan Vidiano (Glass)",
          el: "Τοπικό Κρητικό Βιδιανό (Ποτήρι)",
        },
        price: 4.5,
        image: "white-wine.jpg",
        categories: ["local", "glass"],
        available: true,
      },
    ],
    spirits: [
      {
        id: "spirit001",
        name: {
          en: "Ouzo",
          el: "Ούζο",
        },
        description: {
          en: "Traditional Greek anise-flavored spirit",
          el: "Παραδοσιακό Ελληνικό απόσταγμα με άρωμα γλυκάνισου",
        },
        price: 5.0,
        image: "ouzo.jpg",
        categories: ["local", "traditional"],
        available: true,
      },
    ],
    cocktails: [
      {
        id: "cocktail001",
        name: {
          en: "Mojito",
          el: "Μοχίτο",
        },
        description: {
          en: "White rum, sugar, lime, soda water and mint",
          el: "Λευκό ρούμι, ζάχαρη, λάιμ, σόδα και δυόσμος",
        },
        price: 8.0,
        image: "mojito.jpg",
        categories: ["classic", "popular"],
        available: true,
      },
    ],
  };

  try {
    const promises = categories.map((category) =>
      fetch(`data/menu/${category}.json`)
        .then((response) => {
          if (!response.ok) {
            console.warn(
              `Menu file for ${category} not found, using fallback data`
            );
            return { items: fallbackData[category] || [] };
          }
          return response.json();
        })
        .then((data) => {
          menuData[category] = data.items || [];
        })
        .catch((error) => {
          console.error(`Error loading ${category} menu:`, error);
          menuData[category] = fallbackData[category] || [];
        })
    );

    // Use Promise.allSettled to continue even if some fetches fail
    await Promise.allSettled(promises);

    // Initialize menu sections after all data is loaded
    initializeMenuSections();
  } catch (error) {
    console.error("Error loading menu data:", error);

    // Use fallback data if fetch fails
    categories.forEach((category) => {
      menuData[category] = fallbackData[category] || [];
    });

    initializeMenuSections();
  }
}

/**
 * Initialize menu sections with data
 */
function initializeMenuSections() {
  // Get container elements for each section
  const categories = ["coffee", "food", "beer", "wine", "spirits", "cocktails"];

  categories.forEach((category) => {
    const container = document.querySelector(
      `#${category}-section .menu-items`
    );
    if (container) {
      populateMenuSection(
        container,
        menuData[category],
        paginationState[category].page,
        paginationState[category].itemsPerPage
      );
    }
  });
}

/**
 * Populate a menu section with items
 * @param {HTMLElement} container - The container element
 * @param {Array} items - The menu items
 * @param {number} page - Current page number
 * @param {number} itemsPerPage - Number of items per page
 */
function populateMenuSection(container, items, page = 1, itemsPerPage = 12) {
  // Clear existing content
  container.innerHTML = "";

  // Apply current filter if it's not 'all'
  let filteredItems = items;
  if (currentFilter !== "all") {
    filteredItems = items.filter(
      (item) => item.categories && item.categories.includes(currentFilter)
    );
  }

  // Calculate pagination
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Get current language
  const currentLang = window.getCurrentLanguage
    ? window.getCurrentLanguage()
    : "en";

  // Check if there are any items after filtering
  if (currentItems.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "empty-menu-message";
    emptyMessage.textContent =
      currentLang === "en"
        ? "No items found. Try a different filter or search term."
        : "Δεν βρέθηκαν αντικείμενα. Δοκιμάστε διαφορετικό φίλτρο ή όρο αναζήτησης.";

    container.appendChild(emptyMessage);
    return;
  }

  // Create items
  currentItems.forEach((item) => {
    const menuItem = document.createElement("div");
    menuItem.className = "menu-item";
    menuItem.setAttribute("data-item-id", item.id);

    // Add image if available
    if (item.image) {
      const imageContainer = document.createElement("div");
      imageContainer.className = "menu-item-image";

      const image = document.createElement("img");
      // If using placeholder images while developing
      if (item.image.startsWith("http")) {
        image.src = item.image;
      } else {
        image.src = `assets/images/menu/${item.image}`;
      }
      image.alt = item.name[currentLang];
      image.loading = "lazy"; // For performance

      imageContainer.appendChild(image);
      menuItem.appendChild(imageContainer);
    }

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

    // Add badges for categories if needed
    if (item.categories && item.categories.length > 0) {
      const categories = document.createElement("div");
      categories.className = "menu-item-categories";

      item.categories.forEach((cat) => {
        const badge = document.createElement("span");
        badge.className = "category-badge";
        badge.textContent = cat;
        categories.appendChild(badge);
      });

      // Add categories after description
      header.appendChild(name);
      header.appendChild(price);
      menuItem.appendChild(header);
      menuItem.appendChild(description);
      menuItem.appendChild(categories);
    } else {
      // Standard layout without categories
      header.appendChild(name);
      header.appendChild(price);
      menuItem.appendChild(header);
      menuItem.appendChild(description);
    }

    // Store language-specific content as data attributes for easy switching
    for (const lang of ["en", "el"]) {
      menuItem.setAttribute(`data-name-${lang}`, item.name[lang]);
      menuItem.setAttribute(`data-desc-${lang}`, item.description[lang]);
    }

    // Add to container
    container.appendChild(menuItem);
  });

  // Add pagination controls if needed
  if (totalPages > 1) {
    const paginationContainer = document.createElement("div");
    paginationContainer.className = "pagination-controls";

    // Add pagination buttons
    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement("button");
      pageButton.className = "page-btn" + (i === page ? " active" : "");
      pageButton.textContent = i;
      pageButton.addEventListener("click", () => {
        // Get the category from the container's parent section id
        const sectionId = container.closest(".menu-section").id;
        const category = sectionId.replace("-section", "");

        // Update pagination state
        if (paginationState[category]) {
          paginationState[category].page = i;
        }

        populateMenuSection(container, items, i, itemsPerPage);
      });
      paginationContainer.appendChild(pageButton);
    }

    container.appendChild(paginationContainer);
  }
}

/**
 * Initialize search functionality
 */
function initializeSearch() {
  const searchInput = document.getElementById("menu-search");
  if (!searchInput) return;

  searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase().trim();

    // If search is empty, just reset to normal view
    if (!query) {
      initializeMenuSections();
      return;
    }

    // For each menu section
    const categories = [
      "coffee",
      "food",
      "beer",
      "wine",
      "spirits",
      "cocktails",
    ];
    const currentLang = window.getCurrentLanguage
      ? window.getCurrentLanguage()
      : "en";

    categories.forEach((category) => {
      const container = document.querySelector(
        `#${category}-section .menu-items`
      );
      if (!container || !menuData[category]) return;

      // Filter menu items based on search query
      const filtered = menuData[category].filter(
        (item) =>
          (item.name.en && item.name.en.toLowerCase().includes(query)) ||
          (item.name.el && item.name.el.toLowerCase().includes(query)) ||
          (item.description.en &&
            item.description.en.toLowerCase().includes(query)) ||
          (item.description.el &&
            item.description.el.toLowerCase().includes(query))
      );

      // Reset pagination to page 1 for search results
      paginationState[category].page = 1;

      // Update the container with filtered results
      populateMenuSection(
        container,
        filtered,
        paginationState[category].page,
        paginationState[category].itemsPerPage
      );

      // If the section is currently visible, scroll to it
      const activeSection = document.querySelector(".menu-section.active");
      if (activeSection && activeSection.id === `${category}-section`) {
        // If no results in active section, show the user a message
        if (filtered.length === 0) {
          const noResults = document.createElement("p");
          noResults.className = "no-results-message";
          noResults.textContent =
            currentLang === "en"
              ? `No ${category} items match your search.`
              : `Δεν βρέθηκαν αντικείμενα ${category} που να ταιριάζουν με την αναζήτησή σας.`;

          container.innerHTML = "";
          container.appendChild(noResults);
        }
      }
    });
  });
}

/**
 * Initialize filter buttons
 */
function initializeFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  if (!filterButtons.length) return;

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Update active state
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Get filter value
      currentFilter = this.getAttribute("data-filter");

      // Reset pagination on filter change
      for (const category in paginationState) {
        paginationState[category].page = 1;
      }

      // Apply filter to current menu sections
      initializeMenuSections();
    });
  });
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

    // Update alt text for images
    const imgElement = item.querySelector(".menu-item-image img");
    if (imgElement) {
      imgElement.alt = item.getAttribute(`data-name-${lang}`);
    }
  });

  // Update empty messages if any
  const emptyMessages = document.querySelectorAll(".empty-menu-message");
  emptyMessages.forEach((msg) => {
    msg.textContent =
      lang === "en"
        ? "No items found. Try a different filter or search term."
        : "Δεν βρέθηκαν αντικείμενα. Δοκιμάστε διαφορετικό φίλτρο ή όρο αναζήτησης.";
  });

  // Update category badges
  // You would need translation mappings for the categories
}

// Expose functions globally
window.updateMenuLanguage = updateMenuLanguage;
