import Phaser from 'phaser';

import preload from './scene/preload';
import create from './scene/create';
import update from './scene/update';


var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics:{
        default: 'arcade',
        arcade: {
            gravity: { y: 300},
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    parent: "phaser-canvas"
};



export default config;