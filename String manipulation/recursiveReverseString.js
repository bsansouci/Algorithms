﻿function reverseString(string) {
	if (string.length == 0)
		return '';
	return reverseString(string.substring(1)) + string.charAt(0);
}