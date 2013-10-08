(function () {
	var array = [4, 8, 3, 2, 1, 6, 1, 2, 5];

	function mergesort(array) {
		var length = array.length;
		var middle = length / 2;

		if (length == 1)
			return array;

		return merge(mergesort(array.slice(0, middle)), mergesort(array.slice(middle, length)));
	}

	function merge(left, right) {
		var result = [];

		while (left.length || right.length) {
			if (left.length && right.length) {
				if (left[0] > right[0])
					result.push(right.shift());
				else
					result.push(left.shift());
			} else if (left.length && !right.length)
				result.push(left.shift());
			else if (!left.length && right.length)
				result.push(right.shift());
		}
		return result;
	}

	console.log("Mergesort: array -> " + array + ", result -> " + mergesort(array));
})();