import { Outlet,Navigate } from "react-router-dom"
import TopBar from "../components/TopBar";
import RightSideBar from "../components/RightSideBar";


const AuthLayout = ({user}) => {

  const isAuthenticated = user? true : false ; 
  // user ? isAuthenticated = true : isAuthenticated =false;
  return (
   <>
     { isAuthenticated ? ( < Navigate to ="/home" /> ):
     (<div className="homelayout"> 
     <TopBar/>
        <Outlet />
      <RightSideBar/>
     </div>)
     }
   </>
  )
}

export default AuthLayout