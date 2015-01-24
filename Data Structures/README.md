#Data Structures

## Ordered HashMap
This data structure is good for things like LRU caches.
Example:
``` js
function getData(id) {
  var map = {
    1: "a",
    2: "b",
    3: "c",
    4: "d",
    5: "e",
    6: "f",
    7: "g",
    8: "h",
    9: "i",
    10: "j",
  };

  // Fake slow retrieval
  var i = 1000;
  while(--i);

  return map[id];
}

var h = new HashMap(3, getData);

console.log("-->", h.get(1));
console.log("-->", h.get(2));

// Cache magic here
console.log("-->", h.get(2));
console.log("-->", h.get(2));

console.log("-->", h.get(3));
console.log("-->", h.get(4));
console.log("-->", h.get(5));

// Cache magic here
console.log("-->", h.get(3));
console.log("-->", h.get(3));
console.log("-->", h.get(3));
```

##Stack

Simple implementation of an immutable stack using recursion.
Example:
``` js
var s = Stack();

s = s.add(1).add(2).add(3).add(4);

// Get the 2nd element
console.log(s.get(2)); // returns "2" (because 0 is 4, 1 is 3 and 2 is 2)

// We remove the 2nd element
s = s.remove(1);
console.log(s.get(2)); // returns "1"
```

## Streams
Here are some example streams that you can create
``` js
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

## ImmutableList
This is a simple list in which you can push elements and remove them. Every action returns a new collection and never modifies the original.
This was a kata (a challenge) from www.codewars.com.

Example:
```js
var t = new ListNode(10, new ListNode(11, new ListNode(12)));

var t2 = t.remove(11);

console.log(t.toString(), t2.toString());
```