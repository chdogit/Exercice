// JavaScript Document
var currentGame;
var currentMovements;

function playGame() {
	"use strict";
	currentGame = new Game(10,10,0.9,0.75,4);
	displayGame(currentGame);

	currentGame.nextMovementTurn();
}

function setupMovementOptions(movementOptions) {
	currentMovements = movementOptions;
	for (option in currentMovements) {
		$("#cell-" + currentMovements[option][0] + "-" + currentMovements[option][1]).bind("click", {row: currentMovements[option][0], col: currentMovements[option][1]}, currentGame.makeMovementTurn);
		toggleMovement(currentMovements[option]);
	}
}
function setupCombatOptions() {
	$("button[name='attack']").bind("click", {option: "atk"}, currentGame.makeCombatTurn);
	$("button[name='defense']").bind("click", {option: "def"}, currentGame.makeCombatTurn);
}

function unsetMovementOptions(movementOptions) {
	for (option in currentMovements) {
		$("#cell-" + currentMovements[option][0] + "-" + currentMovements[option][1]).unbind("click");
		toggleMovement(currentMovements[option]);
	}
	displayPlayer(currentGame.currentPlayer);
	movementOptions = null;
}
function unsetCombatOptions() {
	$("button[name='attack']").unbind("click");
	$("button[name='defense']").unbind("click");
}

$(document).ready(function() {
	$("button[name='playGame']").click(playGame);
	playGame();
});