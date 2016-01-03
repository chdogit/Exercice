// JavaScript Document

function displayGame(game) {
	displayBoard(game.board);
	
	for (var player in game.players) {
		displayPlayer(game.players[player]);
		displayHP(game.players[player]);
	}
	
	for (var weapon in game.weapons) {
		displayWeapon(game.weapons[weapon]);
	}	
}

function displayBoard(board) {
	"use strict";
	var $board = $("#board");
	var $row, $cell;
	
	$board.html("");
	for(var i = 0; i < board.grid.length; i++) {
		$row = $("<div class='row'></div>");
		for(var j=0; j < board.grid[i].length; j++) {
			$cell = $("<div class='cell'></div>");
			$cell.attr("id", "cell-" + board.grid[i][j].row + "-" + board.grid[i][j].col);
			board.grid[i][j].accessible ? $cell.addClass("cell-accessible") : $cell.addClass("cell-inaccessible");
			$cell.appendTo($row);	
		}
		$row.appendTo($board);
	}
}

function displayWeapon(weapon) {
	var classList;
	if (weapon.position === 0) {
	} else if ((typeof weapon.position === "string") && weapon.position.startsWith("player")) {
		classList = $("#" + weapon.position + "-controls .player-weapon-icon").attr("class").split(/\s+/);
		$.each(classList, function(index, item){
    		if (item !== "player-weapon-icon") {
       			$("#" + weapon.position + "-controls .player-weapon-icon").removeClass(item);
    		}
		});
		$("#" + weapon.position + "-controls .player-weapon-icon").addClass("cell-weapon" + weapon.id);
		$("#" + weapon.position + "-controls .player-weapon-specs").html(weapon.name + "<br>Dégâts : " + weapon.damages);
	} else {
		classList = $("#cell-" + weapon.position[0] + "-" + weapon.position[1]).attr("class").split(/\s+/);
		$.each(classList, function(index, item){
    		if ((item === "cell") || (item === "cell-accessible") || (item === "cell-inaccessible") || (item.startsWith("cell-player"))) {
       			
    		} else {
				$("#cell-" + weapon.position[0] + "-" + weapon.position[1]).removeClass(item);
			}
		});
		$("#cell-" + weapon.position[0] + "-" + weapon.position[1]).addClass("cell-weapon" + weapon.id);
	}
}

function displayPlayer(player) {
	"use strict";
	if (player.lastPosition !== 0) {
		$("#cell-" + player.lastPosition[0] + "-" + player.lastPosition[1]).removeClass("cell-player" + player.id);	
	}
	$("#cell-" + player.position[0] + "-" + player.position[1]).addClass("cell-player" + player.id);
}

function displayHP(player) {
	"use strict";
	$("#player" + player.id + "-controls .player-hp").html(player.hp + "/100 PV");
}

function toggleMovement(movement) {
	"use strict";
	if ($("#cell-" + movement[0] + "-" + movement[1]).hasClass("cell-movement")) {
		$("#cell-" + movement[0] + "-" + movement[1]).removeClass("cell-movement");
	} else {
		$("#cell-" + movement[0] + "-" + movement[1]).addClass("cell-movement");
	}
}