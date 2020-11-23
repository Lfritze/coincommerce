import { API } from '../config';
import queryString from 'query-string';

// sorting elements by sell and by arrival
// get in descending order and limit to 6
export const getProducts = (sortBy) => {
  return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
    method: 'GET'
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

// NOTE: this is also in apiAdmin - I just want to keep this in the same folder directory as Shop.js
export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: 'GET'
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

// fetch products based on filter (listBySearch in the backend controllers/product.js - line 261)

   export const getFilteredProducts = (skip, limit, filters = {}) => {
    const data = {
        limit,
        skip,
        filters
    };
    return fetch(`${API}/products/by/search`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const list = params => {
  const query = queryString.stringify(params)
  console.log('query', query)
  // params gives us the category id and whatever the user typed in the search bar
  // install query-string with npm to properly send the query parameters
  // stringify the params - JSON
  return fetch(`${API}/products/search?${query}`, {
    method: 'GET'
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const read = (productId) => {
  return fetch(`${API}/product/${productId}`, {
    method: 'GET'
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
