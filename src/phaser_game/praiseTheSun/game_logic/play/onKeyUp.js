import GAME from '../../gameVariables'
import movement from './movement'

const onKeyUp = (key) =>{
	let sprite = GAME.player;
    if(!sprite.alive){
        console.log("NOT ALIVE")
        return;
    }

    sprite.body.velocity.x = 0;
    sprite.body.velocity.y = 0;
    sprite.body.angularVelocity = 0;
    // console.log(key);

    switch(key.keyCode){
    	//Up
    	case 38:
    	case 87:
    		sprite.body.velocity.y -= 100;
            movement.up();
    		break;
    	//Down
    	case 40:
    	case 83: 
    		sprite.body.velocity.y += 100;
            movement.down();
    		break;
    	//Left
    	case 37:
    	case 65:
    		sprite.body.velocity.x -= 100;
            movement.left();
    		break;
    	//Right
    	case 39:
    	case 68:
    		sprite.body.velocity.x += 100;
            movement.right();
    		break;
    	default:
	    	break;
    }
}

export default onKeyUp;