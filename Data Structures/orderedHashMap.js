/**
 * Ordered HashMap. This implementation uses a circular buffer for keeping
 * track of the order. At first I used a linked list because it seemed to make
 * sense to keep track of the head and tail, but I quickly realized that a
 * circular would avoid some allocation on set operations.
 *
 * @param {Number} maxSize       The maximum allowed size of the cache
 * @param {id => data} getData   Function used to get the data on cache miss
 * @param {id => Number} hashFunction   a hashfunction for IDs
 */
function HashMap(maxSize, getData, hashFunction) {
  var map = {};
  var head = 0;
  var tail = 0;
  var size = 0;
  var maxSizeMinusOne = maxSize - 1;
  var buffer = new Array(maxSize);

  /**
   * Given the id of some piece of data it will try to retrieve from the local
   * map. If it can't find it, it will retrieve thanks to the getData function
   * and push it inside the hashmap
   *
   * @param  {[Any]} id ID of the data to get from the hashmap
   * @return {[Any]}    The data retrieved from the hashmap (or from getData)
   */
  function _getNoHash(id) {
    var o = map[id];
    if(!o) {
      o = getData(id);

      // I used to do:
      // if(size === maxSize) delete map[popFromFront()];
      //
      // ...but I realized that it was very slow compared to just setting the
      // property to null (x2 perf boost when setting to null)
      if(size === maxSize) map[popFromFront()] = null;
      map[id] = o;
      pushToBack(id);
    }

    return o;
  }
  // Same as above but we hash the ID before using it
  function _getWithHash(id) {
    var hashedID = hashFunction(id);
    var o = map[hashedID];
    if(!o) {
      // We pass to getData the hashedID not the ID
      // TODO: check which one is better, pass in the ID or the hashed ID
      o = getData(hashedID);
      if(size === maxSize) map[popFromFront()] = null;
      map[hashedID] = o;
      pushToBack(hashedID);
    }

    return o;
  }

  /**
   * Will push the give data inside the hashmap.
   *
   * @param {[type]} id ID of the data
   * @param {[type]} d  Piece of data given to push inside the hashmap
   */
  function _setNoHash(id, d) {
    if(map[id] === d) return;

    if(size === maxSize) map[popFromFront()] = null;
    map[id] = d;
    pushToBack(id);
  }
  // Same as above but we hash the ID before using it
  function _setWithHash(id, d) {
    var hashedID = hashFunction(id);
    if(map[hashedID] === d) return;

    if(size === maxSize) map[popFromFront()] = null;
    map[hashedID] = d;
    pushToBack(hashedID);
  }

  // different functions depending on the hashFunction
  if(!hashFunction) {
    this.get = _getNoHash;
    this.set = _setNoHash;
  } else {
    this.get = _getWithHash;
    this.set = _setWithHash;
  }

  /////////////////////////////////////////////////////////////////////////////
  // ---------------------------- Helper functions --------------------------//
  /////////////////////////////////////////////////////////////////////////////
  /**
   * Given the id of an object inside our hashmap, this functions pushes it
   * inside the give circular buffer (overwriting other values if it's size
   * exceeds the maximum)
   *
   * @param  {Any} id        id of an object inside the hashmap
   */
  function pushToBack(id) {
    tail = (tail + 1) & maxSizeMinusOne;
    buffer[tail] = id;
    // We only increase the size so much
    if(size < maxSize) ++size;
    else head = (head + 1) & maxSizeMinusOne; // If we just overwrote the head, we need to move it
  }

  /**
   * Will remove the oldest item put inside the circular buffer (the first pushed)
   *
   * @return {[Any]}        The first pushed ID
   */
  function popFromFront() {
    if(size === 0) return null;

    head = (head + 1) & maxSizeMinusOne;
    var ret = buffer[head];
    if(size > 0) --size;

    return ret;
  }
}