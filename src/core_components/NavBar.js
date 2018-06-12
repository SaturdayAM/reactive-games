import React from 'react';
import { NavLink } from 'react-router-dom';


const NavBar = () => {
  return (
    <div className="navbar">
	    <NavLink
	      to="/"
	      /* set exact so it knows to only set activeStyle when route is deeply equal to link */
	      exact
	      /* add styling to Navlink */
	      /* add prop for activeStyle */
	      activeStyle={{
	        background: 'darkblue'
	      }}
	      className="navbar-links"
	    >Home</NavLink>
	    <NavLink
	      to="/index"
	      exact
	      activeStyle={{
	        background: 'darkblue'
	      }}
	      className="navbar-links"
	    >Index</NavLink>
	    <NavLink
	      to="/signin"
	      exact
	      activeStyle={{
	        background: 'darkblue'
	      }}
	      className="navbar-links"
	    >Sign In</NavLink>
	    <NavLink
	      to="/signup"
	      exact
	      activeStyle={{
	        background: 'darkblue'
	      }}
	      className="navbar-links"
	    >Sign Up</NavLink>
    </div>
  );
};

export default NavBar;