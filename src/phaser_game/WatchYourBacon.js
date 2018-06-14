import React from 'react';
import { connect } from 'react-redux';
import Phaser from 'phaser';

import config from './config.js'
import * as actions from "../redux_components/actions";

class WatchYourBacon extends React.Component{
	componentDidMount(){
		var game = new Phaser.Game(config);
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