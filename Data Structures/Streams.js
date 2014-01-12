// Definition of a Steam, it's just an array of 2 things
// the first will be a current value, the rest will be a function that retunrs
// a stream
function Stream(a, b) {
  return [a, b];
}

// This is used to avoid the usual function(){...} wrapper. You can just call
// lock onto a function, and pass it all the arguments that you need to pass the
// wrapped function and lock will return an anonymous function that when called
// will call your function
function lock(f) {
  var args = Array.prototype.slice.call(arguments, 1);
  return function() {
    return f.apply(this, args);
  };
}

// Those two functions are just to make the code cleaner
function rest(stream) {
  return stream[1]();
}
function cur(stream) {
  return stream[0];
}

// I used continuations for lazy evaluation and to avoid array concatenation
// that I find slow
function take(n, stream, cont) {
  cont = cont || function(){ return []; }
  if(n === 0) {
    return cont();
  }
  return take(n - 1, rest(stream), function(){
    var a = cont();
    a.push(cur(stream));
    return a;
  });
}


// Just some functions that we might use to filter streams
function isEven(a) {
  return a % 2 === 0;
}

function log_2(a) {
  return Math.log(a) / Math.LN2;
}

function isPow2(a) {
  return log_2(a) % 1 === 0;
}


// The cool stuff starts here
// Filter is just the same as filter on an array except it's on an infinite stream
function filter(s, f) {
  if(f(cur(s))) {
    return Stream(cur(s), lock(filter, rest(s), f));
  } else {
    return filter(rest(s), f);
  }
}

// Same as for arrays but fo streams
function map(s, f) {
  return Stream(f(cur(s)), lock(map, rest(s), f));
}

// This is just a helper function to add two streams together
function add(s1, s2) {
  return Stream(cur(s1) + cur(s2), lock(add, rest(s1), rest(s2)));
}

// This will go through the stream and will filter out the numbers that the
// function provided returns true on.
var remove = function(f, s) {
  return filter(s, function(p) {
    return !f(p);
  });
}

// This one will just apply remove any number and it's multiple from a stream
var remMultOf = function(a, s) {
  return remove(function(p){ return p % a === 0; }, s);
}

// Recursive apply just applies a function
// on a starting number, and will recursively create a stream with the
// current number as the output of f(n previous)
function recApply(n, f) {
  return Stream(n, lock(recApply, f(n), f));
}

// This function just adds one recursively to a initial number
function add1(a) {
  return recApply(a, function(a) {
    return a + 1;
  });
}

// Well this one does as the previous one except it adds 2
function add2(a) {
  return recApply(a, function(a) {
    return a + 2;
  });
}

// This function creates a stream that will multiply the number by 2 instead of
// adding 1 to it (as previous examples)
function mult2(a) {
  return recApply(a, function(a) {
    return a * 2;
  });
}

// This is a fibonacci stream: you add the current number and the previous number
function fib_h(a, b) {
  return Stream(a, lock(fib_h, b, a + b));
}

// Just a function that will build a stream that removes every occurence of the
// current number (aka building a primes stream)
function sieve(s) {
  return Stream(cur(s), lock(sieve, remMultOf(cur(s), rest(s))));
}

// Just a stream of 1's
var ones_h = function() {
  return Stream(1, ones_h);
}

var ones = ones_h();
var primes = sieve(add1(2));

console.log(take(100, primes).filter(function(a){return a<= 100;}).length);
