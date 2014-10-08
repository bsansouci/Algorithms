// THIS IS NOT WORKING YET
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

console.log(printInteger(20021))
