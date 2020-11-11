import React, { useState } from 'react';
import Layout from '../core/Layout';
import { API } from '../config';

// Create a state so anytime they type something in the form fields
// and for when the user click the submit button - we grab all the values stored in the state
// and send it to the backend and create a new user

const Signup = () => {
  // state - useState will be an object of properties {name, email, password, error, success} with empty default values 
  // except the default value for success will be false
  // SO THIS IS OUR CURRENT STATE - until the user changes it
  const [values, setValues] = useState({
    name: '', 
    email: '',
    password: '',
    error: '',
    success: false
  })
  // Now we need a handleChange method
  // this is going to be a higher order function (a function returning another function)

  // we grab the event.target.value
  const handleChange = name => event => {
    // take the rest of the values with a spread operator, set error to false
    // then we take the name (it will be dynamic, meaning it could be name, email or password) and set it to event.target.value
    setValues({...values, error: false, [name]: event.target.value });
  }

  // Function to show the signup FORM
  const signUpForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input onChange={handleChange('name')} type="text" className="form-control" />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input onChange={handleChange('email')} type="email" className="form-control" />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input onChange={handleChange('password')} type="password" className="form-control" />
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
  return (
    <Layout 
      title="Signup" 
      description="Signup for Node React E-commerce App"
      // 12 columns
      className="container col-md-8 offset-md-2">
      {signUpForm()} 
      {/* JSON stringify so when there is a change - we can see the data live (whatever data we have in the state we will be able to see) */}
      {JSON.stringify(values)}
    </Layout>
  );
};


export default Signup;