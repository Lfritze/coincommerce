import React from 'react';
import { Link, withRouter } from 'react-router-dom';

// HELPER METHOD to highlight which part of the menu we are currently on (is active)
// history will be the browser history
// path is something like /signin or /signup , etc...
// if history.location.pathname is our current path then we highlight the color
const isActive = (history, path) => {
  if(history.location.pathname === path) {
    return {color: '#ff9900'}
  } else {
    return {color: '#ffffff'}
  }
}

const Menu = ({ history }) => (
  
  <div>
    <ul className="nav nav-tabs bg-primary">
      <li className="nav-item">
        <Link className="nav-link" to="/" style={isActive(history, '/')}>Home</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/signin" style={isActive(history, '/signin')}>Signin</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/signup" style={isActive(history, '/signup')}>Signup</Link>
      </li>
    </ul>
  </div>
);

export default withRouter(Menu);