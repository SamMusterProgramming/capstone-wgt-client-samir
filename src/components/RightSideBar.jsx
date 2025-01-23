import { Link } from "react-router-dom"
import './Components.css' 
import { BASE_URL } from "../apiCalls"
import { useContext, useEffect, useRef, useState } from "react"
import { AuthContent } from "../context/AuthContent"
import Badge from '@mui/material/Badge';

const RightSideBar = ({user}) => {

 const [isHome,setIsHome]= useState(true)
 const [isTalent,setIsTalent]= useState(false)
 const [isChallenge,setIsChallenge]= useState(false)
 const [isGuiness,setIsGuiness]= useState(false)
 const [isProfile,setIsProfile]= useState(false)
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

useEffect(() => {
  if (isHome) {
    setIsTalent(false)
    setIsChallenge(false)
    setIsGuiness(false)
    setIsProfile(false)
  }
}, [isHome])
useEffect(() => {
  if (isTalent) {
    setIsHome(false)
    setIsChallenge(false)
    setIsGuiness(false)
    setIsProfile(false)
  }
}, [isTalent])
useEffect(() => {
  if (isChallenge) {
    setIsHome(false)
    setIsTalent(false)
    setIsGuiness(false)
    setIsProfile(false)
  }
}, [isChallenge])

useEffect(() => {
  if (isGuiness) {
    setIsHome(false)
    setIsTalent(false)
    setIsChallenge(false)
    setIsProfile(false)
  }
}, [isGuiness])
useEffect(() => {
  if (isProfile) {
    setIsHome(false)
    setIsTalent(false)
    setIsChallenge(false)
    setIsGuiness(false)
  }
}, [isProfile])
  
  
  return (


      
      <>

         {/* <div className="col-sm-auto bg-dark   sticky-top"> */}
       
            <div  className=" d-flex  justify-content-between align-items-center gap-0 footer ">
          
                <Link to='/home' onClick={(e)=>{setIsHome(true)}}
                    className = {isHome ?
                    "d-flex flex-column justify-content-center align-items-center text-center menu-item-selected" :
                    "d-flex flex-column justify-content-center align-items-center text-center menu-item" }>
                    <img  data-toggle="tooltip" title="HOME"
                     style={{color:'lightblue'}}
                          className= {isHome ?"challenge-logo-selected":"challenge-logo"}
                          src=  "/asset/material/home.png" alt="" />  
                </Link>

                <Link data-toggle = "tooltip" title="talent" to='/chpage/challenges' onClick={(e)=>{setIsChallenge(true)}}
                 className={isChallenge ?
                  "d-flex flex-column justify-content-center align-items-center text-center menu-item-selected" :
                  "d-flex flex-column justify-content-center align-items-center text-center menu-item" } >           
                  <img data-toggle="tooltip" title="CHALLENGE" 
                       className= {isChallenge ?"challenge-logo-selected":"challenge-logo"}
                       src="/asset/material/challenge-logo.png" alt="" />
                </Link>    
                <Link data-toggle="tooltip" title="GUINESS" to={'/'} onClick={(e)=>{setIsGuiness(true)}}
                    className={isGuiness ?
                      "d-flex flex-column justify-content-center align-items-center text-center menu-item-selected" :
                      "d-flex flex-column justify-content-center align-items-center text-center menu-item" }>
                  <img 
    
                       className= {isGuiness ?"challenge-logo-selected":"challenge-logo"}
                       src="/asset/material/trophy.png" alt="" />
                </Link>    
                
                <Link data-toggle = "tooltip" title="talent" to={'/notifications'} onClick={(e)=>{setIsTalent(true)}}
                 className={isTalent ?
                  "d-flex flex-column justify-content-center align-items-center text-center menu-item-selected" :
                  "d-flex  justify-content-center align-items-center text-center menu-item" }
                   >
                   <Badge badgeContent={notCount} color="error"
                     className= {isTalent ?"challenge-logo-selected":"challenge-logo"}
                     style={{height:"60%",objectFit:"cover",marginLeft:"20%"}}>
                    <img 
                    //  style={{height:"70%",objectFit:"cover"}}
                     src="/asset/material/notification.png" alt=""
                      />
                   </Badge>    
                </Link>  

             
                {user ? (
                      <Link  to={`/profile/${user._id}`}  
                        data-toggle="tooltip" title="PROFILE"  onClick={(e)=>{setIsProfile(true)}}
                        className={isProfile ?
                        "d-flex flex-column justify-content-center align-items-center text-center menu-item-selected" :
                        "d-flex flex-column justify-content-center align-items-center text-center menu-item" }
                        >
                      
                        <img   className= { isProfile ? "challenge-logo-selected":"challenge-logo"}
                          style={{height:"70%",objectFit:"cover"}}
                          src={ user.profile_img}  alt="" />
                    </Link> 
                    ):(
                      <Link  style={{height:'70%'}} to= "/sign-in"
                      className="d-flex flex-column justify-content-center align-items-center  menu-item"
                         >       
                    
                      <img className="menu-logo" src={"/asset/material/avatar.jpg"} alt="" />
                    </Link>   
               
                  )}
                
              
                {user ? (
                    <Link to={`/profile/${user._id}` }  
                    className="d-flex flex-column justify-content-center align-items-center text-center menu-item">
                      <img style={{height:'80%' ,backgroundColor:'#1ca1c9'}} className="challenge-logo" 
                       src="/asset/material/logout.png" alt="" />
                    </Link> 
         
                    ):(
                    <Link  to= "/sign-in" className="d-flex flex-column justify-content-center align-items-center text-center menu-item">
                      <img className="challenge-logo" style={{backgroundColor:'#1ca1c9'}} src={"/asset/material/login.png"} alt="" />
                    </Link>   
                      )}
                   

               
          

            </div>
   
        
       </>


  )
}

export default RightSideBar