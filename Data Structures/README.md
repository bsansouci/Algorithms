#Data Structures

##Stack

Simple implementation of an immutable stack using recursion.
Example:
``` javascript
var s = Stack();

s = s.add(1).add(2).add(3).add(4);
console.log(s.get(2)); // returns "2" (because 0 is 4, 1 is 3 and 2 is 2)

s = s.remove(2);
console.log(s.get(2)); // returns "1"
```

## Streams
Here are some example streams that you can create
``` javascript
var naturals  = add1(1);
var even_stream = add2(0);
var odd_stream = add2(1);

var pows_2 = filter(naturals, isPow2);

var fib = fib_h(1, 1);

var primes = sieve(add1(2));

// This if how you get the values from a stream
// Here it returns the 10 first primes
console.log(take(10, primes));

// Another example with stream, the sum of the multiples of 3 or 5 up until 999
console.log(take(999, naturals).reduce(function(acc, val, index) {
  if(val % 3 === 0 || val % 5 === 0) {
    return acc + val;
  }
  return acc;
}, 0));
```
