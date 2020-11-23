import React from 'react';
import { Link } from 'react-router-dom';
import ShowImage from './ShowImage';

const Card = ({product, showViewProductButton = true}) => {

  const showViewButton = showViewProductButton => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn btn-outline-dark mt-2 mb-2 card-btn-1">View Product</button>
        </Link>
      )
    );
  };

  return (
    
      <div className="card">
        <div className="card-header">
          {product.name}
          <div className="card-body">
            <ShowImage item={product} url="product" />
            {/* // This is so we only show the first 100 characters in the description */}
            <p>{product.description.substring(0, 100)}</p>
            <p>${product.price}</p>
            {showViewButton(showViewProductButton)}          
            <button className="btn btn-outline-success mt-2 mb-2">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    
  )
}

export default Card;