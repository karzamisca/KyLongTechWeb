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

        // Track current page
        let currentPage = 1;
        const pageContainers = [];

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
              const scale = Math.min(containerWidth / viewport.width, 1.5); // Cap at 1.5x
              const scaledViewport = page.getViewport({ scale });

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
