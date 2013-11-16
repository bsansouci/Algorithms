function getGeneration(cells, generations){
  console.log("Input: ");
  // console.log(htmlize(cells));
  var grid = getNewArray(cells);

  console.log(grid);

  for(var gen = generations; gen > 0; gen--) {
    var tmp = grid.map(function(arr) {
      return arr.slice();
    });
    for (var i = 0; i < grid.length; i++) {
      for (var j = 0; j < grid[i].length; j++) {
        var aliveNeighbours = getNeighbours(grid, i, j);
        // console.log("i: " + i + " j: " + j + " n: " + aliveNeighbours);
        if(grid[i][j] === 1) {
          if(aliveNeighbours < 2 || aliveNeighbours > 3)
            tmp[i][j] = 0;
        } else {
          if(aliveNeighbours === 3)
            tmp[i][j] = 1;
        }
      }
    }
    // console.log(grid + " " + tmp);
    grid = tmp;
    // console.log(htmlize(grid));
  }

  function getNewArray(array) {
    var grid = [];
    while(grid.push(new Array(array[0].length + 2)) < array.length + 2);

    for(var i = 0; i < grid.length; i++) {
      for(var j = 0; j < grid[0].length; j++) {
        if(i > 0 && i - 1 < array.length && j > 0 && j - 1 < array[0].length) {
          grid[i][j] = array[i - 1][j - 1];
        } else {
          grid[i][j] = 0;
        }
      }
    }
    return grid;
  }

  function checkOutOfBound(grid) {

  }

  function getNeighbours(cells, i, j) {
    var num = 0;
    var i1 = (i - 1);
    var i2 = (i + 1);
    var j1 = (j - 1);
    var j2 = (j + 1);
    var size = cells.length;

    // console.log(i1 + " " + i2 + " " + j1 + " " + j2);
    num += (i1 >= 0 && j1 >= 0 ? cells[i1][j1] : 0);
    num += (i1 >= 0 ? cells[i1][j] : 0);
    num += (i1 >= 0 && j2 < size ? cells[i1][j2] : 0);

    num += (j1 >= 0 ? cells[i][j1] : 0);
    num += (j2 < size ? cells[i][j2] : 0);

    num += (j1 >= 0 && i2 < size ? cells[i2][j1] : 0);
    num += (i2 < size ? cells[i2][j] : 0);
    num += (i2 < size && j2 < size ? cells[i2][j2] : 0);

    return num;
  }
  return cells;
}

var gliders = [
    [[1,0,0],
     [0,1,1],
     [1,1,0]],
    [[0,1,0],
     [0,0,1],
     [1,1,1]]
  ];

getGeneration(gliders[0], 1);
