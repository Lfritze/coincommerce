// you can replace <div> with <Fragment> for conditionals
import React, {Fragment} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth/index';

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
    <ul className="nav nav-tabs bg-dark">
      <li className="nav-item">
        <Link className="nav-link" to="/" style={isActive(history, '/')}>Home</Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/shop" style={isActive(history, '/shop')}>Shop</Link>
      </li>

      {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <li className="nav-item">
        <Link className="nav-link" to="/user/dashboard" style={isActive(history, '/user/dashboard')}>Dashboard</Link>
      </li>
      )}

      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <li className="nav-item">
        <Link className="nav-link" to="/admin/dashboard" style={isActive(history, '/admin/dashboard')}>Dashboard</Link>
      </li>
      )}

      {!isAuthenticated() && (
        <Fragment>
          <li className="nav-item">
            <Link className="nav-link" to="/signin" style={isActive(history, '/signin')}>Sign In</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/signup" style={isActive(history, '/signup')}>Sign Up</Link>
          </li>
        </Fragment>
      )}

      {isAuthenticated() && (
        <Fragment>
          <li className="nav-item">
            <span 
              className="nav-link" 
              style={{cursor: 'pointer', color: '#ffffff'}}
              onClick={() => 
                signout(() => {
                  history.push('/')
              }) 
              }
            >
              Sign Out
            </span>
          </li>
        </Fragment>
      )}
    </ul>
  </div>
);

export default withRouter(Menu);