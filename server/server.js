// import { generateRandomLetters } from "./helpers/serverHelpers";
var helpers = require("./helpers/serverHelpers");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Mimicking persistence via using array within node server. Online DB such as Mongodb or Postgre could be used instead
let encodedUrls = [];

/**
 * Sanity method to confirm data on initial URL exists.
 */
app.get("/", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello world!");
});

/**
 *
 */
app.post("/encode", (req, res) => {
  let uniqueString = helpers.randomLetters();
  let uniqueUrl = `https://tpx.imp/${uniqueString}`;

  encodedUrls[uniqueString] = {
    full: req.body.url,
    encoded: uniqueUrl,
  };

  res.send(uniqueUrl);
});

/**
 *
 */
app.post("/decode", (req, res) => {
  var urlPath = req.path;
  console.log(urlPath);

  res.send(encodedUrls[urlPath].full);
});

module.exports = app;
