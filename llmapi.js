const request = require("request");

const options = {
  method: "POST",
  url: "https://open-ai21.p.rapidapi.com/conversationgpt35",
  headers: {
    "content-type": "application/json",
    "X-RapidAPI-Key": "a7f3acb712msha3f28e95023e89bp1eeb1djsn02828ef9e5c8",
    "X-RapidAPI-Host": "open-ai21.p.rapidapi.com",
  },
  body: {
    messages: [
      {
        role: "user",
        content: "hello, can you tell me about 29087876554334*2654576857?",
      },
    ],
    web_access: false,
    system_prompt: "",
    temperature: 0.9,
    top_k: 5,
    top_p: 0.9,
    max_tokens: 256,
  },
  json: true,
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(body.result);
});
