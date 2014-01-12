/*
 * Finds all the permutations of the characters of a given string
 *
 * @param {string} str The input string to permute
 * @return {array} contains all the permutations of a string
 */
function permutations (str) {
  // Base case 1: string is empty, there are no permutations
  if(str.length === 0) {
    return [];
  }

  // // Base case 2: string is 1 char, there is one permutation (itself)
  if(str.length === 1) {
    return [str];
  }

  var allPermutations = [];
  var withoutDuplicates = "";
  var allDuplicates = "";

  /*
   * This is a little precedure at the end of which we have a string without
   * duplicated letters, and a string made of the duplicated letters
   */
  var map = {};
  for (var i = 0; i < str.length; i++) {
    // I use an object to store the letters to check for duplicates
    if(map[str.charAt(i)] === 1) {
      allDuplicates += str.charAt(i);
    } else {
      map[str.charAt(i)] = 1;
      withoutDuplicates += str.charAt(i);
    }
  }

  /*
   * Recursive call to find all permutations of the string str without the first
   * character.
   * You iterate on the string that doesn't have duplicates so there will never
   * be 2 times the same letter at the same depth
   */
  for (var i = 0; i < withoutDuplicates.length; i++) {
    var s = allDuplicates + withoutDuplicates.substring(0, i) + withoutDuplicates.substring(i + 1, withoutDuplicates.length);

    var row = permutations(s);
    var firstLetter = withoutDuplicates.charAt(i);

    allPermutations = allPermutations.concat(row.map(function(val){
      return firstLetter + val;
    }));
  }

  /*
   * This is simply a function to move the char *letter* at every possible
   * position inside the string *rest*
   */
  function move (letter, rest, total) {
    var possibilities = [];

    for (var i = 0; i < rest.length + 1; i++) {

      var p = rest.substring(0, i) + letter + rest.substring(i, rest.length);
      // console.log(p)
      possibilities.push(p);
    }

    return possibilities;
  }

  return allPermutations;
}


var a = permutations("aaaabca");
console.log(a);

// Checking for duplicates
for (var i = 0; i < a.length; i++) {
  for (var j = 0; j < a.length; j++) {
    if(i === j) {
      continue;
    }
    if(a[j] === a[i]) {
      console.log("i: " + i + " j: " + j);
      console.log(a[i] + " " + a[j])
    }
  }
}
