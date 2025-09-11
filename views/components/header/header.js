//views/components/header/header.js
document.addEventListener("DOMContentLoaded", function () {
  // Sidebar functionality
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const floatingMenuBtn = document.getElementById("floatingMenuBtn");
  const closeSidebarBtn = document.querySelector(".close-sidebar");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebarOverlay");

  // Open sidebar
  function openSidebar() {
    sidebar.classList.add("open");
    overlay.style.display = "block";
    document.body.style.overflow = "hidden"; // Prevent scrolling
  }

  mobileMenuBtn.addEventListener("click", openSidebar);
  floatingMenuBtn.addEventListener("click", openSidebar);

  // Close sidebar
  function closeSidebar() {
    sidebar.classList.remove("open");
    overlay.style.display = "none";
    document.body.style.overflow = ""; // Enable scrolling
  }

  closeSidebarBtn.addEventListener("click", closeSidebar);
  overlay.addEventListener("click", closeSidebar);

  // Close sidebar when a nav link is clicked
  const sidebarLinks = document.querySelectorAll(".sidebar-nav .nav-link");
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", closeSidebar);
  });

  // Banner functionality
  const slides = document.querySelectorAll(".banner-slide");
  const indicators = document.querySelectorAll(".banner-indicator");
  const prevBtn = document.getElementById("prevBanner");
  const nextBtn = document.getElementById("nextBanner");
  let currentSlide = 0;

  // Function to show a specific slide
  function showSlide(index) {
    // Hide all slides
    slides.forEach((slide) => slide.classList.remove("active"));
    indicators.forEach((indicator) => indicator.classList.remove("active"));

    // Ensure index is within bounds
    if (index < 0) {
      currentSlide = slides.length - 1;
    } else if (index >= slides.length) {
      currentSlide = 0;
    } else {
      currentSlide = index;
    }

    // Show the current slide
    slides[currentSlide].classList.add("active");
    indicators[currentSlide].classList.add("active");
  }

  // Event listeners for navigation buttons
  prevBtn.addEventListener("click", () => {
    showSlide(currentSlide - 1);
  });

  nextBtn.addEventListener("click", () => {
    showSlide(currentSlide + 1);
  });

  // Event listeners for indicator dots
  indicators.forEach((indicator) => {
    indicator.addEventListener("click", () => {
      const index = parseInt(indicator.getAttribute("data-index"));
      showSlide(index);
    });
  });

  // Hide floating button when sidebar is open
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.attributeName === "class") {
        if (sidebar.classList.contains("open")) {
          floatingMenuBtn.style.display = "none";
        } else {
          floatingMenuBtn.style.display = "flex";
        }
      }
    });
  });

  observer.observe(sidebar, {
    attributes: true,
    attributeFilter: ["class"],
  });
});
