var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameOn = 0;
function nextSequence() {
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    var audio = new Audio(randomChosenColor + ".mp3");
    audio.play();
    level++;
    $("h1").text("Level " + level);
}
function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  gameOn = 0;
}
$(".btn").click(function () {
    if (gameOn==1) {
    var clickedButton = $(this).attr("id");
    userClickedPattern.push(clickedButton);
    var audio = new Audio(clickedButton + ".mp3");
    audio.play();
    $(this).addClass("pressed");
    setTimeout(() => {
        $(this).removeClass("pressed");
    }, 100);
    console.log("User clicked pattern:", userClickedPattern);
    var currentIndex = userClickedPattern.length-1
    if (gamePattern[currentIndex] === userClickedPattern[currentIndex])
    {
    console.log("correct");
            if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                userClickedPattern = [];
                nextSequence();
                console.log("Game pattern:", gamePattern);
            }, 1000);
        }
    }
    else {
    console.log("Wrong");
    var audio = new Audio("wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Start Over");
    setTimeout(() => {
    $("body").removeClass("game-over");
    }, 200);

 
    $("#start-over-btn").fadeIn();
    $("#start-game-btn").hide();
    gameOn = 0;
    
    }
    }
    });
/*$(document).on("keydown", function (event) {
  if (gameOn === 0 && (event.key === "a" || event.key === "A")) {
    gameOn = 1;
    userClickedPattern = [];
    $("h1").text("Level " + level);
    nextSequence();
  }
});*/
function startGame() {
  if (gameOn === 0) {
    gameOn = 1;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    $("h1").text("Level " + level);
    $("#start-game-btn").hide();     
    $("#start-over-btn").hide();   
    nextSequence();
  }
}
/* $(document).on("keydown", function (event) {
  if (event.key === "a" || event.key === "A") {
    startGame();
  }
}); */
$("#start-game-btn").click(function () {
  startGame();
});

$("#start-over-btn").click(function () {
  startGame();
});

