function bucketsort (data, bucketSize, min, max) {
  var sortedData = [];
  for (var i = min; i < max; i += bucketSize) {
    sortedData.push([]);
  }
  for (var i = 0; i < data.length; i++) {
    sortedData[data[i].rank - min].push(data[i]);
  }
  return sortedData;
}

function find (data, query, rank) {

  if(rank) {
    var min = data[0][0].rank;
    if(rank > data.length + min) {
      return null;
    }
    return data[rank - min];
  }

  for (var i = 0; i < data.length; i++) {
    for (var j = 0; j < data[i].length; j++) {
      if(data[i][j].data === query) {
        return data[i][j];
      }
    }
  }
}

var a = bucketsort([
  {rank: 1, data: "yo"},
  {rank: 2, data: "yo2"},
  {rank: 3, data: "yo3"},
  {rank: 4, data: "yo4"},
  {rank: 1, data: "yolo"},
  {rank: 2, data: "yolo2"}],
  1,
  1,
  5);

console.log(a);
