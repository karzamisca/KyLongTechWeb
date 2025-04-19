//// views\productPage\productMain.js
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
    });
  });

  // Set products nav item as active
  document.getElementById("products").classList.add("active");
});
