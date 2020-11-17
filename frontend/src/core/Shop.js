import React, { useState, useEffect }from 'react';
import Layout from './Layout';
import Card from './Card';
import {getCategories} from './apiCore';
import Checkbox from './Checkbox';
import {prices} from './FixedPrices';
import RadioBox from './RadioBox';

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters:  { category: [], price: [] } 
  })
  const [categories, setCategories] = useState([])
  const [error, setError] = useState(false)

  const init = () => {
    getCategories().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data)
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  // filterBy is either by category or price
  const handleFilters = (filters, filterBy) => {
    // console.log('SHOP', filters, filterBy)
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    if(filterBy === "price") {
      // need to extract the array value out of the key
      let priceValues = handlePrice(filters)
      newFilters.filters[filterBy] = priceValues;
    }
    setMyFilters(newFilters);
  };

  const handlePrice = value => {
    // extract the array value out of the key
    const data = prices
    let array = []

    for(let key in data) {
      if(data[key]._id === parseInt(value)) {
        array = data[key].array
      }
    }
    return array
  }


  return (
    <Layout title="Shop Page" description="Search and find a collectable of your choice!" className="container-fluid">
      <div className="row">
        <div className="col-4">
          <h4>Filter by Categories</h4>
          <ul>
            <Checkbox categories={categories} handleFilters={filters => handleFilters(filters, 'category')} />
          </ul>
          <h4>Filter by Price Range</h4>
          <div>
            <RadioBox prices={prices} handleFilters={filters => handleFilters(filters, 'price')} />
          </div>
        </div>
        
      </div>
    </Layout>
  )
}

export default Shop;
