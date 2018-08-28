import GAME from '../../gameVariables';

//Determines if a sprite is out of canvas bounds
//or if the grid cell already has a sprite
const isMovable = (actor, direction) =>{
	return(
		actor.tx+direction.x >= 0 &&
		actor.tx+direction.x <= GAME.COLS - 1 &&
		actor.ty+direction.y >= 0 &&
		actor.ty+direction.y <= GAME.ROWS - 1 &&
		//check if the value on map 2d matrix corresponds to
		//the floor of game
		GAME.map[actor.ty+direction.y][actor.tx+direction.x] == GAME.FLOOR
	)
}

//Direction is to move one tile in a certain orientation
//actor = player
const moveActor = (actor, direction, playState) =>{
	//self === GAME.Play extends Phaser.State
	let self = playState;

	//Check if movable
	if(!isMovable(actor, direction)){
		console.log("!isMovable()");
		return false;
	} 

	//can move, update move counter
	GAME.move_total++;
	GAME.movesText.setText('Moves: ' + GAME.move_total);

	self.attackSound.play()
	actor.direction === 'left' ? actor.animations.play('atk_left') :
								 actor.animations.play('atk_right');


	//actorKey used to see if actor has hit another actor
	//located at actorMap[actorKey]
	let actorKey = `${actor.ty+direction.y}_${actor.tx+direction.x}`

	if(GAME.actorMap[actorKey] != undefined){ //if actor on actorMap
		console.log("Hit a thing!", GAME.actorMap[actorKey])
		//handle hitting another sprite, coin
		let coin = GAME.actorMap[actorKey];
		let i = GAME.coinList.indexOf(coin);
		//Remove previous location 
		GAME.actorMap[`${actor.ty}_${actor.tx}`] = null;


		if(i > -1){ //if is a coin
			//Increment coin total
			GAME.coin_total++;
			GAME.coinsText.setText('Coins: ' + GAME.coin_total);

			//Remove coin from game
			GAME.coinList.splice(i, 1); //remove from arr
			coin.kill();

			//Update score
			let toAdd = Math.ceil(30/GAME.move_total);

			GAME.score+= toAdd;
			GAME.scoreText.setText('Score: ' + GAME.score);

			//Update GAME.coins_left
			GAME.coins_left--;

			//Update tile coordinates
			actor.tx += direction.x
			actor.ty += direction.y

			//Update canvas coordinates
			actor.x = actor.tx*GAME.TILE_SIZE;
			actor.y = actor.ty*GAME.TILE_SIZE;

			//Add actor's new location to actorMap
			GAME.actorMap[`${actor.ty}_${actor.tx}`] = actor;	
			if(GAME.coins_left < 1){
				GAME.winMsg = self.game.add.bitmapText(GAME.w/2, GAME.h/2, 'minecraftia', "Level Complete!\nPress Space to Continue.", 24);
				GAME.winMsg.tint = 0x00ff00;
				GAME.winMsg.anchor.setTo(0.5); 
			}
		}

	}/*endif*/else{
		//Just move
		console.log("just moving");
		// console.log("actor.tx", actor.tx);
		// console.log("actor.ty", actor.ty);

		//Set actorMap[key] to null == undefined
		//previous position now null
		GAME.actorMap[`${actor.ty}_${actor.tx}`] = null;



		//Update tile coordinates
		actor.tx += direction.x
		actor.ty += direction.y

		// console.log("actor.tx", actor.tx);
		// console.log("actor.ty", actor.ty);
		//Update canvas coordinates
		actor.x = actor.tx*GAME.TILE_SIZE;
		actor.y = actor.ty*GAME.TILE_SIZE;

		//Add actor's new location to actorMap
		GAME.actorMap[`${actor.ty}_${actor.tx}`] = actor;

	}//endelse

	return true;
}

const movement = {
	up: (playState) => {
		GAME.acted = moveActor(GAME.player, {x:0, y:-1}, playState);
	},
	down: (playState) => {
		GAME.acted = moveActor(GAME.player, {x:0, y:1}, playState);
	},
	left: (playState) => {
		GAME.player.frame = 2; //flip player
		GAME.player.direction = 'left' //flip player
		GAME.acted = moveActor(GAME.player, {x: -1, y: 0}, playState);
	},
	right: (playState) => {
		GAME.player.frame = 0; 
		GAME.player.direction = 'right';
		GAME.acted = moveActor(GAME.player, {x: 1, y:0}, playState)
	}
}

export default movement;