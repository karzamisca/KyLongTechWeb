// controllers/fileController.js
const fs = require("fs");
const path = require("path");

const thumbnailsDir = path.join(__dirname, "../views/homePage/thumbnails");
const pdfsDir = path.join(__dirname, "../views/homePage/pdf");
const newsDataPath = path.join(__dirname, "../views/homePage/news-data.json");

// Handle thumbnail uploads
exports.uploadThumbnail = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file was uploaded" });
    }

    return res.status(200).json({
      success: true,
      message: "Thumbnail uploaded successfully",
      file: {
        filename: req.file.filename,
        path: `/thumbnails/${req.file.filename}`,
        size: req.file.size,
      },
    });
  } catch (error) {
    console.error("Error uploading thumbnail:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error uploading thumbnail" });
  }
};

// Handle PDF uploads
exports.uploadPdf = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file was uploaded" });
    }

    return res.status(200).json({
      success: true,
      message: "PDF uploaded successfully",
      file: {
        filename: req.file.filename,
        path: `/pdfs/${req.file.filename}`,
        size: req.file.size,
      },
    });
  } catch (error) {
    console.error("Error uploading PDF:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error uploading PDF" });
  }
};

// Get current thumbnails
exports.getCurrentThumbnails = async (req, res) => {
  try {
    const files = fs
      .readdirSync(thumbnailsDir)
      .filter(
        (file) =>
          file.startsWith("news-thumbnail") &&
          (file.endsWith(".png") ||
            file.endsWith(".jpg") ||
            file.endsWith(".jpeg"))
      )
      .map((file) => ({
        filename: file,
        path: `/thumbnails/${file}`,
        lastModified: fs.statSync(path.join(thumbnailsDir, file)).mtime,
      }));

    return res.status(200).json({ success: true, files });
  } catch (error) {
    console.error("Error getting thumbnails:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error retrieving thumbnails" });
  }
};

// Get current PDFs
exports.getCurrentPdfs = async (req, res) => {
  try {
    const files = fs
      .readdirSync(pdfsDir)
      .filter((file) => file.startsWith("news-pdf") && file.endsWith(".pdf"))
      .map((file) => ({
        filename: file,
        path: `/pdfs/${file}`,
        lastModified: fs.statSync(path.join(pdfsDir, file)).mtime,
      }));

    return res.status(200).json({ success: true, files });
  } catch (error) {
    console.error("Error getting PDFs:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error retrieving PDFs" });
  }
};

// Update news data
exports.updateNewsData = async (req, res) => {
  try {
    const { position, title, date } = req.body;

    // Read the existing news data
    const newsData = JSON.parse(fs.readFileSync(newsDataPath, "utf8"));

    // Validate position
    const index = parseInt(position) - 1;
    if (index < 0 || index >= newsData.length) {
      return res.status(400).json({
        success: false,
        message: "Invalid news position",
      });
    }

    // Update title if provided
    if (title) {
      newsData[index].title = title;
    }

    // Update date if provided and validate format
    if (date) {
      if (!/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
        return res.status(400).json({
          success: false,
          message: "Date must be in dd/mm/yyyy format",
        });
      }
      newsData[index].date = date;
    }

    // Save the updated data back to the file
    fs.writeFileSync(newsDataPath, JSON.stringify(newsData, null, 2));

    return res.status(200).json({
      success: true,
      message: "News data updated successfully",
    });
  } catch (error) {
    console.error("Error updating news data:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error updating news data" });
  }
};
