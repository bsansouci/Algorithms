$(document).ready(function () {
	// First load the sorting algorithms, then loader the timer which 
	// will stress test them and time them
	loadScript(["timing.js", "Sorting/MergeSort.js", "Sorting/QuickSort.js"], function () {
		// Timer can time your algorithms, see which one is more efficient
		var timer = Timer();
		var allData = timer.compareTime(quicksort, mergesort, getRandomArray, 2);
		console.log("Mergesort data: '" + timer.averageOutArray(allData[1]) + "', Quicksort data: '" + timer.averageOutArray(allData[0]) + "'");
	});
});

function loadScript(path, callback) {
	function load(array, func) {
		var script = document.createElement('script');
		script.src = array;
		script.onload = script.onreadystatechange = function () {
			script.onreadystatechange = script.onload = null;
			func();
		}
		document.head.appendChild(script);
	}

	(function () {
		if (path.length > 0) {
			load(path.shift(), arguments.callee);
		} else {
			callback && callback();
		}
	})();
}

function getRandomArray() {
	var array = [];
	var length = 100000;
	for (var i = 0; i < length; i++) {
		array[i] = Math.round(Math.random() * length);
	}
	return array;
}