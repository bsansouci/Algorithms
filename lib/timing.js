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
	
	timer.compareTime = function (array, dataGenerator, numberOfTimes) {
		if (!numberOfTimes)
			numberOfTimes = 1;

		var allData = [];
		var dataGen = [];
		var length = array.length;

		// First generate the data that will be used 
		for (var i = 0; i < numberOfTimes; i++) {
			dataGen.push(dataGenerator());
		}

		// Now use this data
		// First loop iterates through the functions
		// The second loop iterates through the data (to have comparable results)
		for (var i = 0; i < length; i++) {
			var f = array[i];
			var data = [];
			
			for (var j = 0; j < numberOfTimes; j++) {
				// You need to copy data in case the algorithm messes up with it
				var copyData = dataGen[j].slice();
				data.push(timer.time(f, function () { return copyData; })[0]);
			}
			
			allData.push(data);
		}
		return allData;
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
