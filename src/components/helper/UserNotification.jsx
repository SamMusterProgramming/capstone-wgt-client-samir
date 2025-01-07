import { Button, notification } from 'antd'
import React, { useEffect, useState } from 'react'
import { acceptFriendRequest, deleteUserNotification, getUserFriendsData, removeFriendRequest } from '../../apiCalls'
import { Link, useNavigate } from 'react-router-dom'



const UserNotification = (props) => {



  const [useFriendData,setUserFriendData] = useState(null)
  const [backgroundColor,setBackgroundColor] = useState(
    props.notification.isRead ? "white" : "lightgray"
  )
  const navigate = useNavigate()

  useEffect(() => {
    // getUserFriendsData(props.user._id,setUserFriendData)
  }, [])


  const handleDeny =()=>{
    const rawBody ={
      _id:props.notification.content.sender_id,
      name:props.notification.content.name,
      email:props.notification.content.email,
      profile_img:props.notification.content.profile_img
    }
    removeFriendRequest(props.user._id,rawBody,setUserFriendData)
    navigate('/home')
  }
  const handleAccept =()=>{
    const rawBody ={
      _id:props.notification.content.sender_id,
      name:props.notification.content.name,
      email:props.notification.content.email,
      profile_img:props.notification.content.profile_img
    }
    acceptFriendRequest(props.user._id,rawBody,setUserFriendData)
    navigate('/home')
  }
  const deleteNotification =()=>{
    deleteUserNotification(props.notification._id)
  }
  return (
    <div className='d-flex flex-column mt-3 justify-content-start align-items-center'
    style={{width:"100%",height:"60px",backgroundColor:{backgroundColor},border:"1px solid gray",borderRadius:"0px"}}>

        <div className='d-flex align-items-center justify-content-between text-center' 
             style={{width:"97%",height:"30%",backgroundColor:"lightgray",padding:"5px"}}>
           <p style={{color:"black",fontSize:'10px'}}>{
           props.notification.type} </p>   
           <p style={{color:"black",fontSize:'10px'}}>
           Date: {props.notification.createdAt.slice(0,10)} </p> 
        </div>
        <div className='d-flex align-items-center  justify-content-start text-center' 
          style={{width:"97%",height:"70%"}}>
           <Link to={`/profile/${props.notification.content.sender_id}`}>
           <img style={{height:"30px",width:"30px",borderRadius:"50px",objectFit:"cover"}} 
            src={props.notification.content.profile_img} alt="" />
           </Link>     
            <div className='d-flex flex-column align-items-center  justify-content-center text-center'
               style={{width:"25%",height:"100%"}} >
                  <p style={{color:"black",fontSize:'10px',fontWeight:"700", fontFamily:'Arsenal SC '}}>
                   {props.notification.content.name.slice(0,14)}</p>
            </div>
            <div className='d-flex  align-items-center  justify-content-center text-center'
               style={{width:"35%",height:"100%"}} >
                  <p style={{color:"black",fontSize:'10px',fontWeight:"500", fontFamily:'Arsenal SC serif'}}>
                   {props.notification.message}</p>
            </div>
            <div className='d-flex align-items-center  justify-content-evenly text-center'
               style={{width:"30%",height:"100%"}} >
                {props.notification.type === "friend request"? (
                  <>
                    <Button onClick={handleAccept}
                      style={{color:"black",fontSize:'10px',fontWeight:"500", fontFamily:'Arsenal SC serif',
                      width:"40px",height:"25px",backgroundColor:"lightgreen"
                      }}>Accept</Button> 
                    <Button onClick={handleDeny} style={{color:"black",fontSize:'10px',fontWeight:"500", fontFamily:'Arsenal SC serif',
                      width:"40px",height:"25px" ,backgroundColor:"#f06c79"   
                      }}>Deny</Button> 
                  </>
                ) :
                (
                  <Button
                  style={{color:"white",fontSize:'10px',fontWeight:"500", fontFamily:'Arsenal SC serif',
                    width:"40px",height:"25px",backgroundColor:"gray"}}
                    onClick={deleteNotification}>
                     Delete
                  </Button>
                )
                }
              
            </div>
        </div>


   </div>
  )
}

export default UserNotification