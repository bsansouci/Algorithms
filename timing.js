function Timer() {
	var timer = {};

	timer.time = function (f, dataGenerator, numberOfTimes) {
		var allData = [];
		if (!numberOfTimes)
			numberOfTimes = 1;

		while (numberOfTimes--) {
			var start = (new Date()).getTime();
			f(dataGenerator())
			var end = (new Date()).getTime();
			allData.push(end - start);
		}
		
		return allData;
	}
	
	timer.compareTime = function (f1, f2, dataGenerator, numberOfTimes) {
		var data1 = [];
		var data2 = []
		if (!numberOfTimes)
			numberOfTimes = 1;
		
		while (numberOfTimes--) {
			var dataGen1 = dataGenerator();
			var dataGen2 = dataGen1.slice();
			data1.push(timer.time(f1, function () { return dataGen1; })[0]);
			data2.push(timer.time(f2, function () { return dataGen2; })[0]);
		}

		return [data1, data2];
	}

	timer.averageOutArray = function (array) {
		var cumul = 0;
		var length = array.length;
		for (i = 0; i < length; i++) {
			cumul += array[i];
		}

		return (cumul / length);
	}
	return timer;
}
