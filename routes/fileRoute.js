const express = require("express");
const router = express.Router();
const fileController = require("../controllers/fileController");
const authMiddleware = require("../middlewares/authMiddleware");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Configure multer storage for thumbnails
const thumbnailStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../views/homePage/thumbnails/"));
  },
  filename: function (req, file, cb) {
    // Initially save with original name
    cb(null, file.originalname);
  },
});

// Configure multer storage for PDFs
const pdfStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../views/homePage/pdf/"));
  },
  filename: function (req, file, cb) {
    // Initially save with original name
    cb(null, file.originalname);
  },
});

// Set up file filters
const thumbnailFilter = (req, file, cb) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(new Error("Only PNG and JPG files are allowed!"), false);
  }
};

const pdfFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed!"), false);
  }
};

// Create upload instances
const thumbnailUpload = multer({
  storage: thumbnailStorage,
  fileFilter: thumbnailFilter,
}).single("file");

const pdfUpload = multer({
  storage: pdfStorage,
  fileFilter: pdfFilter,
}).single("file");

// Function to rename file based on position
const renameFile = (req, res, next) => {
  if (!req.file || !req.body.position) {
    return next();
  }

  const originalPath = req.file.path;
  const directory = path.dirname(originalPath);
  const targetPath = path.join(directory, req.body.position);

  try {
    // If a file already exists at target position, delete it
    if (fs.existsSync(targetPath)) {
      fs.unlinkSync(targetPath);
    }

    // Rename file to match the position
    fs.renameSync(originalPath, targetPath);

    // Update file info in request object
    req.file.originalPath = originalPath;
    req.file.path = targetPath;
    req.file.filename = req.body.position;

    console.log(
      `File renamed from ${path.basename(originalPath)} to ${req.body.position}`
    );
  } catch (err) {
    console.error(`Error renaming file: ${err.message}`);
    return next(err);
  }

  next();
};

// Define routes with proper error handling
router.post(
  "/thumbnail",
  (req, res, next) => {
    thumbnailUpload(req, res, function (err) {
      if (err) {
        console.error("Error in thumbnail upload:", err);
        return res.status(400).json({
          success: false,
          message: err.message || "Error uploading thumbnail",
        });
      }
      next();
    });
  },
  renameFile,
  (req, res, next) => {
    // Log for debugging after renaming
    if (req.file) {
      console.log("Uploaded thumbnail:", {
        originalname: req.file.originalname,
        savedAs: req.file.filename,
        targetPosition: req.body.position,
      });
      req.originalFileName = req.file.originalname;
    }
    next();
  },
  fileController.uploadThumbnail
);

router.post(
  "/pdf",
  (req, res, next) => {
    pdfUpload(req, res, function (err) {
      if (err) {
        console.error("Error in PDF upload:", err);
        return res.status(400).json({
          success: false,
          message: err.message || "Error uploading PDF",
        });
      }
      next();
    });
  },
  renameFile,
  (req, res, next) => {
    // Log for debugging after renaming
    if (req.file) {
      console.log("Uploaded PDF:", {
        originalname: req.file.originalname,
        savedAs: req.file.filename,
        targetPosition: req.body.position,
      });
      req.originalFileName = req.file.originalname;
    }
    next();
  },
  fileController.uploadPdf
);

// Main page route
router.get("/main", authMiddleware, (req, res) => {
  res.sendFile("index.html", { root: "./views/adminPage" }); // Serve the admin page
});

router.get("/thumbnails", fileController.getCurrentThumbnails);
router.get("/pdfs", fileController.getCurrentPdfs);
router.post("/updateNewsData", authMiddleware, fileController.updateNewsData);

module.exports = router;
