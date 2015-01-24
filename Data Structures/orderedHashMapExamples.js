///////////////////////////////////////////////////////////////////////////////
// --------------------------------- Examples -------------------------------//
///////////////////////////////////////////////////////////////////////////////

// Expensive operation that shouldn't be done too many times
function getData(id) {
  var map = {
    1: "a",
    2: "b",
    3: "c",
    4: "d",
    5: "e",
    6: "f",
    7: "g",
    8: "h",
    9: "i",
    10: "j",
  };

  // Fake slow retrieval
  var i = 1000;
  while(--i);

  return map[id];
}

var h = new HashMap(3, getData);

console.log("-->", h.get(1));
console.log("-->", h.get(2));
console.log("-->", h.get(3));
console.log("-->", h.get(4));
console.log("-->", h.get(5));


var sum = 0;
for (var j = 0; j < 10; j++) {
  var start = Date.now();
  for (var i = 0; i < 1000000; i++) {
    getData(Math.floor(Math.random() * 10 + 1));
  }
  sum += Date.now() - start;
}

console.log("1 ----->", sum / 10);

// 36x perf boost for exact sized cache
var sum = 0;
for (var j = 0; j < 10; j++) {
  var start = Date.now();
  var hh = new HashMap(10, getData);
  for (var i = 0; i < 1000000; i++) {
    hh.get(Math.floor(Math.random() * 10 + 1));
  }
  sum += Date.now() - start;
}

console.log("2 ----->", sum / 10);


// 2x perf boost (-ish) for half sized cache
var sum = 0;
for (var j = 0; j < 10; j++) {
  var start = Date.now();
  var hhh = new HashMap(5, getData);
  for (var i = 0; i < 1000000; i++) {
    var r = Math.floor(Math.random() * 10 + 1);
    hhh.get(r);
  }
  sum += Date.now() - start;
}

console.log("3 ----->", sum / 10);


var dataArray = [{
  id: 1
},{
  id: 2
},{
  id: 3
},{
  id: 4
},{
  id: 5
},{
  id: 6
},{
  id: 7
},{
  id: 8
},{
  id: 9
},{
  id: 10
}];

function hashFunction(obj) {
  return obj.id;
}

// 2x perf boost (-ish) for half sized cache + hash function
var sum = 0;
for (var j = 0; j < 10; j++) {
  var start = Date.now();
  var hhh = new HashMap(5, getData, hashFunction);
  for (var i = 0; i < 1000000; i++) {
    var r = Math.floor(Math.random() * 10);
    hhh.get(dataArray[r]);
  }
  sum += Date.now() - start;
}

console.log("4 ----->", sum / 10);