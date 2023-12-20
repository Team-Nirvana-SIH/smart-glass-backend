const asyncHandler = require("express-async-handler");
const { constants } = require("../helper/constants");
const textToSpeech = require("@google-cloud/text-to-speech");
require("dotenv").config();
const { exec } = require("child_process");
const Object = require("../models/objectModels");
const { record } = require("node-record-lpcm16");
const speech = require("@google-cloud/speech");

// Initialize Speech-to-Text Client
const sttClient = new speech.SpeechClient();

//@desc Register New Guide
//@route GET /api/objectRoutes
//@access
const fetchDescription = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(constants.VALIDATION_ERROR);
      throw new Error("Invalid QR code");
    }
    const newObject = await Object.findOne({ _id: id });

    console.log(newObject);

    async function convertTextToMp3() {
      if (!newObject) {
        res.status(constants.NOT_FOUND).json({ message: "Object not found" });
        return;
      }

      const text = newObject.description;

      // Initialize Text-to-Speech Client
      const ttsClient = new textToSpeech.TextToSpeechClient();

      const request = {
        input: { text: text },
        voice: { languageCode: "en-IN", ssmlGender: "NEUTRAL" },
        audioConfig: { audioEncoding: "MP3" },
      };

      try {
        const [response] = await ttsClient.synthesizeSpeech(request);
        const audioContent = response.audioContent;

        exec(
          `echo "${audioContent.toString(
            "base64"
          )}" | base64 --decode | play -t mp3 -`,
          (error) => {
            if (error) {
              console.error("Error playing audio:", error);
            } else {
              console.log("Text to Speech has completed. Audio played.");
              res.status(constants.SUCCESS).json({ message: "Audio played" });
            }
          }
        );
      } catch (err) {
        console.error("Error occurred:", err);
      }
    }

    convertTextToMp3();
  } catch (err) {
    res.status(constants.SERVER_ERROR);
    throw new Error(err.message);
  }
});

//@desc Register New User
//@route POST /api/objectRoutes
//@access
const registerPlace = asyncHandler(async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      res.status(constants.VALIDATION_ERROR);
      throw new Error("Please add all fields");
    }
    const newObject = await Object.create(req.body);
    res.status(constants.CREATED).json(newObject);
  } catch (err) {
    res.status(constants.SERVER_ERROR);
    throw new Error(err.message);
  }
});

// Other routes and functionalities...

module.exports = { fetchDescription, registerPlace };
