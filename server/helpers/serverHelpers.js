module.exports = {
  /**
   * Generate a random string of letters from ASCII characters, to ensure no matches within storage.
   * @returns charGenerator - String of characters defined in random loop.
   */
  randomLetters: function generateRandomLetters() {
    let charGenerator = "";

    for (let index = 0; index < 10; index++) {
      let randomASCIIValue = Math.floor(Math.random() * 74) + 48;

      charGenerator += String.fromCharCode(randomASCIIValue);
    }

    return charGenerator;
  },
};

// export function generateRandomLetters() {
//   let charGenerator = "";

//   for (let index = 0; index < 10; index++) {
//     let randomASCIIValue = Math.floor(Math.random() * 74) + 48;

//     charGenerator += String.fromCharCode(randomASCIIValue);
//   }

//   return charGenerator;
// }
