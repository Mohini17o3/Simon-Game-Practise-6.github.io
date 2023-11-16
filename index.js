var userClickedPattern = [];
var buttonColors=["red","blue","green","yellow"];
 var gamePattern = [];
 var level = 0;

 var toggle = false;

$(document).keypress(function(){

if(!toggle){
  $("#level-title").text("Level " +level);
  nextSequence();
  toggle =true;
  }
});

function startOver(){
  level = 0;
  gamePattern=[];
  toggle = false;
}

function checkAnswer(currentLevel){
if(gamePattern[currentLevel]=== userClickedPattern[currentLevel]){
  if(userClickedPattern.length === gamePattern.length){
    setTimeout(function(){
    nextSequence();
    } ,1000) 
    }
}else {
    playSound("wrong");
    $(document.body).addClass("game-over");
    $("#level-title").text("Game over ,Press Any Key to Restart");
  
    setTimeout(function(){
    $(document.body).removeClass("game-over")
    } ,200);
   
    startOver();
  
}
}

  function nextSequence(){
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);  
$("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
$("#level-title").text("Level "+level);   
var audio = new Audio("sounds/"+ randomChosenColor + ".mp3");
  audio.play();
  level++;
}
$(".btn").on("click",function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userChosenColor.length-1);
});
function playSound(name){
var audio = new Audio("sounds/"+ name + ".mp3");
  audio.play();
}
function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
    $("#"+currentColor).removeClass("pressed")
  },100);
}
