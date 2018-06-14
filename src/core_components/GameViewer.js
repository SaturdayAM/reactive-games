import React from 'react';
import { connect } from 'react-redux'

import SimpleGame from '../simple_game/SimpleGame'
import OtherGame from '../other_game/OtherGame'
import Snake from '../snake_game/Snake'
import Twenty48 from '../2048/Twenty48'
import WatchYourBacon from '../phaser_game/WatchYourBacon'

import Hiscores from './Hiscores'

import * as actions from "../redux_components/actions"

const baseUrl = "http://localhost:3000";

class GameViewer extends React.Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
		fetch("http://localhost:3000/games")
			.then(response => response.json())
			.then(json=> {
				let game = json.find((e)=>e.name === this.props.currentGame)
				this.props.handleFetchHiscores(game.scores)
			})
	}
	getGame = () =>{
		let flag = this.props.currentGame;
		switch(flag){
			case "SimpleGame":
				return <SimpleGame />
			case "OtherGame":
				return <OtherGame />
			case "Snake":
				return <Snake />
			case "2048":
				return <Twenty48 />
			case "WatchYourBacon":
				return <WatchYourBacon />
			default:
				return (<h1>NO GAME</h1>)
		}
	}
	render(){
		return(
			<div className="game-view">
				{this.getGame()}
				<Hiscores />
			</div>
		)
	}
}

/*
	props={
		currentGame: App.state.currentGame,
		currentUser: App.state.currentUser
	}
*/
const mapStateToProps = state => ({
	currentGame: state.currentGame,
	currentUser: state.currentUser
})

export default connect(mapStateToProps, actions)(GameViewer);