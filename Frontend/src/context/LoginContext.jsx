import React, { createContext, useContext, useState } from 'react';

const LoginContext = createContext();

export const useLogin = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    console.log("User has been Log Out")
  };

  return (
    <LoginContext.Provider value={{ isLoggedIn, handleLogout }}>
      {children}
    </LoginContext.Provider>
  );
};
