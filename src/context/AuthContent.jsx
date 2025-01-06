import React, { createContext, useState } from 'react';


export const AuthContent = createContext();


export const AuthContentProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [notifications,setNotifications] = useState([])

  return (
    <AuthContent.Provider value={{user, setUser,notifications,setNotifications }}>
      {children}
    </AuthContent.Provider>
  );
};  
