var Edge = function(cap, node) {
  this.cap = cap || 0;
  this.link = node;
}

var Node = function(key, edge) {
  this.adjacencyList = edge || [];
  this.key = key || 0;
}

function prim(node, length) {
  var vertices = [node];
  var edges = [];

  while(vertices.length < length) {
    var e = findMinEdge(vertices);
    vertices.push(e.link);
    edges.push(e);
  }

  return node;
}

var n = new Node(1, [new Edge(10, new Node(2, [])), new Edge(8, new Node(3, []))]);

console.log(prim(n, 3));
