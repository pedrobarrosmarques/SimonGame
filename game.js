let gamePattern = [];
let userClickedPattern = [];

let level = 0;

let hasStarted = false;

let buttonColours = ["red", "blue", "green", "yellow"];

$(document).keypress(function(){
  if (!hasStarted) {
    $("#level-title").text("Level " + level);
    nextSequence();
    hasStarted = true;
  }
});

$(".btn").click(function(){
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});


function startOver(){
  level = 0;
  gamePattern = [];
  hasStarted= false;
}
function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
    }else {
      playSound("wrong")
      $("body").addClass("game-over");
      $("h1").text("Game Over, Press Any Key to Restart");
      setTimeout(function(){
        $("body").removeClass("game-over");
      }, 200);
      startOver();
    }
  }



function nextSequence(){
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random()*4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name){
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100)
}
