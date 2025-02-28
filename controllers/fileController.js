// controllers/fileController.js
const fs = require("fs");
const path = require("path");

const thumbnailsDir = path.join(__dirname, "../views/homePage/thumbnails");
const pdfsDir = path.join(__dirname, "../views/homePage/pdf");

const fileUploadController = {
  // Handle thumbnail uploads
  uploadThumbnail: async (req, res) => {
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
  },

  // Handle PDF uploads
  uploadPdf: async (req, res) => {
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
  },

  // Get current thumbnails
  getCurrentThumbnails: async (req, res) => {
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
  },

  // Get current PDFs
  getCurrentPdfs: async (req, res) => {
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
  },
};

module.exports = fileUploadController;
