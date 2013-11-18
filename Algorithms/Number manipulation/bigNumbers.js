function add(a, b) {
  console.log("a:" + a + ", b:" + b);
  var cOld = 0, cNew = 0;
  var result = [];
  aa = a.split("").reverse();
  bb = b.split("").reverse();
  
  while(aa.length && bb.length) {
    var tmpA = parseInt(aa.shift()); // get first element (first digit => last element of string)
    var tmpB = parseInt(bb.shift());
    var sum = tmpA + tmpB;

    cNew = isBiggerThanTen(sum);

    cNew += isBiggerThanTen(sum % 10 + cOld);

    result.push((sum + cOld) % 10);
    cOld = cNew;
  }
  
  while(aa.length) {
    var tmpA = parseInt(aa.shift());

    cNew = isBiggerThanTen(tmpA + cOld);

    result.push((tmpA + cOld) % 10);
    cOld = cNew;
  }
  while(bb.length) {
    var tmpB = parseInt(bb.shift());
    cNew = isBiggerThanTen(tmpB + cOld);
    result.push((tmpB + cOld) % 10);
    cOld = cNew;
  }
  
  if(!aa.length && !bb.length && cOld != 0) {
    result.push(cOld);
  }

  //console.log(result.reverse().join(''));
  return result.reverse().join("");

  function isBiggerThanTen(num) {
    if(num > 9) {
      return Math.floor(num / 10);
    } else {
      return 0;
    }
  }
}

