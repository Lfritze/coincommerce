// this adds the product to the local storage
const addItem = (item, next) => {
  let cart = []
  if(typeof window !== 'undefined') {
    if(localStorage.getItem('cart'))
      cart = JSON.parse(localStorage.getItem('cart'))
  }
  cart.push({
    ...item, 
    count: 1
  })
  // to avoid duplicated items - we use 'new Set'
  // create a new array

  // remove duplicates
  // build an Array from new Set and turn it back into array using Array.from
  // that way we can remap it later
  // new set will onlay allow unique values in it
  // so pass the ids of each object/product
  //if the loop tries to add the same value again, it'll get ignored with the array of ids we got on when the first map() was used
  // run map() on it again and return the actual product from the cart
  cart = Array.from(new Set(cart.map((prod) => (prod._id)))).map(id => {
    return cart.find(prod => prod._id === id)
  });

  localStorage.setItem('cart', JSON.stringify(cart))
  next();
}

export default addItem;