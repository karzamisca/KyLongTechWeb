// Simple JavaScript for navigation highlighting
// components/header/header.js - Better version
document.addEventListener("DOMContentLoaded", function () {
  // Function to initialize the header nav after the header HTML has been loaded
  function initializeHeaderNav() {
    const navItems = document.querySelectorAll(".nav-menu a");

    if (navItems.length === 0) {
      // If header items haven't loaded yet, try again after a short delay
      setTimeout(initializeHeaderNav, 100);
      return;
    }

    navItems.forEach((item) => {
      item.addEventListener("click", function (e) {
        // Only prevent default for same-site navigation if needed
        if (this.getAttribute("href").startsWith("/") && false) {
          // Disabling preventDefault to allow normal navigation
          e.preventDefault();
        }

        // Remove active class from all items
        navItems.forEach((link) => {
          link.classList.remove("active");
        });

        // Add active class to clicked item
        this.classList.add("active");
      });
    });

    // Set active class based on current page URL
    const currentPath = window.location.pathname;

    // Match the current path to the appropriate navigation item
    navItems.forEach((item) => {
      const href = item.getAttribute("href");

      // Check if current path matches this nav item
      if (
        (href === "/" &&
          (currentPath === "/" ||
            currentPath === "/index.html" ||
            currentPath === "")) ||
        (href !== "/" && currentPath.includes(href))
      ) {
        item.classList.add("active");
      }
    });
  }

  // If we're in a page that loads the header via fetch
  if (document.getElementById("header")) {
    // Wait for the header to be fully loaded
    const headerCheckInterval = setInterval(function () {
      if (document.querySelector(".nav-menu")) {
        clearInterval(headerCheckInterval);
        initializeHeaderNav();
      }
    }, 100);
  } else {
    // If header is directly in the HTML
    initializeHeaderNav();
  }
});
