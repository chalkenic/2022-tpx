module.exports = {
  /**
   * * Generate a random string of letters from ASCII characters, to ensure no matches within storage.
   * @param pathLength - length of path string to be produced at end of TPX url.
   * @returns charGenerator - String of characters defined in random loop.
   */
  randomLetters: function generateRandomLetters(pathLength) {
    let charGenerator = "";

    for (let index = 0; index < pathLength; index++) {
      // Grab a random character from string method and append into result.
      charGenerator += this.safeChars().charAt(
        Math.floor(Math.random() * pathLength)
      );
    }
    return charGenerator;
  },

  /**
   * Provide all 26 alphabet chars for random path variable.
   * @returns String containing all lettes.
   */
  safeChars: function generateSafeURLCharacters() {
    return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  },
};
