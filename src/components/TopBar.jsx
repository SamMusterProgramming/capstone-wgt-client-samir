import { Link, Navigate } from "react-router-dom"
import './Components.css'
import ItemMenu from "./helper/ItemMenu"
import { useEffect, useRef, useState } from "react"
import { BASE_URL } from "../apiCalls"


const TopBar = ({user}) => {

  const search  = useRef()
  const [searchDisplay,setSearchDisplay] = useState(false)
  
  useEffect(() => {
    // search.current.display('none')
  }, [])
  
  return (  
      <>
       
       <div className=" d-flex align-items-center justify-content-evenly  footer">  
        
                    
<              div  className="d-flex flex-row text-center menu-item ">
                  <Link to='/badge'>
                    <img style={{backgroundColor:'#4674d1'}} className="challenge-logo" src=  "/asset/material/badge.svg" alt="" />
                  </Link>   
                
                </div>
              
                <div className="d-flex flex-row text-center menu-item ">
                  <Link to='/search'>
                    <img className="challenge-logo" src="/asset/material/chat.png" alt="" />
                  </Link>    
                </div>
                <div  className="d-flex flex-row text-center menu-item ">
                   <button onClick={(e)=>{ e.preventDefault();setSearchDisplay(!searchDisplay)}} type="button">
                      <img style={{backgroundColor:'tomato'}} className="challenge-logo" src="/asset/material/search.png" alt="" /> 
                   </button>
                    {searchDisplay &&(
                         <input type="text" style={{width:"80%",height:"30px",borderRadius:"10px",
                          position:"absolute",marginTop:"90px",marginLeft:"-35%",color:"black",fontWeight:"500",padding:'10px'
                        }} />
                    )}
                
                </div>
                <div className="d-flex flex-row text-center  menu-item ">
                  <Link to={'/notifications'}>
                    <img style={{backgroundColor:''}} className="challenge-logo" src="/asset/material/bell.png" alt="" />
                  </Link>    
                </div>
                
                {user ? (
                      <div  className="d-flex menu-item ">
                    <Link to={`/profile/${user._id}`}  style={{height:'70%'}} >
                      <img style={{height:'100%'}} className="challenge-logo" src={ user.profile_img} alt="" />
                    </Link> 
                     </div>
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

export default TopBar