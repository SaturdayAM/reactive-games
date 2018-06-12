import React from 'react';
import { connect } from 'react-redux';
import {Header} from 'semantic-ui-react';

import * as actions from "../redux_components/actions";

/*
	Referenced from the following tutorial:
	https://www.youtube.com/watch?v=tveTp3w3Wsg
	https://github.com/amadevBox/2048
*/

var size = 4;
var width = 400/4 - 6;
var cells = [];


class Twenty48 extends React.Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
		let canvas = document.getElementById("gc");
		let context = canvas.getContext("2d");
		context.fillStyle="black";
		context.fillRect(0, 0, canvas.width, canvas.height);
		document.addEventListener("keydown", this.keyPush);
	}

	componentWillUnmount(){
		console.log("Twenty48::componentWillUnmount()");
		document.removeEventListener("keydown", this.keyPush);
	}

	startGame = (e) =>{
		this.createCells();
		this.drawAllCells();
		this.props.handleStartGame(60);
	}

	endGame = (e) =>{
		let canvas = document.getElementById("gc");
		let context = canvas.getContext("2d");
		context.fillStyle="black";
		context.fillRect(0, 0, canvas.width, canvas.height);
		this.props.handleSubmitScore({score: this.props.score,
								      currentUser: this.props.currentUser,
								      currentGame: this.props.currentGame})
		this.props.handleEndGame();
	}

	moveUp = () =>{
		for(let col = 0; col < size; col++){
			for(let row = 0; row < size; row++){
				if(cells[row][col].value){
					let temp_row = row;
					while(temp_row > 0){
						if(!cells[temp_row - 1][col].value){ //empty spot
							cells[temp_row-1][col].value = cells[temp_row][col].value;
							cells[temp_row][col].value = 0;
							temp_row--;
						} //can add
						else if(cells[temp_row - 1][col].value == cells[temp_row][col].value){
							cells[temp_row - 1][col].value *=2;
							this.props.handleSetGameScore(cells[temp_row - 1][col].value);
							cells[temp_row][col].value = 0;
							break;
						}
						else break;
					}
				}
			}
		}
		this.pasteNewCell();
	}
	moveDown = () =>{
		for(let col = 0; col < size; col++){
			for(let row = 0; row < size; row++){
				if(cells[row][col].value){
					let temp_row = row;
					while(temp_row + 1 < size){
						if(!cells[temp_row + 1][col].value){ //empty spot
							cells[temp_row + 1][col].value = cells[temp_row][col].value;
							cells[temp_row][col].value = 0;
							temp_row++;
						} //can add
						else if(cells[temp_row + 1][col].value == cells[temp_row][col].value){
							cells[temp_row + 1][col].value *= 2;
							this.props.handleSetGameScore(cells[temp_row + 1][col].value)
							cells[temp_row][col].value = 0;
							break;
						}
						else break;
					}
				}
			}
		}
		this.pasteNewCell();
	}
	moveLeft = () =>{
		for(let row = 0; row < size; row++){
			for(let col = 0; col < size; col++){
				if(cells[row][col].value){
					let temp_col = col;
					while(temp_col - 1 >= 0){
						if(!cells[row][temp_col-1].value){ //empty spot on left
							cells[row][temp_col-1].value = cells[row][temp_col].value;
							cells[row][temp_col].value = 0;
							temp_col--;
						} //can add if same value
						else if(cells[row][temp_col].value == cells[row][temp_col-1].value){
							cells[row][temp_col-1].value *=2;
							this.props.handleSetGameScore(cells[row][temp_col-1].value);
							cells[row][temp_col].value = 0;
							break;
						}
						else break;
					}
				}
			}
		}
		this.pasteNewCell();
	}
	moveRight = () =>{
		for(let row = 0; row < size; row++){
			for(let col = size -2; col >=0 ; col--){
				if(cells[row][col].value){
					let temp_col = col;
					while(temp_col + 1 < size){
						if(!cells[row][temp_col+1].value){ //empty spot on right
							cells[row][temp_col+1].value = cells[row][temp_col].value;
							cells[row][temp_col].value = 0;
							temp_col++;
						} //can add if same value
						else if(cells[row][temp_col].value == cells[row][temp_col+1].value){
							cells[row][temp_col+1].value *=2;
							this.props.handleSetGameScore(cells[row][temp_col+1].value);
							cells[row][temp_col].value = 0;
							break;
						}
						else break;
					}
				}
			}
		}
		this.pasteNewCell();
	}


	keyPush = (e) =>{
		let flag = e.keyCode;
		if(this.props.inGame){
			switch(flag){
				case 38: //up
					this.moveUp();
					break;
				case 40: //down
					this.moveDown();
					break;
				case 37: //left
					this.moveLeft();
					break
				case 39: //right
					this.moveRight();
					break;
			}			
		}

	}


	drawCell = (cellObj, context) =>{
		context.beginPath();
		context.rect(cellObj.x, cellObj.y, width, width);

		switch(cellObj.value){
			case 0:
				context.fillStyle = "#FF0000";
				break;
			case 2:
				context.fillStyle = "red";
				break;
			case 4:
				context.fillStyle = "orange";
				break;
			case 8:
				context.fillStyle = "yellow";
				break;
			case 16:
				context.fillStyle = "cyan";
				break;
			case 32:
				context.fillStyle = "lime";
				break;
			case 64:
				context.fillStyle = "pink";
				break;
			case 128:
				context.fillStyle = "#25D33C";
				break;
			case 256:
				context.fillStyle = "#2547D3";
				break;
			case 512:
				context.fillStyle = "#D325BC";
				break;
			case 1024:
				context.fillStyle = "#86487E";
				break;
			case 2048:
				context.fillStyle = "#4B516B";
				break;
			case 4096:
				context.fillStyle = "#65BB12";
				break;
		}
		context.fill();
		if(cellObj.value){
			let fontSize = width/2;
			context.font = fontSize + "px Arial";
			context.fillStyle="white";
			context.textAlign="center";

			context.fillText(cellObj.value,
							 cellObj.x + width/2, 
							 cellObj.y + width/2);
		}
	}

	drawAllCells = () =>{
		let canvas = document.getElementById("gc");
		let context = canvas.getContext("2d");
		for(let row = 0; row < size; row++){
			for(let col = 0; col < size; col++){
				this.drawCell(cells[row][col], context)
			}
		}
	}
	cell = (row, col) =>{
		return(
			{
				value: 0,
				x: col * width + 5 * (col + 1),
				y: row * width + 5 * (row + 1)
			}
		)
	}

	createCells = () =>{
		for(let row = 0; row < size; row++){
			cells[row] = [];
			for(let col = 0; col < size; col++){
				cells[row][col] = this.cell(row, col);
			}
		}
	}

	pasteNewCell = () =>{ //find random cell on grid, add new block with value
		let freeCells = 0;
		//go through grid to find free cells
		for(let row = 0; row < size; row++){
			for(let col = 0; col < size; col++){
				if(!cells[row][col].value){ 
					freeCells++;
				}
			}
		}
		if(freeCells === 0){ //if no free cells, end game
			this.endGame();
			return;
		}
		while(true){
			let row = Math.floor(Math.random()*size);
			let col = Math.floor(Math.random()*size);
			if(!cells[row][col].value){
				cells[row][col].value = 2*Math.ceil(Math.random()*2);
				this.drawAllCells();
				return;
			}
		}
	}

	render(){
		return(
			<div className="twenty-container">
				<Header as="h2" textAlign="center">
					Twenty48.js
				</Header>
				<span className="twenty-score-button">
					<b>Your Score: {this.props.score}</b>
					{this.props.inGame ? <button onClick={this.endGame}
								 className="twenty-button">
						 End Game
						 </button> :
						 <button onClick={this.startGame}
						 		 className="twenty-button">
						 Start Game
						 </button>
					}
				</span>
				<canvas id="gc" width="400" height="400"></canvas>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	score: state.score,
	inGame: state.inGame,
	currentUser: state.currentUser,
	currentGame: state.currentGame
})

export default connect(mapStateToProps, actions)(Twenty48);