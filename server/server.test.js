const app = require("./server");
const helpers = require("./helpers/serverHelpers");
// import { generateRandomLetters } from "./helpers/serverHelpers";

const supertest = require("supertest");

jest.mock("./helpers/serverHelpers", () => ({
  randomLetters: () => "bbbbbb",
}));

// beforeAll(() => {
//   testURLS = ["https://iamateapot.shortandstout.gov", "https://"];
// });

test("0_API sanity check", (complete) => {
  supertest(app)
    .get("/")
    .expect((response) => {
      expect(response.status).toBe(200);
      expect(response.text).toEqual("Hello world!");
    })
    .end(complete);
});

test("1_ENCODING_provide unique shortened URL from encoded entry.", (complete) => {
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

test("2_DECODING_full url from TPX url submitted for decoding.", () => {
  // const fullURL = "https://www.thisisaverylongurl.com.org.uk/123124331243";
  // supertest(app)
  //   .post("/decode")
  //   .field("full", fullURL)
  //   .expect((response) => {
  //     expect(response.status).toBe(200);
  //     expect(response.text).toEqual(`https://tpx.imp/bbbbbb`);
  //   })
  //   .end(complete);
});

test("3_DECODING_confirm new full url does not exist and return error.", () => {});
