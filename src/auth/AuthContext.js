// AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import PrivateRoute from './PrivateRoute';


const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Aqui você deve inicializar o usuário com dados de sessão, se disponíveis

  // Simula o login do usuário
  const login = (username, password) => {
    // Implemente a lógica de login e atualize o estado do usuário
    setUser({ id: 'user1', username });
  };

  // Simula o logout do usuário
  const logout = () => {
    // Limpe a sessão do usuário
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
