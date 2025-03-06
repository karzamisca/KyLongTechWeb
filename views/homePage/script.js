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
  const newsGrid = document.querySelector(".news-grid");
  const pdfModal = document.getElementById("pdf-modal");
  const pdfContainer = document.querySelector(".pdf-container");
  const closeModal = document.querySelector(".close-modal");
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // Fetch news data from JSON file
  fetch("homePage/news-data.json")
    .then((response) => response.json())
    .then((newsData) => {
      // Clear any existing news items
      newsGrid.innerHTML = "";

      // Create news items dynamically
      newsData.forEach((newsItem) => {
        const newsItemElement = document.createElement("div");
        newsItemElement.classList.add("news-item");
        newsItemElement.setAttribute("data-pdf", newsItem.pdfUrl);
        newsItemElement.innerHTML = `
          <div class="news-thumbnail">
            <img src="${newsItem.thumbnailUrl}" alt="${newsItem.title}" />
            <div class="news-date">${newsItem.date}</div>
          </div>
          <h3 class="news-item-title">${newsItem.title}</h3>
          <div class="news-read-more">Xem chi tiết</div>
        `;

        // Add click event to open PDF
        newsItemElement.addEventListener("click", () => {
          openPdfViewer(newsItem.pdfUrl, newsItem.title);
        });

        newsGrid.appendChild(newsItemElement);
      });

      // Modal close functionality
      closeModal.addEventListener("click", () => {
        pdfModal.style.display = "none";
        pdfContainer.innerHTML = ""; // Clear the container
      });

      // Close modal when clicking outside the modal content
      pdfModal.addEventListener("click", (event) => {
        if (event.target === pdfModal) {
          pdfModal.style.display = "none";
          pdfContainer.innerHTML = ""; // Clear the container
        }
      });
    })
    .catch((error) => {
      console.error("Error loading news data:", error);
      newsGrid.innerHTML =
        "<p>Unable to load news items. Please try again later.</p>";
    });

  // Function to handle PDF opening based on device
  function openPdfViewer(pdfUrl, title) {
    pdfModal.style.display = "block";

    if (isMobile) {
      // Mobile fallback option - provide direct link and embedded viewer option
      pdfContainer.innerHTML = `
        <div class="pdf-options">
          <h3>${title}</h3>
          <p>Choose how to view this PDF:</p>
          <div class="pdf-buttons">
            <a href="${pdfUrl}" class="pdf-button download-button" target="_blank">Open in New Tab</a>
            <button class="pdf-button embed-button" onclick="embedPdf('${pdfUrl}')">View Embedded</button>
          </div>
          <div id="embedded-pdf-container"></div>
        </div>
      `;

      // Add the embedPdf function to the global scope
      window.embedPdf = function (url) {
        const container = document.getElementById("embedded-pdf-container");
        container.innerHTML = `
          <iframe 
            src="${url}" 
            width="100%" 
            height="500px" 
            frameborder="0"
            allow="fullscreen"
          ></iframe>
        `;
      };
    } else {
      // For desktop, use direct iframe
      pdfContainer.innerHTML = `
        <iframe 
          id="pdf-frame" 
          src="${pdfUrl}" 
          width="100%" 
          height="100%" 
          frameborder="0"
          allow="fullscreen"
          title="${title}"
        ></iframe>
      `;
    }
  }
});
// END OF NEWS BULLETIN SECTION JS
