////views\components\header\header.js
document.addEventListener("DOMContentLoaded", function () {
  // Use MutationObserver instead of polling intervals
  const headerEl = document.getElementById("header");

  if (headerEl) {
    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(".nav-menu")) {
        observer.disconnect();
        initializeHeaderNav();
      }
    });

    observer.observe(headerEl, { childList: true, subtree: true });
  } else {
    // Direct initialization if header is already in HTML
    initializeHeaderNav();
  }

  function initializeHeaderNav() {
    const navItems = document.querySelectorAll(".nav-menu a");
    const currentPath = window.location.pathname;

    navItems.forEach((item) => {
      // Add event listeners
      item.addEventListener("click", function () {
        navItems.forEach((link) => link.classList.remove("active"));
        this.classList.add("active");
      });

      // Set active class based on current path
      const href = item.getAttribute("href");
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
});
