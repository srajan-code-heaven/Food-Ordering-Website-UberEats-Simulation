import React from 'react';
import { Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Home from './components';
import SignUp from './components/SignUp/SignIn';
import Profile from './components/Profile/Profile';
import Menu from './components/Menu/Menu';
import Orders from './components/Orders/Orders';
import Login from './components/Login/Login';
import CustomerCart from './components/Customer/CustomerCart/CustomerCart.js';
import CustomerFavorites from './components/Customer/CustomerFavorites/CustomerFavorites.js';
import CustomerProfile from './components/Customer/CustomerProfile/CustomerProfile.js';
import RestaurantView from './components/Customer/RestaurantView';

// Import css files
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './App.css';

function App() {
  return (
    <>
      <CssBaseline />
      <Route exact path="/" component={SignUp} />
      <Route path="/dashboard" component={Home} />
      <Route path="/profile" component={Profile} />
      <Route path="/menu" component={Menu} />
      <Route path="/orders" component={Orders} />
      <Route path="/login" component={Login} />
      <Route path="/customer/profile" component={CustomerProfile} />
      <Route path="/customer/favorites" component={CustomerFavorites} />
      <Route path="/customer/cart" component={CustomerCart} />
      <Route path="/customer/restaurantView" component={RestaurantView} />
      {/* <Route path='/orders' component={Orders} /> */}
    </>
  );
}

export default App;
