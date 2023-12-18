const asyncHandler = require("express-async-handler");
const Guide = require("../models/guideInfoModel");
const { constants } = require("../helper/constants");

const textToSpeech = asyncHandler(async (req, res) => {
  try {
    const object = await Guide.findById(req.params.id);
    if (!object) {
      res.status(constants.NOT_FOUND);
      throw new Error("invalid QR");
    }
    res.status(constants.SUCCESS);

    //text to speech
    //   const speech = require("@google-cloud/text-to-speech");
  } catch (err) {
    res.status(constants.SERVER_ERROR);
    throw new Error(err.message);
  }
});
