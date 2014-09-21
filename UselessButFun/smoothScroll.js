var DIV = document.getElementsByClassName("book-preview lazy-tithe_amodernfaerietale")[0];

var SCROLL = [];
var PREV = 0;
var FPS = 60;

DIV.addEventListener('wheel', handleScroll);
DIV.addEventListener('DOMMouseScroll', handleScroll);
DIV.addEventListener('mousewheel', handleScroll);

function handleScroll(e){
  var dScroll = -e.wheelDeltaY;
  if(DIV.scrollTop + dScroll >= DIV.scrollHeight) {
    return;
  }

  var buffer = [];
  if(SCROLL.length > 0) {
    var tmp = interpolation(SCROLL[0], dScroll).concat(SCROLL);
    for (var i = 0; i < tmp.length - 1; i += 2) {
      buffer.push(tmp[i]);
    }
  } else {
    buffer = interpolation(this.scrollTop, dScroll);
    window.requestAnimationFrame(loop);
  }
  SCROLL = buffer;
}

function interpolation (prev, dS) {
  var newScroll = prev + dS;
  var inc = dS / FPS;
  var time = 1;
  var totalFrames = FPS * time;
  var buffer = [];
  for (var i = totalFrames-1; i >= 0; i--) {
    // buffer.push(prev + easeInCubic(i, 0, dS, totalFrames));
    buffer.push(prev + i*inc);
  }
  return buffer;
}

// function interpolation (prev, dS) {
//   var newScroll = prev + dS;
//   var inc = dS / FPS;
//   var buffer = [];
//   for (var i = FPS; i >= 0; i--) {
//     buffer.push(prev - i*inc);
//   }
//   return buffer;
// }

function easeInCubic(t, b, c, d) {
  return c * Math.pow (t/d, 3) + b;
}

function loop(){
  if(SCROLL.length > 0){
    var v = SCROLL.pop();
    if(v <= DIV.scrollHeight) {
      DIV.scrollTop = v;
    } else {
      SCROLL = [];
    }
    window.requestAnimationFrame(loop);
  }
}


loop();
