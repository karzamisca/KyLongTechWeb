//// views\homePage\homeMain.js
// Load footer
fetch("components/footer/footer.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("footer").innerHTML = data;
  });

/////INTRO JS
// Tab functionality
document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabPanes = document.querySelectorAll(".tab-pane");
  const indicators = document.querySelectorAll(".indicator");
  const prevButton = document.querySelector(".prev-button");
  const nextButton = document.querySelector(".next-button");
  let currentTabIndex = 0;

  // Function to activate a specific tab
  function activateTab(tabId) {
    // Hide all tabs and remove active class
    tabPanes.forEach((pane) => {
      pane.classList.remove("active");
    });

    tabButtons.forEach((button) => {
      button.classList.remove("active");
    });

    indicators.forEach((indicator) => {
      indicator.classList.remove("active");
    });

    // Show the selected tab and add active class
    const selectedTab = document.getElementById(tabId);
    const selectedButton = document.querySelector(`[data-tab="${tabId}"]`);
    const selectedIndicator = document.querySelector(
      `.indicator[data-tab="${tabId}"]`
    );

    if (selectedTab) {
      selectedTab.classList.add("active");
    }

    if (selectedButton) {
      selectedButton.classList.add("active");

      // Update current tab index
      tabButtons.forEach((button, index) => {
        if (button === selectedButton) {
          currentTabIndex = index;
        }
      });
    }

    if (selectedIndicator) {
      selectedIndicator.classList.add("active");
    }
  }

  // Add click event listeners to tab buttons
  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab");
      activateTab(tabId);
    });
  });

  // Add click event listeners to indicators
  indicators.forEach((indicator) => {
    indicator.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab");
      activateTab(tabId);
    });
  });

  // Previous button functionality
  prevButton.addEventListener("click", function () {
    const tabIds = Array.from(tabButtons).map((button) =>
      button.getAttribute("data-tab")
    );
    let newIndex = currentTabIndex - 1;

    if (newIndex < 0) {
      newIndex = tabIds.length - 1;
    }

    activateTab(tabIds[newIndex]);
  });

  // Next button functionality
  nextButton.addEventListener("click", function () {
    const tabIds = Array.from(tabButtons).map((button) =>
      button.getAttribute("data-tab")
    );
    let newIndex = currentTabIndex + 1;

    if (newIndex >= tabIds.length) {
      newIndex = 0;
    }

    activateTab(tabIds[newIndex]);
  });

  // Initialize the first tab as active
  activateTab("about-tab");
});
/////END OF INTRO JS

/////ADVANTAGE SECTION JS
// Animation for advantage cards on scroll
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".advantage-card");

  function checkScroll() {
    cards.forEach((card) => {
      const cardTop = card.getBoundingClientRect().top;
      if (cardTop < window.innerHeight - 100) {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }
    });
  }

  // Initialize card styles
  cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

  // Check positions on load and scroll
  window.addEventListener("scroll", checkScroll);
  checkScroll();
});
/////END OF ADVANTAGE SECTION JS

// NEWS BULLETIN SECTION JS
document.addEventListener("DOMContentLoaded", () => {
  const newsItems = document.querySelectorAll(".news-item");

  // Add click event to navigate to article page for each news item
  newsItems.forEach((newsItem) => {
    newsItem.addEventListener("click", () => {
      const articleUrl = newsItem.getAttribute("data-article-url");
      if (articleUrl) {
        window.location.href = articleUrl;
      }
    });
  });
});
// END OF NEWS BULLETIN SECTION JS
