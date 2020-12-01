import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import {isAuthenticated} from '../auth/index';

// use products as props
const Checkout = ({products}) => {
  const getTotal = () => {
    // Reduce() docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price
    }, 0)
  };

  const showCheckout = () => {
    return isAuthenticated() ? (
      <button className="btn btn-dark">Checkout</button>
    ): (
      <Link to="/signin">
        <button className="btn btn-dark">Sign in to checkout</button>
      </Link>
    )
  };

  return <div>
    <h2>Total: ${getTotal()}</h2>
    {showCheckout()}
  </div>
}

export default Checkout;

