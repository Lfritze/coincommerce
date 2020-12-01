import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import {addItem} from './cartHelpers'

const Card = ({ product, showViewProductButton = true, showAddToCartButton = true }) => {

  const [rediredt, setRedirect] = useState(false)

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
    addItem(product, () => {
      setRedirect(true)
    })
  }

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
  }

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock</span> 
    ) : (
      <span className="badge badge-primary badge-pill">Out of Stock</span> 
    );
  };

  return (
    
      <div className="card">
        <div className="card-header name">{product.name}</div>
        <div className="card-body">
          {shouldRedirect(rediredt)}
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
          </div>
        </div>
      
    
  )
}

export default Card;