import { Navigate, Outlet } from 'react-router-dom'

const Homepage = () => {
  return (
    <div className="d-flex flex-column justify-content-start align-items-center homepage ">   
       <Outlet />
    </div>
 
  )
}

export default Homepage