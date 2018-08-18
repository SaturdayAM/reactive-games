import Phaser from 'phaser';
import GAME from '../gameVariables';

//*******************************************************
//					    GAME.Boot					   //		
// 													   //
//*******************************************************
//Game set up, i.e. setting dimensions
class Boot extends Phaser.State{
	//Load assets that are requires, i.e. sprites, sound effects
	preload(){	
		this.game.stage.backgroundColor = '#563737';
		this.game.load.image('loading', 'sunAssets/images/loading.png');
		this.game.load.image('title', 'sunAssets/images/title.png');
		this.game.load.image('instructions', 'sunAssets/images/instructions.png');
		this.game.load.image('sky', 'tutorialAssets/sky.png')
		this.game.load.image('sun', 'sunAssets/images/sun.png')
		this.game.load.image('praise', 'sunAssets/images/praise.png')

	    this.game.load.bitmapFont('minecraftia', 'sunAssets/fonts/font.png', 'sunAssets/fonts/font.xml'); //load default font

        //Scale Image to Fit Window
	    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	    this.game.scale.maxHeight = window.innerHeight;
	    this.game.scale.maxWidth = window.innerHeight*(GAME.w/GAME.h);
	}
	//Called once after preload(), used for init setup of game
	create(){
		this.game.state.start('Load');
	}
	//Starts after create(), is continuosuly clalled during game loop
	update(){
		
	}
}

export default Boot;