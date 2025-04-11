// app.js
const express = require("express");
const pageRoute = require("./routes/pageRoute");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const fs = require("fs");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "views")));
app.use(cookieParser()); // Use cookie-parser to parse cookies
app.use(express.json());

// Routes
app.use("/", pageRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
