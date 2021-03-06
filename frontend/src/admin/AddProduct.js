import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth/index';
import {createProduct, getCategories} from './apiAdmin';

const AddProduct = () => {
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    // pull all the categories from the backend and populate the categories when we try to create a new product
    categories: [],
    category: '',
    shipping: '',
    quantity: '',
    photo: '',
    loading: false,
    error: '',
    createdProduct: '',
    redirectToProfile: false,
    formData: ''
  });

  // De-structure isAuthenticated
  const {user, token} = isAuthenticated();
  // De-structure values
  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    // photo,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
    } = values;

  // load categories and set form data
  const init = () => {
    getCategories().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          categories: data,
          formData: new FormData()
        });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  //higher order function (function that returns another function)
  const handleChange = name => event => {
    // need to dynamically pick whether it is a file or event
    // if we are getting a photo - we do not want to grab e.target.value - we want e.target.files[first on in the array]
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    // now we can set the state
    // first we grab the values in the state {...values}
    // then based on this evaluation - we set the values
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = event => {
      // we want to use the createProduct method
    event.preventDefault();
    setValues({ ...values, error: '', loading: true });

    createProduct(user._id, token, formData)
      .then(data => {
        if(data.error) {
          setValues({ ...values, error: data.error });
        } else {
          // empty form fields
          setValues({
            ...values, 
            name: '',
            description: '',
            photo: '',
            price: '',
            quantity: '',
            loading: false,
            createdProduct: data.name
          });
        }
      });
    }

    const newPostForm = () => (
      <form className="mb-3" onSubmit={clickSubmit}>
        <h4>Post Photo</h4>
        <div className="form-group">
          <label className="btn btn-secondary">
            {/* Keep it 'photo' because it is that way in the backend */}
            <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
          </label>
        </div>

        <div className="form-group">
          <label className="text-muted">Name</label>
          <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
        </div>

        <div className="form-group">
          <label className="text-muted">Product Description</label>
          <textarea onChange={handleChange('description')} className="form-control" value={description} />
        </div>

        <div className="form-group">
          <label className="text-muted">Price</label>
          <input onChange={handleChange('price')} type="number" className="form-control" value={price} />
        </div>

        <div className="form-group">
          <label className="text-muted">Category</label>
            <select onChange={handleChange('category')} className="form-control">
              <option>Please select</option>
                {categories &&
                  categories.map((c, i) => (
                    <option key={i} value={c._id}>
                      {c.name}
                    </option>
                  ))}
            </select>
        </div>

        <div className="form-group">
          <label className="text-muted">Shipping</label>
          <select onChange={handleChange('shipping')} className="form-control">
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>

        <div className="form-group">
          <label className="text-muted">Quantity</label>
          <input onChange={handleChange('quantity')} type="number" className="form-control" value={quantity} />
        </div>

        <button className="btn btn-outline-dark">Create Product</button>
      </form>
    );
  
    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdProduct ? '' : 'none' }}>
            <h2>{`${createdProduct}`} is created!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );
  
  return (
    <Layout title="Add a new product" description={`Hello ${user.name}, Let's add a new product!`} >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showLoading()}
          {showSuccess()}          
          {showError()}
          {newPostForm()}
        </div>
      </div>
    </Layout>
  );
};
export default AddProduct;