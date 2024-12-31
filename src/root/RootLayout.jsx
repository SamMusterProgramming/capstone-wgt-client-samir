import React, { useContext, useEffect, useRef } from 'react'
import TopBar from '../components/TopBar'
import { Navigate, Outlet } from 'react-router-dom'
import RightSideBar from '../components/RightSideBar';
import './pages/Page.css'
import {AuthContent} from '../context/AuthContent.jsx'
import { Toaster } from 'sonner';
import LoadingBar from 'react-top-loading-bar';
import { setLoadingBarAxios } from '../apiCalls.js';
import TopLoadingBar from '../components/helper/TopLoadingBar.jsx';

function RootLayout() {

  const {user} = useContext(AuthContent)
  const loadingRef = useRef(null)

 

  

  const isAuthenticated = user? true : false ; 

  return (
     <>
   
    { isAuthenticated ? (
 
    // <div className=' d-flex flex-column justify-content-between align-items-center full-page'>
           
       
        <div className=" homelayout">
          <TopBar user={user} /> 
          <TopLoadingBar/>
          <Outlet />
          <RightSideBar user={user}/>
        </div>
        
       

    // </div>

    ) : (<Navigate to='/sign-in' />)
    }
  </>
  )
}

export default RootLayout