# Functional Programming
_I wanted to implement these functions to better understand the reason behind their existance_

## Currying
Example:
``` js
var add = function(x, y) {
  return x + y;
};

var f = curry(add, 10);

console.log(f(11));
```

This is extremely useful for asynchronous things. For example with the module called async you can do this:
``` js
function A() {
    // does stuff
}

function B() {
    // does stuff
}

async.parallel([A, B], function(){
    // .. Both done
});
```

Now imagine you want to pass arguments to A and B before calling them. Then you might do

``` js
function A(a, b) {
    // does stuff
}

function B(a, b) {
    // does stuff
}

var a = 10, b = 11;
async.parallel([
    function(){
        return A(a, b)
    }, 
    function(){
        return B(a, b)
    }], function(){
    // .. Both done
});
```

But this is clunky and annoying as you have more and more functions. So you can use currying!
``` js
async.parallel([
  curry(A, a, b),
  curry(B, a, b)
  ], function(){
    // .. Both done
  }
);
```
