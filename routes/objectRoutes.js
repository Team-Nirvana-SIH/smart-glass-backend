const asyncHandler = require("express-async-handler");
const express = require("express");
const router = express.Router();
const { fetchDescription } = require("../controllers/objectControllers");

router.get("/:id", asyncHandler(fetchDescription));

module.exports = router;
