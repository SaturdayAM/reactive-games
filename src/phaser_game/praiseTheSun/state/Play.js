import Phaser from 'phaser';
import {BitmapText} from 'phaser';

import GAME from '../gameVariables';
import Automata from '../game_logic/automata';
import loadLevel from '../game_logic/play/loadLevel'
import loadPlayer from '../game_logic/play/loadPlayer'
import loadCoins from '../game_logic/play/loadCoins'
import loadMobileTouchControls from '../game_logic/play/loadMobileTouchControls'
import movement from '../game_logic/play/movement'

//*******************************************************
//					    GAME.Play					   //		
// 													   //
//*******************************************************
//The main state of game that handles game logic

class Play extends Phaser.State{
	constructor(){
		super();
		this.loadLevel = loadLevel;
		this.loadPlayer = loadPlayer;
		this.loadCoins = loadCoins;
		this.loadMobileTouchControls = loadMobileTouchControls;
	}
	preload(){

	}	
	create(){
	    this.game.world.setBounds(0, 0 ,GAME.w ,GAME.h);
	    this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.stage.backgroundColor = '#000';

		//Sounds
		this.attackSound = this.game.add.sound('attack');
		this.deathSound = this.game.add.sound('dead');

		//load level
		console.log("GAME.Play.create::this", this);
		this.loadLevel(this);

		//load player
		this.loadPlayer(this); 

		//load coins
		// this.loadCoins(this);

		//---------------Initialize WASD and spacebar-----------------
		this.cursors = this.game.input.keyboard.createCursorKeys();
		GAME.wKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
		GAME.aKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
		GAME.sKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
		GAME.dKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D); 
		GAME.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		//--------------Add event listeners to keys ------------------
		//W - UP
		this.cursors.up.onUp.add(this.onKeyUp, this); //arrow
		GAME.wKey.onUp.add(this.onKeyUp, this);
		//A - LEFT
		this.cursors.left.onUp.add(this.onKeyUp, this); //arrow
		GAME.aKey.onUp.add(this.onKeyUp, this); 
		//S - DOWN
		this.cursors.down.onUp.add(this.onKeyUp, this); //arrow
		GAME.sKey.onUp.add(this.onKeyUp, this);		
		//D - Right
		this.cursors.right.onUp.add(this.onKeyUp, this); //arrow
		GAME.dKey.onUp.add(this.onKeyUp, this);
		//SPACE
		GAME.spaceKey.onDown.add(this.resetGame, this);


	}
	update(){

	}



	onKeyUp = (key) =>{
		let sprite = GAME.player;
	    if(!sprite.alive){
	        console.log("NOT ALIVE")
	        return;
	    }

	    sprite.body.velocity.x = 0;
	    sprite.body.velocity.y = 0;
	    sprite.body.angularVelocity = 0;
	    // console.log("onKeyUp, this", this);

	    switch(key.keyCode){
	    	//Up
	    	case 38:
	    	case 87:
	    		// sprite.body.velocity.y -= 100;
	            movement.up(this);
	    		break;
	    	//Down
	    	case 40:
	    	case 83: 
	    		// sprite.body.velocity.y += 100;
	            movement.down(this);
	    		break;
	    	//Left
	    	case 37:
	    	case 65:
	    		// sprite.body.velocity.x -= 100;
	            movement.left(this);
	    		break;
	    	//Right
	    	case 39:
	    	case 68:
	    		// sprite.body.velocity.x += 100;
	            movement.right(this);
	    		break;
	    	default:
		    	break;
	    }
	}

	loadActors = () =>{
		console.log("loadActors()");
		let {enemy_count} = GAME;
	}

	resetGame = () =>{
		// all coins collected, advance level
		console.log("GAME.coins_left", GAME.coins_left);
		if(GAME.coins_left < 1){
			GAME.level++;
			GAME.levelText.setText(`Level: ${GAME.level}`)
			//reset game variables,
			GAME.coins_left = GAME.coin_count;
			GAME.move_total = 0;
			GAME.coin_total = 0;
			GAME.floorTileCount = 0;
			this.loadLevel(this);
			this.loadPlayer(this);
		}
	}

}

export default Play;