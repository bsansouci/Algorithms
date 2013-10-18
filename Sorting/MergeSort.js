function mergesort(array) {
    var length = array.length,
        mid    = Math.floor(length / 2);
 
    if(length === 1 || length === 0) {
      return array;
    }
 
    return mergesortMerge(mergesort(array.slice(0, mid)), mergesort(array.slice(mid, length)));
 
  }


// Much cleaner solution
function mergesortMerge(left, right) {
	var sortedArray = [];

	while(left.length && right.length) {
		sortedArray.push(left[0] > right[0] ? right.shift() : left.shift());
	}
	return sortedArray.concat(left.length ? left : right);
}

// Previous solution, good but not beautiful
/*function mergesortMerge(left, right) {
    var result = [];
 
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
 
    while (left.length)
        result.push(left.shift());
 
    while (right.length)
        result.push(right.shift());
 
    return result;
}*/