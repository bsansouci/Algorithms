var weights = [1, 2, 5, 6, 7];
var values = [1, 6, 18, 22, 28];

function knapsack(n, maxWeight) {
  var array = [];
  var arr = new Array(maxWeight + 1);
  for (var i = 0; i <= maxWeight; i++) {
    arr[i] = 0;
  }
  array.push(arr);

  for (var i = 1; i <= n; i++) {
    var row = new Array(maxWeight + 1);
    for (var w = 0; w <= maxWeight; w++) {
      if(weights[i - 1] > w) {
        row[w] = array[i - 1][w];
      } else {
        row[w] = Math.max(array[i - 1][w], values[i - 1] + array[i - 1][w - weights[i - 1]]);
      }
    }
    array.push(row);
    // console.log(array);
  }
  return array[n][maxWeight];
}

console.log(knapsack(5, 11));
