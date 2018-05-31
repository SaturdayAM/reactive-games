import React from 'react';
import { NavLink } from 'react-router-dom';

const GamesIndex = (props) =>{
	console.log("GamesIndex", props)
	return(
		<div>
			<h1>GamesIndex.js</h1>
			<ul>
			
				<li onClick={(e)=>props.handleGamesIndexClick(e)}
					name="Snake">
					<NavLink
						name="Snake"
						to="/"
					>
					Snake
					</NavLink>

				</li>
				<li onClick={(e)=>props.handleGamesIndexClick(e)}
					name="2048">
					<NavLink
						name="2048"
						to="/"
					>
					2048
					</NavLink>

				</li>
				<li onClick={(e)=>props.handleGamesIndexClick(e)}
					name="SimpleGame">
					<NavLink
					 name="SimpleGame"
					   to="/"
					>
					SimpleGame
					</NavLink>
				</li>
				<li onClick={(e)=>props.handleGamesIndexClick(e)}
					name="OtherGame">
					<NavLink
						name="OtherGame"
						to="/"
					>
					OtherGame
					</NavLink>

				</li>		

			</ul>
		</div>
	)
}

export default GamesIndex;