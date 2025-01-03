import { Link } from "react-router-dom"
import './Components.css' 
import { BASE_URL } from "../apiCalls"
import { useEffect, useRef, useState } from "react"

const RightSideBar = ({user}) => {


  
  return (


      
      <>

         {/* <div className="col-sm-auto bg-dark   sticky-top"> */}
       
            <div  className=" d-flex  justify-content-evenly align-items-center gap-0 footer ">
          
                <div  className="d-flex flex-row text-center menu-item ">
                  <Link to='/home'>
                    <img style={{backgroundColor:'lightblue'}} className="challenge-logo" src=  "/asset/material/home.png" alt="" />
                  </Link>   
                
                </div>
                <div  className="d-flex flex-row text-center menu-item ">
                  <Link to='/talent'>
                    <img style={{backgroundColor:'#c21373'}} className="challenge-logo" src="/asset/material/talent.png" alt="" />
                  </Link>   
                
                </div>

                <div className="d-flex flex-row text-center menu-item ">
                  <Link to='/newchallenge'>
                    <img className="challenge-logo" src="/asset/material/chalenge.png" alt="" />
                  </Link>    
                </div>

                <div className="d-flex flex-row text-center  menu-item ">
                  <Link to={'/'}>
                    <img style={{backgroundColor:'red'}} className="challenge-logo" src="/asset/material/guiness.jpg" alt="" />
                  </Link>    
                </div>
                <div  className="d-flex menu-item ">
                {user ? (
              
                    <Link to={`/profile/${user._id}` }  style={{height:'70%'}} >
                      <img style={{height:'100%' ,backgroundColor:'#1ca1c9'}} className="challenge-logo" 
                       src="/asset/material/logout.png" alt="" />
                    </Link> 
         
                    ):(
                    
                    <Link
                      to= "/sign-in">
                      <img className="menu-logo" style={{backgroundColor:'#1ca1c9'}} src={"/asset/material/login.png"} alt="" />
                    </Link>   
                      )}
                </div>      

               
          

            </div>
   
        
       </>


  )
}

export default RightSideBar