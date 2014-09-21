function anagramsSort (data) {
  if(data.length === 0) {
    return [];
  }

  if(data.length === 1) {
    return data;
  }

  var midPoint = Math.round(data.length / 2);
  var left = data.slice(0, midPoint);
  var right = data.slice(midPoint, data.length);

  return merge(anagramsSort(left), anagramsSort(right));
}


function merge (left, right) {
  var merged = [];

  while(left.length && right.length) {
    if(getPriority(left[0]) < getPriority(right[0])) {
      merged.push(left.shift());
    } else {
      merged.push(right.shift());
    }
  }
  return merged.concat(left.length ? left : right);

  function getPriority (str) {
    var result = 0;
    for (var i = 0; i < str.length; i++) {
      result += str.charCodeAt(i);
    }
    return result;
  }
}


console.log(anagramsSort(["aaa", "aab", "aba", "aac", "baa", "eric", "bla", "rice"]))
