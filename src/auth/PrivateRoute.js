// PrivateRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // O caminho pode variar dependendo de onde você colocou o AuthContext




const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // Redireciona para a página de login se o usuário não estiver autenticado
    return <Navigate to="/login" replace />;
  }

  return children;
};


export default PrivateRoute;