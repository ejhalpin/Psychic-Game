//global variables
var targetLetter;
var wins = 0;
var losses = 0;
var guessCount = 10;
var guesses = "";
var boot = false;
let letters = new Array("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z");
const messages = [
  "press any key to begin...",
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
  document.getElementById("wins").value = wins.toString();
  document.getElementById("losses").value = losses.toString();
  document.getElementById("guess-remain").value = guessCount.toString();
  document.getElementById("guesses").value = guesses;
}

function start() {
  document.getElementById("letterbox").textContent = "";
  document.getElementById("letterbox").textContent = "?";
  targetLetter = letters[Math.floor(Math.random() * 25)];
  guessCount = 10;
  guesses = "";
  update();
}

function getKeyPressed(event) {
  var key = event.key;
  key = key.toLowerCase();
  if (!boot) {
    bootup();
    return;
  }
  if (key === targetLetter) {
    document.getElementById("message").textContent = messages[6];
    wins++;
    document.getElementById("letterbox").textContent = "";
    document.getElementById("letterbox").textContent = targetLetter;
    update();
    window.setTimeout(function() {
      document.getElementById("message").textContent = messages[0];
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
      document.getElementById("message").textContent = messages[0];
      document.getElementById("letterbox").textContent = "";
      document.getElementById("letterbox").textContent = targetLetter;
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

function giveFocus() {
  document.getElementById("autokey").focus();
}
