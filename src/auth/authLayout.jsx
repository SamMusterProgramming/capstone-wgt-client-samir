import { Outlet,Navigate } from "react-router-dom"


const AuthLayout = ({user}) => {

  const isAuthenticated = user? true : false ; 
  // user ? isAuthenticated = true : isAuthenticated =false;
  return (
   <>
     { isAuthenticated ? ( < Navigate to ="/home" /> ):
     (<>
      <section
      style={{height:'100vh'}}
      className="d-flex  justify-center items-center flex-column " >
        <Outlet />
      </section>   
      {/* <section className="container-fluid"  >
        <img src ="/asset/material/gotTalent.jpg" alt="logo" 
         style={{width:'100%' , height:'100%',objectFit:'fill'}}/>
      </section> */}
     </>)
     }
   </>
  )
}

export default AuthLayout