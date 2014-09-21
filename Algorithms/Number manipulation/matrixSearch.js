function matrixSearch (matrix, val) {
  var column = 0;
  for (var i = matrix.length - 1; i > 0; i--) {
    if(matrix[i][0] < val && matrix[i - 1][matrix[i - 1].length - 1] >= val) {
      column = i - 1;
      break;
    }
  }
  for (var j = matrix[column].length - 1; j >= 0; j--) {
    if(matrix[column][j] === val) {
      return matrix[column][j];
    }
  }
  return null;
}

var m = [[1, 2, 3],
         [5, 6, 7],
         [10, 40, 55],
         [11, 56, 100]]

console.log(matrixSearch(m, 40));
