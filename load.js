$(document).ready(function () {
	loadScript("Sorting/MergeSort.js");
	loadScript("Sorting/QuickSort.js");
});


function loadScript(path) {
	var script = document.createElement('script');
	script.src = path;
	document.head.appendChild(script);
}