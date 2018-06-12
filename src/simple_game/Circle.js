import React from 'react';
import { connect } from 'react-redux';

import * as actions from "../redux_components/actions"
/*
	props = {
		clickedButton: SimpleGame::clickedButton()
		secondClass: str
	}
*/

class Circle extends React.Component{
	render(){
		console.log("Circle: ", this.props.currentGame)
		return(
			<div className={`game-circle ${this.props.currentGame === 'SimpleGame' ? "simple-game-circle" : "other-game-circle"}`}
				 onClick={()=>this.props.handleSetGameScore(1)}>
				<h1>Circle.js</h1>
			</div>
		)
	}
}

const mapStateToProps = state =>({
	currentGame: state.currentGame
})

export default connect(mapStateToProps, actions)(Circle);