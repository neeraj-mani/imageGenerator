const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const https = require("https");

const fs = require("fs");

require("dotenv").config();
const config = new Configuration({
  apiKey: process.env.openAI_API_KEY,
});
const openai = new OpenAIApi(config);
const app = express();

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/generate", async (req, res) => {
  console.log(req.body.phrase);
  const openaiRes = await openai.createImage({
    prompt: req.body.phrase,
    n: 1,
    size: "512x512",
  });
  //   console.log(openaiRes.data.data);
  // const filename = openaiRes.data.created.toString();
  // const ws = fs.createWriteStream(`./${filename}.png`);
  // let data = null;
  // https.get(openaiRes.data.data[0].url, (response) => {
  //   response.on("data", (chunk) => {
  //     ws.write(chunk);
  //     data += chunk.toArrayBuffer();
  //   });
  //   response.on("end", () => {
  //     console.log(data);
  //     ws.end();
  //   });
  // });
  const imageUrl = openaiRes.data.data[0].url;
  res.setHeader("content-type", "text/html");
  res.end(`<img src="${imageUrl}">`);
});

app.listen(80);
