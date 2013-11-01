function ipsBetween(start, end){
  function parse(arr) {
  	return arr.split(".").map(function(val) { 
  		return parseInt(val); 
  	}).reduce(function(acc, val, index) {
  		return acc + Math.pow(256, 3 - index) * val; 
  	}, 0);
  }

  return Math.abs(parse(start) - parse(end));
}

console.log(ipsBetween("10.0.0.0", "11.0.0.0"));