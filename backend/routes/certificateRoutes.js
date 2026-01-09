const express = require("express");
const router = express.Router();
const certificateController = require("../controllers/certificateController");
const multer = require("multer");

// Configure multer for file uploads
const upload = multer({ dest: "uploads/" }); // temporary storage folder

// ----------------------- Routes -----------------------

// Upload certificate (with file)
router.post("/upload", upload.single("file"), certificateController.upload);

// Get all certificates by email
router.get("/:email", certificateController.getAll);

// Delete certificate
router.delete("/", certificateController.delete);

module.exports = router;
