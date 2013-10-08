(function () {
	var array = [4, 8, 3, 2, 1, 6, 1, 2, 5];

	function quicksort(array) {
		if (array.length <= 1)
			return array;

		var x = getRandomElement(array);
		var pivot = array[x];
		array.splice(x, 1);

		var left = [];
		var right = [];

		while (array.length > 0) {
			var num = array[0];
			array.splice(0, 1);
			if (num < pivot)
				left.push(num);
			else
				right.push(num);
		}

		return merge(quicksort(left), pivot, quicksort(right));
	}
	function merge(left, x, right) {
		var array = [];
		var i = 0;
		var lleft = left.length;
		while (i < lleft) {
			array[i] = left[i];
			i++;
		}

		array[left.length] = x;

		i = 0;
		var lright = right.length;
		while (i < lright) {
			array[i + lleft + 1] = right[i];
			i++
		}

		return array;
	}
	function getRandomElement(array) {
		return Math.round(Math.random() * (array.length - 1));
	}

	console.log("Quicksort: array -> " + array + ", result -> " + quicksort(array));
})();