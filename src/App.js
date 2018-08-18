import React, { Component } from 'react';
import './assets/App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { connect } from 'react-redux'

import GameViewer from './core_components/GameViewer'
import GamesIndex from './core_components/GamesIndex'
import NavBar from './core_components/NavBar'
import Signin from './core_components/Signin'
import Signup from './core_components/Signup'

//Redux action creators in actions/index.js 
import * as actions from './redux_components/actions'
import handleWindowArrows from './redux_components/handleWindowArrows'

class App extends Component {
  componentDidMount(){
    //prevent scrolling page with arrow keys
    //referenced: https://stackoverflow.com/a/8916697
    // window.addEventListener("keydown", function(e) {
    //   if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    //       e.preventDefault();
    //   }
    // }, false); 
    // window.addEventListener("keydown", handleWindowArrows, false);
  }

  render() {
    return (
      <Router>
        <div>
          <div className="App-header">
            {this.props.currentUser ? `Logged in as ${this.props.currentUser}` : "Not logged in!"}
          <NavBar/>
          </div>
          <Route exact path="/" render={()=><GameViewer />} 
          />
          <Route exact path="/index" render={()=> <GamesIndex />}
          />
          <Route exact path="/signin" render={()=><Signin />}/>
          <Route exact path="/signup" render={()=><Signup />}/>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state =>({
  currentUser: state.currentUser
})

export default connect(mapStateToProps, actions)(App);
