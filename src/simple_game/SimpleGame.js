import React from 'react';
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'

import Circle from './Circle'
import * as actions from "../redux_components/actions"


class SimpleGame extends React.Component{
	constructor(props){
		super(props);
	}

	componentWillUnmount(){
		this.cleanUpInterval();
		this.props.handleEndGame();
	}

	startInterval = () => {
	    this.interval = setInterval(this.updateCounter, 1000);
	}

	cleanUpInterval = () => {
	    clearInterval(this.interval);
	}

	updateCounter = () => {
		if(this.props.gameTime <= 0){
			this.props.handleSubmitScore({score: this.props.score,
										  currentUser: this.props.currentUser,
										  currentGame: this.props.currentGame})
			this.cleanUpInterval();
			this.props.handleEndGame();
		} else{
			this.props.handleGameTime();
		}
	}

	startGame = () =>{
		this.startInterval();
		this.props.handleStartGame(10);
	}

	getGameDisplay = () =>{
		return(
			<div>
				<h4>Time Left: {this.props.gameTime}</h4>
				<Circle/>
			</div>
		)
	}

	getStartButton = () =>{
		return(
			<Button primary onClick={this.startGame}>
				Start Game
			</Button>
		)
	}
	render(){
		let toDisplay = this.props.inGame ?
						  this.getGameDisplay(): this.getStartButton()
		return(
			<div style={{margin: 10, border: "1px solid blue"}}>
				<h1>SimpleGame.js</h1>
				<h3>Your Score: {this.props.score}</h3>
				{toDisplay}
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

export default connect(mapStateToProps, actions)(SimpleGame);