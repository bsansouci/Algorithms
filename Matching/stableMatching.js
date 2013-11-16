var stableMatching = function(men, women) {
	var menList, womenList;

	// Initializa all the values to -1
	menList = Array.apply(null, new Array(men.length)).map(Number.prototype.valueOf,-1);
	womenList = Array.apply(null, new Array(men.length)).map(Number.prototype.valueOf,-1);

	var notDone = true;
	while(notDone) {
		notDone = false;
		for (var curMan = 0; curMan < men.length; curMan++) {
			if(menList[curMan] != -1)
				continue;

			for (var j = 0; j < women.length; j++) {
				var curWoman = men[curMan][j];
				if (womenList[curWoman] == -1) {
					makeCouple(curMan, curWoman);
				} else {
					var prevMan = womenList[curWoman];
					for (var k = 0; k < men.length; k++) {
						// console.log(women[curWoman][k] + " " + prevMan);
						if (women[curWoman][k] === prevMan) {
							break;
						} else if (women[curWoman][k] === curMan) {
							menList[prevMan] = -1;
							makeCouple(curMan, curWoman);
							break;
						}
					}
				}
				// Here we check if the person isn't single anymore, we can continue
				if(menList[curMan] != -1)
					break;
			}
			notDone = true;
		}
	}

	for(var i = 0; i < menList.length; i++) {
		console.log("men " + i + " goes with " + menList[i]);
	}

	function makeCouple(man, woman){
		menList[man] = woman;
		womenList[woman] = man;
	}
};

stableMatching([[1, 0], [1, 0]], [[1, 0],[1, 0]]);
