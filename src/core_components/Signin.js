import React from 'react';
/*
	props={
		handleSignin: App::handleLogin()
	}
*/

class Signin extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			username: "",
			password: ""
		}
	}

	handleSubmit = (e) =>{
		e.preventDefault();
		if(this.state.username && this.state.password){
			this.props.handleSignin(this.state);
			this.setState({
				username:"",
				password:""
			})	
		}else{
			alert("Please enter both a username and password!")
			this.setState({
				username:"",
				password:""
			})
		}
	}

	handleInputChange = (e) =>{
		this.setState({
			[e.target.name] : e.target.value
		})
	}

	render(){
		return(
			<div>
				<h1>Signin.js</h1>
				<form onSubmit={this.handleSubmit}>
				  <label >
				    Username:
				    <input type="text" name="username" 
				    	   onChange={this.handleInputChange}
				    	   value={this.state.username}/>
				  </label>
				  <label>
				    Password:
				    <input type="password" name="password" 
				    	   onChange={this.handleInputChange}
				    	   value={this.state.password}/>
				  </label>
				  <input type="submit" value="Submit" />
				</form>
			</div>
		)	
	}
}
export default Signin;