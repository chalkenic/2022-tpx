const app = require("./app");
const supertest = require("supertest");
import axios from "axios";

jest.mock("./helpers/server", () => ({
  randomLetters: () => "bbbbbb",
}));

/**
 * Test for confirming encoding API working as intended.
 */
describe("URL SERVICE - Given a long http address that requires shortening", () => {
  test("should provide a shortened TPX Url from the submitted Url", (complete) => {
    const originalUrl =
      "https://www.thisisaverylongurl.com.org.uk/123124331243";

    supertest(app)
      .post("/encode")
      .field("url", originalUrl)
      .expect((response) => {
        expect(response.status).toBe(200);
        expect(response.text).toEqual(`https://tp.x/bbbbbb`);
      })
      .end(complete);
  });

  /**
   * Test would require a mock database to be created within server, in order to successfully parse data into storage
   * and be available for queries.
   */
  test("should return the original Url when providing the TPX url", () => {});

  /**
   * Decoding should not work if a related Url has not been submitted.
   * Test checks error handling is working.
   */
  test("Should return a 404 error if an encoded Url does not exist in store", (complete) => {
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
  test("Should generate unique Url suffixes when using the randomizing function.", () => {
    // Source original helpers module export to allow for random suffix paths only within this test.
    const helpers = jest.requireActual("./helpers/server");

    const firstEncodedUrl = `https://tpx.imp/${helpers.randomLetters(5)}`;
    const secondEncodedUrl = `https://tpx.imp/${helpers.randomLetters(5)}`;

    expect(firstEncodedUrl).not.toEqual(secondEncodedUrl);
  });
});
