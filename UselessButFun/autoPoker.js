/**
 * AUTOPOKER - Auto pokes back people that pokes you
 */

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function(mutations, observer) {
  mutations.map(function(mut) {
    var nodes = mut.addedNodes;
    for(var j=0; j < nodes.length; j++) {
      if(nodes[j].getElementsByClassName) {
        var arr = nodes[j].getElementsByClassName('_42ft _4jy0 _4jy3 _4jy1');
        if(arr.length > 0) {
          arr[0].click();
          // for(var i=0; i < arr.length; i++) {
          //   var a = arr[i].getElementsByTagName('a');
          //   console.log(a);
          //   // if(a.length > 0) {
          //   //   a[0].click();
          //   // }
          // }
        }
      }
    }
  });
});

observer.observe(document.getElementById("poke_live_new"), {
  subtree: true,
  attributes: true,
  childList: true,
  characterData: true,
  attributeOldValue: true,
  characterDataOldValue: true
});

/**
 * AUTOPOKER - Pokes people that FB suggests you should poke
 */
var poke = document.getElementsByClassName('_42ft _4jy0 _4jy3 _4jy1');
// var arr = poke.getElementsByClassName('mls');
var frames = [];
if(poke.length > 0) {
  for(var i=0; i < poke.length; i++) {
    frames.push(poke[i]);
  }
}
bla();
function bla() {
  console.log(frames);
  if(frames.length > 0) {
    frames.pop().click();
    setTimeout(bla, 1000);
  }
}


// AUTTOPOKE MORE ON PROFILE
// document.getElementsByClassName("fbTimelineActionSelectorButton uiSelectorButton uiButton uiButtonOverlay uiButtonLarge uiButtonNoText")[0].click()
// document.getElementById("profile_action_poke").getElementsByTagName("a")[0].click()
