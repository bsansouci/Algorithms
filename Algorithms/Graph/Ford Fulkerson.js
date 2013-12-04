var Edge = function(cap, node) {
  this.cap = cap || 0;
  this.link = node;
}

var Node = function(edge, role, key) {
  this.adjacencyList = edge || [];
  this.key = key || 0;
  this.role = role || "default";
}

function fordFulkerson (source) {
  var path = [];

  // Start by adding backward edges everywhere
  function addBackwardEdge(node) {
    if(!node || node.role === "sink") {
      return;
    }
    // Go through edges and add a backward edge, then recusive call on the
    // pointed edge
    for (var i = 0; i < node.adjacencyList.length; i++) {
      var e = new Edge(0, node);
      node.adjacencyList[i].backwardEdge = e;
      addBackwardEdge(node.adjacencyList[i].link);
    }
  }

  // do it from the source
  addBackwardEdge(source);
  path = getPathToSource(source, []);

  while(path.length != 0) {
    bottleneck = getBottleNeck(path);
    for(var i = 0; i < path.length; i++) {
      path[i].cap -= bottleneck;
      path[i].backwardEdge.cap += bottleneck;
    }
    path = getPathToSource(source, []);
  }

  function getPathToSource(node, acc) {
    if(!node) {
      return [];
    }

    if(node.role === "sink") {
      return acc;
    }

    for (var i = 0; i < node.adjacencyList.length; i++) {
      if(node.adjacencyList[i].cap > 0) {
        acc.push(node.adjacencyList[i]);
        var r = getPathToSource(node.adjacencyList[i].link, acc.slice());
        if(r.length !== 0) {
          return r;
        }
        acc.pop();
      }
    }

    if(acc)
      acc.pop();
    return [];
  }

  function getBottleNeck(list) {
    if(!list) {
      return null;
    }

    var min = list[0].cap;
    for (var i = 0; i < list.length; i++) {
      if(list[i].cap < min)
        min = list[i].cap;
    }
    return min;
  }

  var maxFlow = 0;
  for(var i = 0; i < source.adjacencyList.length; i++) {
    maxFlow += source.adjacencyList[i].backwardEdge.cap;
  }
  return maxFlow;
}


var T = new Node([], "sink");
var S = new Node([new Edge(10, new Node([new Edge(5, T)])), new Edge(100, new Node([new Edge(1, T)]))], "source");

console.log("Max flow is " + fordFulkerson(S));
