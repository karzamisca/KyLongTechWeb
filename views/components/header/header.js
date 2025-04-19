////views\components\header\header.js
// This script automatically highlights the active navigation link
fetch("components/header/header.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("header").innerHTML = data;

    // After header is loaded, run the navigation highlighting code
    highlightActiveNavLink();
  });

// Navigation highlighting function
function highlightActiveNavLink() {
  // Get current page path
  const currentPath = window.location.pathname;

  // Get all navigation links
  const navLinks = document.querySelectorAll(".nav-menu a");

  // Loop through each link
  navLinks.forEach((link) => {
    // Get the href attribute
    const linkPath = link.getAttribute("href");

    // Check if current path matches the link's href
    // We also need to handle the home page case specifically
    if (
      currentPath === linkPath ||
      (currentPath === "/" && linkPath === "/") ||
      (currentPath.endsWith(linkPath) && linkPath !== "/") ||
      (currentPath.includes(linkPath) && linkPath !== "/")
    ) {
      // Add active class to highlight the link
      link.classList.add("active");
    } else {
      // Remove active class if it exists
      link.classList.remove("active");
    }
  });
}
