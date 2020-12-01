import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import {addItem, updateItem, removeItem } from './cartHelpers'

const Card = ({ 
  product, 
  showViewProductButton = true, 
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = f => f, // default value of function
  run = undefined // default value of undefined
}) => {

  const [redirect, setRedirect] = useState(false);
  // the default state is whatever is already there in localStorage
  const [count, setCount] = useState(product.count);

  const showViewButton = showViewProductButton => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn btn-outline-dark mt-2 mb-2 card-btn-1">View Product</button>
        </Link>
      )
    );
  };

  const addToCart = () => {
    // we add the product to the localStorage
    addItem(product, setRedirect(true));
  };
  

  const shouldRedirect = redirect => {
    if(redirect) {
      return <Redirect to="/cart" />
    }
  }

  const showAddToCart = (showAddToCartButton) => {
    return showAddToCartButton && (
      <button onClick={addToCart} className="btn btn-outline-success mt-2 mb-2">
        Add to cart
      </button>
      
    );
  };

  const showRemoveButton = (showRemoveProductButton) => {
    return ( 
      showRemoveProductButton && (
        <button 
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }} 
          className="btn btn-outline-danger mt-2 mb-2"
        >
          Remove Product
        </button>
    )
    );
  }

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock</span> 
    ) : (
      <span className="badge badge-primary badge-pill">Out of Stock</span> 
    );
  };

  const showCartUpdateOptions = cartUpdate => {
    return cartUpdate && <div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Adjust Quantity</span>
        </div>
        <input 
          type="number" 
          className="form-control" 
          value={count} 
          onChange={handleChange(product._id)} />
      </div>
    </div>
  }

  // higher order function - funtion that returns a function
  const handleChange = productId => event => {
    setRun(!run); // run useEffect in parent Cart
    // whatever the user types in the input - we grab that event
    // we set default value to 1
    setCount(event.target.value < 1 ? 1 : event.target.value)
    if(event.target.value >= 1) {
      updateItem(productId, event.target.value)
    }
  }

  return (
    
      <div className="card">
        <div className="card-header name">{product.name}</div>
        <div className="card-body">
          {shouldRedirect(redirect)}
          <ShowImage item={product} url="product" />
          {/* // This is so we only show the first 100 characters in the description */}
          <p className="card-p mt-2">{product.description.substring(0, 100)}</p>
          <p className="card-p black-10">${product.price}</p>
          <p className="black-9">Category: {product.category && product.category.name}</p>
          <p className="black-8">Added: {moment(product.createdAt).fromNow()}</p>
          {showStock(product.quantity)}
          <br />
          {/* these are props */}
          {showViewButton(showViewProductButton)}
          {showAddToCart(showAddToCartButton)}
          {showRemoveButton(showRemoveProductButton)}
          {showCartUpdateOptions(cartUpdate)}
          
          </div>
        </div>
      
    
  )
}

export default Card;