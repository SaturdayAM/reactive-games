import React from 'react';

import SimpleGame from '../simple_game/SimpleGame'
import OtherGame from '../other_game/OtherGame'
import Snake from '../snake_game/Snake'
import Twenty48 from '../2048/Twenty48'

import Hiscores from './Hiscores'

/*
	props={
		currentGame: App.state.currentGame,
		currentUser: App.state.currentUser
	}
*/

const baseUrl = "http://localhost:3000";

class GameViewer extends React.Component{
	constructor(props){
		super(props);
		this.state={
			scores: []
		}
	}

	componentDidMount(){
		console.log("GameViewer::componentDidMount()")
		fetch("http://localhost:3000/games")
			.then(response => response.json())
			.then(json=> {
				let game = json.find((e)=>e.name === this.props.currentGame)
				this.setState({
					scores: game.scores
				})
			})
	}

	submitGameScore = (score) =>{
		console.log("GameViewer::submitGameScore");
		console.log("Post will go here", score);
		//{username: currentUser, game: currentGame, score: score}
		if(this.props.currentUser){
			alert(`You scored ${score}! Submitting to hi-scores...`)
			let body = {username: this.props.currentUser,
						currentGame: this.props.currentGame,
						score: score
					   }
			fetch(`${baseUrl}/scores`, {
			      method: "POST",
			      body: JSON.stringify(body),
			      headers:{
			        "Content-Type": "application/json",
			        Accept: "application/json"
			      }
			})
			.then(response => response.json())
			.then(json=>{
				let scoresArr = [...this.state.scores, json.score];
				let sortedScores = scoresArr.sort((s1, s2)=>s2.score - s1.score); 
				this.setState({
					scores: sortedScores
				})
			})			
		} else{
			alert(`You scored ${score}! Sign in to save your scores`)
		}

	}

	getGame = () =>{
		console.log("GameViewer::getGame()", this.props.currentGame)
		let flag = this.props.currentGame;
		switch(flag){
			case "SimpleGame":
				return <SimpleGame currentUser={this.props.currentUser}
								   submitGameScore={this.submitGameScore}/>
			case "OtherGame":
				return <OtherGame currentUser={this.props.currentUser}
								  submitGameScore={this.submitGameScore}/>
			case "Snake":
				return <Snake currentUser={this.props.currentUser}
				 			  submitGameScore={this.submitGameScore}/>
			case "2048":
				return <Twenty48 currentUser={this.props.currentUser}
								 submitGameScore={this.submitGameScore}
						/>
			default:
				return (<h1>NO GAME</h1>)
		}
	}

	render(){
		return(
			<div className="game-view">
				{this.getGame()}
				<Hiscores scores={this.state.scores} />
			</div>
		)
	}
}

export default GameViewer;