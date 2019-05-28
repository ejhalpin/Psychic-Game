/*
 * Ambient Sound credit: http://juliusgalla.com
 *
 */
var doorEffect = document.createElement("audio");
doorEffect.setAttribute("src", "assets/audio/door.mp3"); //9000
var walkingEffect = document.createElement("audio");
walkingEffect.setAttribute("src", "assets/audio/walking.mp3"); //10000
var ambientNoise = document.createElement("audio");
ambientNoise.setAttribute("src", "assets/audio/cave-ambient.mp3");
ambientNoise.loop = true;
ambientNoise.volume = 0.5;
var grousseGrunt = document.createElement("audio");
grousseGrunt.setAttribute("src", "assets/audio/emu-grunt.mp3");
var flashlight = document.createElement("audio");
flashlight.setAttribute("src", "assets/audio/click.mp3");
var guessesRemaining = 10;
var guessed = "";
var dialogue = $("#dialogue");
var darkness = $(".darkness");
var background = $("#background");
var boulder = $(".boulder"); //full [width: 35vw, left: 10vw], time: 9000
var frame = $(".frame");
var confirmPlay = false;
var isPlaying = false;
var interval;
$("#play-intro").on("click", function() {
  if (!isPlaying) {
    playIntro();
    $(this).detach();
    // $("#button-box").toggleClass("shift");
    // $(this).toggleClass("small");
    // $(this).text("skip >>");
    isPlaying = true;
  } else {
    //stop all animations
    // dialogue.finish();
    // boulder.finish();
    // darkness.finish();
    // //pause all sounds
    // walkingEffect.pause();
    // grousseGrunt.pause();
    // doorEffect.pause();
    // flashlight.pause();
    // //clear any text loops
    // if (typeof interval != undefined) {
    //   window.clearInterval(interval);
    // }
    // ///set up the final formatting
    // darkness.detach();
    // dialogue.detach();
    // dialogue.appendTo("background");
    // dialogue.toggleClass("attached");

    // dialogue.text();
    // boot();
    // $(this).detach();
    return;
  }
});

function scroll(upDown) {}
var story = [
  "I was exploring in the mountains when I came across a cave. But when I stepped inside...",
  "I was trapped. Unable to move the boulder, I had no choice but to venture deeper into the darkness...",
  "[Turk] : What is this? A backpack?",
  "<span class='tab'></span> I wonder whose it was...",
  "<span class='tab'></span> and what happened to them...",
  "[....] : --grunting--",
  "[Turk] : What was that?",
  "<span class='tab'></span> I found a flashlight in the backpack!",
  "<span class='tab'></span> I hope the batteries still work...",
  "<span class='tab'></span> Aaaahhhhhh! Wait. Are you a giant grousse?",
  "[Giant Grousse] : Yes. I am. And you are doomed to be my dinner unless you play my game!",
  "[Turk] : I don't know. Let me think...",
  "[Turk] : Okay. I'll play.",
  "[Giant Grousse] : You must guess the letter that I am thinking of. If you guess correctly, I'll show you the way out.", //13
  "[Giant Grousse] : You must guess a letter!", //14
  "[Giant Grousse] : Nope! Keep guessing! You have", //15
  "[Giant Grousse] : You've already guessed that letter. Guess again!", //16
  "[Turk] : Okay. I guess the letter...", //17
  "[Giant Grousse] : Well done. I am a bird of my word. I'll lead you out of this cave.", //18
  "[Giant Grousse] : Too bad. You lost. Now I'm going to eat you.", // 19
  "[Turk] : Aaaahhhhhh!"
];

