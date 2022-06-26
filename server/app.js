var helpers = require("./helpers/server");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Mimicking persistence via using array within node server. Online DB such as Mongodb or Postgre could be used instead.
// 1 entry added for test purposes via server.test.js & postman.
let UrlStore = [
  {
    original: "https://thisisanoriginalurlfortesting.gov/11111",
    encoded: "https://tp.x/test",
  },
];

/**
 * Sanity check to confirm data on initial URL exists.
 */
app.get("/", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello TPX!");
});

/**
 * Handles encoding of given URL and shortens to TPX alternative.
 */
app.post("/encode", (req, res) => {
  // TPX path addition has been set to 10 characters.
  let uniqueString = helpers.randomLetters(10);
  let uniqueUrl = `https://tp.x/${uniqueString}`;

  // Append both URLs into local storage.
  UrlStore.push({
    original: req.body.url,
    encoded: uniqueUrl,
  });

  res.send(uniqueUrl);
});

/**
 * Handles decoding of encoded TPX URL into original value.
 */
app.post("/decode", (req, res) => {
  var encodedUrl = req.body.url;

  // Check local storage array to source the Url by the encoded data.
  const foundURL = UrlStore.find((url) => {
    return url.encoded === encodedUrl;
  });

  if (!foundURL) {
    return res.sendStatus(404);
  }

  res.send(foundURL.original);
});

module.exports = app;
