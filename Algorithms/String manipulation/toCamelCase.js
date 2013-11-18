function toCamelCase(str) {
	return (str || '').replace(/([\-_][a-zA-Z])/g, function (m) {
		return m.toUpperCase().replace(/[\-_]/, '');
	});
}