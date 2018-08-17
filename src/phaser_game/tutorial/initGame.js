import Phaser from 'phaser';

import config from './config.js';

//Closure to initialize our game
export default function initGame(){
    return new Phaser.Game(config);
}
