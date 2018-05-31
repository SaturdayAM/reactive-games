import React from 'react';
import { Button } from 'semantic-ui-react'

import Circle from '../simple_game/Circle'

class OtherGame extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			score: 0,
			gameTime: 10,
			inGame: false
		}
	}

	componentWillUnmount(){
		this.cleanUpInterval();
	}

	clickedButton = () =>{
		this.setState({
			score: this.state.score + 1
		})
	}


	startInterval = () => {
	    this.interval = setInterval(this.updateCounter, 1000);
	}

	cleanUpInterval = () => {
	    clearInterval(this.interval);
	}

	updateCounter = () => {
		if(this.state.gameTime <= 0){
			this.props.submitGameScore(this.state.score);
			this.cleanUpInterval();
			this.setState({
				score: 0,
				gameTime: 10,
				inGame: false
			})
		} else{
		    this.setState({
			      gameTime: this.state.gameTime - 1
		    }) //end setState
		}
	}


	handleStartGame = () =>{
		console.log("handleStartGame")
		this.setState({
			inGame: true
		})
		this.startInterval();
	}

	getGameDisplay = () =>{
		return(
			<div>
				<h4>Time Left: {this.state.gameTime}</h4>
				<Circle clickedButton={this.clickedButton}
						secondClass="other-game-circle"/>
			</div>
		)
	}

	getStartButton = () =>{
		return(
			<Button primary onClick={this.handleStartGame}>
				Start Game
			</Button>
		)
	}
	render(){
		let toDisplay = this.state.inGame ?
						  this.getGameDisplay(): this.getStartButton()
		return(
			<div style={{margin: 10, border: "1px solid blue"}}>
				<h1>OtherGame.js</h1>
				<h3>Your Score: {this.state.score}</h3>
				{toDisplay}

			</div>
		)
	}
}

export default OtherGame;