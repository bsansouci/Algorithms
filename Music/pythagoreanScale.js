function testMajorThirds(freq) {
	var proportions = [];
	var length = freq.length;
	for (var i = 0; i < length; i++) {
		var one = freq[i];
		var two = freq[((i + 4) % length)] / (Math.floor((i + 4) / length) + 1);
		console.log(one + "/" + two + " = " + (one / two));
		//proportions.push(freq[i] / (freq[((i + 4) % (length - 1))] / (Math.floor((i + 4) / (length - 1)) + 1)));
	}
	return proportions;
}
function testMinorThirds(freq) {
	var proportions = [];
	var length = freq.length;
	for (var i = 0; i < length; i++) {
		var one = freq[i];
		var two = freq[((i + 3) % (length))] / (Math.floor((i + 3) /(length)) + 1);

		console.log(one + "/" + two + ": " + (one / two));
		//proportions.push(freq[i] / (freq[((i + 3) % length)] / (Math.round((i + 3) / length) + 1)));
	}
	return proportions;
}

var scaleToTest = [528,495,475.2,440,422.4,396,371.25,352,330,316.8,297,275];