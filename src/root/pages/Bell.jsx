import React, { useContext, useEffect, useState } from 'react'
import { AuthContent } from '../../context/AuthContent'
import { challengeType } from '../../utilitise/typeSelectorData'
import { Button, Select } from 'antd'
import { Link } from 'react-router-dom'
import { getNotificationByUser, getUserFriendsData, removeFriendRequest } from '../../apiCalls'
import UserNotification from '../../components/helper/UserNotification'

const Bell = () => {
  const {notifications,setNotifications,user} = useContext(AuthContent)  
//   const [useFriendData,setUserFriendData] = useState(null)

  useEffect(() => {
    getNotificationByUser(user._id,setNotifications)
    console.log(notifications)
  }, [])


//   const handleDeny =()=>{
//     const rawBody = useFriendData.
//     removeFriendRequest(user._id,)
//   }
  return (
   <>
           
            <div className="d-flex flex-column mb-0 mt-0 justify-content-start align-items-center star"
             style={{width:"100%",height:'20%',backgroundColor:''}}>

                <div className="d-flex justify-content-start  align-items-end " 
                    style={{fontSize:'10px',width:'100%',height:"100%"}}>

                    <div className="d-flex flex-column justify-content-start align-items-center gap-1  "
                        style={{fontSize:'10px',width:'30%',height:"100%"}}>
                       
                            <div  className="d-flex flex-column  justify-content-center text-center  align-items-center "
                              style={{fontSize:'10px',width:'100%',height:"30%",backgroundColor:''}} >   
                                <span className="lead text" style={{fontSize:'10px',color:"#232324",fontWeight:'800', 
                                  fontFamily:'Arsenal SC serif',color:"white"
                                  }}>  {user.name.toUpperCase().slice(0,20)}...</span>
                            </div> 
                            <Link to={"/profile/"+`${user._id}`} style={{width:'90%',height:"65%"}}>
                                <img   style={{fontSize:'10px',width:'100%',height:"100%",objectFit:'cover',borderRadius:'5px'}}
                                    src={user.profile_img}  alt="" />
                            </Link>  
                    </div>
                    <div className="d-flex flex-column justify-content-start align-items-center "
                        style={{fontSize:'10px',width:'70%',height:"100%",backgroundColor:''}}>

                        <div  className="d-flex flex-column justify-content-center text-center mt-0 align-items-center "
                            style={{fontSize:'10px',width:'90%',height:"30%",backgroundColor:''}} >   
                            <span style={{fontSize:'12px',color:"white",fontWeight:'800', 
                            fontFamily:'Arsenal SC serif'
                            }}>Explore your Notifications in this section</span>
                        </div> 
                        <div className="d-flex   justify-content-between gap-0 align-items-center sky-blue " 
                            style={{fontSize:'10px',width:'100%',height:"70%"}}>

                            <Link to="/home" className="d-flex flex-column  justify-content-end gap-0 align-items-center "
                              style={{width:"23%",height:'100%',backgroundColor:''}}>
                                  <img style={{width:"60%",height:'70%',objectFit:"fill", backgroundColor:''}}
                                  src="../asset/material/challenge-logo.png" alt="" />
                            </Link>
                            <Link to={"/newchallenge"} className="d-flex flex-column justify-content-end gap-0 align-items-center "
                              style={{width:"47%",height:'100%'}}>
                              <Button to={"/newchallenge"}
                              style={{fontSize:'13px',color:"white",fontWeight:'700', width:"98%",height:'40%'
                                ,backgroundColor:'blue',fontFamily:'Arsenal SC serif',border:"none",opacity:"60%",
                                }}>
                                    New Challenge
                              </Button>
                            </Link>
                            <div className="d-flex flex-column  justify-content-end gap-0 align-items-center "
                              style={{width:"33%",height:'100%',backgroundColor:''}}>
                                <img style={{width:"60%",height:'70%',objectFit:"fill", color:'red'}}
                                  src="../asset/material/notification.png" alt="" />
                            </div>    
                        </div>
                    
                    </div>
                </div>
            
            </div>

   <div className='d-flex flex-column mt-2 justify-content-start align-items-center colorfull-bg'
    style={{width:"100%",minHeight:"80%"}}>

    {notifications && notifications.map((notification,index)=>{
        return (
          <UserNotification notification={notification} setNotifications={setNotifications} user={user} key={index} />
        )
     })}

   </div>

    
   </>
  )
}

export default Bell