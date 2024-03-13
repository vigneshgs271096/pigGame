'use strict';

//elements
const playerScoreElement0 = document.querySelector("#score--0");
const playerScoreElement1 = document.querySelector("#score--1");
const playerCurrentElement0 = document.querySelector("#current--0");
const playerCurrentElement1 = document.querySelector("#current--1");
const newGameBtn = document.querySelector(".btn--new");
const rollDiceBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");
const diceElement = document.querySelector(".dice");
const resultElement = document.querySelector(".result");

//variables
const winningScore = 10;
let score;
let currentPlayer;
let currentScore;
let isPlaying = true;
let winner;
let firstRoll = true;

init();

// starting function
function init() {
	score = [0, 0];
	currentScore = [0, 0];
	currentPlayer = 0;
	currentScore[0] = 0;
	currentScore[1] = 0;
	diceElement.classList.add("hide");
	restoreScores();
}

// update scores
function restoreScores() {
	playerCurrentElement0.textContent = currentScore[0];
	playerCurrentElement1.textContent = currentScore[1];
	playerScoreElement0.textContent = score[0];
	playerScoreElement1.textContent = score[1];
}

// role dice
rollDiceBtn.addEventListener('click', function () {
	if(isPlaying) {
		let randomNum = Math.trunc((Math.random() * 6) + 1);
		diceElement.src = `dice-${randomNum}.png`;
		if (randomNum % 2 == 0) {
			switchPlayer();
		} else {
			currentScore[currentPlayer] += randomNum;
		}
		randomNum = 0;
		restoreScores();
	}
	if(firstRoll) {
		diceElement.classList.remove("hide");
		firstRoll = false;
	}
})

// hold score
holdBtn.addEventListener('click', function () {
	if(isPlaying) {
		score[currentPlayer] += currentScore[currentPlayer];
		currentScore[currentPlayer] = 0;
		restoreScores();
		if(score[currentPlayer] > winningScore) {
			gameEnd();
		}
		switchPlayer();
	}
})

// switch player
function switchPlayer() {
	currentScore[currentPlayer] = 0;
	document.querySelector(`.player--${currentPlayer}`).classList.remove("player--active");
	currentPlayer = (currentPlayer == 0) ? 1 : 0;
	document.querySelector(`.player--${currentPlayer}`).classList.add("player--active");
};

// new game
newGameBtn.addEventListener('click', function () {
	init();
	resultElement.classList.add("opacity");
	isPlaying = true;
	firstRoll = true;
})

// game end
function gameEnd() {
	isPlaying = false;
	winner = currentPlayer;
	resultElement.textContent = `Player${ currentPlayer + 1 } wins...`;
	diceElement.classList.add("hide");
	resultElement.classList.remove("opacity");
}

