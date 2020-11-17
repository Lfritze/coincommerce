import { API } from '../config';

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