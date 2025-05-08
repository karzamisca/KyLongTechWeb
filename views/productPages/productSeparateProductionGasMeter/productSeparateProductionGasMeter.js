// views/productPages/productSeparateProductionGasMeter/productSeparateProductionGasMeter.js
// Load footer
fetch("components/footer/footer.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("footer").innerHTML = data;
  });

// Set products nav item as active
document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("products")) {
    document.getElementById("products").classList.add("active");
  }
});
