import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { getBraintreeClientToken, processPayment, createOrder } from './apiCore';
import { emptyCart } from './cartHelpers';
import { isAuthenticated } from '../auth/index';

// INSTALLED npm install braintree-web-drop-in-react 
// Read the docs here: https://www.npmjs.com/package/braintree-web-drop-in-react
// This gives us the UI for payment
import DropIn from "braintree-web-drop-in-react";

// use products as props
const Checkout = ({products, setRun = f => f, run = undefined}) => {
  const [data, setData] = useState({
    loading: false,
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
        setData({ ...data, error: data.error })
      } else {
        setData({ clientToken: data.clientToken })
      }
    })
  }

  // when the compenent mounts and there is a change in state - you need useEffect
  useEffect(() => {
    getToken(userId, token)
  }, []);

  const handleAddress = event => {
    setData({...data, address: event.target.value})
  }

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

  let deliveryAddress = data.address

  const buy = () => {
    // to diplay loading message
    setData({ loading: true})
    // send the nonce to your server 
    // nonce = data.instance.requestPaymentMethod()
    // A payment method nonce is a secure, one-time-use reference to payment information.
    // see nonce meaning here: https://developers.braintreepayments.com/guides/payment-method-nonces
    let nonce;
    let getNonce = data.instance.requestPaymentMethod()
    .then(data => {
      // console.log(data)
      nonce = data.nonce
      // once you have nonce (card type, card number ) send nonce as 'paymentMethod nonce to backend
      // also total to be charged
      // console.log('send nonce and total to process: ', nonce, getTotal(products))
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getTotal(products)
      }
      
      processPayment(userId, token, paymentData)
      .then(response => {
        // console.log(response)
        // setData({ ...data, success: response.success });
        // before we empty the cart - we want to create the ordersetData({ ...data, success: response.success })
        const createOrderData = {
          // products are props
          products: products,
          transaction_id: response.transaction_id,
          amount: response.transaction.amount,
          address: deliveryAddress
        }
        createOrder(userId, token, createOrderData)
        // empty cart
         emptyCart(() => {
          setRun(!run); // run useEffect in parent Cart
          console.log('payment success and empty cart')
          
          setData({ 
            loading: false,
            success: true,
          })
        })
        // window.location.reload();
      })
      .catch(error => {
        console.log(error)
        setData({ loading: false });
      });
    })
    .catch(error => {
      // console.log('dropin error: ', error)
      setData({ ...data, error: error.messaage })
    })
  }

// INSTALLED npm install braintree-web-drop-in-react 
// Read the docs here: https://www.npmjs.com/package/braintree-web-drop-in-react
// This gives us the UI for payment
  const showDropIn = () => (
    <div onBlur={() => setData({...data, error: "" }) }>
      {data.clientToken !== null && products.length > 0 ? (
        <div>
          <div className="form-group mb-3">
            <label className="text-muted">Delivery address:</label>
            <textarea 
              onChange={handleAddress}
              className="form-control"
              value={data.address}
              placeholder="Type your delivery address here..."
            />

          </div>
          <DropIn 
            options={{
            authorization: data.clientToken,
            paypal: {
              flow: "vault"
            }
          }} 
          onInstance={instance => (data.instance = instance)} />
          <button onClick={buy} className="btn btn-success btn-block">Pay</button>
        </div>
      ) : null}
    </div>
  );

  const showError = error => (
    <div 
      className="alert alert-danger" 
      style={{display: error ? '' : 'none'}}
    >
      {error}
    </div>
  );

  const showSuccess = success => (
    <div 
      className="alert alert-info" 
      style={{display: success ? '' : 'none'}}
    >
      Thank you, your payment was successful!
    </div>
  );

  const showLoading = loading => loading && <h2>Loading...</h2>;

  return (
    <div>
      <h2>Total: ${getTotal()}</h2>
      {showLoading(data.loading)}
      {showSuccess(data.success)}
      {showError(data.error)}
      {showCheckout()}
    </div>
  );
  
};

export default Checkout;

