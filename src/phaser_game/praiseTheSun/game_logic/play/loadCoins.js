import Phaser from 'phaser';

import GAME from '../../gameVariables';

const loadCoins = (playState) =>{
	let self = playState;
	console.log("loadCoins.js -> self", self);
	console.log("GAME.coins", GAME.coins);
	GAME.coins = self.game.add.group();
	console.log("GAME.coins after", GAME.coins);
	//Loop to spawn coins
	for(let i = 0; i < GAME.coin_count; i++){
		let coinObj = {};
		do{
			coinObj.ty = Math.floor(Math.random()*GAME.ROWS);
			coinObj.tx = Math.floor(Math.random()*GAME.COLS);
			coinObj.y = coinObj.ty*GAME.TILE_SIZE;
			coinObj.x = coinObj.tx*GAME.TILE_SIZE;
		}while(GAME.map[coinObj.ty][coinObj.tx] == GAME.WALL || 
			   GAME.actorMap[`${coinObj.ty}_${coinObj.tx}`] != null)

		let coinSprite = GAME.coins.create(coinObj.x, coinObj.y, 'coin')
		coinSprite.ty = coinObj.ty;
		coinSprite.tx = coinObj.tx;
		coinSprite.anchor.set(-.5, -.5);

		//Declare 'rotate' animation using spritesheet for coin
		//6fps, looped = true
		coinSprite.animations.add('rotate', [0, 1, 2, 1], 10, true);
		coinSprite.animations.play('rotate')

		//Save reference to the coin sprite on actorMap{}
		self.game.physics.enable(coinSprite)
		GAME.actorMap[`${coinSprite.ty}_${coinSprite.tx}`] = coinSprite
		GAME.coinList.push(coinSprite);
	}
	console.log(GAME.coinList);
}

const touchedCoin = () =>{
	console.log("touchedCoin");
}

export default loadCoins;