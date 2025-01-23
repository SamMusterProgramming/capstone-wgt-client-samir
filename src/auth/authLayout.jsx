import { Outlet,Navigate } from "react-router-dom"
import TopBar from "../components/TopBar";
import RightSideBar from "../components/RightSideBar";
import { useEffect, useRef } from "react";

import LoadingBar from 'react-top-loading-bar'; 
import TopLoadingBar from "../components/helper/TopLoadingBar";



const AuthLayout = ({user}) => {
  const isAuthenticated = user? true : false ; 
  

return (
   <>
     { isAuthenticated ? ( < Navigate to ="/notifications" /> ):
     ( 
     <div className="homelayout"> 
     {/* <TopBar/> */}
        <TopLoadingBar/>
        <Outlet />
      <RightSideBar/>
     </div>
     )
     }
   </>
  )
}

export default AuthLayout