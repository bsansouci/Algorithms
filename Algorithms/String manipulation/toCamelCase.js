function toCamelCase(str) {
	return (str || '').replace(/([\-_][a-zA-Z])/g, function (m) {
		return m.toUpperCase().replace(/[\-_]/, '');
	});
}

console.log(toCamelCase("this_is_a_variable_name_that_is_long"));