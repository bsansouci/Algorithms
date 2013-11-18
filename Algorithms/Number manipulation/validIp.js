function isValid(str) {
  return str.indexOf(' ') < 0
  && str.split(".").length === 4
  && str.split(".").every(function(v) {
    var ip = parseInt(v);
    return (ip >= 0 && ip < 256);
  });
}
