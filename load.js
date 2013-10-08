$(document).ready(function () {
	// First load the sorting algorithms, then loader the timer which 
	// will stress test them and time them
	loadScript("Sorting/MergeSort.js");
	loadScript("Sorting/QuickSort.js");

	loadScript("timing.js");
});

function loadScript(path) {
	var script = document.createElement('script');
	script.src = path;
	document.head.appendChild(script);
}