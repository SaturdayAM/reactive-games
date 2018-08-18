import Phaser from 'phaser';

import gameVars from '../gameVariables'
import {hitBomb, collectStar} from '../game_logic/tutorialLogic'


export default function create(){
	this.add.image(400, 300, 'sky');
    gameVars.platforms = this.physics.add.staticGroup();
    gameVars.bombs = this.physics.add.group();

    gameVars.stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

     //display score
    gameVars.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    //Add player sprite
    gameVars.player = this.physics.add.sprite(100, 450, 'dude');


    //Create ground
    gameVars.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    //create ledges
    gameVars.platforms.create(600, 400, 'ground');
    gameVars.platforms.create(50, 250, 'ground');
    gameVars.platforms.create(750, 220, 'ground');


    gameVars.player.setBounce(0.2);
    gameVars.player.setCollideWorldBounds(true);
    gameVars.player.body.setGravityY(200);

    //Create animations for player sprite
    this.anims.create({ //LEFT
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({ //TURN
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });
    this.anims.create({ //RIGHT
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });


    gameVars.stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    //********************** Colliders *****************************

    //Enable collsion between stars/player/bombs and the platforms.
    this.physics.add.collider(gameVars.stars, gameVars.platforms);
    this.physics.add.collider(gameVars.player, gameVars.platforms);
    this.physics.add.collider(gameVars.bombs, gameVars.platforms);

    //*************** Colliders with Game Logic ****************
    //collectStar() cbf to deal with player overlapping stars.
    this.physics.add.overlap(gameVars.player, gameVars.stars, collectStar, null, this);
    //hitBomb() cbf to deal with player hitting bombs.
    this.physics.add.collider(gameVars.player, gameVars.bombs, hitBomb, null, this);
};





