document.onkeydown = function() {
  getKeyPressed(event);
};
//global variables
var targetLetter;
var wins = 0;
var losses = 0;
var guessCount = 10;
var guesses = "";
var boot = false;
let letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const messages = [
  'press any key to play. <i id="keyboard-icon" class="fas fa-keyboard" onclick="doLayout()">',
  "Hmmm... Let me think...",
  "I've got my letter. Start guessing.",
  "Nope. Guess again!",
  "You've already guessed that letter! Guess Again!",
  "Sorry, but you're out of guesses! Game over.",
  "Nicely done! You win!"
];

function bootup() {
  window.setTimeout(function() {
    document.getElementById("message").textContent = messages[1];
    window.setTimeout(function() {
      document.getElementById("message").textContent = messages[2];
      start();
    }, 1000);
  }, 1000);

  boot = true;
}

function update() {
  document.getElementById("wins").textContent = wins.toString();
  document.getElementById("losses").textContent = losses.toString();
  document.getElementById("guesses-remaining").textContent = guessCount.toString();
  document.getElementById("guesses").textContent = guesses;
}

function start() {
  document.getElementById("letter-box").textContent = "";
  document.getElementById("letter-box").textContent = "?";
  targetLetter = letters[Math.floor(Math.random() * 25)];
  guessCount = 10;
  guesses = "";
  update();
}

function getKeyPressed(event) {
  var key = event.key;
  console.log(key);
  if (!boot) {
    bootup();
    return;
  }
  if (key === targetLetter) {
    document.getElementById("message").textContent = messages[6];
    wins++;
    document.getElementById("letter-box").textContent = "";
    document.getElementById("letter-box").textContent = targetLetter;
    update();
    window.setTimeout(function() {
      document.getElementById("message").innerHTML = messages[0];
      boot = false;
    }, 1500);
    return;
  }
  if (guesses.indexOf(key) != -1) {
    document.getElementById("message").textContent = messages[4];
    return;
  }

  if (letters.indexOf(key) == -1) {
    document.getElementById("message").textContent = 'whoops! The game is to guess letters. "' + key + '" is not a letter.';
    return;
  }

  guessCount--;
  //if you lose
  if (guessCount == 0) {
    document.getElementById("message").textContent = messages[5];
    losses++;
    update();
    window.setTimeout(function() {
      document.getElementById("message").innerHTML = messages[0];
      document.getElementById("letter-box").textContent = targetLetter;
      boot = false;
    }, 1500);
    return;
  } else {
    document.getElementById("message").textContent = messages[3];
    if (guesses.length == 0) {
      guesses = key;
    } else {
      guesses = guesses + ", " + key;
    }
    update();
  }
}

// document.getElementById("keyboard-icon").ontouchend = function() {
//   doLayout();
// };

var keyboard_display = false;
let keys = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"];
//numeric keyboard codes for letter range from a=65 to z=90. to get the codes, simply querry the index of the letter
//in the letters array and add 65.
var keyboard = document.getElementById("keyboard");
var notepad = document.getElementById("notepad");

function doLayout() {
  if (document.getElementById("keyboard").children.length == 0) {
    for (var i = 0; i < keys.length; i++) {
      var key = document.createElement("div");
      key.id = keys[i];
      key.style.gridArea = keys[i];
      key.textContent = keys[i];
      key.className = "key";
      key.onclick = function() {
        var event_name = "keydown";
        var event = document.createEvent("HTMLEvents");
        event.initEvent(event_name, true, false);
        event.key = this.id;
        document.dispatchEvent(event);
      };
      keyboard.appendChild(key);
    }
    return;
  } else {
    //var keyboard = document.getElementById("keyboard");
    for (var i = 0; i < keys.length; i++) {
      var key = document.getElementById([keys[i]]);
      keyboard.removeChild(key);
    }
  }
}

function printKey(letter) {
  var l = letter;
  // if (uppercase) {
  //   l = letter.toUpperCase();
  // }
  var text = notepad.textContent;
  if (l.length === 0) {
    text = text.substring(0, text.length - 1);
  } else {
    text = text + l;
  }
  notepad.textContent = text;
}
