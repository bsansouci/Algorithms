// This is an implementation of a stack (last in first out)

function Stack(x) {
  var curStack = x || {};

  curStack.add = function(newElement) {
    return Stack({remaining: curStack, el: newElement});
  };

  curStack.get = function(index) {
    if(index === 0) {
      return x.el;
    } else {
      return x.remaining.get(index - 1);
    }
  };

  curStack.remove = function(index) {
    if(index === 0) {
      return curStack.remaining;
    } else {
      return Stack({remaining: curStack.remaining.remove(index - 1), el: curStack.el});
    }
  }

  return curStack;
}
