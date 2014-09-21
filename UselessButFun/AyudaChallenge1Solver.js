// Note to David from Ayuda: I was going to push it to github, but then I realized that you guys might not want a solution to be made public, so I sent you the code directly.

/**
 * This is an auto solver for the challenge on the Ayuda website.
 * It will just try every possible ascii and ask for the encrypted version, then it will use all
 * this data to build a dictionary which maps encrypted to decrypted data.
 * Using this dictionary we decrypt the message automatically.
 */
(function () {
  // This is going to be used to have a mapping between encrypted char to non encrypted
  // This is like a hashmap
  var dictionary = {};

  var question = document.getElementById("dev_challenge_input");
  var button = document.getElementById("encrypt_answer");
  var answer = document.getElementsByClassName("dev_challenge_message word-break encrypted")[0];

  // This might be considered cheating
  var tmp = "";
  // Go through all ascii, make them into a string, then split it to get an array (so we get a nice O(1) access)
  for (var i = 0; i < 256; i++) {
    // when I add "<" or ">" the post request returns an error
    if(i === 60 || i === 62) {
      continue;
    }
    tmp += String.fromCharCode(i);
  }
  var tests = tmp.split('');

  // Inc is used to keep track of where we are in the test array (which variable is being 
  // evaluated)
  var inc = 0;
  function createDictionary () {
    // Ok this is a little weird but it works
    // What I do is I create a mutationObserver which will basically fire when the DOM is changed
    // a change can be either a childList (which is DOM insertion, here a <span>) or a 
    // characterData which is just injecting some text in a DOM element
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    var observer = new MutationObserver(function(mutations, observer) {

      // I map over the mutations (which is just in case we mutate multiple things at once)
      mutations.map(function(mut) {
        // We react the same way whatever the mutation type is, but there's a different syntax to 
        // access the injected text
        var text = "";
        if(mut.type === "childList") {
          text = mut.target.textContent.split("76")[1];
        } else if(mut.type === "characterData"){
          text = mut.target.data.split("76")[1];
        }

        // Removing some weird edge cases (like \n return 2720, we keep only 27)
        if(text) {
          text = text.substring(0, 2)
        }
        // Now add the tested letter at the key text (dictionary is just a key/value array, like 
        // a hashmap)
        dictionary[text] = tests[inc];

        // Increment inc so that when we call loop we won't look at the same character twice
        inc++;
        loop();
      });
    });

    // Setup the observer on the DOM element answer
    observer.observe(answer, {
      subtree: true,
      childList: true,
      characterData: true,
    });

    // First call
    loop();
  }

  // This is where the fun is.
  // We go through the test array and set the text of the DOM element question to be the
  // inc-th element in the test array and then we press the button, so that it sends the 
  // http request to the server and so that we get back an answer (which will be grabed by the 
  // observer)
  var loop = function () {
    if(inc < tests.length) {
      question.textContent = "\\" + tests[inc] + "\\";
      button.click();
    } else {
      console.log("Done cracking, trying result");

      // Get the encrypted text and decrypt it.
      var encryptedText = document.getElementsByClassName("dev_challenge_message word-break idle")[0].innerText;
      question.textContent = decrypt(encryptedText);
      button.click();
    }
  };

  // This is pretty straight forward, it will go through by packs of 2 characters and will
  // decrypt them using the dictionary that we created
  function decrypt (str) {
    var all = "";
    for (var i = 1; i < str.length; i += 2) {
      var tmp = str.charAt(i - 1) + str.charAt(i);

      // This might happen, we never know
      if(dictionary[tmp] === undefined) {
        continue;
      }
      all += dictionary[tmp];
    }
    return all;
  }

  createDictionary();
})();