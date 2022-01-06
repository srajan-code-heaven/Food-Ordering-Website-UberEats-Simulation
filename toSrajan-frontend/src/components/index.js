import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from './navbar.js';
import Dashboard from './Dashboard/Dashboard.js';
import CustomerDashboard from './Customer/CustomerDashboard/CustomerDashboard.js';

const Home = () => {
  const loginDetails = useSelector((state) => state.login.user);
  const signInDetails = useSelector((state) => state.signIn.user);
  const userType = loginDetails.userType || signInDetails.userType;
  return (
    <div>
      <Navbar user={userType} />
      {userType === 'restaurant' && <Dashboard />}
      {userType === 'customer' && <CustomerDashboard />}
    </div>
  );
};

export default Home;
