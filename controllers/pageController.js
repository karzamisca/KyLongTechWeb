// controllers/pageController.js
const path = require("path");

exports.renderHomePage = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/homePage/index.html"));
};

exports.renderContactPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/contactPage/index.html"));
};
