import Phaser from 'phaser';

import config from './config.js';

//Closure to initialize our game
var initGame = function(){
    return new Phaser.Game(config);
}

export default initGame;