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
      detailContent.src = pdfUrl;

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

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
  // Use fetchNewsData for production with real JSON data
  fetchNewsData();
});
