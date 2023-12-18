const express = require("express");
const router = express.Router();
const  {fetchDescription}  = require("../controllers/objectControllers");

router.route("/:id").post(fetchDescription);

module.exports = router;
