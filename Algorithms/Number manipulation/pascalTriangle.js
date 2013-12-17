function pascalsTriangle(n) {
  if(n <= 1) {
    return [1];
  }

  var prev = pascalsTriangle(n - 1);
  var hist = prev.slice(-(n - 1));
  var array = new Array(hist.length + 1);

  array[0] = 1;
  array[array.length - 1] = 1;
  for(var i = 1; i < hist.length; i++) {
    array[i] = hist[i - 1] + hist[i];
  }

  return prev.concat(array);
}

console.log(pascalsTriangle(10));
