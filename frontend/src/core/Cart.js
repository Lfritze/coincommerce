import React, { useState, useEffect }from 'react';
import Layout from './Layout';
import { getCart } from './cartHelpers';
import {Link} from 'react-router-dom';
import Card from './Card';

const Cart = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    setItems(getCart())
  }, [])
// showAddToCartButton is a prop
  const showItems = items => {
    return (
      <div>
        <h2>Your cart has {`${items.length}`} items</h2>
        <hr />
        {items.map((product, i) => (<Card key={i} product={product} showAddToCartButton={false} />))}
      </div>
    )
  }

  const noItemsMessage = () => (
    <h2>Your cart is empty. <br/> <Link to="/shop">Continue Shopping</Link></h2>
  )


  return (
    <Layout 
      title="Shopping Cart" 
      description="Manage your cart items by adding, removing, or continue shopping" 
      className="container-fluid"
    >
      <div className="row">
        <div className="col-6">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        <div className="col-6">
          <p>show checkout options/shipping address total and update qty</p>
        </div>
      </div>
    </Layout>
  );
}

export default Cart;