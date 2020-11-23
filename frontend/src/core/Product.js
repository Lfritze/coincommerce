import React, { useState, useEffect }from 'react';
import Layout from './Layout';
import { read } from './apiCore';
import Card from './Card';

const Product = (props) => {

  const [product, setProduct] = useState({})
  const [error, setError] = useState(false)

  const loadSingleProduct = productId => {
    read(productId).then(data => {
      if(data.error) {
        setError(data.error);
      } else {
        setProduct(data)
      }
    })
  }

  useEffect(() => {
    // this is how we get the product ID from the URL
    const productId = props.match.params.productId
    loadSingleProduct(productId)
  }, [])


  return (
    
    <Layout title="Home Page" description="Collectables" className="container-fluid">
      <h2 className="mb-4">Single Product</h2>
      <div className="row">
        {JSON.stringify(product)}
      </div>

    </Layout>
  );
};

export default Product;
