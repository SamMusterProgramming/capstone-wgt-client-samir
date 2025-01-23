import { Link, Navigate } from "react-router-dom"
import './Components.css'
import ItemMenu from "./helper/ItemMenu"
import { useContext, useEffect, useRef, useState } from "react"
import { BASE_URL, getNotificationByUser } from "../apiCalls"
import Badge from '@mui/material/Badge';
import { notification } from "antd"
import { AuthContent } from "../context/AuthContent"

const TopBar = (props) => {

  const search  = useRef()
  const [searchDisplay,setSearchDisplay] = useState(false)
 
  const [notCount,setNotCount] = useState(0)
  const {notifications,setNotifications} = useContext(AuthContent)

  
  
  useEffect(() => {
    if(notifications) {
      const notifs = [] 
      notifications.forEach(notif =>
        {
          if (!notif.isRead) notifs.push(notif)
        }) 
      setNotCount(notifs.length)
    }
  }, [notifications])
  

  return (  
      <>
       
       <div className=" d-flex align-items-center justify-content-evenly  footer">  
        
                    
                <Link to='/demo' 
                className="d-flex flex-column justify-content-center align-items-center  menu-item"
                   >
                    <img style={{backgroundColor:''}} className="challenge-logo-selected" src=  "/asset/material/badge.png" alt="" />
                </Link>
              
                <Link to='/search' className="d-flex flex-column justify-content-center align-items-center  menu-item"
                   >
                    <img className="challenge-logo" src="/asset/material/chat.png" alt="" />
                </Link>    
        
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
                <Link to={'/notifications'}
                className="d-flex flex-column justify-content-center align-items-center  menu-item"
                   >   
                   <Badge badgeContent={6} color="error">
                    <img  className="challenge-logo" src="/asset/material/bells.png" alt="" />
                   </Badge>    
                </Link>  
            
                
                {props.user ? (
                      <Link  to={`/profile/${props.user._id}`}  style={{height:'70%'}}
                      className="d-flex flex-column justify-content-center align-items-center  menu-item"
                         >          
                      <img style={{height:'100%'}} className="challenge-logo" src={ props.user.profile_img} alt="" />
                    </Link> 
                    ):(
                      <Link  style={{height:'70%'}} to= "/sign-in"
                      className="d-flex flex-column justify-content-center align-items-center  menu-item"
                         >       
                    
                      <img className="menu-logo" src={"/asset/material/avatar.jpg"} alt="" />
                    </Link>   
               
          )}

        
       </div>

      </>
        
  )
}

export default TopBar