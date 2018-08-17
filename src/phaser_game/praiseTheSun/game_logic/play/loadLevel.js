import Phaser from 'phaser';

import GAME from '../../gameVariables';
import Automata from '../automata';
import loadCoins from './loadCoins';
import loadBombs from './loadBombs';
import loadBonfire from './loadBonfire';


const loadLevel = (playState) =>{
	//self === GAME.Play extends Phaser.State
	let self = playState;
	let {level, COLS, ROWS, TILE_SIZE} = GAME;

	// console.log("loadLevel.js -> self", self);

	//FLOOR === tiles player can walk on		
	//WALL === tiles player can't walk on		
	if(level < 2){
		GAME.FLOOR = '0';
		GAME.WALL = '5';
	}else if(level < 4){
		GAME.FLOOR = '6';
		GAME.WALL = '2';
	}else if(level < 6){
		GAME.FLOOR = '2';
		GAME.WALL = '5';
	}else if(level < 8){
		GAME.FLOOR = '2';
		GAME.WALL = '4';
	}else if(level < 10){
		GAME.FLOOR = '1';
		GAME.WALL = '2';
	}else{
		GAME.FLOOR = '1';
		GAME.WALL = '3';
	}
	self.auto = new Automata(COLS, ROWS);
	self.auto.generate();
	self.auto.cleanup();

	let cave = self.auto.csvMap();
	GAME.map = self.auto.map;

	//-------Creating tile map for level ---------------
	self.game.load.tilemap('level', null, cave, Phaser.Tilemap.CSV);
	self.map = self.game.add.tilemap('level', TILE_SIZE, TILE_SIZE);
	self.map.addTilesetImage('dungeon'); //dungeon === tile
	self.layer = self.map.createLayer(0); //layer added to display list
	self.layer.resizeWorld(); //match game world and layer dimensions

	GAME.heartGauge = [
		self.game.add.sprite(20, 15, 'hearts'),
		self.game.add.sprite(60, 15, 'hearts'),
		self.game.add.sprite(100, 15, 'hearts')
	];


	GAME.scoreText = self.game.add.bitmapText(GAME.w - 126, 21, 'minecraftia', 'Score: ' + GAME.score, 24);
	GAME.coinsText = self.game.add.bitmapText(GAME.w - 126, 21 + 24, 'minecraftia', 'Coins: ' + GAME.coin_total, 24);
	GAME.movesText = self.game.add.bitmapText(GAME.w - 126, 21 + 48, 'minecraftia', 'Moves: ' + GAME.move_total, 24);
	GAME.levelText = self.game.add.bitmapText(GAME.w/2, 36, 'minecraftia', 'Level: ' + GAME.level, 36);

	GAME.scoreText.tint = 0xDC143C;
	GAME.coinsText.tint = 0xDC143C;
	GAME.movesText.tint = 0xDC143C;
	GAME.levelText.tint = 0x00ff00;

	GAME.scoreText.anchor.setTo(0.5, 0.5);
	GAME.movesText.anchor.setTo(0.5, 0.5);
	GAME.coinsText.anchor.setTo(0.5, 0.5);
	GAME.levelText.anchor.setTo(0.5, 0.5);


	//for mobile touch controls
	// self.loadMobileTouchControls(self);

	//Load bonfire
	loadBonfire(self)
	//Load coins
	loadCoins(self);

	console.log("GAME.map", GAME.map);
	for(let row = 0; row < GAME.ROWS; row++){
		for(let col = 0; col < GAME.COLS; col++){
			if(GAME.map[row][col] == GAME.FLOOR){
				GAME.floorTileCount++;
			}
		}
	}

	console.log("GAME.floorTileCount", GAME.floorTileCount);

}

export default loadLevel;