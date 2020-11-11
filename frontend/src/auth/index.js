import { API } from '../config';

export const signup = (user) => {
    // console.log(name, email, password)
    // Now we need to send this data to the backend - we can use FETCH
    return fetch(`${API}/signup`, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json"
      },
      // We can't send the JavaScript object to the backend so we use JSON Stringify 
      body: JSON.stringify(user)
    })
    .then(response => {
      return response.json()
    })
    .catch(err => {
      console.log(err)
    });
  };

  export const signin = (user) => {
    // console.log(name, email, password)
    // Now we need to send this data to the backend - we can use FETCH
    return fetch(`${API}/signin`, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json"
      },
      // We can't send the JavaScript object to the backend so we use JSON Stringify 
      body: JSON.stringify(user)
    })
    .then(response => {
      return response.json()
    })
    .catch(err => {
      console.log(err)
    })
  }