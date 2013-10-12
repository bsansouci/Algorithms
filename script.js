$(document).ready(function () {
	// First load the sorting algorithms, then loader the timer which 
	// will stress test them and time them
	loadScript(["lib/timing.js", "Sorting/MergeSort.js", "Sorting/QuickSort.js", "Sorting/BubbleSort.js", "Sorting/InPlaceQuickSort.js"], function () {
		// Timer can time your algorithms, see which one is more efficient
		var timer = Timer();
		var NUM_OF_TIMES = 1;
		var allData = timer.compareTime([quicksort, mergesort, inplacequicksort], getRandomArray, NUM_OF_TIMES);
		console.log(NUM_OF_TIMES + " tries (with arrays of size 1000000) of -> Mergesort timing: " + timer.averageOutArray(allData[1]) + "ms, " +
			"Quicksort timing: " + timer.averageOutArray(allData[0]) + "ms, " +
			"In-place QuickSort timing: " + timer.averageOutArray(allData[2]) + "ms"
		);
	});
});

function getRandomArray() {
	var array = [];
	var length = 1000000;
	for (var i = 0; i < length; i++) {
		array[i] = Math.round(Math.random() * length);
	}
	return array;
}