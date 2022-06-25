const app = require("./server");
const helpers = require("./helpers/serverHelpers");
// import { generateRandomLetters } from "./helpers/serverHelpers";

const supertest = require("supertest");

jest.mock("./helpers/serverHelpers", () => ({
  randomLetters: () => "bbbbbb",
}));

test("Provide a shortened Url from a submitted Url", (complete) => {
  const fullURL = "https://www.thisisaverylongurl.com.org.uk/123124331243";

  supertest(app)
    .post("/encode")
    .field("full", fullURL)
    .expect((response) => {
      expect(response.status).toBe(200);
      expect(response.text).toEqual(`https://tpx.imp/bbbbbb`);
    })
    .end(complete);
});
// todo URL TEST
test("2 Urls cannot be unique", () => {});

// todo URL TEST
test("Return the original url from the shortened Url", () => {});

// todo URL TEST
test("Return a 404 error if encoded Url does not exist in store", () => {});
