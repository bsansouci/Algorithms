var encryptedText = document.getElementsByClassName("dev_challenge_message word-break idle")[0].textContent;
var dictionary = {};

var encryptedString = "TnB2I2l7a3mBfXJ0enQug3hyhjN3doQ3en46fouSjJOFhUKGk5qUm5tVIGJwZyRzdXsoboBwfoaCd3l/eTOIfXeLOHyJkIqRkT+DgpBDhopGipeebnVnZw==";

var question = document.getElementById("dev_challenge_input");
var button = document.getElementById("encrypt_answer");
var answer = document.getElementsByClassName("dev_challenge_message word-break encrypted")[0];

var tmp = ""

for (var i = 33; i < 256; i++) {
  // I'm pretty sure I could inject something in your database, because I think it parses for HTML so when I add < or > the post request returns an error
  if(i === 60 || i === 62) {
    continue;
  }
  tmp += String.fromCharCode(i);
}
var tests = tmp.split('');


function createDictionary (str) {
  var inc = 0;
  var curWord = "";
  var possibleMatcheCount = 0;

  var stack = [];

  MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
  var observer = new MutationObserver(function(mutations, observer) {
    if(inc >= tests.length) {
      return;
    }
    mutations.map(function(mut) {
      if(mut.type === "childList") {
        var node = mut.target;
        // Middle one is the hex value we want
        var text = node.textContent.charAt(possibleMatcheCount);
        console.log("New Div with " + node.textContent + " cut to be " + text);
        // dictionary[text] = tests[inc];
        if(!dictionary[text]) {
          dictionary[text] = [tests[inc]];
        } else {
          dictionary[text].push(tests[inc]);
        }
      } else if(mut.type === "characterData"){
        var text = mut.target.data.charAt(possibleMatcheCount);
        console.log("New content " + mut.target.data + " cut to be " + text);

        // dictionary[text] = tests[inc];

        if(!dictionary[text]) {
          dictionary[text] = [tests[inc]];
        } else {
          dictionary[text].push(tests[inc]);
        }
      }
      inc++;
      // buildDictionary(stack.pop());
      buildDictionary();
    });
  });

  observer.observe(answer, {
    subtree: true,
    childList: true,
    characterData: true,
  });


  function Letter (str) {
    possibleMatcheCount = str.length;
    curWord = str;
    inc = 0;
    buildDictionary();
  };

  function buildDictionary (callback) {
    if(inc < tests.length) {
      question.textContent = curWord + tests[inc];
      button.click();
    } else {
      console.log(dictionary);
      var possibleMatches = dictionary[encryptedString[possibleMatcheCount]];
      // var bestChoice = possibleMatches.reduce(function(acc, val, index) {
      //   if(val.charCodeAt(0))
      // }, "");
      if(callback) {
        callback();
      }
    }
  };
  Letter(question.textContent);
  buildDictionary(recursive);
  var result;
  function recursive () {
    console.log("Going DOWN");

    var possibleMatches = dictionary[encryptedString[possibleMatcheCount]];
    if(!possibleMatches) {
      return null;
    }
    
    function loop (index) {
      if(index < possibleMatches.length) {
        console.log("Going SIDE");
        curWord += possibleMatches[index];
        possibleMatcheCount++;
        // var incCopy = inc;
        inc = 0;
        var copy = dictionary;
        dictionary = {};
        buildDictionary(function () {
          var res = recursive();
          if(res) {
            result = res;
            return;
          }
          possibleMatcheCount--;
          curWord = curWord.substring(0, curWord.length - 1);
          dictionary = copy;
          // inc = incCopy;
          loop(++index);
        });
      }
    }

    loop(0);

    // dictionary = copy;
    // inc = incCopy;
    // return curWord;
    // possibleMatcheCount++;
  }
}