import gameVars from '../gameVariables'

export default function update(){
    gameVars.cursors = this.input.keyboard.createCursorKeys();
    if(gameVars.cursors.left.isDown){
        gameVars.player.setVelocityX(-160);
        gameVars.player.anims.play('left', true);
    }
    else if(gameVars.cursors.right.isDown){
        gameVars.player.setVelocityX(160);
        gameVars.player.anims.play('right', true);
    }
    else{
        gameVars.player.setVelocityX(0);
        gameVars.player.anims.play('turn');
    }
    if(gameVars.cursors.up.isDown && gameVars.player.body.touching.down){
        gameVars.player.setVelocityY(-450);
    }
};
