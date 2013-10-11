function quicksortinplace(array, left, right) {
	if (!left) {
		left = 0;
	}
	if (!right) {
		right = array.length - 1;
	}

	if (left >= right) {
		return array;
	}

	var pivot = array[(left + right) / 2];
	var notDone = false;
	var leftNew = left, rightNew = right;

	do {
		while (array[leftNew] < pivot) {
			leftNew++;
		}
		while (array[rightNew] >= pivot) {
			rightNew--;
		}
		if (leftNew <= rightNew) {
			var tmp = array[leftNew];
			array[leftNew] = array[rightNew];
			array[rightNew] = tmp;
			notDone = true;
			leftNew++;
			rightNew--;
		}
	} while (leftNew <= rightNew);

	if (notDone) {
		quicksortinplace(array, left, rightNew);
		quicksortinplace(array, leftNew, right);
	}
	return array;
}