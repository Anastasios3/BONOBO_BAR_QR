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
  // Define translations
  translations.en = {
    nav: {
      home: "Home",
      about: "About Us",
      coffee: "Coffee",
      food: "Food",
      beer: "Beer",
      wine: "Wine",
      spirits: "Spirits",
      cocktails: "Cocktails",
      events: "Events",
      gallery: "Gallery",
      contact: "Contact",
    },
    welcome: {
      title: "Welcome to BONOBO BAR",
      subtitle: "Discover our selections in Rethymno",
      findus: "Find Us",
      explore: "Explore",
    },
    categories: {
      title: "Our Menu",
    },
    buttons: {
      coffee: "Coffee",
      food: "Food",
      beer: "Beer",
      wine: "Wine",
      spirits: "Spirits",
      cocktails: "Cocktails",
    },
    sections: {
      coffee: {
        title: "Coffee Menu",
        description: "Premium coffee selections for any time of day",
      },
      food: {
        title: "Food Menu",
        description: "Delicious culinary options to satisfy your cravings",
      },
      beer: {
        title: "Beer List",
        description: "Refreshing local and international beers",
      },
      wine: {
        title: "Wine Selection",
        description: "Finest local and imported wines",
      },
      spirits: {
        title: "Spirits",
        description: "Premium spirits from around the world",
      },
      cocktails: {
        title: "Cocktails",
        description: "Handcrafted signature cocktails",
      },
    },
    gallery: {
      title: "Gallery",
      description: "Experience the atmosphere of BONOBO BAR",
    },
    events: {
      title: "Upcoming Events",
      description: "Don't miss our special nights and performances",
      event1: {
        title: "Live Jazz Night",
        description: "Enjoy smooth jazz tunes with specialty cocktails",
      },
      event2: {
        title: "Wine Tasting",
        description: "Discover the finest Cretan wines with our sommelier",
      },
    },
    months: {
      jan: "Jan",
      feb: "Feb",
      mar: "Mar",
      apr: "Apr",
      may: "May",
      jun: "Jun",
      jul: "Jul",
      aug: "Aug",
      sep: "Sep",
      oct: "Oct",
      nov: "Nov",
      dec: "Dec",
    },
    contact: {
      title: "Find Us",
      description: "Visit BONOBO BAR in the heart of Rethymno",
      address: "Old Town, Rethymno, Crete, Greece",
      hours: "Open daily: 9:00 - 02:00",
      phone: "+30 XXXXXXXXXX",
    },
    footer: {
      quicklinks: "Quick Links",
      hours: {
        title: "Opening Hours",
        everyday: "Every day",
      },
      newsletter: "Newsletter",
      "newsletter.description": "Subscribe for updates and special offers",
      subscribe: "Subscribe",
      rights: "All Rights Reserved.",
    },
    menu: {
      ingredients: "Ingredients",
      price: "Price",
    },
  };

  translations.el = {
    nav: {
      home: "Αρχική",
      about: "Σχετικά με εμάς",
      coffee: "Καφές",
      food: "Φαγητό",
      beer: "Μπύρα",
      wine: "Κρασί",
      spirits: "Ποτά",
      cocktails: "Κοκτέιλ",
      events: "Εκδηλώσεις",
      gallery: "Γκαλερί",
      contact: "Επικοινωνία",
    },
    welcome: {
      title: "Καλώς ήρθατε στο BONOBO BAR",
      subtitle: "Ανακαλύψτε τις επιλογές μας στο Ρέθυμνο",
      findus: "Βρείτε μας",
      explore: "Εξερεύνηση",
    },
    categories: {
      title: "Το Μενού μας",
    },
    buttons: {
      coffee: "Καφές",
      food: "Φαγητό",
      beer: "Μπύρα",
      wine: "Κρασί",
      spirits: "Ποτά",
      cocktails: "Κοκτέιλ",
    },
    sections: {
      coffee: {
        title: "Μενού Καφέ",
        description: "Εκλεκτές επιλογές καφέ για κάθε στιγμή της ημέρας",
      },
      food: {
        title: "Μενού Φαγητού",
        description: "Λαχταριστές επιλογές φαγητού για κάθε γευστική προτίμηση",
      },
      beer: {
        title: "Κατάλογος Μπύρας",
        description: "Δροσιστικές τοπικές και διεθνείς μπύρες",
      },
      wine: {
        title: "Επιλογές Κρασιού",
        description: "Εκλεκτά τοπικά και εισαγόμενα κρασιά",
      },
      spirits: {
        title: "Ποτά",
        description: "Εκλεκτά ποτά από όλο τον κόσμο",
      },
      cocktails: {
        title: "Κοκτέιλ",
        description: "Χειροποίητα signature κοκτέιλ",
      },
    },
    gallery: {
      title: "Γκαλερί",
      description: "Ζήστε την ατμόσφαιρα του BONOBO BAR",
    },
    events: {
      title: "Επερχόμενες Εκδηλώσεις",
      description: "Μην χάσετε τις ειδικές βραδιές και τις εκδηλώσεις μας",
      event1: {
        title: "Βραδιά Τζαζ",
        description: "Απολαύστε τζαζ μουσική με ξεχωριστά κοκτέιλ",
      },
      event2: {
        title: "Γευσιγνωσία Κρασιού",
        description: "Ανακαλύψτε τα καλύτερα κρητικά κρασιά με τον οινοχόο μας",
      },
    },
    months: {
      jan: "Ιαν",
      feb: "Φεβ",
      mar: "Μαρ",
      apr: "Απρ",
      may: "Μάι",
      jun: "Ιουν",
      jul: "Ιουλ",
      aug: "Αυγ",
      sep: "Σεπ",
      oct: "Οκτ",
      nov: "Νοε",
      dec: "Δεκ",
    },
    contact: {
      title: "Βρείτε μας",
      description: "Επισκεφθείτε το BONOBO BAR στην καρδιά του Ρεθύμνου",
      address: "Παλιά Πόλη, Ρέθυμνο, Κρήτη, Ελλάδα",
      hours: "Ανοιχτά καθημερινά: 9:00 - 02:00",
      phone: "+30 XXXXXXXXXX",
    },
    footer: {
      quicklinks: "Γρήγοροι Σύνδεσμοι",
      hours: {
        title: "Ώρες Λειτουργίας",
        everyday: "Καθημερινά",
      },
      newsletter: "Ενημερωτικό Δελτίο",
      "newsletter.description":
        "Εγγραφείτε για ενημερώσεις και ειδικές προσφορές",
      subscribe: "Εγγραφή",
      rights: "Με επιφύλαξη παντός δικαιώματος.",
    },
    menu: {
      ingredients: "Συστατικά",
      price: "Τιμή",
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

  // Update menu items if menu is loaded
  if (window.updateMenuLanguage) {
    window.updateMenuLanguage(lang);
  }

  // Toggle special font styling for Greek (if needed)
  if (lang === "el") {
    document.documentElement.classList.add("greek-font");
  } else {
    document.documentElement.classList.remove("greek-font");
  }

  // Set HTML lang attribute for accessibility
  document.documentElement.lang = lang;

  // Dispatch event for other components
  document.dispatchEvent(
    new CustomEvent("languageChanged", {
      detail: { language: lang },
    })
  );
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

  // Update document title if needed
  if (translations[currentLanguage].pageTitle) {
    document.title = translations[currentLanguage].pageTitle;
  }

  // Update placeholder texts if needed
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.getAttribute("data-i18n-placeholder");
    const translation = getNestedTranslation(
      translations[currentLanguage],
      key
    );

    if (translation) {
      element.placeholder = translation;
    }
  });

  // Update buttons if needed
  document.querySelectorAll("button[data-i18n-value]").forEach((element) => {
    const key = element.getAttribute("data-i18n-value");
    const translation = getNestedTranslation(
      translations[currentLanguage],
      key
    );

    if (translation) {
      element.value = translation;
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

/**
 * Get a specific translation by key
 * Public helper function for other scripts
 * @param {string} key - The translation key using dot notation
 * @param {string} lang - Optional language override
 * @returns {string|null} - The translation or null if not found
 */
function getTranslation(key, lang = null) {
  const language = lang || currentLanguage;
  if (!translations[language]) {
    return null;
  }
  return getNestedTranslation(translations[language], key);
}

// Expose functions to global scope
window.setLanguage = setLanguage;
window.getTranslation = getTranslation;
window.getCurrentLanguage = function () {
  return currentLanguage;
};
