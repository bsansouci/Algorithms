var Cons = function(a, b) {
  return [a, b];
}

var lock = function(f, n) {
  return function() {
    return f(n);
  };
};

var take = function(n, stream) {
  if(n === 0) {
    return [];
  }
  return [stream[0]].concat(take(n - 1, stream[1]()));
}

function apply(n, f) {
  return Cons(n, function() {
    return apply(f(n), f);
  });
}

function add1(a) {
  return apply(a, function(a) {
    return a + 1;
  });
}

function mult2(a) {
  return apply(a, function(a) {
    return a * 2;
  })
}

function fib(a, b) {
  return Cons(a, function() {
    return fib(b, a + b);
  })
}

var range = fib(1, 1);

console.log(take(10, range))
