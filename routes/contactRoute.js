// routes/contactRoutes.js
const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

// Contact form submission route - middleware is now integrated in the controller
router.post("/submit", contactController.submitContactForm);

module.exports = router;
