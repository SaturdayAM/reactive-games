import React from 'react';
import { connect } from 'react-redux';
import {Header} from 'semantic-ui-react';

import * as actions from "../redux_components/actions";

/*
	Referred to the following tutorial for the snake game:
	https://www.youtube.com/watch?v=xGmXxpIj6vs
*/
let x_vel=0;
let y_vel=0;

//player position
let player_x = 10;
let player_y = 10;

//grid positions
let g_height = 20;
let g_width = 20;

//egg location
let egg_x = 15;
let egg_y = 15;


//Previous positions
let trail = [];

//starting length of snake
let length = 5;

class Snake extends React.Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
		let canvas = document.getElementById("gc");
		let context = canvas.getContext("2d");
				context.fillStyle="black";
		context.fillRect(0, 0, canvas.width, canvas.height);
	}

	componentWillUnmount(){
		document.removeEventListener("keydown", this.keyPush);
		this.cleanUpInterval();
	}

	game = (context, canvas) =>{
		player_x += x_vel;
		player_y += y_vel;

		//allow for wrapping
		// if out of bounds on the x axis
		if(player_x < 0){
			player_x = g_width - 1;
		}
		if(player_x > g_width - 1){
			player_x = 0;
		}

		//if out of bounds on the y axis
		if(player_y < 0){
			player_y = g_height - 1;
		}

		if(player_y > g_height - 1){
			player_y = 0;
		}

		context.fillStyle="black";
		context.fillRect(0, 0, canvas.width, canvas.height);

		//moving the snake
		context.fillStyle="lime"
		for(let i = 0; i < trail.length; i++){
			context.fillRect(trail[i].x*g_height, 
							 trail[i].y*g_height,
							 g_height-2, g_height-2);
			//if tail collision
			if(trail[i].x==player_x &&trail[i].y==player_y){
				length = 5;
				let decrement = Math.ceil(this.props.score/2)
				this.props.handleSetGameScore(-decrement);
			}
		}

		//drawing the egg
		context.fillStyle="yellow"
		context.fillRect(egg_x*g_height, egg_y*g_height, 
						 g_height-2, g_height-2)

		//updating the snake trail
		trail.push({x: player_x, y: player_y})
		while(trail.length > length){
			trail.shift()
		}

		//if reached egg
		if(egg_x == player_x && egg_y == player_y){
			length++; //grow snake
			//move the egg
			egg_x = Math.floor(Math.random()*g_height);
			egg_y = Math.floor(Math.random()*g_height);
			this.props.handleSetGameScore(1);
		}

	}
	endGame = () =>{
		this.cleanUpInterval();
		x_vel=0;
		y_vel=0;
		//player position
		player_x = 10;
		player_y = 10;

		//grid positions
		g_height = 20;
		g_width = 20;

		//egg location
		egg_x = 15;
		egg_y = 15;

		//Previous positions
		trail = [];

		//starting length of snake
		length = 5;

		this.props.handleSubmitScore({score: this.props.score,
									  currentUser: this.props.currentUser,
									  currentGame: this.props.currentGame});
		this.props.handleEndGame();
	}
	startGame = (e) =>{
		let canvas = document.getElementById("gc");
		let context = canvas.getContext("2d");
		document.addEventListener("keydown", this.keyPush);
		this.props.handleStartGame(60);
		this.interval = setInterval(()=>{this.game(context, canvas)}, 1000/15);
		this.timer = setInterval(this.updateCounter, 1000);
	}

	cleanUpInterval = () =>{
		clearInterval(this.interval);
		clearInterval(this.timer);
	}

	updateCounter = () => {
		if(this.props.gameTime <= 0){
			this.endGame();
		} else{
			this.props.handleGameTime();
		}
	}

	keyPush = (e) =>{
		let flag = e.keyCode;
		switch(flag){
			case 38: //up
				y_vel = -1;
				x_vel = 0;
				break;
			case 40: //down
				y_vel = 1;
				x_vel = 0;
				break;
			case 37: //left
				x_vel = -1;
				y_vel = 0;
				break
			case 39: //right
				x_vel = 1;
				y_vel = 0;
				break;
		}
	}

	render(){
		return(
			<div className="snake-container">
				<div className="snake-score-button">
					<Header as="h2" textAlign="center">
						Snake.js
					</Header>
					<span className="snake-score-button">
					<b>Score: {this.props.score} Time: {this.props.gameTime}</b>
					{this.props.inGame ? <button onClick={this.endGame}
												 className="snake-button">
										 End Game
										 </button> :
										 <button onClick={this.startGame}
										 		 className="snake-button">
										 Start Game
										 </button>
					}
					</span>
				</div><br/>
				<canvas id="gc" width="400" height="400"></canvas>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	score: state.score,
	gameTime: state.gameTime,
	inGame: state.inGame,
	currentUser: state.currentUser,
	currentGame: state.currentGame
})



export default connect(mapStateToProps, actions)(Snake);