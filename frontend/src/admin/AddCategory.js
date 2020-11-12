import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth/index';

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
  };

  const newCategoryForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input type="text" className="form-control" onChange={handleChange} value={name} autoFocus/>
      </div>
      <button className="btn btn-outline-primary">Create Category</button>
    </form>
  );

  return (
    <Layout title="Add a new category" description={`Hello ${user.name}, Let's add a new category!`} >
      <div className="row">
        <div className="col-md- offset-md-2">
          {newCategoryForm()}
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;