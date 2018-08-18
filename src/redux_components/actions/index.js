import{
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
} from './types'


const baseUrl = "http://localhost:3000";

//*******************************************************************
//																   //
//						Action Creators 						   //			
//																   //			
//*******************************************************************

// These are action creators. 
// They replace functions that would have been callback props, used
// in conjunction with reducers to perform actions


//************************** GamesIndex.js ***************************
export function handleGamesIndexClick(game){
	return{
		type: CHANGE_CURRENT_GAME,
		payload: {game}
	}
}

//************************** Signin.js *******************************
export function handleSigninInputChange(e){
	return{
		type: SIGNIN_INPUT_CHANGE,
		payload: {name: e.target.name, value: e.target.value}
	}
}

export function handleSigninSubmit(e, signinControls){
	e.preventDefault();
	const thunk = (dispatch, state) =>{
		dispatch({type: SIGNIN_SUBMIT});
		if(signinControls.username && signinControls.password){
			fetch(`${baseUrl}/signin`, {
				method: "POST",
				body: JSON.stringify(signinControls),
				headers:{
					"Content-Type": "application/json",
					Accept: "application/json"
				}
			})
			.then(response => response.json())
			.then(json =>{
				if(json.success){
					alert(`Successully signed up as ${signinControls.username}!`)
					dispatch({type: SET_CURRENT_USER, payload: {currentUser: signinControls.username}})
					localStorage.setItem("token", json.token)
				}else{
					alert("Incorrect login information!")
				}
			})
		}else{
			alert("Please enter both username and password!")
		}
	}
	return thunk;
}


//************************** Signup.js *******************************
export function handleSignupInputChange(e){
	return{
		type: SIGNUP_INPUT_CHANGE,
		payload: {name: e.target.name, value: e.target.value}
	}
}

export function handleSignupSubmit(e, signupControls){
	e.preventDefault();
	let {username, password, passwordConf} = signupControls;
	const thunk = (dispatch, state)=>{
		dispatch({type: SIGNUP_SUBMIT})
		if(username && password && passwordConf){
			if(password === passwordConf){
				//do fetch
				console.log("do signup");
				fetch(`${baseUrl}/users`, {
					method: "POST",
					body: JSON.stringify(signupControls),
					headers:{
						"Content-Type": "application/json",
						Accept: "application/json"
					}
				})
				.then(response=>response.json())
				.then(json=>{
					console.log(json);
					if(json.success){
						alert(`Successully signed up as ${signupControls.username}`)
						localStorage.setItem("token", json.token)
						dispatch({type: SET_CURRENT_USER, payload: {currentUser: signupControls.username}})

					}else{
						alert(`${json.error_message}`)
					}
				})
			}else{
				alert("Passwords don't match!")
			}
		}else{
			alert("Please fill out all fields!")
		}
	}
	return thunk;
}


//******************** GameViewer.js ***********************
export function handleFetchHiscores(scores){ 
	return{
		type: FETCH_HISCORES,
		payload: {scores: scores}
	}
}


//*************************** Games **********************
export function handleSubmitScore(scoreControls){
	let {currentUser, score, currentGame} = scoreControls;
	const thunk = (dispatch, state) =>{
		if(currentUser){
			alert(`You scored ${score}! Submitting to hi-scores...`)
			let body = {
				username: currentUser,
				currentGame: currentGame,
				score: score
			}
			fetch(`${baseUrl}/scores`,{
				method: "POST",
				body: JSON.stringify(body),
				headers:{
					"Content-Type": "application/json",
					Accept: "application/json"
				}
			})
			.then(response => response.json())
			.then(json=>{
				dispatch({type: UPDATE_HISCORES, 
						  payload: {score: json.score}})
			})
		}else{
			alert(`You scored ${score}! Sign in to save your scores`)
		}
	}
	return thunk;
}

export function handleSetGameScore(score){
	return{
		type: SET_GAME_SCORE,
		payload: {score: score}
	}
}

export function handleStartGame(time){
	console.log("handleStartGame", time)
	return{
		type: BEGIN_GAME,
		payload: {time: time}
	}
}

export function handleEndGame(){
	return{
		type: END_GAME
	}
}

export function handleGameTime(){
	return{
		type: CHANGE_GAME_TIME
	}
}

