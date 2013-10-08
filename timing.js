(function () {
	var numberOfTests = 10;
	var file = [];
	var averageTimeMergesort = 0;
	var averageTimeQuicksort = 0;

	while (numberOfTests--) {
		var array = getRandomArray();
		var cur = [];
		var start = (new Date()).getTime();
		mergesort(array);
		var end = (new Date()).getTime();
		var time = (end - start);
		cur.push("Mergesort: " + time + "ms");
		averageTimeMergesort += time;

		start = (new Date()).getTime();
		quicksort(array);
		end = (new Date()).getTime();
		var time = (end - start);
		cur.push("Mergesort: " + time + "ms");
		averageTimeQuicksort += time;
		file.push(cur);
	}

	console.log("Quicksort: " + averageTimeQuicksort / 10 + "ms, Mergesort: " + averageTimeMergesort / 10 + "ms");
})();

function getRandomArray() {
	var array = [];
	var length = 100000;
	for (var i = 0; i < length; i++) {
		array[i] = Math.random() * length;
	}
	return array;
}
