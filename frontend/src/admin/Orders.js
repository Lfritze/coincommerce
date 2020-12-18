import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth/index';
import { listOrders } from './apiAdmin';
import moment from 'moment';

const Orders = () => {
  const [orders, setOrders] = useState([])

  const {user, token} = isAuthenticated()

  const loadOrders = () => {
    listOrders(user._id, token).then(data => {
      if(data.error) {
        console.log(data.error)
      } else {
        setOrders(data)
      }
    })
  }

  useEffect(() => {
    loadOrders()
  }, [])

  const showOrdersLength = () => {
    if(orders.length > 0) {
      return (
        <h1 className="text-danger display-2">
          Total Orders: {orders.length}
        </h1>
      )
    } else {
      return <h1 className="text-danger">No orders</h1>
    }
  };

  const showInput = (key, value) => (
    <div className="input-group mb-2 mr-sm-2">
      <div className="input-group-prepend">
        <div className="input-group-text">{key}
        </div>
      </div>
      <input
        type="text"
        value={value}
        className="form-control"
        readOnly
            />
    </div>
    );

  return (
    <Layout title="Orders" description={`Hello ${user.name}, you can manage all of the orders here!`} >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showOrdersLength(orders)}
          
          {orders.map((ord, ordIndex) => {
            return (
              <div className="mt-5" key={ordIndex} style={{borderBottom: "5px solid #095ba0"}}>
                <h2 className="mb-5">
                  <span style={{background: "#1a849b"}}>Order ID: {ord._id}</span>
                </h2>
                <ul className="list-group mb-2">
                  <li className="list-group-item">
                    {ord.status}
                  </li>
                  <li className="list-group-item">
                    Transaction ID: {ord.transaction_id}
                  </li>
                  <li className="list-group-item">
                    Amount: ${ord.amount}
                  </li>
                  <li className="list-group-item">
                    Ordered by: {ord.user.name}
                  </li>
                  <li className="list-group-item">
                    Ordered on: {moment(ord.createAt).fromNow()}
                  </li>
                  <li className="list-group-item">
                    Delivery Address: {ord.address}
                  </li>
                </ul>
                <h3 className="mt-4 mb-4" font-italic>
                  Total products in the order: {ord.products.length}
                </h3>
                {ord.products.map((prod, prodIndex) => (
                  <div className="mb-4" key={prodIndex} style={{padding: '20px', border: '1px solid #095ba0'}}>
                    {showInput('Product name', prod.name)}
                    {showInput('Product pice', prod.price)}
                    {showInput('Product total', prod.count)}
                    {showInput('product Id', prod._id)}
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Orders