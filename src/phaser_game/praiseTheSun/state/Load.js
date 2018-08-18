import Phaser from 'phaser';
import GAME from '../gameVariables';

//*******************************************************
//					    GAME.Load					   //		
// 													   //
//*******************************************************
//Handle loading in assets that are required, launch 'Menu'
//'this' will reference the state, which has a reference to
//the game object
class Load extends Phaser.State{
	preload(){
		//Debug Plugin
	    // this.game.add.plugin(Phaser.Plugin.Debug);

	    //Loading Screen Message/bar
	    var loadingText = this.game.add.text(GAME.w, GAME.h, 'Loading...', { font: '30px Helvetica', fill: '#000' });
	  	loadingText.anchor.setTo(0.5, 0.5);
	  	var preloading = this.game.add.sprite(GAME.w/2-64, GAME.h/2+50, 'loading');
	  	this.game.load.setPreloadSprite(preloading);

	    //Load button for twitter
	    this.game.load.image('twitter','sunAssets/images/twitter.png');

	    this.game.load.image('sun', 'sunAssets/images/sun.png');

	    //Load sprite sheets
	    this.game.load.spritesheet('player','sunAssets/images/player.png',42,42,4);
	    this.game.load.spritesheet('coin','sunAssets/images/coin_spritesheet.png',22,22,4);
	    this.game.load.spritesheet('bonfire','sunAssets/images/bonfire_spritesheet.png',24,24,7);

	    this.game.load.spritesheet('dungeon', 'sunAssets/images/tiles.png',42,42,7);
	    this.game.load.spritesheet('enemy','sunAssets/images/npc_jack.png',64,64,15);
	    this.game.load.atlasXML('hearts','sunAssets/images/hearts.png','sunAssets/atlas/hearts.xml');

	    this.game.load.audio('attack', 'sunAssets/audio/attack.mp3');
	    this.game.load.audio('dead', 'sunAssets/audio/dead.mp3');

	    this.game.load.image('darksignBackground', 'sunAssets/images/darksignBackground.jpg' )


	    // Music Track
	    this.game.load.audio('music','sunAssets/audio/s31-Night_Prowler.mp3');
	}
	create(){
		this.game.add.image(20, 0, 'sky');
		this.game.add.image(20, 0, 'sun');
		this.game.state.start('Menu');
	}
	update(){

	}
}

export default Load;