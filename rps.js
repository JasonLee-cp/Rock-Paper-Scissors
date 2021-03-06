const startBtn = document.querySelector(".start-btn"),
rockBtn = document.querySelector(".rock-btn"),
paperBtn = document.querySelector(".paper-btn"),
scissorsBtn = document.querySelector(".scissors-btn"),
computerRPS = document.querySelector(".computer-rps"),
playerRPS = document.querySelector(".player-rps"),
gameResult = document.querySelector(".result"),
remainingRound = document.querySelector(".remaining-round"),
userScore = document.querySelector(".user-score"),
computerScore = document.querySelector(".computer-score");

var timer;
const SHUFFLE_SPEED = 30;
let gameStarted = false;

var USER_SCORE={
    rounds:10,
    playerScore:0,
    computerScore:0
};

const RPS_NUMBER = {
    rock:1,
    paper:2,
    scissors:3
}

function getRandom(x,y){
    return Math.floor(Math.random()*(y-x+1))+x;
}

function getImgSrcNum(x){
    return `img/${x}.png`;
}


//START BUTTON
function shuffleComputerImg(){
    const imgNum = getRandom(1,3);
    computerRPS.src = `img/${imgNum}.png`;
    computerRPS.classList.add("rotate");
    computerRPS.id = imgNum;
}

function handleStart(){
    if(gameStarted) return;
    playerRPS.src = 'img/4.png';
    gameResult.innerHTML="RESULT BOARD";
    gameStarted = true;
    timer = setInterval(shuffleComputerImg,SHUFFLE_SPEED);
    
}
startBtn.addEventListener("click",handleStart);

//RESULT HANDLE
function drawScore(round,pScore,cScore){
    remainingRound.innerHTML = JSON.stringify(round);
    userScore.innerHTML = JSON.stringify(pScore);
    computerScore.innerHTML = JSON.stringify(cScore);
}

function handleEnd(){
    gameResult.innerHTML = `<Game Over>\nYour score: ${USER_SCORE["playerScore"]}`;
    USER_SCORE["rounds"]=10;
    USER_SCORE["playerScore"]=0;
    USER_SCORE["computerScore"]=0;
    drawScore(10,0,0);
}

function updateScore(result){
    USER_SCORE["rounds"]-=1;
    if(result==1) USER_SCORE["computerScore"]+=1;
    if(result==2) USER_SCORE["playerScore"]+=1;
    drawScore(USER_SCORE["rounds"],USER_SCORE["playerScore"],USER_SCORE["computerScore"]);

    if(USER_SCORE["rounds"]==0) handleEnd();
}

function handleResult(computer,player){
    let result=0;
    if((computer==1 && player==3)||(computer==2 && player==1)||(computer==3 && player==2)){
        gameResult.innerHTML = "Computer Wins !";
        result=1;
    }
    else if((player==1 && computer==3)||(player==2 && computer==1)||(player==3 && computer==2)){
        gameResult.innerHTML = "Player Wins !";
        result=2;
    }
    else{
        gameResult.innerHTML = "Draw !";
        result=3;
    }
    updateScore(result);

}

//PLAYER BUTTON
function handleRock(){
    if(!gameStarted) return; 
    playerRPS.src = getImgSrcNum(RPS_NUMBER["rock"]);
    clearInterval(timer);
    const resultComputer = computerRPS.id;
    handleResult(resultComputer,RPS_NUMBER["rock"]);
    gameStarted=false;
}

function handlePaper(){
    if(!gameStarted) return;
    playerRPS.src = getImgSrcNum(RPS_NUMBER["paper"]);
    clearInterval(timer);
    const resultComputer = computerRPS.id;
    handleResult(resultComputer,RPS_NUMBER["paper"]);
    gameStarted=false;
}

function handleScissors(){
    if(!gameStarted)  return;
    playerRPS.src = getImgSrcNum(RPS_NUMBER["scissors"]);
    clearInterval(timer);
    const resultComputer = computerRPS.id;
    handleResult(resultComputer,RPS_NUMBER["scissors"]);
    gameStarted=false;
}


window.addEventListener("load",function(){
    drawScore(USER_SCORE["rounds"],USER_SCORE["playerScore"],USER_SCORE["computerScore"]);
})

rockBtn.addEventListener("click",handleRock);
paperBtn.addEventListener("click",handlePaper);
scissorsBtn.addEventListener("click",handleScissors);