const asyncHandler = require("express-async-handler");
const express = require("express");
const router = express.Router();
const {
  fetchDescription,
  registerPlace,
} = require("../controllers/objectControllers");

router.get("/:id", asyncHandler(fetchDescription));
router.post("/", asyncHandler(registerPlace));

module.exports = router;
