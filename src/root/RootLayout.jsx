import React from 'react'
import TopBar from '../components/TopBar'
import { Navigate, Outlet } from 'react-router-dom'
import RightSideBar from '../components/RightSideBar';
import './pages/Page.css'

function RootLayout({user}) {

  const isAuthenticated = user? true : false ; 

  return (
    <>   
   
    { isAuthenticated ? (
 
    <div className='w-full h-full  d-flex flex-column justify-content-between full-page'>
          
        <TopBar user={user} /> 
       
        <div className="container-fluid homelayout">
          <Outlet />
        </div>
        
        <RightSideBar user={user}/>

    </div>

    ) : (<Navigate to='/sign-in' />)
    }
     </>
  )
}

export default RootLayout