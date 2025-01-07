const express = require("express");
const { createEvent, getEvents, updateEvent, deleteEvent, joinEvent } = require("../controllers/eventController");
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary,
  params: { folder: "event_images", format: async () => "jpg" },
});

const upload = multer({ storage });

router.post("/create", authMiddleware, upload.single("eventCoverImage"), createEvent);
router.get("/", authMiddleware, getEvents);
router.put("/:id", authMiddleware, updateEvent);
router.delete("/:id", authMiddleware, deleteEvent);
router.post("/join", authMiddleware, joinEvent);

module.exports = router;
