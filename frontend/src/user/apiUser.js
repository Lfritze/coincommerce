import { API } from '../config';

export const read = (userId, token) => {
  return fetch(`${API}/user/${userId}`, {
    method: 'GET',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const update = (userId, token, user) => {
  return fetch(`${API}/user/create/${userId}`, {
    method: 'PUT',
    headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

// save the user information after in the localStorage after updating profile
// so when the user signs out then signs back in - we want that info saved 
export const updateUser = (user, next) => {
  if(typeof window !== 'undefined') {
    if(localStorage.getItem('jwt')) {
      let auth = localStorage.getItem('jwt')
      auth.user = user
      localStorage.setItem('jwt', JSON.stringify(auth))
      next()
    }
  }
};