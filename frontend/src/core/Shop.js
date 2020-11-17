import React, { useState, useEffect }from 'react';
import Layout from './Layout';
import Card from './Card';

const Shop = () => {
  return (
    <Layout title="Shop Page" description="Search and find a collectable of your choice!" className="container-fluid">
      <div className="row">
        <div className="col-4">
          Left side bar
        </div>
        <div className="col-8">
          Right 
        </div>
      </div>
      
      
    </Layout>
  )
}

export default Shop;
