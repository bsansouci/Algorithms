function rotate(arr) {
  var l = arr.length;

  // Instantiate a new array that is the same size as the given one
  // Used to do the rotation
  var nArr = new Array(l);
  for (var i = 0; i < l; i++) {
    nArr[i] = new Array(l);
  }

  // Move each element of arr into nArr at it's rotated position
  for(var x = 0; x < l; x++) {
    for(var y = 0; y < l; y++) {
      nArr[y][(l - x - 1)] = arr[x][y];
    }
  }
  return nArr;
}

console.log(rotate([[1, 2, 3], [4, 5, 6], [7, 8, 9]]))