// routes/authRoute.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../models/User");

// Login route
router.get("/login", (req, res) => {
  res.sendFile("login.html", { root: "./views" }); // Serve the login page
});

// Post request for login
router.post("/login", authController.login);

// Logout route
router.get("/logout", authController.logout);

router.post("/changePassword", authMiddleware, authController.changePassword);
router.get("/changePassword", authMiddleware, (req, res) => {
  res.sendFile("changePassword.html", { root: "./views" });
});

module.exports = router;
