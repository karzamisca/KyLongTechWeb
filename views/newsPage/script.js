// Function to extract and display PDF content with better format preservation
function extractPDFContent(pdfUrl, contentContainer) {
  // Clear previous content
  contentContainer.innerHTML = "";

  // Create loading indicator
  const loadingDiv = document.createElement("div");
  loadingDiv.className = "loading-indicator";
  loadingDiv.innerHTML =
    '<div class="spinner"></div><span>Đang tải nội dung PDF...</span>';
  contentContainer.appendChild(loadingDiv);

  // Check if PDF.js is available
  if (typeof pdfjsLib !== "undefined") {
    // Configure PDF.js
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.14.305/pdf.worker.min.js";

    // Load the PDF document
    pdfjsLib
      .getDocument(pdfUrl)
      .promise.then(function (pdf) {
        // Create container for PDF content
        const pdfContentContainer = document.createElement("div");
        pdfContentContainer.className = "pdf-content-container";

        // Create page navigation
        const navContainer = document.createElement("div");
        navContainer.className = "pdf-navigation";

        const prevButton = document.createElement("button");
        prevButton.textContent = "← Trang trước";
        prevButton.className = "pdf-nav-button";

        const nextButton = document.createElement("button");
        nextButton.textContent = "Trang sau →";
        nextButton.className = "pdf-nav-button";

        const pageIndicator = document.createElement("span");
        pageIndicator.className = "pdf-page-indicator";

        navContainer.appendChild(prevButton);
        navContainer.appendChild(pageIndicator);
        navContainer.appendChild(nextButton);

        // Create download button
        const downloadButton = document.createElement("button");
        downloadButton.textContent = "Tải xuống PDF";
        downloadButton.className = "pdf-download-button";
        downloadButton.addEventListener("click", function () {
          window.open(pdfUrl, "_blank");
        });
        navContainer.appendChild(downloadButton);

        // Add mobile-specific zoom controls
        if (window.innerWidth <= 768) {
          const mobileControls = document.createElement("div");
          mobileControls.className = "mobile-pdf-controls";

          const zoomOutButton = document.createElement("button");
          zoomOutButton.className = "zoom-button";
          zoomOutButton.innerHTML = "-";

          const zoomInButton = document.createElement("button");
          zoomInButton.className = "zoom-button";
          zoomInButton.innerHTML = "+";

          mobileControls.appendChild(zoomOutButton);
          mobileControls.appendChild(zoomInButton);
          navContainer.appendChild(mobileControls);

          // Add zoom functionality (defined later when page is rendered)
          window.mobileZoomButtons = {
            zoomIn: zoomInButton,
            zoomOut: zoomOutButton,
          };
        }

        // Track current page
        let currentPage = 1;
        const pageContainers = [];
        let currentScale = 1;

        // Function to render a page with combined approach
        async function renderPage(pageNum) {
          try {
            const page = await pdf.getPage(pageNum);

            // Create page container if it doesn't exist
            if (!pageContainers[pageNum - 1]) {
              const pageContainer = document.createElement("div");
              pageContainer.className = "pdf-page";
              pageContainer.dataset.pageNum = pageNum;
              pageContainers[pageNum - 1] = pageContainer;

              // Get viewport and scale
              const viewport = page.getViewport({ scale: 1 });
              const containerWidth = contentContainer.clientWidth - 40; // Account for padding

              // Check if we're on a mobile device and adjust scale accordingly
              const isMobile = window.innerWidth <= 768;
              if (isMobile) {
                // Use a higher minimum scale for mobile to ensure readability
                currentScale = Math.max(containerWidth / viewport.width, 1.2);
              } else {
                // For desktop, cap at 1.5x as before
                currentScale = Math.min(containerWidth / viewport.width, 1.5);
              }

              const scaledViewport = page.getViewport({ scale: currentScale });

              // Create canvas for graphics/images/backgrounds
              const canvas = document.createElement("canvas");
              const context = canvas.getContext("2d");
              canvas.width = scaledViewport.width;
              canvas.height = scaledViewport.height;
              canvas.style.position = "absolute";
              canvas.style.zIndex = "1";

              // Create text layer container
              const textLayerDiv = document.createElement("div");
              textLayerDiv.className = "pdf-text-layer";
              textLayerDiv.style.position = "absolute";
              textLayerDiv.style.left = "0";
              textLayerDiv.style.top = "0";
              textLayerDiv.style.right = "0";
              textLayerDiv.style.bottom = "0";
              textLayerDiv.style.zIndex = "2";

              // Wrapper to handle positioning
              const pageWrapper = document.createElement("div");
              pageWrapper.className = "pdf-page-wrapper";
              pageWrapper.style.position = "relative";
              pageWrapper.style.width = `${scaledViewport.width}px`;
              pageWrapper.style.height = `${scaledViewport.height}px`;

              pageWrapper.appendChild(canvas);
              pageWrapper.appendChild(textLayerDiv);
              pageContainer.appendChild(pageWrapper);

              // Render PDF page on canvas
              const renderContext = {
                canvasContext: context,
                viewport: scaledViewport,
              };

              // Extract text content
              const textContent = await page.getTextContent();

              // Render page visually on canvas
              await page.render(renderContext).promise;

              // Process text layers
              pdfjsLib.renderTextLayer({
                textContent: textContent,
                container: textLayerDiv,
                viewport: scaledViewport,
                textDivs: [],
              });

              // Add pinch-to-zoom functionality for touch devices
              if ("ontouchstart" in window) {
                let startDist = 0;
                let initialScale = currentScale;

                pageWrapper.addEventListener("touchstart", function (e) {
                  if (e.touches.length === 2) {
                    e.preventDefault();
                    startDist = Math.hypot(
                      e.touches[0].pageX - e.touches[1].pageX,
                      e.touches[0].pageY - e.touches[1].pageY
                    );

                    // Get current scale if transform is already applied
                    const transform = getComputedStyle(pageWrapper).transform;
                    if (transform !== "none") {
                      const matrix = new DOMMatrix(transform);
                      initialScale = matrix.a;
                    } else {
                      initialScale = currentScale;
                    }
                  }
                });

                pageWrapper.addEventListener("touchmove", function (e) {
                  if (e.touches.length === 2) {
                    e.preventDefault(); // Prevent default pinch behavior

                    const dist = Math.hypot(
                      e.touches[0].pageX - e.touches[1].pageX,
                      e.touches[0].pageY - e.touches[1].pageY
                    );

                    const delta = dist - startDist;
                    if (Math.abs(delta) > 5) {
                      // Threshold to avoid jitter
                      const newScale = initialScale * (dist / startDist);
                      // Limit the scale between reasonable bounds
                      if (newScale >= 1 && newScale <= 3) {
                        pageWrapper.style.transform = `scale(${newScale})`;
                        pageWrapper.style.transformOrigin = "top center";
                        currentScale = newScale;
                      }
                    }
                  }
                });

                pageWrapper.addEventListener("touchend", function (e) {
                  // Reset initialScale for the next pinch
                  initialScale = currentScale;
                });
              }

              // Setup zoom buttons for mobile
              if (window.mobileZoomButtons) {
                window.mobileZoomButtons.zoomIn.addEventListener(
                  "click",
                  function () {
                    const newScale = currentScale + 0.2;
                    if (newScale <= 3) {
                      currentScale = newScale;
                      pageWrapper.style.transform = `scale(${newScale})`;
                      pageWrapper.style.transformOrigin = "top center";
                    }
                  }
                );

                window.mobileZoomButtons.zoomOut.addEventListener(
                  "click",
                  function () {
                    const newScale = currentScale - 0.2;
                    if (newScale >= 1) {
                      currentScale = newScale;
                      pageWrapper.style.transform = `scale(${newScale})`;
                      pageWrapper.style.transformOrigin = "top center";
                    }
                  }
                );
              }
            }

            return pageContainers[pageNum - 1];
          } catch (error) {
            console.error("Error rendering page:", error);
            const errorDiv = document.createElement("div");
            errorDiv.className = "pdf-error";
            errorDiv.textContent = "Không thể hiển thị trang này";
            return errorDiv;
          }
        }

        // Function to display a specific page
        async function displayPage(pageNum) {
          // Hide all pages
          pageContainers.forEach((container) => {
            if (container) container.style.display = "none";
          });

          // Get or render the current page
          const pageElement = await renderPage(pageNum);
          pageElement.style.display = "block";

          // Make sure the page container is empty before adding
          pdfContentContainer.innerHTML = "";
          pdfContentContainer.appendChild(pageElement);

          // Update page indicator
          pageIndicator.textContent = `Trang ${pageNum}/${pdf.numPages}`;

          // Enable/disable navigation buttons
          prevButton.disabled = pageNum <= 1;
          nextButton.disabled = pageNum >= pdf.numPages;
        }

        // Previous page button
        prevButton.addEventListener("click", () => {
          if (currentPage > 1) {
            currentPage--;
            displayPage(currentPage);
          }
        });

        // Next page button
        nextButton.addEventListener("click", () => {
          if (currentPage < pdf.numPages) {
            currentPage++;
            displayPage(currentPage);
          }
        });

        // Remove loading indicator and set up content area
        contentContainer.innerHTML = "";
        contentContainer.appendChild(navContainer);
        contentContainer.appendChild(pdfContentContainer);

        // Display first page
        displayPage(currentPage);
      })
      .catch(function (error) {
        console.error("Error loading PDF:", error);
        displayFallbackMessage(contentContainer);
      });
  } else {
    displayFallbackMessage(contentContainer);
  }
}

