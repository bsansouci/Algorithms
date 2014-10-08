function curry (f) {
  var args = Array.prototype.slice.call(arguments, 1);

  return function() {
    return f.apply(null, args.concat(Array.prototype.slice.call(arguments, 0)));
  };
}

var add = function(x, y) {
  return x + y;
};

var f = curry(add, 10);

console.log(f(11));