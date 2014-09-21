var encryptedText = document.getElementsByClassName("dev_challenge_message word-break idle")[0].innerText;
var dictionary = {
  "0A": " ",
  "27" : "\r",
  "20" : "\n"
};

var question = document.getElementById("dev_challenge_input");
var button = document.getElementById("encrypt_answer");
var answer = document.getElementsByClassName("dev_challenge_message word-break encrypted")[0];

var string = ""

for (var i = 0; i < 256; i++) {
  // I'm pretty sure I could inject something in your database, because I think it parses for HTML so when I add < or > the post request returns an error
  if(i === 60 || i === 62) {
    continue;
  }
  string += String.fromCharCode(i);
}
var tests = string.split('');
// var tests = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890,.?/<>;:\"\\{}[]!@#$%^&*()_+~`" .split('');
var inc = 0;
function createDictionary () {
  MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
  var observer = new MutationObserver(function(mutations, observer) {
    if(inc >= tests.length) {
      return;
    }
    mutations.map(function(mut) {
      if(mut.type === "childList") {
        var node = mut.target;
        // Middle one is the hex value we want
        var text = node.textContent.split("4B")[1];
        console.log("New Div with " + text);
        dictionary[text] = tests[inc];
      } else if(mut.type === "characterData"){
        var text = mut.target.data.split("4B")[1];
        console.log("New content " + text);
        dictionary[text] = tests[inc];
      }
      inc++;
      setTimeout(fn, 100);
      console.log(dictionary);
    });
  });

  observer.observe(answer, {
    subtree: true,
    attributes: true,
    childList: true,
    characterData: true,
    attributeOldValue: true,
    characterDataOldValue: true
  });

  var fn = function () {
    if(inc < tests.length) {
      question.textContent = "a" + tests[inc] + "a";
      button.click();
    }
  };

  fn();
}

function decrypt (str) {
  var all = "";
  for (var i = 1; i < str.length; i += 2) {
    var tmp = str.charAt(i - 1) + str.charAt(i);
    // console.log(tmp)
    if(dictionary[tmp] === undefined) {
      console.log(tmp);
      continue;
    }
    all += dictionary[tmp];
  }
  return all;
}