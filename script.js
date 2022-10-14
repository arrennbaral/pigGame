'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0 = document.getElementById('current--0')
const current1 = document.getElementById('current--1')
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')

let scores, currentScore, activePlayer, playing;

//starting conditions
const init = function(){
     scores = [0,0];
     currentScore = 0;
     activePlayer = 0;
     playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0.textContent = 0;
    current1.textContent = 0;

    diceEL.classList.add('hidden')
    player0El.classList.remove('player--winner')
    player1El.classList.remove('player--winner')
    player0El.classList.add('player--active')
    player1El.classList.remove('player--active')
};

init();

//Creating a function
const switchPlayer = function(){
    //resetting
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    //switch to next player
    activePlayer = activePlayer == 0 ? 1 : 0;
    //toggle checks the class, and add/remove as needed
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

//Rolling dice functionality

btnRoll.addEventListener('click', function(){
  if(playing){
      //Generating a random dice roll
      const dice = Math.trunc(Math.random() * 6) + 1;
    
      //Display dice
      diceEL.classList.remove('hidden');
      diceEL.src = `dice-${dice}.png`
  
      //Check for rolled 1: if true- switch to next player
      if(dice !== 1){
          //Add to the current score
          currentScore +=dice
          document.getElementById(`current--${activePlayer}`).textContent = currentScore;
          
      }else{
          switchPlayer();
          // //resetting
          // currentScore = 0;
          // document.getElementById(`current--${activePlayer}`).textContent = 0;
          // //switch to next player
          // activePlayer = activePlayer == 0 ? 1 : 0;
          // //toggle checks the class, and add/remove as needed
          // player0El.classList.toggle('player--active');
          // player1El.classList.toggle('player--active');
      }
  }
})

//When Hold is clicked
btnHold.addEventListener('click', function(){
 if(playing){
       //Add the currentScore to current Player's score;
       scores[activePlayer] +=currentScore;
       document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
   
       //Check if the score is => 100, if true, the player wins
       if(scores[activePlayer] >= 100){
           //Finish the game
           playing = false;
           document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
           document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
           diceEL.classList.add('hidden');
   
       } else{
             //Switch the player
                switchPlayer();
       }
   
 }
  
})

btnNew.addEventListener('click',init)




