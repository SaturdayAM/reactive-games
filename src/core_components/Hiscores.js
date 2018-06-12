import React from 'react';
import { connect } from 'react-redux';
import { Image, List, Header } from 'semantic-ui-react';

import * as actions from "../redux_components/actions"
/*
	props={
		scores:[]
	}
*/

const getScores = (scoreArr) =>{
	let sortedScores = scoreArr.sort((s1, s2)=>s2.score - s1.score);
	let i = 0;
	return sortedScores.map(s => {
		let created = s.created_at;
		let date = created.substring(5,7) + "/" + created.substring(8,10)
				   + "/" +created.substring(0,4) + ", " + created.substring(11,16)
		return(
			<List.Item key={i++}>
				<List.Content>
					<Image avatar src='https://vignette.wikia.nocookie.net/ssb/images/3/3b/Captain_Falcon_Profile_Icon.png/revision/latest?cb=20150710035353'/>
					<List.Header>
					{' ' + i + ' '}) {s.user.username}   
					</List.Header>
					<em>Score: {s.score}</em> <br/>
					{date}
				</List.Content>
			</List.Item>
		)
	})
}

const Hiscores = (props) =>{
	let {scores} = props;
	return(
		<div className="hi-scores">
		    <Header as='h2' textAlign='center'>
		      Hi-Scores
		    </Header>
			{scores.length > 0? 
				<List horizontal className="horizontal-list">{getScores(scores)}</List>: 
				<h1>Loading...</h1>}
		</div>
	)
}

const mapStateToProps = state =>({
	scores: state.scores
})

export default connect(mapStateToProps, actions)(Hiscores);