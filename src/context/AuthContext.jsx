import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => {
    const token = localStorage.getItem('token');
    return token ? { access: token } : null;
  });

  const login = (accessToken) => {
    setAuthTokens({ access: accessToken });
    localStorage.setItem('token', accessToken);
  };

  const logout = () => {
    setAuthTokens(null);
    localStorage.removeItem('token');
  };

  // Optional: Auto logout when token expires (advanced)
  useEffect(() => {
    // Add logic if using token expiration/refresh
  }, [authTokens]);

  return (
    <AuthContext.Provider value={{ authTokens, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
