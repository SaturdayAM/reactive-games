import React from 'react';

/*
	props = {
		clickedButton: SimpleGame::clickedButton()
		secondClass: str
	}
*/

class Circle extends React.Component{
	render(){
		return(
			<div className={`game-circle ${this.props.secondClass}`}
				 onClick={this.props.clickedButton}>
				<h1>Circle.js</h1>
			</div>
		)
	}

}

export default Circle;