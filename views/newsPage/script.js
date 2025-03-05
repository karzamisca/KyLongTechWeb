// Function to safely load PDFs
function loadPDF(pdfUrl, canvasContainer) {
  // Clear previous content
  canvasContainer.innerHTML = "";

  // Check if PDF.js is available
  if (typeof pdfjsLib !== "undefined") {
    // Configure PDF.js
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.14.305/pdf.worker.min.js";

    // Render PDF on canvas
    pdfjsLib
      .getDocument(pdfUrl)
      .promise.then(function (pdf) {
        // Create a container for page navigation
        const navContainer = document.createElement("div");
        navContainer.className = "pdf-navigation";
        navContainer.style.cssText = `
          display: flex;
          justify-content: center;
          margin-bottom: 10px;
        `;

        // Create page navigation buttons
        const prevButton = document.createElement("button");
        prevButton.textContent = "← Trang trước";
        prevButton.style.marginRight = "10px";

        const nextButton = document.createElement("button");
        nextButton.textContent = "Trang sau →";

        const pageIndicator = document.createElement("span");
        pageIndicator.style.margin = "0 15px";

        navContainer.appendChild(prevButton);
        navContainer.appendChild(pageIndicator);
        navContainer.appendChild(nextButton);

        // Track current page
        let currentPage = 1;

        // Render a specific page
        function renderPage(pageNum) {
          // Remove existing canvases
          const existingCanvases = canvasContainer.querySelectorAll("canvas");
          existingCanvases.forEach((canvas) => canvas.remove());

          pdf.getPage(pageNum).then(function (page) {
            // Get the viewport of the page
            const containerWidth = canvasContainer.clientWidth;
            const viewport = page.getViewport({ scale: 1 });

            // Scale to full width
            const scale = containerWidth / viewport.width;
            const scaledViewport = page.getViewport({ scale: scale });

            // Create canvas
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            canvas.width = scaledViewport.width;
            canvas.height = scaledViewport.height;
            canvas.style.maxWidth = "100%";
            canvas.style.display = "block";
            canvas.style.margin = "0 auto";

            // Render PDF page
            const renderContext = {
              canvasContext: context,
              viewport: scaledViewport,
            };
            page.render(renderContext);

            // Add canvas to container
            canvasContainer.appendChild(canvas);

            // Update page indicator
            pageIndicator.textContent = `Trang ${pageNum}/${pdf.numPages}`;

            // Enable/disable navigation buttons
            prevButton.disabled = pageNum <= 1;
            nextButton.disabled = pageNum >= pdf.numPages;
          });
        }

        // Initial render
        renderPage(currentPage);

        // Previous page button
        prevButton.addEventListener("click", () => {
          if (currentPage > 1) {
            currentPage--;
            renderPage(currentPage);
          }
        });

        // Next page button
        nextButton.addEventListener("click", () => {
          if (currentPage < pdf.numPages) {
            currentPage++;
            renderPage(currentPage);
          }
        });

        // Add navigation to container before canvases
        canvasContainer.insertBefore(navContainer, canvasContainer.firstChild);
      })
      .catch(function (error) {
        console.error("Error loading PDF:", error);
        displayFallbackMessage(canvasContainer);
      });
  } else {
    displayFallbackMessage(canvasContainer);
  }
}

// Fallback message if PDF cannot be loaded
function displayFallbackMessage(container) {
  container.innerHTML = "";
  const messageDiv = document.createElement("div");
  messageDiv.style.cssText = `
      text-align: center;
      padding: 30px;
      color: #e84e0f;
      border: 1px solid #e0e0e0;
    `;
  messageDiv.innerHTML = `
      <h3>Không thể hiển thị PDF</h3>
      <p>Vui lòng tải xuống tệp PDF hoặc thử lại sau.</p>
    `;
  container.appendChild(messageDiv);
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

      // Load PDF on canvas
      if (pdfUrl) {
        loadPDF(pdfUrl, detailContent);
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
          <div class="error-message" style="text-align: center; padding: 30px; color: #e84e0f;">
            <h3>Không thể tải dữ liệu tin tức</h3>
            <p>Vui lòng thử lại sau. Chi tiết lỗi: ${error.message}</p>
          </div>
        `;
    });
}

// Script for loading PDF.js library
function loadPDFLibrary() {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.14.305/pdf.min.js";
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
  // Load PDF.js library before fetching news
  loadPDFLibrary()
    .then(() => {
      fetchNewsData();
    })
    .catch((error) => {
      console.error("Could not load PDF.js library", error);
      fetchNewsData(); // Still attempt to fetch data
    });
});
