import Phaser from 'phaser';


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

var platforms;
var score = 0;
var scoreText;
var player;
var stars;
var bombs;
var cursors;
var gameOver = false;

function preload(){
    this.load.image('sky', 'sky.png');
    this.load.image('ground', 'platform.png');
    this.load.image('star', 'star.png');
    this.load.image('bomb', 'bomb.png');
    this.load.spritesheet('dude', 
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}

function create(){
	this.add.image(400, 300, 'sky');
    platforms = this.physics.add.staticGroup();
    bombs = this.physics.add.group();

    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

     //display score
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    //Add player sprite
    player = this.physics.add.sprite(100, 450, 'dude');


    //Create ground
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    //create ledges
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');


    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.body.setGravityY(200);

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


    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    //********************** Colliders *****************************

    //Enable collsion between stars/player/bombs and the platforms.
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(bombs, platforms);

    //*************** Colliders with Game Logic ****************
    //collectStar() cbf to deal with player overlapping stars.
    this.physics.add.overlap(player, stars, collectStar, null, this);
    //hitBomb() cbf to deal with player hitting bombs.
    this.physics.add.collider(player, bombs, hitBomb, null, this);
}

function update(){
    // cursors = this.input.keyboard.createCursorKeys();
    // if(cursors.left.isDown){
    //     player.setVelocityX(-160);
    //     player.anims.play('left', true);
    // }
    // else if(cursors.right.isDown){
    //     player.setVelocityX(160);
    //     player.anims.play('right', true);
    // }
    // else{
    //     player.setVelocityX(0);
    //     player.anims.play('turn');
    // }
    // if(cursors.up.isDown && player.body.touching.down){
    //     player.setVelocityY(-450);
    // }
}


function hitBomb(player, bomb){
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    gameOver = true;
}

//callback fn, called when player and star overlap 
let collectStar = (player, star)=>{
    star.disableBody(true, true);
    score += 10;
    scoreText.setText('Score: ' + score);

    //checking for active stars
    if(stars.countActive(true)===0){
        stars.children.iterate((child)=>{
            child.enableBody(true, child.x, 0, true, true)
        })
        let x = player.x < 400 ? Phaser.Math.Between(400, 800) : 
                                 Phaser.Math.Between(0, 400);

        let bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;
    }

}

export default config;