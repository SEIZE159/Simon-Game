var buttons=["red","blue","green","yellow"];
var gamePattern=[];
var clickedPattern=[];
var started=false;//so that we can keep track only game starts when keyboard is pressed so it becomes true
var level=0;

$(document).keydown(function(){
    if(!started){
        $("#level-title").text("level "+level);//this changes the h1 when the keyboard is pressed
        sequence();
        started=true;
    }
});

$(".btn").click(function(){
    var clicked= $(this).attr("id"); //selects th id of the button just clicked
    clickedPattern.push(clicked);
    playsound(clicked);
    animate(clicked);
    checkanswer(clickedPattern.length-1);
});

function checkanswer(level){
    if(clickedPattern[level]=== gamePattern[level]){
        console.log("success");
        if(clickedPattern.length === gamePattern.length){//this situation means that all the buttons clicked were corrcet
            setTimeout(function(){
                sequence();
            },1000);
        }
    }else{
        console.log("wrong");
        playsound("wrong");
        $("body").addClass(".game-over");
        setTimeout(function(){
            $("body").removeClass(".game-over");
        },200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function sequence(){
    clickedPattern=[]; //resets when the function is called
    level++;
    $("#level-title").text("level "+level);//this changes the h1 when mouse is clicked

    var randomChosenColour = buttons[Math.floor(Math.random()*4)];
    gamePattern.push(randomChosenColour);//stored the random pattern
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playsound(randomChosenColour);
}

function playsound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animate(color){
    $("#"+color).addClass("pressed");
    setTimeout(function(){
        $("#"+color).removeClass("pressed");
    },100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }