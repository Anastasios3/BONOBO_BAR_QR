/**
 * Language switching functionality for BONOBO BAR website
 * Handles:
 * - Language toggle in the UI
 * - Loading language files
 * - Applying translations to HTML elements
 */

// Language data storage
let translations = {
  en: null,
  el: null,
};

// Currently active language
let currentLanguage = "en";

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize language selector functionality
  initializeLanguageSelector();

  // Load both language files
  loadLanguages();

  // Set initial language (from localStorage or default to English)
  const savedLanguage = localStorage.getItem("preferredLanguage") || "en";
  setLanguage(savedLanguage);
});

/**
 * Initialize language selector dropdown and event listeners
 */
function initializeLanguageSelector() {
  const langToggle = document.getElementById("lang-toggle");
  const langDropdown = document.querySelector(".language-dropdown");
  const langOptions = document.querySelectorAll(".language-dropdown button");

  // Toggle dropdown visibility
  langToggle.addEventListener("click", function (event) {
    event.stopPropagation();
    langDropdown.classList.toggle("active");
  });

  // Handle language selection
  langOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const lang = this.getAttribute("data-lang");
      setLanguage(lang);
      langDropdown.classList.remove("active");
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", function () {
    langDropdown.classList.remove("active");
  });
}

/**
 * Load language files for both supported languages
 */
function loadLanguages() {
  // Define default translations in case files fail to load
  translations.en = {
    nav: {
      home: "Home",
      about: "About Us",
      coffee: "Coffee",
      food: "Food",
      spirits: "Spirits & Wine & Beer",
      cocktails: "Cocktails",
      contact: "Contact",
    },
    welcome: {
      title: "Welcome to BONOBO BAR",
      subtitle: "Discover our selections in Rethymno",
    },
    buttons: {
      coffee: "Coffee",
      food: "Food",
      spirits: "Spirits & Wine & Beer",
      cocktails: "Cocktails",
    },
    sections: {
      coffee: {
        title: "Coffee Menu",
        content: "Our coffee selection will be displayed here.",
      },
      food: {
        title: "Food Menu",
        content: "Our food selection will be displayed here.",
      },
      spirits: {
        title: "Spirits, Wine & Beer",
        content:
          "Our spirits, wine, and beer selection will be displayed here.",
      },
      cocktails: {
        title: "Cocktails",
        content: "Our cocktail selection will be displayed here.",
      },
    },
    footer: {
      address: "Address: Rethymno, Crete, Greece",
      hours: "Opening Hours: 9:00 - 02:00",
      phone: "Phone: +30 XXXXXXXXXX",
      rights: "All Rights Reserved.",
    },
  };

  translations.el = {
    nav: {
      home: "Αρχική",
      about: "Σχετικά με εμάς",
      coffee: "Καφές",
      food: "Φαγητό",
      spirits: "Ποτά & Κρασί & Μπύρα",
      cocktails: "Κοκτέιλ",
      contact: "Επικοινωνία",
    },
    welcome: {
      title: "Καλώς ήρθατε στο BONOBO BAR",
      subtitle: "Ανακαλύψτε τις επιλογές μας στο Ρέθυμνο",
    },
    buttons: {
      coffee: "Καφές",
      food: "Φαγητό",
      spirits: "Ποτά & Κρασί & Μπύρα",
      cocktails: "Κοκτέιλ",
    },
    sections: {
      coffee: {
        title: "Μενού Καφέ",
        content: "Εδώ θα εμφανίζεται η επιλογή καφέ μας.",
      },
      food: {
        title: "Μενού Φαγητού",
        content: "Εδώ θα εμφανίζεται η επιλογή φαγητού μας.",
      },
      spirits: {
        title: "Ποτά, Κρασί & Μπύρα",
        content: "Εδώ θα εμφανίζεται η επιλογή ποτών, κρασιών και μπύρας μας.",
      },
      cocktails: {
        title: "Κοκτέιλ",
        content: "Εδώ θα εμφανίζεται η επιλογή κοκτέιλ μας.",
      },
    },
    footer: {
      address: "Διεύθυνση: Ρέθυμνο, Κρήτη, Ελλάδα",
      hours: "Ώρες Λειτουργίας: 9:00 - 02:00",
      phone: "Τηλέφωνο: +30 XXXXXXXXXX",
      rights: "Με επιφύλαξη παντός δικαιώματος.",
    },
  };

  // In a production environment, you would load these from external JSON files
  // For example:
  /*
    fetch('data/en.json')
        .then(response => response.json())
        .then(data => {
            translations.en = data;
            if (currentLanguage === 'en') {
                applyTranslations();
            }
        })
        .catch(error => console.error('Error loading English translations:', error));
    
    fetch('data/el.json')
        .then(response => response.json())
        .then(data => {
            translations.el = data;
            if (currentLanguage === 'el') {
                applyTranslations();
            }
        })
        .catch(error => console.error('Error loading Greek translations:', error));
    */
}

/**
 * Set the active language and update UI
 * @param {string} lang - The language code ('en' or 'el')
 */
function setLanguage(lang) {
  // Validate language code
  if (lang !== "en" && lang !== "el") {
    console.error("Invalid language code:", lang);
    return;
  }

  // Save current language
  currentLanguage = lang;
  localStorage.setItem("preferredLanguage", lang);

  // Update UI components that indicate current language
  document.querySelector(".active-lang").textContent = lang.toUpperCase();

  // Update active class in dropdown
  document.querySelectorAll(".language-dropdown button").forEach((button) => {
    if (button.getAttribute("data-lang") === lang) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });

  // Apply translations if they are loaded
  if (translations[lang]) {
    applyTranslations();
  }

  // Toggle special font styling for Greek (if needed)
  if (lang === "el") {
    document.documentElement.classList.add("greek-font");
  } else {
    document.documentElement.classList.remove("greek-font");
  }

  // Set HTML lang attribute for accessibility
  document.documentElement.lang = lang;
}

/**
 * Apply translations to all elements with data-i18n attribute
 */
function applyTranslations() {
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((element) => {
    const key = element.getAttribute("data-i18n");
    const translation = getNestedTranslation(
      translations[currentLanguage],
      key
    );

    if (translation) {
      element.textContent = translation;
    }
  });
}

/**
 * Get a nested translation using dot notation
 * @param {Object} obj - The translations object
 * @param {string} path - The dot notation path (e.g., 'nav.home')
 * @returns {string|null} - The translation or null if not found
 */
function getNestedTranslation(obj, path) {
  const keys = path.split(".");
  let result = obj;

  for (const key of keys) {
    if (result && typeof result === "object" && key in result) {
      result = result[key];
    } else {
      return null;
    }
  }

  return result;
}
