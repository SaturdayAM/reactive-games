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

	endGame = (e) => {
		console.log("WatchYourBacon::endGame")
		this.props.handleSubmitScore({score: GAME.score,
						      currentUser: this.props.currentUser,
						      currentGame: this.props.currentGame})
		this.props.handleEndGame();
		game.destroy();
		GAME.score = 0;
		GAME.level = 0;
		GAME.coins_left = 12;
		GAME.coin_count = 12;
		GAME.coin_total = 0;
		GAME.move_total = 0;
		game = initGame();
	}

	render(){
		return(
			<div id="phaser-canvas">
				<span className="twenty-score-button">
					<button onClick={this.endGame}>
						 Submit Score
					</button>
				</span>
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