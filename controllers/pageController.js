// controllers/pageController.js
const path = require("path");
const fs = require("fs");
const marked = require("marked"); // Popular Markdown parser

exports.renderSiteMap = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/sitemap.xml"));
};

exports.renderRobotsTXT = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/robots.txt"));
};

exports.renderPrivacyPolicy = (req, res) => {
  const filePath = path.join(__dirname, "../views/privacyPolicy.md");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error loading privacy policy");
    }

    const htmlContent = marked.parse(data);
    res.send(htmlContent); // Or render with a template
  });
};

exports.renderTermsOfService = (req, res) => {
  const filePath = path.join(__dirname, "../views/termsOfService.md");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error loading terms of service");
    }

    const htmlContent = marked.parse(data);
    res.send(htmlContent); // Or render with a template
  });
};

exports.renderHomePage = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/homePages/homeMain.html"));
};

exports.renderAboutPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/aboutPages/aboutMain.html"));
};

exports.renderContactPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/contactPages/contactMain.html"));
};

exports.renderProductPage = (req, res) => {
  res.sendFile(
    path.join(__dirname, "../views/productPages/productMain/productMain.html")
  );
};
exports.renderProductSeparateProductionGasMeter = (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "../views/productPages/productSeparateProductionGasMeter/productSeparateProductionGasMeter.html"
    )
  );
};
exports.renderProductSeparateProductionPressureRegulatorValve = (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "../views/productPages/productSeparateProductionPressureRegulatorValve/productSeparateProductionPressureRegulatorValve.html"
    )
  );
};
exports.renderProductSeparateProductionPRU = (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "../views/productPages/productSeparateProductionPRU/productSeparateProductionPRU.html"
    )
  );
};
exports.renderProductSeparateProductionVaporizer = (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "../views/productPages/productSeparateProductionVaporizer/productSeparateProductionVaporizer.html"
    )
  );
};
exports.renderProductSeparateCommerceLNG = (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "../views/productPages/productSeparateCommerceLNG/productSeparateCommerceLNG.html"
    )
  );
};
exports.renderProductSeparateCommercePNG = (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "../views/productPages/productSeparateCommercePNG/productSeparateCommercePNG.html"
    )
  );
};

exports.renderServicePages = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/servicePages/serviceMain.html"));
};

exports.renderNewsPage = (req, res) => {
  res.sendFile(
    path.join(__dirname, "../views/newsPages/newsMain/newsMain.html")
  );
};
exports.renderNewsArticle1 = (req, res) => {
  res.sendFile(
    path.join(__dirname, "../views/newsPages/newsArticle1/newsArticle1.html")
  );
};
exports.renderNewsArticle2 = (req, res) => {
  res.sendFile(
    path.join(__dirname, "../views/newsPages/newsArticle2/newsArticle2.html")
  );
};
