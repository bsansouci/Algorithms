var tree = document.getElementsByClassName("mainTreeRoot")[0].getElementsByClassName("children")[0];
var mainLists = Array.prototype.slice.call(tree.getElementsByClassName("project")).map(createObj);

function createObj(val) {
  if(!val) {
    return null;
  }
  // if(val.className.split("open").length === 1) {
  //   val.className += " open";
  // }
  return {
    name: val.getElementsByClassName("name")[0].getElementsByClassName("content")[0].textContent,
    children: Array.prototype.slice.call(val.getElementsByClassName("children")[0].getElementsByClassName("project")).map(createObj)
  }
}


