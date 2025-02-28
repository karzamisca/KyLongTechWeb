// app.js
const express = require("express");
const path = require("path");
const pageRoute = require("./routes/pageRoute");
const bodyParser = require("body-parser");
const cron = require("node-cron");
const axios = require("axios");
const authRoute = require("./routes/authRoute");
const fileRoute = require("./routes/fileRoute");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authMiddleware = require("./middlewares/authMiddleware"); // JWT middleware
require("dotenv").config();

const app = express();
connectDB();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("views/homePage"));
app.use(
  "/thumbnails",
  express.static(path.join(__dirname, "views/homePage/thumbnails"))
);
app.use("/pdfs", express.static(path.join(__dirname, "views/homePage/pdf")));
// Routes
app.use("/", authRoute);
app.use("/", pageRoute);
app.use("/", authMiddleware, fileRoute);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Cron job to ping the server every 5 minutes to keep it warm
cron.schedule("*/5 * * * *", async () => {
  try {
    const serverUrl =
      `https://kylongtech.glitch.me` || `http://localhost:${PORT}`;
    await axios.get(serverUrl);
  } catch (error) {
    console.error("Failed to ping server:", error.message);
  }
});
