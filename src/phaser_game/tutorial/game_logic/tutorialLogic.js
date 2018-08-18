import Phaser from 'phaser';
import gameVars from '../gameVariables'


export function hitBomb(player, bomb){
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    gameVars.gameOver = true;
}

export function collectStar(player, star){
    star.disableBody(true, true);
    gameVars.score += 10;
    gameVars.scoreText.setText('Score: ' + gameVars.score);

    //checking for active stars
    if(gameVars.stars.countActive(true)===0){
        //re-enable if none left
        gameVars.stars.children.iterate((child)=>{
            child.enableBody(true, child.x, 0, true, true)
        })
        //randomize player location
        let x = player.x < 400 ? Phaser.Math.Between(400, 800) : 
                                 Phaser.Math.Between(0, 400);
        //drop bombs
        let bomb = gameVars.bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;
    }
}
