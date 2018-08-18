import Phaser from 'phaser';

import GAME from '../../gameVariables';

const loadBonfire = (playState) =>{
	let self = playState;
	GAME.bonfire = self.game.add.sprite(GAME.w/2, GAME.h/2, 'bonfire')
	do{
		GAME.bonfire.ty = Math.floor(Math.random()*GAME.ROWS);
		GAME.bonfire.tx = Math.floor(Math.random()*GAME.COLS);
		GAME.bonfire.y = GAME.bonfire.ty*GAME.TILE_SIZE;
		GAME.bonfire.x = GAME.bonfire.tx*GAME.TILE_SIZE;
	}while(GAME.map[GAME.bonfire.ty][GAME.bonfire.tx] == GAME.WALL ||
		   GAME.actorMap[`${GAME.bonfire.ty}_${GAME.bonfire.tx}`] != null)

	GAME.bonfire.scale.setTo(2, 2);
	GAME.bonfire.anchor.set(0.5, 0.5)
	GAME.bonfire.animations.add('burn', [0, 1, 2, 3, 4, 5, 6], 10, true);
	GAME.bonfire.animations.play('burn');

	//Save reference to the coin sprite on actorMap
	GAME.actorMap[`${GAME.bonfire.ty}_${GAME.bonfire.tx}`];
}

export default loadBonfire;