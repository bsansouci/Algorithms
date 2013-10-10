function mergesort(array) {
	var length = array.length;
	var middle = length / 2;

	if (length == 1)
		return array;

	return mergesort(array.slice(0, middle)).concat(mergesort(array.slice(middle, length)));
}