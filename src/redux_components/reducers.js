import { combineReducers } from "redux";
import {
	CHANGE_CURRENT_GAME,
	SIGNIN_INPUT_CHANGE,
	SIGNIN_SUBMIT,
	SET_CURRENT_USER,
	SIGNUP_INPUT_CHANGE,
	SIGNUP_SUBMIT,
	SUBMIT_GAME_SCORE,
	SET_GAME_SCORE,
	BEGIN_GAME,
	END_GAME,
	CHANGE_GAME_TIME,
	FETCH_HISCORES,
	UPDATE_HISCORES
} from './actions/types'

/*
	action={
		type: "INCREASE_COUNT"
	}
*/

const currentGameReducer = (state = "2048", action) =>{
	switch(action.type){
		case CHANGE_CURRENT_GAME:
			return action.payload.game;
		default:
			return state;

	}
}


const currentUserReducer = (state = null, action) =>{
	switch(action.type){
		case SET_CURRENT_USER:
			return action.payload.currentUser;
		default:
			return state;
	}
}

const scoresReducer = (state = [], action) =>{
	switch(action.type){
		case FETCH_HISCORES:
			return action.payload.scores;
		case UPDATE_HISCORES:
			let scoresArr = [...state, action.payload.score];
			let sortedScores = scoresArr.sort((s1, s2)=>s2.score - s1.score);
			return sortedScores;
		default:
			return state;
	}
}
const currentScoreReducer = (state = 0, action) =>{
	switch(action.type){
		case SET_GAME_SCORE:
			return state + action.payload.score;
		case END_GAME:
			return 0;
		default:
			return state;
	}
}
const gameTimeReducer = (state = 60, action) =>{
	switch(action.type){
		case BEGIN_GAME:
			return action.payload.time;
		case END_GAME:
			return 60;
		case CHANGE_GAME_TIME:
			return state - 1;
		default:
			return state;
	}
}
const inGameReducer = (state = false, action) =>{
	switch(action.type){
		case BEGIN_GAME:
			return true;
		case END_GAME:
			return false;
		default:
			return state;
	}

}
const signinReducer = (state = {username:"", password:""}, action) =>{
	let {username, password} = state;
	switch(action.type){
		case SIGNIN_INPUT_CHANGE:
			return {
					...state,
					[action.payload.name] : action.payload.value
			}
		case SIGNIN_SUBMIT:
			return{
				username:"",
				password:""
			}
		default:
			return state;
	}

}
const signupReducer = (state = {username:"", password:"", passwordConf:""}, action) =>{
	let {username, password, passwordConf} = state;
	switch(action.type){
		case SIGNUP_INPUT_CHANGE:
			return{
				...state,
				[action.payload.name] : action.payload.value
			}
		case SIGNUP_SUBMIT:
			return{
				username:"",
				password:"",
				passwordConf:""
			}
		default:
			return state;
	}
}


const rootReducer = combineReducers({
	currentGame: currentGameReducer,
	currentUser: currentUserReducer,
	scores: scoresReducer,
	score: currentScoreReducer,
	gameTime: gameTimeReducer,
	inGame: inGameReducer,
	signin: signinReducer,
	signup: signupReducer
});

export default rootReducer;
