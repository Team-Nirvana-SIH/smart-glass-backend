const request = require("request");

const options = {
  method: "POST",
  url: "https://text-translator2.p.rapidapi.com/translate",
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    "X-RapidAPI-Key": "a7f3acb712msha3f28e95023e89bp1eeb1djsn02828ef9e5c8",
    "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
  },
  form: {
    source_language: "auto",
    target_language: "hi",
    text: "What is your name?",
  },
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  const responseBody = JSON.parse(body);
  console.log(responseBody.data.translatedText);
});
