// controllers/pageController.js
const path = require("path");

exports.renderSiteMap = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/sitemap.xml"));
};

exports.renderRobotsTXT = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/robots.txt"));
};

exports.renderHomePage = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/homePage/index.html"));
};

exports.renderContactPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/contactPage/index.html"));
};

exports.renderNewsPage = (req, res) => {
  res.sendFile(
    path.join(__dirname, "../views/newsPage/newsMain/newsMain.html")
  );
};

exports.renderAboutPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/aboutPage/index.html"));
};

exports.renderNewsArticle1 = (req, res) => {
  res.sendFile(
    path.join(__dirname, "../views/newsPage/newsArticle1/newsArticle1.html")
  );
};

exports.renderNewsArticle2 = (req, res) => {
  res.sendFile(
    path.join(__dirname, "../views/newsPage/newsArticle2/newsArticle2.html")
  );
};
