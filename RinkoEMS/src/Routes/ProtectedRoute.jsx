// ProtectedRoute.js
import React from 'react';
import {  Navigate,Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const token = Cookies.get('token');
  return token ? <Outlet /> : <Navigate to="/" />;

 
};

export default ProtectedRoute;
