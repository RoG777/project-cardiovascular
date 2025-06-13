import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  // Aquí puedes mejorar la lógica, por ejemplo, verificando un token JWT
  return !!localStorage.getItem('auth');
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute; 