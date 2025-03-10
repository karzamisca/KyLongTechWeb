// controllers/pageRoute.js
const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");

router.get("/sitemap.xml", pageController.renderSiteMap);
router.get("/", pageController.renderHomePage);
router.get("/lien-he", pageController.renderContactPage);
router.get("/newsPage", pageController.renderNewsPage);
router.get("/newsArticle1", pageController.renderNewsArticle1);

module.exports = router;
