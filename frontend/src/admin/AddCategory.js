import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth/index';
import {createCategory} from './apiAdmin';

const AddCategory = () => {
  const [name, setName] = useState('')
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  //de-structure USER and INFO from localStorage
  const {user, token} = isAuthenticated();

  // so whatever the user is typing - we grab it (event target value) and set the state
  const handleChange = (e) => {
    setError('')
    setName(e.target.value)
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setError('')
    setSuccess(false)
    // make request to api to create category
    // the fetch POST request is in apiAdmin.js
    createCategory(user._id, token, {name})
    .then(data => {
      if(data.error) {
        setError(true)
      } else {
        setError('')
        setSuccess(true)
      }
    })
  };

  const newCategoryForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input type="text" className="form-control" onChange={handleChange} value={name} autoFocus required/>
      </div>
      <button className="btn btn-outline-dark">Create Category</button>
    </form>
  );
  // notification for the admin user
  const showSuccess = () => {
    if(success) {
      return <h3 className="text-success">{name} is created</h3>
    }
  }

  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="text-warning">Back to Dashboard</Link>
    </div>
  )

  // error notification
  // the only error while trying to create a new category is if it is not unique
  const showError = () => {
    if(error) {
      return <h3 className="text-danger">{name} is not a unique category name</h3>
    }
  }

  return (
    <Layout title="Add a new category" description={`Hello ${user.name}, Let's add a new category!`} >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showSuccess()}
          {showError()}
          {newCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;