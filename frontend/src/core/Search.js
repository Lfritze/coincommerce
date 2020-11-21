import React, { useState, useEffect }from 'react';
import { getCategories, list } from './apiCore';
import Card from './Card';

const Search = () => {

  const [data, setData] = useState({
    categories: [],
    category: '',
    search: '',
    results: [],
    searched: false
  });

  // de-structure so that we don't have to type data.search, data.category ...etc
  const { categories, category, search, results, searched } = data

  const loadCategories = () => {
    getCategories().then(data => {
      if(data.error) {
        console.log(data.error)
      } else {
        setData({...data, categories: data})
      }
    })
  }

  useEffect(() => {
    loadCategories()
  }, []);

  const searchData = () => {
    // console.log(search, category)
    // execute the list method from apiCore

    if(search) {
      // this expects the params
      list({search: search || undefined, category: category})
      .then(response => {
        if(response.error) {
          console.log(response.error)
        } else {
          setData({...data, results: response, searched: true})
        }
      })
    }
  }

  const searchSubmit = (event) => {
    event.preventDefault();
    // API request to get the products
    // method is in apiCore
    searchData();
  }

  // higher order function - a function returning another functions=
  const handleChange = (name) => event => {
    // dropdown of categories
    setData({...data, [name]: event.target.value, searched: false});

  }

  const searchForm = () => {
    return (
      <form onSubmit={searchSubmit}>
        <span className="input-group-text">
          <div className="input-group input-group-lg">
            <div className="input-group-prepend">
              <select className="btn mr-2" onChange={handleChange("category")}>
                <option value="All">Pick Category</option>
                {categories.map((cat, i) => (<option key={i} value={cat._id}>{cat.name}
                </option>))}
              </select>
            </div>
            <input type="search" className="form-control" onChange={handleChange('search')} placeholder="Search by name" />
          </div>
          <div className="btn input-group-append" style={{border: 'none'}}>
            <button className="input-group-text">Search</button>
          </div>
        </span>
      </form>
    )
  }

  return (
    <div className="row">
      <div className="container">
        {searchForm()}
        {JSON.stringify(results)}
      </div>
    </div>
  )
}

export default Search;