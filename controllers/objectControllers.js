const asyncHandler = require("express-async-handler");
const { constants } = require("../helper/constants");
const textToSpeech = require("@google-cloud/text-to-speech");
require("dotenv").config();
const { exec } = require("child_process");
const Object = require("../models/objectModels");
const { record } = require("node-record-lpcm16");

const speech = require("@google-cloud/speech");

const { SpeechClient } = require("@google-cloud/speech").v1p1beta1;
const client = new SpeechClient();

//@desc Register New Guide
//@route GET /api/objectRoutes
//@access
const fetchDescription = asyncHandler(async (req, res) => {
  try {
    //error handling for empty fields
    const id = req.params.id;
    if (!id) {
      res.status(constants.VALIDATION_ERROR);
      throw new Error("Invalid QR code");
    }
    const newObject = await Object.findOne({ _id: req.params.id });

    //res.status(constants.CREATED);

    console.log(newObject);

    const client = new speech.SpeechClient(); // Change this line

    async function convertTextToMp3() {
      if (!newObject) {
        // Handle case where object is not found in the database
        res.status(constants.NOT_FOUND).json({ message: "Object not found" });
        return; // Exit the function
      }

      const text = newObject.description; // Add missing closing quote

      const request = {
        input: { text: text },
        voice: { languageCode: "en-IN", ssmlGender: "NEUTRAL" },
        audioConfig: { audioEncoding: "MP3" },
      };

      try {
        const [response] = await client.synthesizeSpeech(request);
        const audioContent = response.audioContent;

        // Use 'play-sound' to play audio content directly
        exec(
          `echo "${audioContent.toString(
            "base64"
          )}" | base64 --decode | play -t mp3 -`,
          (error) => {
            if (error) {
              console.error("Error playing audio:", error);
            } else {
              console.log("Text to Speech has completed. Audio played.");
              // exit with success
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
    //error handling for empty fields
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

//@desc Register New Guide
//@route GET /api/objectRoutes
//@access

// // Create a new streamingRecognize request
// const request = {
//   config: {
//     encoding: "LINEAR16",
//     sampleRateHertz: 16000,
//     languageCode: "en-US",
//   },
//   interimResults: true,
// };

// // Stream the audio data to Google Cloud Speech API
// const recognizeStream = client
//   .streamingRecognize(request)
//   .on("error", console.error)
//   .on("data", (data) => {
//     const transcription = data.results
//       .map((result) => result.alternatives[0].transcript)
//       .join("\n");
//     console.log(`Transcription: ${transcription}`);
//   });

// // Start recording audio from the microphone
// const recording = record.start({
//   sampleRateHertz: 16000,
//   threshold: 0,
//   verbose: false,
// });

// let isSilent = false;
// let silentTimer;

// // Function to stop recording and end recognition stream on continuous silence
// const stopRecognitionOnSilence = () => {
//   record.stop();
//   recognizeStream.end();
//   clearTimeout(silentTimer);
// };

// // Pipe the microphone input to the recognition stream
// recording
//   .on("data", (data) => {
//     // Check for silence
//     const silent = !data.some((v) => v !== 0);
//     if (silent !== isSilent) {
//       isSilent = silent;
//       if (isSilent) {
//         // Start a timer to detect continuous silence
//         silentTimer = setTimeout(stopRecognitionOnSilence, 2000); // Adjust the duration as needed
//       } else {
//         // If sound is detected, clear the timer
//         clearTimeout(silentTimer);
//       }
//     }
//   })
//   .pipe(recognizeStream);

module.exports = { fetchDescription, registerPlace };
