$(document).ready(function () {
	// First load the sorting algorithms, then loader the timer which 
	// will stress test them and time them
	loadScript(["lib/timing.js", "Sorting/MergeSort.js", "Sorting/QuickSort.js"], function () {
		// Timer can time your algorithms, see which one is more efficient
		var timer = Timer();
		var allData = timer.compareTime([quicksort, mergesort], getRandomArray, 10);
		console.log("50 tries of -> Mergesort data: " + timer.averageOutArray(allData[1]) + "ms, Quicksort data: " + timer.averageOutArray(allData[0]) + "ms");
	});
});

function getRandomArray() {
	var array = [];
	var length = 100000;
	for (var i = 0; i < length; i++) {
		array[i] = Math.round(Math.random() * length);
	}
	return array;
}