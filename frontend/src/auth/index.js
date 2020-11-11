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

  //we are getting the data after signing in  - token, user id, email, name, role
  // IN chrome dev tools we see it in the NETWORK tab - we want to get it in the local storage in APPLICATION tab
  // Note: typeof - It's an idiomatic check to see if the script is being run in a web-page inside a web-browser or not
  export const authenticate = (data, next) => {
    if(typeof window !== 'undefined') {
      //The setItem() method sets the value of the specified Storage Object item.
      //The setItem() method belongs to the Storage Object, which can be either a localStorage object or a sessionStorage object
      // we are saving data with out key 'jwt'
      // stringify converts JS to JSON
      localStorage.setItem('jwt', JSON.stringify(data))
      next()
    }
  }

  // This will be exported to the MENU component
  export const signout = (next) => {
    // we need to clear out the token from localStorage
    if(typeof window !== 'undefined') {
      localStorage.removeItem('jwt');
      next();
      return fetch(`${API}/signout`, {
        method: "GET",
      })
      .then(response => {
        console.log('signout', response);
      })
      .catch(err => console.log(err));
  }
};

export const isAuthenticated = () => {
  if(typeof window == 'undefined') {
    return false
  }
  if (localStorage.getItem('jwt')) {
    // this returns the JS in JSON format
    return JSON.parse(localStorage.getItem('jwt'))
  } else {
    return false;
  }
}