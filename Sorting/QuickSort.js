function quicksort(array) {
	var pivot = array[0];
	var left = [], right = [];

	if (array.length == 0) {
		return [];
	}


	for (var i = 1; i < array.length; i++) {
		if (array[i] > pivot) {
			right.push(array[i]);
		} else {
			left.push(array[i]);
		}
	}

	return quicksort(left).concat([pivot].concat(quicksort(right)));
}