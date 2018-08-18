import React from 'react';
import { connect } from 'react-redux';
// import 'phaser';


import Phaser from 'phaser';
import GAME from './praiseTheSun/gameVariables'
import initGame from './praiseTheSun/initGame';
import * as actions from "../redux_components/actions";
import handleWindowArrows from '../redux_components/handleWindowArrows';

var game;
//A component to view phaser game
class WatchYourBacon extends React.Component{
	componentDidMount(){
		game = initGame();
	}
	componentWillUnmount(){
		game.destroy();
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