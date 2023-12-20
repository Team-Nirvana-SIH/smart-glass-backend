const asyncHandler = require("express-async-handler");
const express = require("express");
const router = express.Router();
const {
  fetchDescription,
  registerPlace,
  startSpeechRecognition,
} = require("../controllers/objectControllers");

router.get("/speech-recognition", asyncHandler(startSpeechRecognition));
router.get("/:id", asyncHandler(fetchDescription));
router.post("/", asyncHandler(registerPlace));

module.exports = router;
