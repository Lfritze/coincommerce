import React from 'react';
import { Link } from 'react-router-dom';
import ShowImage from './ShowImage';

const Card = ({product}) => {
  return (
    <div className="col-4 mb-3">
      <div className="card">
        <div className="card-header">
          {product.name}
          <div className="card-body">
            <ShowImage item={product} url="product" />
            {/* // This is so we only show the first 100 characters in the description */}
            <p>{product.description.substring(0, 100)}</p>
            <p>${product.price}</p>
            <Link to="/" >
              <button className="btn btn-outline-dark mt-2 mb-2 mr-2">
                View Product
              </button>
            </Link>
            <button className="btn btn-outline-success mt-2 mb-2">
                Add to cart
              </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card;