function playIntro() {
  dialogue.text(story[0]);
  dialogue.animate({ opacity: "1" }, 2000, function() {
    window.setTimeout(function() {
      dialogue.animate({ opacity: "0" }, 1000, function() {
        darkness.animate({ opacity: "0" }, 1000, function() {
          doorEffect.play();
          boulder.animate(
            {
              width: "35vw",
              left: "10vw"
            },
            9000
          );
          darkness.animate({ opacity: "1" }, 9000, function() {
            dialogue.text(story[1]);
            ambientNoise.play();
            dialogue.animate({ opacity: "1" }, 5000, function() {
              walkingEffect.play();
              dialogue.animate({ opacity: "0" }, 1000, function() {
                background.toggleClass("cave");
                background.toggleClass("black");
                dialogue.detach().appendTo(background);
                dialogue.toggleClass("attached");
                darkness.animate({ opacity: "0" }, 6500, function() {
                  //loop through the dialogue
                  darkness.detach();
                  dialogue.text(story[2]);
                  dialogue.animate({ opacity: "0.7" }, 1000, function() {
                    var index = 2;
                    interval = window.setInterval(function() {
                      index++;
                      if (index == 12) {
                        confirmPlay = confirm("play the grousse's game?");
                        if (!confirmPlay) {
                          dialogue.text("Turk was eaten by the grousse");
                          return;
                        }
                        boot();
                        window.clearInterval(interval);
                        return;
                      }
                      if (index == 5) {
                        grousseGrunt.play();
                      }
                      if (index == 9) {
                        flashlight.play();
                        background.toggleClass("storyboard-lit");
                      }
                      dialogue.append("<p>" + story[index] + "</p>");
                      dialogue.scrollTop(dialogue.get(0).scrollHeight);
                    }, 1500);
                  });
                });
              });
            });
          });
        });
      });
    }, 2000);
  });
}

function boot() {
  dialogue.text(story[12]);
  dialogue.scrollTop(dialogue.get(0).scrollHeight);
  window.setTimeout(function() {
    dialogue.append("<p>" + story[13] + "</p>");
    dialogue.scrollTop(dialogue.get(0).scrollHeight);
  }, 1000);
}

$(document).on("keyup", function(event) {
  if (!confirmPlay) {
    return;
  }
  var letter = event.key.toLowerCase();
  var alphabet = "abcdefghijklmnopqrstuvwxyz";
  var target = alphabet[Math.floor(Math.random() * 26)];
  if (!alphabet.includes(letter)) {
    dialogue.append("<p>" + story[14] + "</p>");
    dialogue.scrollTop(dialogue.get(0).scrollHeight);
    return;
  }
  dialogue.append("<p>" + story[17] + " " + letter + "!</p>");
  dialogue.scrollTop(dialogue.get(0).scrollHeight);
  if (guessed.includes(letter)) {
    dialogue.append("<p>" + story[16] + "</p>");
    dialogue.scrollTop(dialogue.get(0).scrollHeight);
    return;
  } else if (letter == target) {
    dialogue.append("<p>" + story[18] + "</p>");
    dialogue.scrollTop(dialogue.get(0).scrollHeight);
    darkness.prependTo(frame);
    darkness.animate({ opacity: "1" }, 1000, function() {
      background.toggleClass("black");
      background.toggleClass("storyboard-lit");
      background.toggleClass("cave");
      doorEffect.play();
      boulder.animate({ top: "3.6vw", left: "35vw" }, 9000);
      darkness.animate({ opacity: 0 }, 9000, function() {
        dialogue.text("Turk escaped! Refresh to play again. Sorry you can't skip the intro. I'm working on it.");
        dialogue.scrollTop(dialogue.get(0).scrollHeight);
      });
      ambientNoise.pause();
    });
  } else {
    guessed = guessed + letter;
    guessesRemaining = 10 - guessed.length;
    dialogue.append("<p>" + story[15] + " " + guessesRemaining + " tries left.</p>");
    dialogue.scrollTop(dialogue.get(0).scrollHeight);
    if (guessesRemaining == 0) {
      dialogue.append("<p>" + story[19] + "</p>");
      dialogue.scrollTop(dialogue.get(0).scrollHeight);
      window.setTimeout(function() {
        dialogue.append("<p>" + story[20] + "</p>");
        dialogue.scrollTop(dialogue.get(0).scrollHeight);
      }, 500);
      frame.append(darkness);
      darkness.animate({ opacity: "1" }, 2000);
      dialogue.text("Turk was eaten by the giant grousse! Refresh to play again. Sorry you can't skip the intro. I'm working on it.");
      dialogue.scrollTop(dialogue.get(0).scrollHeight);
    }
  }
});
