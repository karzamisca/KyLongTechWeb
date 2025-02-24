// controllers/pageRoute.js
const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");

router.get("/main", pageController.renderHomePage);

module.exports = router;
