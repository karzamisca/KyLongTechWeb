////views\components\header\header.js
// This script automatically highlights the active navigation link
fetch("components/header/header.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("header").innerHTML = data;

    // After header is loaded, run the navigation highlighting code
  });
