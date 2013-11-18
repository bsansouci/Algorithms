function bubblesort(array) {
	var weSwapped = true;
	
	while (weSwapped) {
		weSwapped = false;
		for (var i = 0; i < array.length - 1; i++) {
			if (array[i] > array[i + 1]) {
				var tmp = array[i];
				array[i] = array[i + 1];
				array[i + 1] = tmp;
				weSwapped = true;
			}	
		}
	}

	return array;
}