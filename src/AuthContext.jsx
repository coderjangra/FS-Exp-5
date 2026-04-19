import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('spring_jwt_token') || null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        // We decode the base64 payload to extract Spring Security Claims
        // Format expects { sub: "username", roles: ["ROLE_USER"] }
        const decoded = jwtDecode(token);
        
        // Check expiration
        if (decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          setUser({
            username: decoded.sub,
            name: decoded.name,
            roles: decoded.roles || []
          });
          localStorage.setItem('spring_jwt_token', token);
        }
      } catch (error) {
        console.error("Invalid JWT token detected.", error);
        logout();
      }
    } else {
      setUser(null);
      localStorage.removeItem('spring_jwt_token');
    }
  }, [token]);

  const login = (jwtToken) => {
    setToken(jwtToken);
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
