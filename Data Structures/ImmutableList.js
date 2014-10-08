/*jslint node: true */
"use strict";

function EmptyList() {}

EmptyList.prototype.toString = function() {
  return "()";
};

EmptyList.prototype.isEmpty = function() {
  return true;
};

EmptyList.prototype.length = function() {
  return 0;
};

EmptyList.prototype.push = function(x) {
  return new ListNode(x, this);
};

EmptyList.prototype.remove = function(x) {
  return this;
};

EmptyList.prototype.append = function(xs) {
  return xs;
};

function ListNode(value, next) {
  this.value = value;
  this.next = next;

}

ListNode.prototype.isEmpty = function() { return false; };

ListNode.prototype.toString = function() {
  var tmp = this;
  var str = "";
  while(tmp.next && !tmp.next.isEmpty()) {
    str += tmp.value + " ";
    tmp = tmp.next;
  }
  str += tmp.value;
  return "(" + str + ")";
};

ListNode.prototype.head = function() {
  return this.value;
};

ListNode.prototype.tail = function() {
  return this.next;
};

ListNode.prototype.length = function() {
  return 1 + this.next.length();
};

ListNode.prototype.push = function(x) {
  return new ListNode(x, this);
};

ListNode.prototype.remove = function(x) {
  if(this.value === x) {
    if(this.next) return this.next.remove(x);

    return new EmptyList();
  }

  var rest = null;
  if (this.next) rest = this.next.remove(x);

  // If the rest hasn't changed, we know that there are no other values that are equal to x
  if(this.next === rest) {
    return this;
  }
  return new ListNode(this.value, rest);
};

ListNode.prototype.append = function(xs) {
  return new ListNode(this.value, this.next.append(xs));
};

var original = new ListNode(10, new ListNode(11, new ListNode(12)));
var t2 = original.remove(11);
var t3 = t2.remove(12);
var t4 = t3.remove(10);

console.log(original.toString(), t2.toString(), t3.toString(), t4.toString());