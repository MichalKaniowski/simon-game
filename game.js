var buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userPattern = [];
var started = false;

$(document).keypress(function() {
  if (!started) {
    newSequence();
    started = true;
    $("#level-title").text("Level 0");
  }
})

$(".btn").click(function(event) {
  var userChosenColor = event.target.id;
  userPattern.push(userChosenColor);

  playSound(userChosenColor);
  callAnimation(userChosenColor);
  checkAnswer(userPattern.length-1);
})

function checkAnswer(level) {
  if (userPattern[level] == gamePattern[level]) {
    if (userPattern.length == gamePattern.length) {
      $("#level-title").text("Level " + gamePattern.length);
      setTimeout(function() {
        newSequence();
      }, 700);
    }
  } else {
    var sound = new Audio("sounds/wrong.mp3");
    sound.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function newSequence() {
  userPattern = [];
  var randomNumber = Math.floor(Math.random()*4);
  var randomColor = buttonColors[randomNumber];
  gamePattern.push(randomColor);

  $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColor);
}

function startOver() {
  $("#level-title").text("Game over, press any key to restart.")
  gamePattern = [];
  userPattern = [];
  started = false;
}

function playSound(colorOfButton) {
  var sound = new Audio("sounds/" + colorOfButton + ".mp3");
  sound.play();
};

function callAnimation(idOfButton) {
  $("#" + idOfButton).addClass("pressed");
  setTimeout(function() {
    $("#" + idOfButton).removeClass("pressed");
  }, 100);
};
