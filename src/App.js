import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import GameViewer from './core_components/GameViewer'
import GamesIndex from './core_components/GamesIndex'
import NavBar from './core_components/NavBar'
import Signin from './core_components/Signin'
import Signup from './core_components/Signup'

const baseUrl = "http://localhost:3000";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentGame: "2048",
      currentUser: null
    }
  }

  componentDidMount(){
    //prevent scrolling page with arrow keys
    //referenced: https://stackoverflow.com/a/8916697
    window.addEventListener("keydown", function(e) {
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
    }, false);

  }

  handleGamesIndexClick = (e) =>{
    console.log("App::handleGamesIndexClick()", e.target.name)
    this.setState({
      currentGame: e.target.name
    }, ()=>console.log(this.state))
  }

  handleSignin = (user) =>{
    // console.log("App::handleSignin()", user)
    fetch(`${baseUrl}/signin`,{
      method: "POST",
      body: JSON.stringify(user),
      headers:{
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
    .then(response => response.json())
    .then(json =>{
      if(json.success){
        alert(`Sucessfully logged in as ${user.username}`)
        this.setState({
          currentUser: user.username
        })
        localStorage.setItem("token", json.token)
      }else{
        alert("Incorrect login information!")
      }
    })

  }

  handleSignup = (user) =>{
    console.log("App::handleSignup()", user)
    fetch(`${baseUrl}/users`,{
      method: "POST",
      body: JSON.stringify(user),
      headers:{
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
    .then(response => response.json())
    .then(json => {
      console.log(json)
      if(json.success){
        alert(`Sucessfully signed up as ${user.username}!`)
        this.setState({
          currentUser: user.username
        })
        localStorage.setItem("token", json.token)
      }else{
        alert(`${json.error_message}`)
      }
    })
  }

  render() {
    return (
      <Router>
        <div>
          <div className="App-header">
            {this.state.currentUser ? `Logged in as ${this.state.currentUser}` : "Not logged in!"}
            <NavBar/>
          </div>
          <Route exact path="/" render={()=><GameViewer currentGame={this.state.currentGame}
                                                        currentUser={this.state.currentUser}/>} 
          />
          <Route exact path="/index" render={()=> <GamesIndex 
                                                  handleGamesIndexClick={this.handleGamesIndexClick}
                                                  />}
          />
          <Route exact path="/signin" render={()=><Signin handleSignin={this.handleSignin}/>}/>
          <Route exact path="/signup" render={()=><Signup handleSignup={this.handleSignup}/>}/>
        </div>
      </Router>
    );
  }
}

      // <div className="App">
      //   <header className="App-header">
          // <img src={logo} className="App-logo" alt="logo" />
          // <h1 className="App-title">Welcome to React</h1>
        // </header>
        // <GameViewer/>
      // </div>
export default App;
