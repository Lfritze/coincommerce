import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';
import Shop from './core/Shop';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import Dashboard from './user/UserDashboard';
import AdminDashboard from './user/AdminDashboard'
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import Product from './core/Product';
import Cart from './core/Cart';
// import Menu from './core/Menu'

// we need to create a component that checks if the user is authenticated
// if the user is authenticated then want to take them to that component we need PRIVATE ROUTE

const Routes = () => {
  return(
    <BrowserRouter>
      {/* <Menu /> */}
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/product/:productId' exact component={Product} />
        <Route path='/shop' exact component={Shop} />
        <Route path='/signin' exact component={Signin} />
        <Route path='/signup' exact component={Signup} />
        <PrivateRoute path='/user/dashboard' exact component={Dashboard} />
        <AdminRoute path='/admin/dashboard' exact component={AdminDashboard} />
        <AdminRoute path='/create/category' exact component={AddCategory} />
        <AdminRoute path='/create/product' exact component={AddProduct} />
        <Route path='/cart' exact component={Cart} />
      </Switch>
      
    </BrowserRouter>
  );
};

export default Routes;
