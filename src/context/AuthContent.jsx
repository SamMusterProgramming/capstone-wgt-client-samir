import React, { createContext, useState } from 'react';


export const AuthContent = createContext();


export const AuthContentProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [notifications,setNotifications] = useState([])
  const [participateChallenges ,setParticipateChallenges] = useState([])  
  const [userChallenges ,setUserChallenges] = useState([])  
  const [topChallenges ,setTopChallenges] = useState([])  

  const [isLoading,setIsLoading] = useState(false)  

  return (
    <AuthContent.Provider value={{user, setUser,notifications,setNotifications ,setIsLoading,isLoading,
    participateChallenges,setParticipateChallenges,userChallenges,setUserChallenges,topChallenges,setTopChallenges}}>
      {children}
    </AuthContent.Provider>
  );
};  
