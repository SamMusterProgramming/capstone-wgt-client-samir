import { Outlet,Navigate } from "react-router-dom"


const AuthLayout = ({user}) => {

  const isAuthenticated = user? true : false ; 
  // user ? isAuthenticated = true : isAuthenticated =false;
  return (
   <>
     { isAuthenticated ? ( < Navigate to ="/" /> ):
     (<>
      <section
      style={{ backgroundColor:'white', height:'100vh',minWidth:"100vw"}}
      className="d-flex  justify-center items-center flex-column " >
        <Outlet />
      </section>   
     </>)
     }
   </>
  )
}

export default AuthLayout