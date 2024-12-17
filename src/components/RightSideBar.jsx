import { Link } from "react-router-dom"
import './Components.css' 

const RightSideBar = ({user}) => {


  return (

   

        // <div className="col-sm-auto bg-dark   sticky-top">
       
            <div  className="d-flex  align-items-center gap-5 footer ">
                    
                <div  className="d-flex flex-row text-center menu-item ">
                  <Link to='/newtalent'>
                    <img style={{backgroundColor:'tomato'}} className="challenge-logo" src="/asset/material/talent.png" alt="" />
                  </Link>   
                
                </div>

                <div className="d-flex flex-row text-center menu-item ">
                  <Link to='/newchallenge'>
                    <img className="challenge-logo" src="/asset/material/chalenge.png" alt="" />
                  </Link>   
            
                </div>

                <div className="d-flex flex-row  text-center  menu-item ">
                  <Link to='/newchallenge'>
                    <img className="challenge-logo" src="/asset/material/chalenge.png" alt="" />
                  </Link>
                 
                </div>

                <div className="d-flex flex-row text-center  menu-item ">
                  <Link to='/'>
                    <img style={{backgroundColor:'red'}} className="challenge-logo" src="/asset/material/guiness.jpg" alt="" />
                  </Link>
                 
                </div>

                {/* <div className="dropdown">
                    <a href="#" className="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle" id="dropdownUser3" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bi-person-circle h2"></i>
                    </a>
                    <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser3">
                        <li><a className="dropdown-item" href="#">New project...</a></li>
                        <li><a className="dropdown-item" href="#">Settings</a></li>
                        <li><a className="dropdown-item" href="#">Profile</a></li>
                    </ul>
                </div> */}

            </div>
   
        
    


  )
}

export default RightSideBar