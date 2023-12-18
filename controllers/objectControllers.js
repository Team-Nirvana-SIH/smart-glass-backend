const asyncHandler = require("express-async-handler");
const { constants } = require("../helper/constants");

//@desc Register New Guide
//@route GET /api/objectRoutes
//@access
const fetchDescription = asyncHandler(async (req, res) => {
  try {
    //error handling for empty fields
    const { id } = req.params;
    if (!id) {
      res.status(constants.VALIDATION_ERROR);
      throw new Error("Invalid QR code");
    }
    const newObject = await Objects.create(req.body);
    res.status(constants.CREATED).json(newObject);
  } catch (err) {
    res.status(constants.SERVER_ERROR);
    throw new Error(err.message);
  }
});
