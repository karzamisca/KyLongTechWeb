// controllers/pageController.js
const path = require("path");

exports.renderSiteMap = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/sitemap.xml"));
};

exports.renderRobotsTXT = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/robots.txt"));
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
  res.sendFile(path.join(__dirname, "../views/productPages/productMain.html"));
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
