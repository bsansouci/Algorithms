function inplacequicksorthelper(array, left, right) {
	if (left >= right) {
		return;
	}

	var pivot = array[right];

	var newLeft = left, newRight = right;
	while (newLeft != newRight) {
		if (array[newLeft] < pivot) {
			newLeft++;
		} else {
			array[newRight] = array[newLeft];
			array[newLeft] = array[newRight - 1];
			newRight--;
		}
	}
	array[newRight] = pivot;

	inplacequicksorthelper(array, left, newRight - 1);
	inplacequicksorthelper(array, newRight + 1, right);

	return array;
}
function inplacequicksort(array) {
	if (array.length <= 1) {
		return array;
	}
	return inplacequicksorthelper(array, 0, array.length - 1);
}