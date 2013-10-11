function Timer() {
	// We declare the timer which will be the object returned by this function
	// it has 3 functions: time(algorithmToTest, dataGenerator, numberOfTimes), 
	// compareTime (arrayOfData, dataGenerator, numberOfTimes) and averageOutArray (arrayOfData)
	var timer = {};

	timer.time = function (f, dataGenerator, numberOfTimes) {
		var allData = [];

		if (!numberOfTimes) {
			numberOfTimes = 1;
		}
		
		for (var i = 0; i < numberOfTimes; i++) {
			var start = (new Date()).getTime();
			console.log(f(dataGenerator()));
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
				// That explains the .slice()
				data.push(timer.time(f, function () { return dataGen[j].slice(); })[0]);
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
