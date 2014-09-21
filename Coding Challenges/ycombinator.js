/**
 * Y Combinator - A function that will recursively call the give function
 * until the given function desides to stop
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

var length = Y(function (f){
  return function(l){
    if(l.length === 0) {
      return 0;
    } else {
      l.length--; // super hack to accelerate things a little, we have a GC
                  // after all ;)
      return 1 + f(l);
    }
  };
});

console.log(length([1, 2, 3, 4, 5, 6]));
