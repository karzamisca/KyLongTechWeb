////views/productPages/productMain/productMain.js
// Load footer
fetch("components/footer/footer.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("footer").innerHTML = data;
  });

// Product page specific JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Tab functionality for product categories
  const categoryTabs = document.querySelectorAll(".category-tab");
  const categoryContents = document.querySelectorAll(".category-content");

  categoryTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      // Remove active class from all tabs and contents
      categoryTabs.forEach((t) => t.classList.remove("active"));
      categoryContents.forEach((c) => c.classList.remove("active"));

      // Add active class to clicked tab
      this.classList.add("active");

      // Show corresponding content
      const categoryId = this.getAttribute("data-category");
      document.getElementById(categoryId).classList.add("active");

      // Update URL hash without jumping
      history.pushState(null, null, `#${categoryId}`);
    });
  });

  // Handle hash navigation from footer or direct links
  function activateTabByHash() {
    const hash = window.location.hash.substring(1); // Remove the #
    if (hash) {
      // Find the tab with matching data-category
      const tab = document.querySelector(
        `.category-tab[data-category="${hash}"]`
      );
      if (tab) {
        // Remove active class from all tabs and contents
        categoryTabs.forEach((t) => t.classList.remove("active"));
        categoryContents.forEach((c) => c.classList.remove("active"));

        // Add active class to the appropriate tab and content
        tab.classList.add("active");
        document.getElementById(hash).classList.add("active");
      }
    }
  }

  // Check hash on page load
  activateTabByHash();

  // Listen for hash changes
  window.addEventListener("hashchange", activateTabByHash);

  // Set products nav item as active
  if (document.getElementById("products")) {
    document.getElementById("products").classList.add("active");
  }
});
