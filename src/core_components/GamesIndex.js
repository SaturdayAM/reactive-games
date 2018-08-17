import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";

import{
	CHANGE_CURRENT_GAME
} from '../redux_components/actions/types'
import * as actions from '../redux_components/actions'


const GamesIndex = (props) =>{
	console.log("GamesIndex", props)
	return(
		<div>
			<h1>GamesIndex.js</h1>
			<ul>
			
				<li onClick={(e)=>props.handleGamesIndexClick("Snake")}
					name="Snake">
					<NavLink
						name="Snake"
						to="/"
					>
					Snake
					</NavLink>

				</li>
				<li onClick={(e)=>props.handleGamesIndexClick("2048")}
					name="2048">
					<NavLink
						name="2048"
						to="/"
					>
					2048
					</NavLink>

				</li>
				<li onClick={(e)=>props.handleGamesIndexClick("SimpleGame")}
					name="SimpleGame">
					<NavLink
					 name="SimpleGame"
					   to="/"
					>
					SimpleGame
					</NavLink>
				</li>
				<li onClick={(e)=>props.handleGamesIndexClick("OtherGame")}
					name="OtherGame">
					<NavLink
						name="OtherGame"
						to="/"
					>
					OtherGame
					</NavLink>
				</li>				
				<li onClick={(e)=>props.handleGamesIndexClick("WatchYourBacon")}
					name="WatchYourBacon">
					<NavLink
						name="WatchYourBacon"
						to="/"
					>
					Praise The Sun
					</NavLink>
				</li>		
			</ul>
		</div>
	)
}

// const mapDispatchToProps = dispatch =>{
// 	return{
// 		handleGamesIndexClick: e => dispatch({
// 			type: CHANGE_CURRENT_GAME,
// 			payload: {game: "Snake"}
// 		})
// 	}
// }

export default connect(null, actions)(GamesIndex);