/**
 * Find maximum between a and b with conditional statements
 * @param  {int} a first number
 * @param  {int} b second number
 * @return {int}   the biggest of the two given number
 */
function max(a, b) {
  return a - ((a - b) & ((a - b) >> 31));
}

console.log(max2(22, 23));