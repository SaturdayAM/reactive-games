import React from 'react';

/*
	props={
		handleSignup: App::handleSignup()
	}
*/

class Signup extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			username: "",
			password: "",
			passwordConf: ""
		}
	}

	handleInputChange = (e) =>{
		this.setState({
			[e.target.name] : e.target.value
		})
	}

	handleSubmit = (e) =>{
		// console.log("Signup::handleSubmit")
		e.preventDefault();
		let {username, password, passwordConf} = this.state;
		if(username && password && passwordConf){
			if(password === passwordConf){
				//do fetch
				this.props.handleSignup(this.state)
			}else{
				alert("Passwords don't match!")
			}
			this.setState({
				username:"",
				password:"",
				passwordConf: ""
			})	
		}else{
			alert("Please fill out all fields!")
			this.setState({
				username:"",
				password:"",
				passwordConf:""
			})
		}
	}

	render(){
		return(
			<div>
				<h1>Signup.js</h1>
				<form onSubmit={this.handleSubmit}>
				  <label>
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
				  <label>
				    Confirm Password:
				    <input type="password" name="passwordConf" 
				    	   onChange={this.handleInputChange}
				    	   value={this.state.passwordConf}/>
				  </label>
				  <input type="submit" value="Submit" />
				</form>
			</div>
		)		
	}
	
}

export default Signup;