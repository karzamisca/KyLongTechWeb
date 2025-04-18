////views\newsPages\newsArticle2\newsArticle2.js
// Load header
fetch("components/header/header.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("header").innerHTML = data;
  });

// Load footer
fetch("components/footer/footer.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("footer").innerHTML = data;
  });
