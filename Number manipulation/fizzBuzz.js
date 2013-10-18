function getModNum(number) {
	number -= 1;
	var a = Math.floor(number / 3);
	var b = Math.floor(number / 5);
	var c = Math.floor(number / 15);
	return [a - c, b - c, c];
}