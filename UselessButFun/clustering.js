var k1 = [{
  color: "red",
  size: "small",
  texture: "soft"
},{
  color: "green",
  size: "small",
  texture: "soft"
},{
  color: "green",
  size: "large",
  texture: "soft"
}];

var k2 = [{
  color: "red",
  size: "medium",
  texture: "hard"
},{
  color: "orange",
  size: "medium",
  texture: "hard"
},{
  color: "green",
  size: "medium",
  texture: "hard"
}];

var k3 = [{
  color: "blue",
  size: "large",
  texture: "hard"
},{
  color: "blue",
  size: "medium",
  texture: "hard"
}];

function getQuantities(vector) {
  var template = vector[0];
  var quantities = {};
  for(var prop in template) {
    for (var i = 0; i < vector.length; i++) {
      if(!quantities[prop]) {
        quantities[prop] = {};
      }
      if(!quantities[prop][vector[i][prop]]) {
        quantities[prop][vector[i][prop]] = 0;
      }

      ++quantities[prop][vector[i][prop]];
    }
  }
  return quantities;
}

function getClusterEntropyHelper(vector, quantities) {
  var totalEntropy = 0;
  var template = vector[0];
  for(var prop in template) {
    for(var poss in quantities[prop]) {
      var p = quantities[prop][poss] / vector.length;
      var columnEntropy = p*Math.log(p)/Math.log(2);
      totalEntropy += columnEntropy;
    }
  }

  // return the negative of this
  return -totalEntropy;
}

function getClusterEntropy(c) {
  return getClusterEntropyHelper(c, getQuantities(c));
}

function getTotalClusteringEntropy(allClusters) {
  var totalNumOfClusters = allClusters.reduce(function(acc, val, i) {
    return acc + val.length;
  }, 0);

  var totalEntropy = allClusters.reduce(function(acc, val, i) {
    var weight = val.length / totalNumOfClusters;
    return acc + weight * getClusterEntropy(val);
  }, 0);
  return totalEntropy;
}

function getRandomElement(allElements) {
  return allElements[Math.round(Math.random() * (allElements.length - 1))];
}

function putInRandomCluster(el, allClusters) {
  var c = getRandomElement(allClusters);
  c.push(el);
}

function randomFill(allClusters, allElements) {
  while(allElements.length > 0) {
    var el = allElements[allElements.length - 1];
    allElements.length--;
    putInRandomCluster(el, allClusters);
  }

  return allClusters
}

function contains(set, cur) {
  return set.reduce(function(acc, val) {
    return acc || val === cur;
  }, false);
}

function generateRandomSet(allElements, size) {
  var set = [];
  while(set.length < size) {
    var cur = getRandomElement(allElements);
    if(contains(set, cur)) {
      continue;
    }
    set.push(cur);
  }

  return set;
}

function getDiff(e1, e2) {
  var total = 0;
  for(var prop in e1) {
    if(e1[prop] !== e2[prop]) {
      total++;
    }
  }

  return total;
}

function getSetDifference(set) {
  var total = 0;
  for (var i = 0; i < set.length; i++) {
    for (var j = 0; j < set.length; j++) {
      if(i === j) {
        continue;
      }
      total += getDiff(set[i], set[j]);
    }
  }

  return total;
}

function firstStep(allClusters, allElements) {
  var emptyClusters = allClusters.slice();
  var maxDiff = -1;
  var bestSet, set, setDiff;

  // We loop 10 times and get the bestSet we could find
  for (var i = 0; i < 10; i++) {
    set = generateRandomSet(allElements, allClusters.length);
    setDiff = getSetDifference(set);
    if(setDiff > maxDiff) {
      maxDiff = setDiff;
      bestSet = set;
    }
  }

  // We put one element per cluster from the bestSet
  for (var i = 0; i < bestSet.length; i++) {
    allClusters[i].push(bestSet[i]);
  }

  return allClusters;
}

function secondStep(allClusters, allElements) {
  var insertedElements = [];
  for (var i = 0; i < allClusters.length; i++) {
    insertedElements.push(allClusters[i][0]);
  }

  while(insertedElements.length < allElements.length) {
    var el = getRandomElement(allElements);
    if(contains(insertedElements, el)) {
      continue;
    }

    var bestCluster = null, bestEntropy = Infinity, tmp;
    for (var i = 0; i < allClusters.length; i++) {
      allClusters[i].push(el);
      tmp = getTotalClusteringEntropy(allClusters);
      if(tmp < bestEntropy) {
        bestEntropy = tmp;
        bestCluster = allClusters[i];
      }
      allClusters[i].pop();
    }

    bestCluster.push(el);
    insertedElements.push(el);
  }

  return allClusters
}

function removeElement(arr, el) {
  var first = arr.splice(0, arr.indexOf(el) + 1);
  first.pop();
  return first.concat(arr);
}

function optimizerFirstPass(allClusters, allElements) {
  for (var k = 0; k < 100; k++) {
    for (var i = 0; i < allClusters.length; i++) {
      var el = getRandomElement(allClusters[i]);
      allClusters[i] = removeElement(allClusters[i], el);
      var tmp, bestCluster, bestEntropy = Infinity;
      for (var j = 0; j < allClusters.length; j++) {
        allClusters[j].push(el);
        tmp = getTotalClusteringEntropy(allClusters);
        if(tmp < bestEntropy) {
          bestEntropy = tmp;
          bestCluster = allClusters[j];
        }
        allClusters[j].pop();
      }

      bestCluster.push(el);
    }
  }

  return allClusters;
}

function Cluster() {
  // this.allElements = [];
}

Cluster.prototype = Array.prototype;

Cluster.prototype.cacheQuantities = function() {
  console.log(this)
}

// Cluster.prototype.push = function push(el) {
//   this.allElements.push(el);
//   return this;
// }

// Cluster.prototype.pop = function pop() {
//   var e = this.allElements[this.allElements.length - 1];
//   this.allElements.length--;
//   return e;
// }

var allClusters = [[], [], []];
var allElements = [{
  color: "red",
  size: "small",
  texture: "soft"
},{
  color: "green",
  size: "small",
  texture: "soft"
},{
  color: "green",
  size: "large",
  texture: "soft"
},{
  color: "red",
  size: "medium",
  texture: "hard"
},{
  color: "orange",
  size: "medium",
  texture: "hard"
},{
  color: "green",
  size: "medium",
  texture: "hard"
},{
  color: "blue",
  size: "large",
  texture: "hard"
},{
  color: "blue",
  size: "medium",
  texture: "hard"
}];

function generateRandomData(possibilities, size) {
  var set = [];
  for (var i = 0; i < size; i++) {
    var obj = {};
    for(var prop in possibilities) {
      obj[prop] = getRandomElement(possibilities[prop]);
    }
    set.push(obj);
  }

  return set;
}

var poss = {
  color: ["red", "blue", "green", "orange"],
  size: ["small", "medium", "large"],
  texture: ["soft", "hard"]
}

var DATA = generateRandomData(poss, 100);

var initialClusters = firstStep(allClusters, DATA);

var cl = secondStep(initialClusters, DATA);
var prevEntropy = getTotalClusteringEntropy(cl);

var opt = optimizerFirstPass(cl, DATA);
var newEntropy = getTotalClusteringEntropy(opt);
opt.map(function(val) {
  console.log(val);
});
console.log("Decrease in Entropy of", newEntropy - prevEntropy, "down to", newEntropy);
