/**
 * Makes a given constructor add a hidden field called __link
 *
 * @param  {Function} constructorFunc the object constructor
 * @return {Function}                 the new constructor with __link injected
 *                                    in the future instances
 */
function toIntrusive(constructorFunc) {
  var f = function() {};

  return function() {
    var args = Array.prototype.slice.call(arguments);
    var con = function() {
      return constructorFunc.apply(this, args);
    };
    con.prototype = constructorFunc.prototype;

    var obj = new con();

    obj.__link = {
      next: null, // Will point to an object
      prev: null, // Will point to a link
      data: obj   // Circular reference to increase iteration speed
    };
    return obj;
  };
}



/**
 * Intrusive LinkedList
 */
function iLinkedList() {
  // Head points to an object
  // Tail points to a link
  // This is to reduce the number of pointer indirection
  var head = null;
  var tail = null;
  var size = 0;

  this.push = function(obj) {
    var link = obj.__link;

    if(!(!link.next && !link.prev)) return;

    if(size === 0) {
      head = obj;
    } else {
      tail.next = obj;
      link.prev = tail;
    }
    tail = link;
    ++size;
  };

  this.remove = function(o) {
    if(size === 0) return null;

    var link = o.__link;

    // For the sake of consistency with pop
    if(!link.next && !link.prev) return null;

    if(size === 1) {
      head = null;
      tail = null;
    } else {
      if(head === o) {
        link.next.__link.prev = null;
        head = link.next;
      } else if (tail === link) {
        link.prev.next = null;
        tail = link.prev;
      } else {
        link.prev.next = link.next;
        link.next.__link.prev = link.prev;
      }
    }

    link.next = null;
    link.prev = null;
    --size;
    return o;
  };

  /**
   * Will remove the last element of the linked list and return it
   * @return {el} Tail of the linked list
   */
  this.pop = function() {
    return this.remove(tail.data);
  };

  /**
   * Will return the first occurance of an element such that fn(el) returns
   * true
   *
   * @param  {el => Boolean} function that will receive each element and return
   *                         true or false
   * @return {el}      The first occurance of the element such that fn(el)
   *                   returns true
   */
  this.find = function(fn) {
    var cur = tail;
    while(cur) {
      if(fn(cur.data)) return cur.data;
      cur = cur.prev;
    }

    return null;
  };

  /**
   * Will return an array of all the elements in the list in reverse order
   *
   * @return {[el]} An array made of all the elements in the linked list
   */
  this.collect = function() {
    return this.findAll(function() {return true;});
  };

  /**
   * Will return all the occurances of an element such that fn(el) returns true
   *
   * @param  {el => Boolean} fn function that will receive each element and
   *                              return true or false
   * @return {[el]}             Array of all elements on which fn(el)
   *                             returned true
   */
  this.findAll = function(fn) {
    var cur = tail;
    var arr = [];
    while(cur) {
      if(fn(cur.data)) arr.push(cur.data);
      cur = cur.prev;
    }

    return arr;
  };

  this.getSize = function() {
    return size;
  };
}