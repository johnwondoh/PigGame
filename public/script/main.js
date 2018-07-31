/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var player = 0;
var playMode = true;

// initialisation
init()

// all buttons
var rollDiceBtn = document.querySelector('.btn-roll');
var holdBtn = document.querySelector('.btn-hold');
var newBtn = document.querySelector('.btn-new');

// player 1
var current1 = document.querySelector('#current-0');
var score1 = document.querySelector('#score-0');
var name1 = document.querySelector('#name-0');
var state1 = document.querySelector('.player-0-panel');

// player 2
var current2 = document.querySelector('#current-1');
var score2 = document.querySelector('#score-1');
var name2 = document.querySelector('#name-1');
var state2 = document.querySelector('.player-1-panel');

// all players arrays
var scores = [score1, score2];
var current = [current1, current2];
var names = [name1, name2];
var states = [state1, state2];

/* ====================================================================== */
/*                              Event Listeners                           */
/* ====================================================================== */

rollDiceBtn.addEventListener('click', function(){
    if(playMode){
        // Get the current player
        var ind = getPlayer();
        // making dice image display active
        document.querySelector('#dice-1').style.display = '';
        document.querySelector('#dice-2').style.display = '';
        // generate dice numbers
        var generateNums = generateDiceNumbers();
        // setting the dice images to match the generated numbers
        document.querySelector('#dice-1').src = "dice-"+generateNums[0]+'.png';
        document.querySelector('#dice-2').src = "dice-"+generateNums[1]+'.png';
        // check if a dice number is equal to 1
        if(generateNums[0] === 1 || generateNums[1] === 1){
            current[ind].textContent = 0;
            selectActive()
        } else {
            var currentVal = Number(current[ind].textContent);
            var addVal = generateNums[0] + generateNums[1];
            current[ind].textContent = currentVal + addVal;
            player = ind;
        }
    }
});

holdBtn.addEventListener('click', function(){
    if(playMode){
        console.log(scores);
        console.log(current);
        var play = getPlayer();
        console.log(play);
        console.log('on hold for player ' + play)
        console.log('text content: ' + current[play].textContent)
        var currentScore = Number(scores[play].textContent);
        scores[play].textContent = currentScore + Number(current[play].textContent);
        current[play].textContent = '0';

        if(Number(scores[play].textContent) >= 100) {
            console.log('Winner');
            names[play].textContent = 'Winner';
            names[play].style.color = 'red';
            playMode = false;
        } else {
            selectActive();
        }
    }
})


newBtn.addEventListener('click', init);


/* ====================================================================== */
/*                           Required Functions                          */
/* ====================================================================== */

// set the new player to the active class
function selectActive(){
    for(var i=0; i<states.length; i++){
        if(states[i].classList.contains('active')){
            states[i].classList.remove('active')
        } else if (!states[i].classList.contains('active')){
            states[i].classList.add('active');
        }
    }
    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';
}

// get the new or current player
function getPlayer(){
    if(player===0){
        player = 1;
        return 0
    }
    player = 0;
    return 1;
}

// generate two dice values
function generateDiceNumbers() {
    var num1 = Math.floor(Math.random() * 6) + 1;
    var num2 = Math.floor(Math.random() * 6) + 1;
    return [num1, num2];
}

// function required for initialisation
function init(){
    player = 0;
    playMode = true;
    //set scores and current values to zero
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#score-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';
    document.querySelector('#score-1').textContent = '0';
    // set player name and color
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-0').style.color = '#555';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('#name-1').style.color = '#555';
    // set dice image display to none
    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';

    if(!document.querySelector('.player-0-panel').classList.contains('active')){
        document.querySelector('.player-0-panel').classList.add('active')
    }
    if(document.querySelector('.player-1-panel').classList.contains('active')){
        document.querySelector('.player-1-panel').classList.remove('active')
    }
    
}

