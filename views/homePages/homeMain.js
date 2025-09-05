//// views\homePage\homeMain.js
// Load footer
fetch("components/footer/footer.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("footer").innerHTML = data;
  });

// NEWS BULLETIN SECTION JS
document.addEventListener("DOMContentLoaded", () => {
  const newsItems = document.querySelectorAll(".news-item");

  // Add click event to navigate to article page for each news item
  newsItems.forEach((newsItem) => {
    newsItem.addEventListener("click", () => {
      const articleUrl = newsItem.getAttribute("data-article-url");
      if (articleUrl) {
        window.location.href = articleUrl;
      }
    });
  });
});
// END OF NEWS BULLETIN SECTION JS
