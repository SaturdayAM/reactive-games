import Phaser from 'phaser';

import GAME from '../../gameVariables'
import Automata from '../automata'
const loadPlayer = (playState) =>{
	let self = playState;
	// console.log("loadPlayer.js -> self", self)
	GAME.player = self.game.add.sprite(GAME.w/2, GAME.h/2, 'player')
	self.game.physics.arcade.enable(GAME.player)
	console.log("GAME.player", GAME.player);

	
	do{//Loop until player is on walkable ground
		GAME.player.ty = Math.floor(Math.random()*GAME.ROWS);
		GAME.player.tx = Math.floor(Math.random()*GAME.COLS);
		GAME.player.y = GAME.player.ty*GAME.TILE_SIZE;
		GAME.player.x = GAME.player.tx*GAME.TILE_SIZE;
	}while(GAME.map[GAME.player.ty][GAME.player.tx] == GAME.WALL ||
		   GAME.actorMap[`${GAME.player.ty}_${GAME.player.tx}`] != null)
}

export default loadPlayer;