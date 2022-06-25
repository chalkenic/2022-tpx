module.exports = {
  /**
   * Generate a random string of letters from ASCII characters, to ensure no matches within storage.
   * @returns charGenerator - String of characters defined in random loop.
   */
  randomLetters: function generateRandomLetters(pathLength) {
    let charGenerator = "";

    for (let index = 0; index < pathLength; index++) {
      charGenerator += this.safeChars().charAt(
        Math.floor(Math.random() * pathLength)
      );
    }
    return charGenerator;
  },

  safeChars: function generateSafeURLCharacters() {
    return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  },
};
