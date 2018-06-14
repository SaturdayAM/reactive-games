import React from 'react';
import { connect } from 'react-redux';
import Phaser from 'phaser';

import initGame from './initGame';
import * as actions from "../redux_components/actions";
import handleWindowArrows from '../redux_components/handleWindowArrows';

class WatchYourBacon extends React.Component{
	componentDidMount(){
		console.log("WatchYourBacon::componentDidMount()");
		let game = initGame();
	}
	render(){
		return(
			<div style={{margin: 10, border: "1px solid cyan"}} id="phaser-canvas">
				<h2>WatchYourBacon.js</h2>
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

export default connect(mapStateToProps, actions)(WatchYourBacon);