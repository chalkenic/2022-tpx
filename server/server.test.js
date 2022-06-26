const app = require("./app");
const supertest = require("supertest");
import axios from "axios";

jest.mock("./helpers/server", () => ({
  randomLetters: () => "bbbbbb",
}));

/**
 * Test for confirming encoding API working as intended.
 */
test("Provide a shortened TPX Url from a submitted Url", (complete) => {
  const fullUrl = "https://www.thisisaverylongurl.com.org.uk/123124331243";

  supertest(app)
    .post("/encode")
    .field("full", fullUrl)
    .expect((response) => {
      expect(response.status).toBe(200);
      expect(response.text).toEqual(`https://tp.x/bbbbbb`);
    })
    .end(complete);
});

// todo URL TEST
test("Return the original url from the shortened Url", (complete) => {
  const originalUrl = "https://thisisanoriginalurlfortesting.gov/11111";
  const encodedUrl = "https://tp.x/test";

  axios
    .post("/encode", { original: originalUrl, encoded: encodedUrl })
    .then((response) => {
      console.log(response);
    });

  supertest(app)
    .post("/decode")
    .field("url", encodedUrl)
    .expect((response) => {
      expect(response.status).toBe(200);
      expect(response.text).toEqual(`${originalUrl}`);
    })
    .end(complete);
});

/**
 * Decoding should not work if a related Url has not been submitted.
 * Test checks error handling is working.
 */
test("Return a 404 error if encoded Url does not exist in store", (complete) => {
  supertest(app)
    .post("/decode")
    .field("encoded", "https://tp.x/abcde")
    .expect((response) => {
      expect(response.status).toBe(404);
    })
    .end(complete);
});

/**
 * Test for confirming randomization of suffix path working as intended.
 */
test("When submitting multiple urls, each suffix path returned from random method is unique", () => {
  // Source original helpers module export to allow for random suffix paths only within this test.
  const helpers = jest.requireActual("./helpers/server");

  const firstEncodedUrl = `https://tpx.imp/${helpers.randomLetters(5)}`;
  const secondEncodedUrl = `https://tpx.imp/${helpers.randomLetters(5)}`;

  expect(firstEncodedUrl).not.toEqual(secondEncodedUrl);
});
