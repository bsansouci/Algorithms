function mapper(f) {
  return function(combine) {
    return function(result, x) {
      return combine(result, f(x));
    };
  };
}

function filterer(f) {
  return function(combine) {
    return function(result, x) {
      return f(x) ? combine(result, x) : result;
    };
  };
}

function compose() {
  var funcs = Array.prototype.slice.call(arguments);
  return function(r) {
    var value = r;
    for(var i=funcs.length-1; i>=0; i--) {
      value = funcs[i](value);
    }
    return value;
  };
}

function transduce(func, combiner, oldDS, newDS) {
  return oldDS.reduce(func(combiner), newDS);
}

function append(arr, x) {
  arr.push(x);
  return arr;
}

var arr = [1, 2, 3, 4];

console.log(transduce(
  compose(
    filterer(function(x) { return x > 2; }),
    mapper(function(x) { return x * 2; })
  ),
  append,
  arr,
  []
));


