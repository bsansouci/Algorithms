function validBraces(braces){
  var stack = [];
  return braces.split('').every(function(a) {
    var type = a === "(" || a === "{" || a === "[" ? true : false;
    if(type) {
      stack.push(a);
      return true;
    } else {
      if(getType(a) === getType(stack[stack.length - 1])) {
        stack.pop();
        return true;
      }
      return false;
    }
  }) && stack.length === 0;

  function getType(a) {
    return (a === "(" || a === ")" ? "round" : (a === "[" || a === "]" ? "square" : (a === "{" || a === "}" ? "curly" : "NOPE")));
  }
}
