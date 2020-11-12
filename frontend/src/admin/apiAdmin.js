import { API } from '../config';

// need to send the user id token & category
export const createCategory = (userId, token, category) => {
    // console.log(name, email, password)
    // Now we need to send this data to the backend - we can use FETCH
    return fetch(`${API}/category/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      // We can't send the JavaScript object to the backend so we use JSON Stringify 
      body: JSON.stringify(category)
    })
    .then(response => {
      return response.json()
    })
    .catch(err => {
      console.log(err)
    });
  };

  export const createProduct = (userId, token, product) => {
    // console.log(name, email, password)
    // Now we need to send this data to the backend - we can use FETCH
    return fetch(`${API}/product/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        // we are sending FORM DATA
        Authorization: `Bearer ${token}`
      },
      // 
      body: product
    })
    .then(response => {
      return response.json()
    })
    .catch(err => {
      console.log(err)
    });
  };

  export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};