$(document).ready(function () {
	// First load the sorting algorithms, then loader the timer which 
	// will stress test them and time them
	loadScript(["lib/timing.js", "Sorting/MergeSort.js", "Sorting/QuickSort.js"], function () {
		// Timer can time your algorithms, see which one is more efficient
		var timer = Timer();
		var allData = timer.compareTime(quicksort, mergesort, getRandomArray, 2);
		console.log("Mergesort data: '" + timer.averageOutArray(allData[1]) + "', Quicksort data: '" + timer.averageOutArray(allData[0]) + "'");
	});
});