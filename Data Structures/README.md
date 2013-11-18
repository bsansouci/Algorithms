#Data Structures

##Stack
---
Simple implementation of an immutable stack using recursion.
Example:
``` js
var s = Stack();

s = s.add(1).add(2).add(3).add(4);
console.log(s.get(2)); // returns "2" (because 0 is 4, 1 is 3 and 2 is 2)

s = s.remove(2);
console.log(s.get(2)); // returns "1"
```
