import React, { useContext, useEffect, useRef, useState } from 'react'
import TopBar from '../components/TopBar'
import { Navigate, Outlet ,useNavigate } from 'react-router-dom'
import RightSideBar from '../components/RightSideBar';
import './pages/Page.css'
import {AuthContent} from '../context/AuthContent.jsx'
import { Toaster } from 'sonner';
import LoadingBar from 'react-top-loading-bar';
import { getNotificationByUser, getTopChallenges, getUserChallenges, getUserParticipateChallenges, setLoadingBarAxios } from '../apiCalls.js';
import TopLoadingBar from '../components/helper/TopLoadingBar.jsx';
import Challenge from './pages/Challenge.jsx';
import { generateUserFolder, getMediaFireBase } from '../firebase.js';
import { getDownloadURL, ref } from 'firebase/storage';

function RootLayout(props) {

  // const [participateChallenges ,setParticipateChallenges] = useState([])  
  const {user,isLoading,setIsLoading,userChallenges,setUserChallenges,
    participateChallenges ,setParticipateChallenges ,topChallenges,setTopChallenges} = useContext(AuthContent)

  const loadingRef = useRef(null)
 
  

  const isAuthenticated = user ? true : false ; 

  useEffect(() => {
   if (isLoading && user) {
    console.log("i am here")
    getUserChallenges(user._id ,setUserChallenges)
    getUserParticipateChallenges(user._id,setParticipateChallenges)  
    getTopChallenges(user._id,setTopChallenges)
    setIsLoading(false)
  }
  
  }, [user])

  useEffect(() => {
  
  }, [isLoading])
  
  

  return (
     <>
   
    { ( isAuthenticated) ? (
 
        <div className=" homelayout">
          {/* <TopBar user={user} />  */}
          <TopLoadingBar />
          <Outlet />
          <RightSideBar user={user}/>
        </div>
        

     ) : ( 
      <Navigate to='/sign-in' />
  )
}
</>
  )
}

export default RootLayout