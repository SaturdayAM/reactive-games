import Phaser from 'phaser';
import {BitmapText} from 'phaser';
import GAME from '../gameVariables';

//*******************************************************
//					    GAME.Menu					   //		
// 													   //
//*******************************************************
// State to display title screen for game
class Menu extends Phaser.State{
	preload(){
		//Menu music
        this.game.load.audio('DSMenu', 'sunAssets/audio/DSMenu.mp3')
	}
	create(){
		// this.game.add.image(20, 0, 'sky');
		let background = this.game.add.sprite(-50, -100, 'darksignBackground')
	    // background.x = 0;
	    // background.y = 0;
	    background.height = GAME.h + 100;
	    background.width = GAME.w + 100;
	    background.smoothed = true;

		// this.sun = this.game.add.sprite(20, 10, 'sun');
		// this.sun.scale.x = 0.2;
		// this.sun.scale.y = 0.2;

		this.praise = this.game.add.sprite(GAME.w/2,GAME.h/2+50,'praise');
		this.praise.scale.x = 0.25;
		this.praise.scale.y = 0.25;

        this.praise.anchor.setTo(0.5,0.5);

        this.instructions = this.game.add.sprite(GAME.w/2+200,200,'instructions');
        this.instructions.scale.x = 0.5;
        this.instructions.scale.y = 0.5;

        // Start Message
        // var test = new BitmapText(this.game, GAME.w/2, GAME.h/2+80, 'minecraftia', '~click to start~', 24);
        var clickText = this.game.add.bitmapText(GAME.w/2 - 120, GAME.h/2+200, 'minecraftia', '~click to start~', 24); 
        var clickText = this.game.add.bitmapText(GAME.w/2 - 120, 20, 'minecraftia', 'Praise the Sun', 24); 

        //Sounds
        this.menuMusic = this.game.add.sound('DSMenu');
        // this.menuMusic.play('', 0, 0.1, true);
        // this.menuMusic.fadeIn(3000, true, '')
        this.menuMusic.onDecoded.add(()=>{
        	this.menuMusic.fadeIn(1000, true, '')
        }, this.menuMusic)
	}
	update(){
		if (this.game.input.activePointer.isDown){
			this.menuMusic.stop();
        	this.game.state.start('Play');
    	}
	}
}

export default Menu;