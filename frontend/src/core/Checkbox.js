import React, { useState, useEffect } from 'react';

const Checkbox = ({categories, handleFilters}) => {
  //set the state for items checked
  // by default it is an empty array
  const [checked, setChecked] = useState([])

  // Higher Order Function (function that returns another function)
  const handleToggle = cat => () => {
    // indexOf returns the first index at which a given element can be found in the array
    // if it is not found in the state then it returns -1
    // indexOf returns first index or -1
    const currentCategoryId = checked.indexOf(cat)
    const newCheckedCategoryId = [...checked]
    // if currently checked was not already in checked state then we want to push - else remove
    // if it equals -1, then the category is not in the state
    if(currentCategoryId === -1) {
      newCheckedCategoryId.push(cat)
    } else {
      // if it was already checked...then we need to uncheck it
      newCheckedCategoryId.splice(currentCategoryId, 1)
    }
    // console.log(newCheckedCategoryId);
    // update the state 
    setChecked(newCheckedCategoryId);
    // filter
    handleFilters(newCheckedCategoryId);
  }

  return categories.map((cat, i) => (
    <li key={i} className="list-unstyled">
      <input onChange={handleToggle(cat._id)} value={checked.indexOf(cat._id === 1)} type="checkbox" className="form-check-input"/>
      <label className="form-check-label">{cat.name}</label>
    </li>
  ))
}

export default Checkbox;