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

// console.log(didIWin([["x", "x", "x"], ["o", "o", "o"], ["o", "o", "x"]], "x"));


/**
 * Find maximum between a and b with conditional statements
 * @param  {int} a first number
 * @param  {int} b second number
 * @return {int}   the biggest of the two given number
 */
function max (a, b) {
  // two's complement
  var n = b & (~a | 1);
  var str = "";
  for (var i = 63; i >= 0; i--) {
    str += (1 << i) & n;
  }
  console.log(str)
  // shift diff by 52
  return ((n >> 52) & a) | ((~n >> 52) & b);
}

console.log(max(22, 21));

function printInteger (x) {
  // Helper functions and variables
  // *numbers* is used when exp === 1 and 0 <= x <= 20
  // *tens* is used when exp === 10 and 0 < x <= 100
  // *powers* is used when exp > 10 and x === 1
  var numbers = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eightteen", "Nineteen", "Twenty"];
  var tens = ["Zero", "Ten", "Twenty", "Thirty", "Fourty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety", "Hundred"];
  var powers = ["Zero", "Ten", "Hundred", "Thousand", "Million", "Billion"];
  function getName(c, exp) {
    if(c === 0) {
      return "";
    }
    if(exp === 1) {
      return numbers[c];
    } else if(exp === 10) {
      return tens[c];
    } else if(exp === 100 || exp === 1000) {
      return numbers[c] + " " + powers[exp.toString().length - 1];
    } else if (exp === 10000) {
      return getName(c, 10) + " " + powers[3];
    }
  }

  // Program starts here
  var l = x.toString().length
  var exp = Math.pow(10, l - 1);
  var stack = [];

  // We start by pushing the digits one by one onto a stack
  for (var i = 0; i < l; i++) {
    stack.push(x % 10);
    x = Math.floor(x / 10);
  }
  var str = "";
  var prevWasZero = false
  // We pop the stack to get the digits from the most significant to the
  // least significant
  while (stack.length) {
    var x =  stack.pop();

    // If the 2nd last digit is smaller than 2 that means that it's defined
    // in *nums* (look at the comments bellow) so we need to send an
    // exponent of 1 and a 2 digit number
    //
    // else we simply send the data normally to getName
    str += ((exp === 100 && x != 0) || (exp === 10 && x === 0)) ? "and " : "";
    if(exp === 10 && x != 0 && x < 2) {
      var s = getName(x * 10 + stack.pop(), 1);
      str += s + " ";
    } else {
      var s = getName(x, exp);
      if(s.length) {
        str += s + " ";
      }
    }
    exp /= 10;
  }

  return str;

}

// console.log(printInteger(20021))
