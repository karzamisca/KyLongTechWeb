// controllers/pageRoute.js
const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");

router.get("/sitemap.xml", pageController.renderSiteMap);
router.get("/robots.txt", pageController.renderRobotsTXT);
router.get("/", pageController.renderHomePage);
router.get("/lien-he", pageController.renderContactPage);
router.get("/aboutPage", pageController.renderAboutPage);
router.get("/newsMain", pageController.renderNewsPage);
router.get("/newsArticle1", pageController.renderNewsArticle1);
router.get("/newsArticle2", pageController.renderNewsArticle2);

module.exports = router;
