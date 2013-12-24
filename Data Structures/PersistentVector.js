var Vector = function(obj) {
  this.p = obj || {};

  this.add = function(a) {
    return new Vector({cur: a, prev: this});
  };

  this.get = function(a) {
    if(a === 0) {
      return this.p.cur;
    } else {
      return this.p.prev.get(a - 1);
    }
  };
}

var v = new Vector();

var v1 = v.add(1);
var v2 = v1.add(2);

console.log(v2.get(0));
