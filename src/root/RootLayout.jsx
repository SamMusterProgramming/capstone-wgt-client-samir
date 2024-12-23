import React, { useContext } from 'react'
import TopBar from '../components/TopBar'
import { Navigate, Outlet } from 'react-router-dom'
import RightSideBar from '../components/RightSideBar';
import './pages/Page.css'
import {AuthContent} from '../context/AuthContent.jsx'

function RootLayout() {

  const {user} = useContext(AuthContent)
  

  const isAuthenticated = user? true : false ; 

  return (
    <>   
   
    { isAuthenticated ? (
 
    <div className=' d-flex flex-column justify-content-between align-items-center full-page'>
          
           
       
        <div className=" homelayout">
          <TopBar user={user} /> 
          <Outlet />
          <RightSideBar user={user}/>
        </div>
        
       

    </div>

    ) : (<Navigate to='/sign-in' />)
    }
     </>
  )
}

export default RootLayout