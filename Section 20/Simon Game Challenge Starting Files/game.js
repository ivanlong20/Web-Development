var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var level = 0;
var started = false;

function nextSequence() {
  var randomNum = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNum];
  gamePattern.push(randomChosenColour);
  $("." + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("h1").text("Level " + level);
}

function playSound(name) {
  new Audio("./sounds/" + name + ".mp3").play();
}

function animatePress(currentColour) {
  $("." + currentColour).toggleClass("pressed");
  setTimeout(function () {
    $("." + currentColour).toggleClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  console.log(currentLevel);
  console.log(gamePattern[currentLevel]);
  console.log(userPattern[currentLevel]);
  if (gamePattern[currentLevel] === userPattern[currentLevel]) {
    if (currentLevel === level - 1) {
      setTimeout(nextSequence, 1000);
      userPattern.length = 0;
      console.log("success");
    }
  } else {
    console.log("wrong");
    $("body").toggleClass("game-over");
    setTimeout(function () {
      $("body").toggleClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    userPattern.length = 0;
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern.length = 0;
  started = false;
}

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userPattern.length - 1);
});

$("html").keypress(function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});
