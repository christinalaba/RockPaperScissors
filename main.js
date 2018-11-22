
const app = {
        playerName: "Mystery person",
        fate: "play with fate",
        userChoice:"",
        randomChoice:"",
        fateScore: 0,
        userScore: 0,
        userRound:"draw",
        fateRound:"draw"
    }

app.init = function(){
    getPlayerNames();
}

function getPlayerNames(){
    app.playerName = prompt("What is your name")
    app.fate = prompt("What fate are you trying to decide? Should I ... ?")
   confirm(`${app.playerName} are you ready to find out if you should ${app.fate}? First to 3 wins... GO!`)
    
    TweenMax.set("#rightHand", { x: 300, rotation: 30, });
    TweenMax.set("#leftHand", { x: -300, rotation: -30 });
    TweenMax.to(['#rightHand', '#leftHand'], 1, {opacity:1,x:0, rotation:0, ease:Back.easeOut.config(2.5), });
}

$('.gameControls button').on('click', function () {
    $('.gameControls button').removeClass("selected");
    $(this).addClass('selected');
    app.userChoice = $(this).text();
    console.log(app.userChoice);
    getRandomChoice();
});

function getRandomChoice() {
    const choice = ["Rock", "Paper", "Scissors"]
    app.randomChoice = choice[Math.floor(Math.random() * 3)];
    console.log(app.randomChoice);
    gameStartAnimation();
    compare();
}

function compare(){
    if (app.userChoice === 'Rock' && app.randomChoice === 'Scissors' ||
        app.userChoice === 'Paper' && app.randomChoice === 'Rock' ||
        app.userChoice === 'Scissors' && app.randomChoice === 'Paper') {
        console.log("user win");
        app.userScore++;
        app.userRound = "Win";
        app.fateRound = "Lose";
       
    } else if (app.userChoice === 'Paper' && app.randomChoice === 'Scissors' ||
        app.userChoice === 'Scissors' && app.randomChoice === 'Rock' ||
        app.userChoice === 'Rock' && app.randomChoice === 'Paper') {
        console.log("fate win");
        app.fateScore++;
        app.userRound = "Lose";
        app.fateRound = "Win";
    } else if (app.userChoice === app.randomChoice) {
        console.log("draw");
        app.userRound = "Win";
        app.fateRound = "Win";
    }
    console.log(app.userScore);
    console.log(app.fateScore);
}

function gameStartAnimation(){
    TweenMax.to('#rightHand', 0.3, { x: 0 })
    TweenMax.to('#leftHand', 0.3, { x: 0 })

    $('#rightHand').css('background', `no-repeat url(images/right/RightRockWin.png)`)
    $('#rightHand').css('background-size', `contain`)
    TweenMax.to('#rightHand', 0.3, { delay:0.3, x: 0, rotation: 30, yoyo: true, repeat: 5, transformOrigin: "bottom right", onComplete: checkForWin})
    
    $('#leftHand').css('background', `no-repeat url(images/left/LeftRockWin.png)`)
    $('#leftHand').css('background-size', `contain`)
    TweenMax.to('#leftHand', 0.3, { delay: 0.3, x: 0, rotation: -30, yoyo: true, repeat: 5, transformOrigin: "bottom left", onComplete: resultOfRound  })
}

function resultOfRound (){
    console.log("game End Animation triggered");
    $('#leftHand').css('background', `no-repeat url(images/left/Left${app.userChoice}win.png)`)
    $('#leftHand').css('background-size', `contain`)
    
    $('#rightHand').css('background', `no-repeat url(images/right/Right${app.randomChoice}win.png)`)
    $('#rightHand').css('background-size', `contain`)
    TweenMax.delayedCall(1, roundWinnerAnimation);
}

function checkForWin() {
    let userMessage;
    if (app.userScore === 3) {
        userMessage = `<p>${app.playerName} Wins! Do not ${app.fate}</p>`
        console.log("game over - user win");
        endGame();
    } else if (app.fateScore === 3) {
        userMessage = `<p>Fate has decided. You must ${app.fate}</p>`
        console.log("game over - fate win");
        endGame();
    }
    
    $('.playerScore').text(app.userScore);
    $('.fateScore').text(app.fateScore);

    $('.gameOverDisplay').append(userMessage);
}

function roundWinnerAnimation(){

    if (app.userRound === "Lose"){
        console.log(app.userRound)
        console.log(app.fateRound)
        $('#leftHand').css('background', `no-repeat url(images/left/Left${app.userChoice}${app.userRound}.png)`)
        $('#leftHand').css('background-size', `contain`)

        TweenMax.to('#leftHand', 1, { delay:0.3, x: -50 })
        TweenMax.to('#rightHand', 1, { x: -140 })
    } else if (app.fateRound === "Lose"){
        console.log(app.userRound)
        console.log(app.fateRound)
        $('#rightHand').css('background', `no-repeat url(images/right/Right${app.randomChoice}${app.fateRound}.png)`)
        $('#rightHand').css('background-size', `contain`)
        TweenMax.to('#rightHand', 1, { delay: 0.3,x: 50 })
        TweenMax.to('#leftHand', 1, { x: 140 })
    }
    // TweenMax.to('#selectionAnimation', 0.3, { delay:1,scaleX:1.2 })
}


function endGame() {
    $('.scoreBoard').addClass('hide');
    $('.gameControls').addClass('hide');
    $('.pageTitle').addClass('hide');
}

$(function () {
    app.init();
})
