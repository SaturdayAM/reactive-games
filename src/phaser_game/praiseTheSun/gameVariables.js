//*******************************************************
//					    GAME variables		   		   //		
// 													   //
//*******************************************************
const ROWS = 12; //12 tiles height
const COLS = 20; //20 tiles width
const TILE_SIZE= 42; //each tile is 42x42 pixels


//Objects
var wKey;
var aKey;
var sKey;
var dKey;
var spaceKey;

//text
var score = 0;
var scoreText;
var winMsg;
var loseMsg;
var level = 0;
var levelText;
var enemy_count = 3;
var coin_count = 12;
var coins_left = 12;

//both are per level
var move_total = 0;
var movesText;
var coin_total = 0;
var coinsText;

//String numbers '0'...'6' representing
//index of tile to display in tiles.png
var FLOOR;
var floorTileCount = 0;
var WALL;

//array of phaser sprite objs
var heartGauge; //hearts.png
var twitterButton;

//2D array with tile values. Represents game map.
/*
	map = Automata.map = 12*20 matrix of strnums for tiles
		0  		   ...        19

	0	['5', '5', '5', ... '5']
	.	['5', '5', '5', ... '5']
	.	['5', '5', '5', ... '5']
	.	['5', '5', '5', ... '5']
	12	['5', '5', '5', ... '5']
*/
var map;

/*
	player || actor = Phaser.Sprite{
		alive: //true ||false
		ty:,   //tile x and y
		tx:,
		y:,    // actor position
		x:,
		direction:,
		health: , //3 for player, 1 else
		frame:
	}
*/
var player;
var actorList = [];

/*
	actorMap = {
		'tyCoord_txCoord': player || actor,
		'tyCoord_txCoord': actor,
		'tyCoord_txCoord': actor
		...
	}
*/
var actorMap = {}; //Used to store what tiles have sprites
var livingEnemies;
var acted;

/*
	coin = {
		ty:,
		tx:,
		y, 
		x
	}
*/
var coins; //Stores reference to the coin phaser group object
var coinList = [];
var bonfire;

const GAME = {
	w: COLS*TILE_SIZE,
	h: ROWS*TILE_SIZE,
	ROWS,
	COLS,
	TILE_SIZE,
	wKey,
	aKey,
	sKey,
	dKey,
	spaceKey,
	score,
	scoreText,
	winMsg,
	loseMsg,
	level,
	levelText,
	enemy_count,
	coin_count,
	coins_left,
	move_total,
	movesText,
	coin_total,
	coinsText,
	FLOOR,
	floorTileCount, 
	WALL,
	heartGauge,
	twitterButton,
	map,
	player,
	actorList,
	actorMap,
	livingEnemies,
	acted,
	coins,
	coinList,
	bonfire
}

export default GAME;