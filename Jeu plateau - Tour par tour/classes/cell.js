// JavaScript Document
function Cell(rowIndex, colIndex, probAccessibility) {
	"use strict";
	this.row = rowIndex;
	this.col = colIndex;
	this.triggerCombat = false;
	this.weaponOnCell = 0;
	this.playerOnCell = 0;
	this.accessible = Math.random() < probAccessibility ? true : false;
	
	this.toggleTrigger = function() {
		if (this.triggerCombat === true) {
			this.triggerCombat = false;
		} else {
			this.triggerCombat = true;
		}
	};
}