// Fallback message if PDF cannot be loaded
function displayFallbackMessage(container) {
  container.innerHTML = "";
  const messageDiv = document.createElement("div");
  messageDiv.className = "pdf-error-message";
  messageDiv.innerHTML = `
      <h3>Không thể hiển thị nội dung PDF</h3>
      <p>Vui lòng tải xuống tệp PDF hoặc thử lại sau.</p>
      <button class="retry-button">Thử lại</button>
    `;

  // Add retry button functionality
  container.appendChild(messageDiv);
  const retryButton = messageDiv.querySelector(".retry-button");
  retryButton.addEventListener("click", function () {
    // Get current active item and trigger click
    const activeItem = document.querySelector(".news-item.active");
    if (activeItem) {
      activeItem.click();
    }
  });
}

// Function to handle news selection events
function setupNewsSelection() {
  const newsDetail = document.getElementById("news-detail");
  const noSelection = document.getElementById("no-selection");
  const detailTitle = document.getElementById("detail-title");
  const detailDate = document.getElementById("detail-date");
  const detailContent = document.getElementById("news-detail-content");

  // Add click event to all news items
  document.querySelectorAll(".news-item").forEach((item) => {
    item.addEventListener("click", function () {
      // Remove active class from all items
      document.querySelectorAll(".news-item").forEach((el) => {
        el.classList.remove("active");
      });

      // Add active class to current item
      this.classList.add("active");

      const pdfUrl = this.dataset.pdf;
      const title = this.dataset.title;
      const date = this.dataset.date;

      // Update detail view
      detailTitle.textContent = title;
      detailDate.textContent = `Ngày đăng: ${date}`;

      // Extract and display PDF content
      if (pdfUrl) {
        extractPDFContent(pdfUrl, detailContent);
      }

      // Show detail view, hide empty state
      noSelection.style.display = "none";
      newsDetail.style.display = "flex";
    });
  });
}

