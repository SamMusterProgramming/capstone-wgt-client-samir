import { Link } from "react-router-dom"
import './Components.css' 
import { BASE_URL } from "../apiCalls"

const RightSideBar = ({user}) => {


  return (

      <>

         {/* <div className="col-sm-auto bg-dark   sticky-top"> */}
       
            <div  className=" d-flex  justify-content-evenly align-items-center gap-0 footer ">
                    
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
                

                {user ? (
              
                    <Link to={`/profile/${user._id}` }  style={{height:'70%'}} >
                      <img style={{height:'100%'}} className="challenge-logo" src={BASE_URL + user.profile_img} alt="" />
                    </Link> 
         
               ):(
                 <div  className="d-flex menu-item ">
                    <Link
                      to= "/sign-in">
                      <img className="menu-logo" src={"/asset/material/avatar.jpg"} alt="" />
                    </Link>   
                 </div> 
          )}

               
          

            </div>
   
        
       </>


  )
}

export default RightSideBar