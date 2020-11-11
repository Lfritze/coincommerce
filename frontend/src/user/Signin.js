import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import { signin, authenticate, isAuthenticated } from '../auth/index';

// Create a state so anytime they type something in the form fields
// and for when the user click the submit button - we grab all the values stored in the state
// and send it to the backend and create a new user

const Signin = () => {
  // state - useState will be an object of properties {name, email, password, error, success} with empty default values 
  // except the default value for success will be false
  // SO THIS IS OUR CURRENT STATE - until the user changes it
  const [values, setValues] = useState({
    email: 'Leighton@gmail.com',
    password: 'password1',
    error: '',
    loading: false,
    redirectToReferrer: false
  })
  // Let's de-structure the values above
  const {email, password, error, loading, redirectToReferrer} = values
  // now we can create a new user with these values

  // Let's de-structure the USER - now we can redirect the user based on their role (admin or regular user)
  const {user} = isAuthenticated();

  // Now we need a handleChange method
  // this is going to be a higher order function (a function returning another function)
  // we grab the event.target.value
  const handleChange = name => event => {
    // take the rest of the values with a spread operator, set error to false
    // then we take the name (it will be dynamic, meaning it could be name, email or password) and set it to event.target.value
    setValues({...values, error: false, [name]: event.target.value });
  }

  // to create a new user we create a new method 
  // user comes from the clickSubmit below
  // the Javascript object { name, email, password } represents the USER 
  

  const clickSubmit = (event) => {
    // prevent the default behaviour of the browser - when the button is clicked we don't want the page to reload
    event.preventDefault()
    // set loading to true - show the user that it is loading
    setValues({...values, error: false, loading: true})
    // grab to send the email, password (javaScript object) from state because we need to send the data to the backend
    signin({ email, password })
    // When we submit - or give the USER data to sign up - we get the data with a cb function
    .then(data => {
      if(data.error) {
        // we get the error in the state
        // we grab the rest of the values with {...values}
        setValues({...values, error: data.error, loading: false})
      } else {
        // we are redirecting the user so no need to change email, password (we change redirectToReferrer back to true)
        // data is what we get after sign in
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true
          });
        });
      }
    });
  };

  // Function to show the signup FORM
  const signInForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input onChange={handleChange('email')} type="email" className="form-control" value={email} />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input onChange={handleChange('password')} type="password" className="form-control" value={password} />
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
    </form>
  );

  const showError = () => (
    <div className="alert alert-danger" style={{display: error ? '': 'none'}}>
        {error}
      </div>
  );
   

  const showLoading = () => (
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>)
  );

  const redirectUser = () => {
    if(redirectToReferrer) {
      if(user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />
      } else {
        return <Redirect to="/user/dashboard" />
      }
        
    }
    if (isAuthenticated()) {
            return <Redirect to="/" />;
        }
  }

  return (
    <Layout 
      title="Signin" 
      description="Signin to Node React E-commerce App"
      // 12 columns
      className="container col-md-8 offset-md-2"
      >
        {showLoading()}
        {showError()}
        {signInForm()} 
        {redirectUser()}
    </Layout>
  );
};


export default Signin;

