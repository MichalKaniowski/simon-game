var buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userPattern = [];

$(document).keypress(function() {
  newSequence();
})

$(".btn").click(function() {
  var userChosenColor = event.target.id;
  userPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userPattern.length-1);
});

function checkAnswer(currentLevel) {
  if (userPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("succes");
    if (userPattern.length === gamePattern.length) {
      newSequence();
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
};

function newSequence() {
  $("#level-title").text("Level " + gamePattern.length);
  userPattern = [];
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function startOver() {
  $("#level-title").text("Game Over, Press Any Key to Restart");
  gamePattern = [];
}

function playSound(colorOfButton) {
  var sound = new Audio("sounds/" + colorOfButton + ".mp3");
  sound.play();
}

function animatePress(currentColor) {
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed")
  }, 100);
}
