var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;




$(document).keypress(function () {
    if (!started) {

        $("#level-title").text("Level " + level);
        nextSequene();
        started = true;
    }
});

$(".btn").on("click", function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);

});

function checkAnswer(currentLevel1) {

    if (gamePattern[currentLevel1] === userClickedPattern[currentLevel1]) {

        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function () {
                nextSequene();
            }, 1000);

        }

    } else {

        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();

    }

}



function nextSequene() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4)
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

};

function playSound(name) {
    var audio = new Audio("sounds/" + name + '.mp3');
    audio.play();
};


function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
};

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}