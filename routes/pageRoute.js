// controllers/pageRoute.js
const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");

router.get("/sitemap.xml", pageController.renderSiteMap);

router.get("/robots.txt", pageController.renderRobotsTXT);

router.get("/privacy-policy", pageController.renderPrivacyPolicy);

router.get("/terms-of-service", pageController.renderTermsOfService);

router.get("/", pageController.renderHomePage);

router.get("/lien-he", pageController.renderContactPage);

router.get("/aboutMain", pageController.renderAboutPage);

router.get("/productMain", pageController.renderProductPage);
router.get(
  "/productSeparateProductionGasMeter",
  pageController.renderProductSeparateProductionGasMeter
);
router.get(
  "/productSeparateProductionPressureRegulatorValve",
  pageController.renderProductSeparateProductionPressureRegulatorValve
);
router.get(
  "/productSeparateProductionPRU",
  pageController.renderProductSeparateProductionPRU
);
router.get(
  "/productSeparateProductionVaporizer",
  pageController.renderProductSeparateProductionVaporizer
);
router.get(
  "/productSeparateCommerceLNG",
  pageController.renderProductSeparateCommerceLNG
);
router.get(
  "/productSeparateCommercePNG",
  pageController.renderProductSeparateCommercePNG
);

router.get("/serviceMain", pageController.renderServicePages);

router.get("/newsMain", pageController.renderNewsPage);
router.get("/newsArticle1", pageController.renderNewsArticle1);
router.get("/newsArticle2", pageController.renderNewsArticle2);

module.exports = router;
