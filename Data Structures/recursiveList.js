function List(x) {
  var curList = x || {};

  curList.add = function(newElement) {
    return List({remaining: curList, el: newElement});
  };

  curList.get = function(index) {
    if(index === 0) {
      return x.el;
    } else {
      return x.remaining.get(index - 1);
    }
  };

  curList.remove = function(index) {
    if(index === 0) {
      return curList.remaining;
    } else {
      return List({remaining: curList.remaining.remove(index - 1), el: curList.el});
    }
  }

  return curList;
}
