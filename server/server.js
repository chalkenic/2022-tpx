// import { generateRandomLetters } from "./helpers/serverHelpers";
var helpers = require("./helpers/serverHelpers");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Mimicking persistence via using array within node server. Online DB such as Mongodb or Postgre could be used instead
var UrlStore = [];

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

  UrlStore.push({
    original: req.body.url,
    encoded: uniqueUrl,
  });

  res.send(uniqueUrl);
});

/**
 *
 */
app.post("/decode", (req, res) => {
  var encodedUrl = req.body.url;

  const foundURL = UrlStore.find((url) => {
    return url.encoded === encodedUrl;
  });

  if (!foundURL) {
    return res.sendStatus(404);
  }

  res.send(foundURL.original);
});

module.exports = app;
