// import { generateRandomLetters } from "./helpers/serverHelpers";
var helpers = require("./helpers/serverHelpers");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Mimicking persistence via using array within node server. Online DB such as Mongodb or Postgre could be used instead
var encodedUrls = [];

/**
 * Sanity method to confirm data on initial URL exists.
 */
app.get("/", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello world!");
});

/**
 * Handles encoding of given URL and shortens to TPX alternative.
 */
app.post("/encode", (req, res) => {
  let uniqueString = helpers.randomLetters(10);
  let uniqueUrl = `https://tpx.imp/${uniqueString}`;

  encodedUrls.push({
    full: req.body.url,
    encoded: uniqueUrl,
  });

  console.log(encodedUrls);

  res.send(uniqueUrl);
});

/**
 *
 */
app.post("/decode", (req, res) => {
  var encodedUrl = req.body.url;

  console.log(" TEST: ", encodedUrl, "TEST");

  if (!Array.find(url => url.encoded === encodedUrls.encoded)) {
    return res.sendStatus(404);
  }

  res.send(encodedUrls[encodedUrl].full);
});

module.exports = app;
