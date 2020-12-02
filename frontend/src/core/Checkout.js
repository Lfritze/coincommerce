import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { getBraintreeClientToken } from './apiCore';

import { isAuthenticated } from '../auth/index';

// INSTALLED npm install braintree-web-drop-in-react 
// Read the docs here: https://www.npmjs.com/package/braintree-web-drop-in-react
// This gives us the UI for payment
import DropIn from "braintree-web-drop-in-react";

// use products as props
const Checkout = ({products, setRun = f => f, run = undefined}) => {
  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    address: ''
  })

  // make request to the backend
  const userId = isAuthenticated() && isAuthenticated().user._id
  const token = isAuthenticated() && isAuthenticated().token

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then(data => {
      if(data.error){
        console.log(data.error);
        setData({...data, error: data.error})
      } else {
        setData({...data, clientToken: data.clientToken})
      }
    })
  }

  // when the compenent mounts and there is a change in state - you need useEffect
  useEffect(() => {
    getToken(userId, token)
  }, [])

  const getTotal = () => {
    // Reduce() docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price
    }, 0)
  };

  const showCheckout = () => {
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to="/signin">
        <button className="btn btn-dark">Sign in to checkout</button>
      </Link>
    )
  };

// INSTALLED npm install braintree-web-drop-in-react 
// Read the docs here: https://www.npmjs.com/package/braintree-web-drop-in-react
// This gives us the UI for payment
  const showDropIn = () => (
    <div>
      {data.clientToken !== null && products.length > 0 ? (
        <div>
          <DropIn 
            options={{
            authorization: data.clientToken
          }} 
          onInstance={instance => (data.instance = instance)} />
          <button className="btn btn-success">Checkout</button>
        </div>
      ) : null}
    </div>
  );

  return (
    <div>
      <h2>Total: ${getTotal()}</h2>
      {showCheckout()}
    </div>
  );
  
};

export default Checkout;

