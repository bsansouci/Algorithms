var Node = function(n, a) {
  this.next = n;
  this.data = a;
  return this;
};

function addReverseLinkedLists(l1, l2) {
  var tmp = l1;
  var cummulative = 0;
  var exponent = 1;
  while(tmp) {
    cummulative += tmp.data * exponent;
    exponent *= 10;
    tmp = tmp.next;
  }

  tmp = l2;
  exponent = 1;
  while(tmp) {
    cummulative += tmp.data * exponent;
    exponent *= 10;
    tmp = tmp.next;
  }

  var num = cummulative.toString().split("");
  var list = new Node(null, parseInt(num[num.length - 1]));
  tmp = list;
  for (var i = num.length - 2; i >= 0 ; i--) {
    tmp.next = new Node(null, parseInt(num[i]));
    tmp = tmp.next;
  }
  return list;
}



function addLinkedLists(l1, l2) {
  var tmp = l1;
  var cummulative = 0;
  var exponent = 1;
  while(tmp) {
    cummulative += tmp.data * exponent;
    exponent *= 10;
    tmp = tmp.next;
  }

  tmp = l2;
  exponent = 1;
  while(tmp) {
    cummulative += tmp.data * exponent;
    exponent *= 10;
    tmp = tmp.next;
  }

  var num = cummulative.toString().split("");
  var list = new Node(null, parseInt(num[0]));
  tmp = list;
  for (var i = 1; i < num.length ; i++) {
    tmp.next = new Node(null, parseInt(num[i]));
    tmp = tmp.next;
  }
  return list;
}


var l1 = new Node(new Node(new Node(null, 9), 0), 0);
var l2 = new Node(new Node(new Node(null, 1), 0), 0);

console.log(addReverseLinkedLists(l1, l2));
console.log(addLinkedLists(l1, l2));
