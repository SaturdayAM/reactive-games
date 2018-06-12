import React from 'react';
import { connect } from "react-redux";

import * as actions from '../redux_components/actions'

const Signup = (props) =>{
	return(
		<div>
			<h1>Signup.js</h1>
			<form onSubmit={(e)=>props.handleSignupSubmit(e, 
								 {username: props.username,
								  password: props.password,
								  passwordConf: props.passwordConf
								 }
							)}
			>
			  <label>
			    Username:
			    <input type="text" name="username" 
			    	   onChange={props.handleSignupInputChange}
			    	   value={props.username}/>
			  </label>
			  <label>
			    Password:
			    <input type="password" name="password" 
			    	   onChange={props.handleSignupInputChange}
			    	   value={props.password}/>
			  </label>
			  <label>
			    Confirm Password:
			    <input type="password" name="passwordConf" 
			    	   onChange={props.handleSignupInputChange}
			    	   value={props.passwordConf}/>
			  </label>
			  <input type="submit" value="Submit" />
			</form>
		</div>
	)		
}

const mapStateToProps = state =>({
	username: state.signup.username,
	password: state.signup.password,
	passwordConf: state.signup.passwordConf
})

export default connect(mapStateToProps, actions)(Signup);