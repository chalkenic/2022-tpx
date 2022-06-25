const express = require("express");
const app = express();

const hostname = "localhost";
const port = process.env.port || 3001;

let encodedUrls = [];
let index = 0;

app.get("/", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello world!\n");
});

app.post("/encode", (req, res) => {
  uniqueUrl = `https://tpxtest.com/${index}`;

  encodedUrls[index] = {
    full: req.body.url,
    encoded: uniqueUrl,
  };

  return uniqueUrl;
});

app.post("/decode", (req, res) => {
  var encodedUrlNum = parseInt(req.body.url.replace(/[^0-9]/g, ""));

  return encodedUrls[encodedUrlNum].full;
});

app.listen(port, hostname, () => {
  console.log(`Server current running at ${hostname}:${port}/`);
});