// Function to fetch news data from a JSON file
function fetchNewsData() {
  fetch("../homePage/news-data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      // Clear existing news list
      const newsList = document.getElementById("news-list");
      newsList.innerHTML = "";

      // Create and append news items
      data.forEach((item) => {
        const newsItemElement = document.createElement("div");
        newsItemElement.className = "news-item";
        newsItemElement.dataset.pdf = item.pdfUrl;
        newsItemElement.dataset.title = item.title;
        newsItemElement.dataset.date = item.date;
        newsItemElement.innerHTML = `
            <img src="${item.thumbnailUrl}" alt="${item.title}" class="news-thumbnail">
            <div class="news-info">
              <h3 class="news-item-title">${item.title}</h3>
              <p class="news-date">Ngày đăng: ${item.date}</p>
            </div>
          `;
        newsList.appendChild(newsItemElement);
      });

      // Set up event listeners for the new items
      setupNewsSelection();
    })
    .catch((error) => {
      console.error("Error fetching or processing news data:", error);

      // Display error message to user
      const newsList = document.getElementById("news-list");
      newsList.innerHTML = `
          <div class="error-message">
            <h3>Không thể tải dữ liệu tin tức</h3>
            <p>Vui lòng thử lại sau. Chi tiết lỗi: ${error.message}</p>
          </div>
        `;
    });
}

// Handle window resize events for responsive behavior
window.addEventListener("resize", function () {
  // If there's a currently displayed PDF, reload it to adjust to new size
  const activeItem = document.querySelector(".news-item.active");
  if (activeItem) {
    // Small delay to ensure the resize is complete
    setTimeout(() => {
      activeItem.click();
    }, 300);
  }
});

// Script for loading PDF.js library with text layer support
function loadPDFLibrary() {
  return Promise.all([
    new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.14.305/pdf.min.js";
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    }),
    new Promise((resolve, reject) => {
      // This library helps with text layer rendering
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.14.305/pdf.worker.min.js";
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    }),
  ]);
}

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
  // Load PDF.js libraries before fetching news
  loadPDFLibrary()
    .then(() => {
      fetchNewsData();
    })
    .catch((error) => {
      console.error("Could not load PDF.js libraries", error);
      fetchNewsData(); // Still attempt to fetch data
    });
});
