var moveZeros = function (arr) {
  var r = arr.reduce(function(acc, val, i) {
    if(val !== 0)
      acc.push(val);
    return acc;
  }, []);

  var z = arr.length - r.length;
  while(z--) { r.push(0); }
  return r;
}

// Genius solution
var moveZeros2 = function (arr) {
  return arr.filter(function(x) {return x !== 0}).concat(arr.filter(function(x) {return x === 0;}));
}
