//// views\homePage\script.js
/////HEADER SECTION JS
// Simple JavaScript for navigation highlighting
const navItems = document.querySelectorAll(".nav-menu li a");

navItems.forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();

    // Remove active class from all items
    navItems.forEach((link) => {
      link.classList.remove("active");
    });

    // Add active class to clicked item
    this.classList.add("active");
  });
});

// Set home as active by default
document.getElementById("home").classList.add("active");

/////INTRO JS
// Tab functionality
document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabPanes = document.querySelectorAll(".tab-pane");

  // Set initial active tab
  document
    .querySelector('.tab-button[data-tab="about-tab"]')
    .classList.add("active");
  document.getElementById("about-tab").classList.add("active");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons and panes
      tabButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      tabPanes.forEach((pane) => {
        pane.classList.remove("active");
      });

      // Add active class to clicked button
      this.classList.add("active");

      // Show corresponding tab content
      const tabId = this.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("active");
    });
  });

  // Function to navigate to the next or previous tab
  function navigateTab(direction) {
    const activeButton = document.querySelector(".tab-button.active");
    const allButtons = Array.from(tabButtons);
    const currentIndex = allButtons.indexOf(activeButton);

    let nextIndex;
    if (direction === "next") {
      nextIndex = (currentIndex + 1) % allButtons.length;
    } else {
      nextIndex = (currentIndex - 1 + allButtons.length) % allButtons.length;
    }

    // Simulate click on the next/previous button
    allButtons[nextIndex].click();
  }

  // Add event listeners to next buttons
  const nextButtons = document.querySelectorAll(".next-button");
  nextButtons.forEach((button) => {
    button.addEventListener("click", function () {
      navigateTab("next");
    });
  });

  // Add event listeners to prev buttons
  const prevButtons = document.querySelectorAll(".prev-button");
  prevButtons.forEach((button) => {
    button.addEventListener("click", function () {
      navigateTab("prev");
    });
  });
});
/////END OF HEADER SECTION JS

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
