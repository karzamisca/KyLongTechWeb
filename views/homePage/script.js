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
document.addEventListener("DOMContentLoaded", function () {
  const newsItems = document.querySelectorAll(".news-item");
  const modal = document.getElementById("pdf-modal");
  const pdfFrame = document.getElementById("pdf-frame");
  const closeBtn = document.querySelector(".close-modal");

  // Open modal with PDF when news item is clicked
  newsItems.forEach((item) => {
    item.addEventListener("click", function () {
      const pdfUrl = this.getAttribute("data-pdf");
      if (pdfUrl) {
        pdfFrame.src = pdfUrl;
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // Prevent scrolling behind modal
      }
    });
  });

  // Close modal when X is clicked
  closeBtn.addEventListener("click", function () {
    closeModal();
  });

  // Close modal when clicking outside of it
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Close modal function
  function closeModal() {
    modal.style.display = "none";
    pdfFrame.src = ""; // Clear the iframe src
    document.body.style.overflow = ""; // Restore scrolling
  }

  // Close modal with Escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal.style.display === "block") {
      closeModal();
    }
  });
});

// Function to fetch news data
function fetchNewsData() {
  // Show loading indicator
  const loadingElement = document.getElementById("news-loading");
  if (loadingElement) {
    loadingElement.style.display = "flex";
  }

  fetch("./news-data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Hide loading indicator
      if (loadingElement) {
        loadingElement.style.display = "none";
      }

      createNewsItems(data);
    })
    .catch((error) => {
      console.error("Error fetching news data:", error);

      // Hide loading indicator and show error message
      if (loadingElement) {
        loadingElement.innerHTML =
          "<p>Không thể tải tin tức. Vui lòng thử lại sau.</p>";
      }
    });
}

// Function to create news items from data
function createNewsItems(newsData) {
  const newsGrid = document.getElementById("news-grid");

  if (!newsGrid) {
    console.error("News grid container not found.");
    return;
  }

  // Remove loading indicator if it exists
  const loadingElement = document.getElementById("news-loading");
  if (loadingElement) {
    loadingElement.remove();
  }

  // Create each news item
  newsData.forEach((newsInfo) => {
    const newsItem = document.createElement("div");
    newsItem.className = "news-item";
    newsItem.setAttribute("data-pdf", newsInfo.pdfUrl || "");

    newsItem.innerHTML = `
      <div class="news-thumbnail">
        <img src="${
          newsInfo.thumbnailUrl || "./thumbnails/default-thumbnail.png"
        }" alt="${newsInfo.title || "Tin tức"}">
        <div class="news-date">${newsInfo.date || "Không rõ ngày"}</div>
      </div>
      <h3 class="news-item-title">${newsInfo.title || "Không có tiêu đề"}</h3>
      <div class="news-read-more">Xem chi tiết</div>
    `;

    // Add click event for PDF viewing
    newsItem.addEventListener("click", function () {
      const pdfUrl = this.getAttribute("data-pdf");
      if (pdfUrl) {
        const pdfFrame = document.getElementById("pdf-frame");
        const pdfModal = document.getElementById("pdf-modal");

        if (pdfFrame && pdfModal) {
          pdfFrame.src = pdfUrl;
          pdfModal.style.display = "block";
        }
      }
    });

    newsGrid.appendChild(newsItem);
  });

  // Set up modal close functionality
  const closeModal = document.querySelector(".close-modal");
  const pdfModal = document.getElementById("pdf-modal");

  if (closeModal && pdfModal) {
    closeModal.addEventListener("click", function () {
      pdfModal.style.display = "none";
      // Reset iframe source to stop PDF from loading in background
      const pdfFrame = document.getElementById("pdf-frame");
      if (pdfFrame) {
        pdfFrame.src = "";
      }
    });

    // Close modal when clicking outside of modal content
    window.addEventListener("click", function (event) {
      if (event.target === pdfModal) {
        pdfModal.style.display = "none";
        const pdfFrame = document.getElementById("pdf-frame");
        if (pdfFrame) {
          pdfFrame.src = "";
        }
      }
    });
  }
}

// Call the fetch function when the DOM is loaded
document.addEventListener("DOMContentLoaded", fetchNewsData);
// END OF NEWS BULLETIN SECTION JS
