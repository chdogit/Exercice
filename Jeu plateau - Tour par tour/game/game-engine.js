// JavaScript Document
function Game(boardWidth, boardHeight, boardAccessibility, weaponAvailability, maxBonusWeapons) {
	"use strict";
	this.board = new Board(boardWidth, boardHeight, boardAccessibility);
	var baseWeapons = [new Weapon(1, "Croc", 10),
						new Weapon(2, "Croc", 10)]
	var bonusWeapons = [new Weapon(3, "Carotte", 5),
						new Weapon(4, "Couteau de cuisine", 50),
						new Weapon(5, "Pistolet 9mm", 20),
						new Weapon(6, "Sniper", 35)];
	this.players = [new Player(1, baseWeapons[0], this.board), new Player(2, baseWeapons[1], this.board)];
			
	for (var weapon in baseWeapons) {
		baseWeapons[weapon].initializePositionOnPlayer(this.players[weapon]);
	}
	for (var weapon in bonusWeapons) {
		var nbBonusWeapons = 0;
		if ((Math.random() < weaponAvailability) && (nbBonusWeapons <= maxBonusWeapons)) {
			bonusWeapons[weapon].initializePositionOnBoard(this.board);
			nbBonusWeapons += 1;	
		}
	}
	
	this.weapons = baseWeapons.concat(bonusWeapons);
	this.switchPlayerWeapon = function(pos, player) {
		var oldWeaponId = player.weapon.id;
		var newWeaponId = this.board.grid[pos[0]][pos[1]].weaponOnCell;
		if(newWeaponId > 0) {
			var oldWeapon, newWeapon;
			for (var i = 0; i < this.weapons.length; i += 1) {
				if(this.weapons[i].id === oldWeaponId) {
					oldWeapon = this.weapons[i];	
				} else if(this.weapons[i].id === newWeaponId) {
					newWeapon = this.weapons[i];	
				}
			}
			
			newWeapon.position = "player" + player.id;
			oldWeapon.position = pos;
			this.board.grid[pos[0]][pos[1]].weaponOnCell = oldWeaponId;
			player.weapon = newWeapon;
			
			displayWeapon(oldWeapon);
			displayWeapon(newWeapon);
		}
	};
	
	this.currentPlayer = this.players[0];
	this.continueMovementPhase = true;
    
	this.getNextPlayer = function() {
		if(this.currentPlayer.id === this.players.length) {
			return this.players[0];
            this.players[0].backgroundColor = "white";
		} else {
			return this.players[this.currentPlayer.id];
		}
	};
	this.setNextPlayer = function() {
		if(this.currentPlayer.id === this.players.length) {
			this.currentPlayer = this.players[0];
		} else {
			this.currentPlayer = this.players[this.currentPlayer.id];
		}
	};
	
	this.nextMovementTurn = function() {
		if (this.continueMovementPhase === true) {
			var movementOptions = this.board.checkPlayerMovementOptions(this.currentPlayer.position, this.currentPlayer.movement);
			if (movementOptions.length > 0) {
				setupMovementOptions(movementOptions);
			} else {
				this.endGame();	
			}
		} else {
			this.nextCombatTurn();
		}
	};
	this.makeMovementTurn = function(event) {
		var pos = [event.data.row, event.data.col];
		currentGame.currentPlayer.makeMovement(pos, currentGame.board);
		unsetMovementOptions();
		
		var weaponSwitchOptions = currentGame.currentPlayer.lastMovementCells();
		for (option in weaponSwitchOptions) {
			currentGame.switchPlayerWeapon(weaponSwitchOptions[option], currentGame.currentPlayer);	
		}
		
		if (currentGame.board.grid[currentGame.currentPlayer.position[0]][currentGame.currentPlayer.position[1]].triggerCombat === true) {
			currentGame.continueMovementPhase = false;	
		} else {
			currentGame.continueMovementPhase = true;
		}
		
		currentGame.setNextPlayer();
		currentGame.nextMovementTurn();
	};
	
	this.nextCombatTurn = function() {
		if (this.currentPlayer.hp > 0) {
			setupCombatOptions();
		} else {
			this.endGame();	
		}
	}
	this.makeCombatTurn = function(event) {
		var option = event.data.option;
		unsetCombatOptions();
		if (option === "atk") {
			var ennemy = currentGame.getNextPlayer();
			currentGame.currentPlayer.defensePosture = false;
			ennemy.takeDamages(currentGame.currentPlayer.weapon.damages);
			displayHP(ennemy);
		} else if (option === "def") {
			currentGame.currentPlayer.defensePosture = true;
		}
		
		currentGame.setNextPlayer();
		currentGame.nextCombatTurn();
	}
	
	this.endGame = function() {
		var winner = this.getNextPlayer().id;
		alert("Victoire du Joueur " + winner + " !");
	};
};

