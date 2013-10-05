var array = [4, 8, 3, 2, 1, 6, 1, 2, 5];
(function (array) {
	function sort(cur) {
		var length = cur.length;
		var middle = length / 2;

		if (length == 1)
			return cur;

		return merge(sort(cur.slice(0, middle)), sort(cur.slice(middle, length)));
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

	console.log(sort(array));
})(array);
