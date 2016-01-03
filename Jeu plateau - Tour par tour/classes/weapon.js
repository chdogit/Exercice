// JavaScript Document
function Weapon(id, name, damages) {
	"use strict";
	this.id = id;
	this.name = name;
	this.damages = damages;
	this.position = 0;
	
	this.initializePositionOnPlayer = function(player) {
		this.position = "player" + player.id;
	};
	this.initializePositionOnBoard = function(board) {
		var rndPos, suitable = false;
		while (suitable === false) {
			rndPos = [Math.floor(Math.random()*board.height), Math.floor(Math.random()*board.width)];
			suitable = board.isSuitableForWeapon(rndPos);	
		}
		board.putWeaponOnBoard(this.id, rndPos);
		this.position = rndPos;
	};
}