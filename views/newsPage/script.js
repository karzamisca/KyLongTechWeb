//// NEWS FILTER JS
document.addEventListener("DOMContentLoaded", function () {
  // Get all filter buttons and news cards
  const filterButtons = document.querySelectorAll(".filter-btn");
  const newsCards = document.querySelectorAll(".news-card");

  // Add click event listeners to each filter button
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // Get the category to filter by (button text)
      const filterCategory = this.textContent.trim();

      // Show all news cards if "Tất Cả" is selected, otherwise filter
      if (filterCategory === "Tất Cả") {
        newsCards.forEach((card) => {
          card.style.display = "block";
        });
      } else {
        // Filter news cards by category
        newsCards.forEach((card) => {
          const cardCategory = card
            .querySelector(".news-category")
            .textContent.trim();
          if (cardCategory === filterCategory) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
      }
    });
  });

  // Add click event listeners to pagination buttons
  const pageButtons = document.querySelectorAll(".page-btn");
  pageButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all page buttons
      pageButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // In a real application, you would load different news items here
      // For demonstration, we'll just scroll to top
      window.scrollTo({
        top: document.querySelector(".news-container").offsetTop - 100,
        behavior: "smooth",
      });
    });
  });
});
//// END OF NEWS FILTER JS

//// PAGINATION JS
document.addEventListener("DOMContentLoaded", function () {
  // Get all filter buttons and news cards
  const filterButtons = document.querySelectorAll(".filter-btn");
  const newsCards = document.querySelectorAll(".news-card");
  const paginationContainer = document.querySelector(".news-pagination");

  // Pagination settings
  const itemsPerPage = 6;
  let currentPage = 1;
  let filteredItems = [...newsCards]; // Start with all items

  // Initialize page
  function initializePage() {
    // Clear existing pagination
    paginationContainer.innerHTML = "";

    // Show items for current page and category filter
    updateDisplay();

    // Create pagination buttons
    createPaginationButtons();
  }

  // Update which items are displayed based on current page and filters
  function updateDisplay() {
    // Hide all news items first
    newsCards.forEach((card) => {
      card.style.display = "none";
    });

    // Show only the items for current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    filteredItems.slice(startIndex, endIndex).forEach((card) => {
      card.style.display = "block";
    });

    // Show "no results" message if needed
    const noResultsElement = document.querySelector(".no-results");
    if (noResultsElement) {
      if (filteredItems.length === 0) {
        noResultsElement.style.display = "block";
      } else {
        noResultsElement.style.display = "none";
      }
    }
  }

  // Create pagination buttons
  function createPaginationButtons() {
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    // Previous button
    if (currentPage > 1) {
      const prevBtn = document.createElement("button");
      prevBtn.className = "page-btn";
      prevBtn.innerHTML = "&lt;"; // < symbol
      prevBtn.addEventListener("click", () => {
        currentPage--;
        updatePage();
      });
      paginationContainer.appendChild(prevBtn);
    }

    // Page number buttons
    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = document.createElement("button");
      pageBtn.className = "page-btn";
      if (i === currentPage) {
        pageBtn.classList.add("active");
      }
      pageBtn.textContent = i;
      pageBtn.addEventListener("click", () => {
        currentPage = i;
        updatePage();
      });
      paginationContainer.appendChild(pageBtn);
    }

    // Next button
    if (currentPage < totalPages) {
      const nextBtn = document.createElement("button");
      nextBtn.className = "page-btn";
      nextBtn.innerHTML = "&gt;"; // > symbol
      nextBtn.addEventListener("click", () => {
        currentPage++;
        updatePage();
      });
      paginationContainer.appendChild(nextBtn);
    }

    // If no pages, show a disabled "1" button
    if (totalPages === 0) {
      const emptyBtn = document.createElement("button");
      emptyBtn.className = "page-btn active";
      emptyBtn.textContent = "1";
      emptyBtn.disabled = true;
      paginationContainer.appendChild(emptyBtn);
    }
  }

  // Update the page after changing page or filter
  function updatePage() {
    updateDisplay();

    // Recreate pagination buttons
    paginationContainer.innerHTML = "";
    createPaginationButtons();

    // Scroll to top of news section
    window.scrollTo({
      top: document.querySelector(".news-container").offsetTop - 100,
      behavior: "smooth",
    });
  }

  // Add click event listeners to each filter button
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      this.classList.add("active");

      // Get the category to filter by (button text)
      const filterCategory = this.textContent.trim();

      // Filter the items based on category
      if (filterCategory === "Tất Cả") {
        filteredItems = [...newsCards];
      } else {
        filteredItems = [...newsCards].filter((card) => {
          const cardCategory = card
            .querySelector(".news-category")
            .textContent.trim();
          return cardCategory === filterCategory;
        });
      }

      // Reset to first page when filter changes
      currentPage = 1;
      updatePage();
    });
  });

  // Initialize the page when the DOM is loaded
  initializePage();
});
//// PAGINATION JS
