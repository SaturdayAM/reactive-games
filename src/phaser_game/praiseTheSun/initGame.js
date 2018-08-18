import Phaser from 'phaser';

import Boot from './state/Boot'
import Load from './state/Load'
import Menu from './state/Menu'
import Play from './state/Play'
import GAME from './gameVariables'


export default function initGame(){
	let game = new Phaser.Game(GAME.w, GAME.h, Phaser.AUTO, 'phaser-canvas');
	//Supply states
	game.state.add('Boot', Boot);
	game.state.add('Load', Load);
	game.state.add('Menu', Menu);
	game.state.add('Play', Play);

	//Start a state, 'Boot'
	game.state.start('Boot');
	return game;
};