import React, { createContext, useState } from 'react';


export const AuthContent = createContext();


export const AuthContentProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  return (
    <AuthContent.Provider value={{user, setUser }}>
      {children}
    </AuthContent.Provider>
  );
};  
