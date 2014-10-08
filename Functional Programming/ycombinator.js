/**
 * Y Combinator - A function that will recursively call the give function
 *                until the given function desides to stop
 * @param {function} fun is a function on which you want to "recurse"
 */
function Y(fun) {
  return (function (f) {
    return f(f);
  })(function (f) {
    return fun(function (x) {
      return (f(f))(x);
    });
  });
}

var length = Y(function (itself){
  return function(l){
    if(l.length === 0) {
      return 0;
    } else {
      l.length--; // Hacky way to remove the last elemet of an array
      return 1 + itself(l);
    }
  };
});

console.log(length([1, 2, 3, 4, 5, 6]));

var fibs = Y(function (itself) {
  return function(n) {
    if(n <= 2) return 1;
    return itself(n - 1) + itself(n - 2);
  };
});

// Returns 13 => (1 1 2 3 5 8 13)
console.log(fibs(7));
