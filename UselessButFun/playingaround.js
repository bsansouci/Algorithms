var DB = {
  1: encode(100),
  2: encode(101),
  3: encode(102),
  4: encode(103),
  5: encode(104)
};

function encode(unencoded) {
  if(!unencoded) return new Buffer('').toString('base64');
  return new Buffer(unencoded.toString()).toString('base64');
}

function decode(encoded) {
  return new Buffer(encoded || '', 'base64').toString('utf8');
}

function lookupInterval (start, end, db) {
  var buffer = [];
  for(var i in db) {
    if(i >= end) break;
    if(i >= start) {
      buffer.push(db[i]);
    }
  }
  return buffer.map(decode).map(function(x) {
    return parseInt(x);
  });
}

function applyRule (fn, db) {
  var buffer = [];
  for(var i in db) {

  }
  return buffer.map(decode).map(function(x) {
    return parseInt(x);
  });
}


for (var i = 0; i < 4000000; i++) {
  DB[i] = encode("abc" + i);
}

var time = Date.now();
for (var i in DB) {
  var s = DB[i];
}
var diff1 = Date.now() - time;

time = Date.now();
for (var i in DB) {
  var s = decode(DB[i]);
}
var diff2 = Date.now() - time;

console.log(diff1, diff2);