var getFreqFrom = (function () {
	function reqFreq(acc) {
		if (acc.length > 20) {
			return acc;
		}
		acc.push(acc[acc.length - 1] / 1.059463094359295264561825)
		return reqFreq(acc);
	}
	return function (freq) {
		return reqFreq([freq]);
	}
})();