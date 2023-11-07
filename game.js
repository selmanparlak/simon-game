var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
userClickedPattern = [];

var level = 0; 
var start = false;

function nextSequence() {
    userClickedPattern = [];

    var randomNumber =  Math.random() * 4;
    randomNumber = Math.floor(randomNumber);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    // var audio = new Audio("./sounds/" + randomChosenColour + ".mp3");
    // audio.play();

    level++;
    $("#level-title").text("Level " + level);
}

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        if(userClickedPattern.length == gamePattern.length){
        setTimeout(() => {
            nextSequence();
        }, 1000);
        }

    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");
        
         startOver();
    }
}
function startOver() {
    level = 0;
    gamePattern = [];
    start = false;
}

$(".btn").click(function () {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    playSound(this.id);
    animatePress(this.id);
    checkAnswer(userClickedPattern.length-1);
});

$(document).on("keypress",function () {
    if(!start) {
        nextSequence();
        start = true;
    }
    else {console.log(this);}
});


