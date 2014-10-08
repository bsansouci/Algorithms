/**
 * Q: Detect if a certain configuration of tic tac toe is a winning one
 *
 * @param {array} array is an array of strings (or char) with contains
 * information on the position of each player's pieces
 *
 * @param {string} player is the string or char that represents the player
 * in the array
 *
 * @return {boolean} whether or not this configuratiokn is a winning
 * configuration
 */
var allWins = [546, 896, 112, 14, 168, 584, 292, 146]

function didIWin (array, player) {
  var num = 0;
  // Generate a number, with each bit represents whether or not the spot
  // was taken. Using this number we can check with the cached ones and
  // figure out if you're in a winning configuration
  for (var i = 0; i < array.length; i++) {
    for (var j = 0; j < array.length; j++) {
      // If the current spot is taken by the player we add a 1 bit to *num*
      // because we're only interested in the player's configuration and
      // nothing else
      if(array[i][j] === player) {
        num = num | 1;
      } else {
        num = num | 0;
      }

      // We shift left the *num* so we can add the next bit
      num = num << 1;
    }
  }

  // Now we have our number, all we need to do is to OR the cached numbers
  // one by one with *num* and check if that gives back num or not
  // If it does, then we're in a winning configuration, if no then we're not
  for (var i = 0; i < allWins.length; i++) {
    var x = allWins[i] | num;
    if(x === num) {
      return true;
    }
  }
  return false;
}

console.log(didIWin([["x", "x", "x"], ["o", "o", "o"], ["o", "o", "x"]], "x"));
