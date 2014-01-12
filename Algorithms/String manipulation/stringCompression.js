function compressString (str) {
  var l = str.length;
  var currentCount = 1;
  var previousCharacter = str.charAt(0);
  var compressedString = "";
  var currentCharacter = '';

  for(var index = 1; index < l; index++) {
    currentCharacter = str.charAt(index);
    if(currentCharacter !== previousCharacter) {
      if(currentCount > 1) {
        compressedString += previousCharacter + currentCount;
        currentCount = 1;
      } else {
        compressedString += previousCharacter + currentCount;
      }
    } else {
      currentCount++;
    }
    previousCharacter = currentCharacter;
  }
  compressedString += currentCharacter + currentCount

  return compressedString;
}

console.log(compressString("aabcccccaaa"))