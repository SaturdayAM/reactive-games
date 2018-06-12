import React from 'react';
import { connect } from "react-redux";

import * as actions from '../redux_components/actions'

const Signin = (props) =>{
	return(
		<div>
			<h1>Signin.js</h1>
			<form onSubmit={(e)=>props.handleSigninSubmit(e, {username: props.username,
															  password: props.password})}>
			  <label >
			    Username:
			    <input type="text" name="username" 
			    	   onChange={props.handleSigninInputChange}
			    	   value={props.username}/>
			  </label>
			  <label>
			    Password:
			    <input type="password" name="password" 
			    	   onChange={props.handleSigninInputChange}
			    	   value={props.password}/>
			  </label>
			  <input type="submit" value="Submit" />
			</form>
		</div>
	)	
}

const mapStateToProps = state => ({
	username: state.signin.username,
	password: state.signin.password		
});

export default connect(mapStateToProps, actions)(Signin);


