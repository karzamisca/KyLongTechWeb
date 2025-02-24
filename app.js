// app.js
const express = require("express");
const path = require("path");
const pageRoute = require("./routes/pageRoute");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static("views/firstPage"));

// Routes
app.use("/", pageRoute);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
