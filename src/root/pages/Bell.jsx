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
  }, [])


//   const handleDeny =()=>{
//     const rawBody = useFriendData.
//     removeFriendRequest(user._id,)
//   }
  return (
   <>
           
            <div className="d-flex flex-column mb-0 mt-0 justify-content-start align-items-center star "
             style={{width:"100%",height:'35%',backgroundColor:''}}>

             <div className="d-flex   justify-content-between gap-0 align-items-center sky-blue " 
                style={{fontSize:'10px',width:'100%',height:"25%"}}>

                 <Link to="/home" className="d-flex  justify-content-center gap-0 align-items-center "
                  style={{width:"33%",height:'100%',backgroundColor:''}}>
                      <img style={{width:"60%",height:'70%',objectFit:"fill", backgroundColor:''}}
                      src="../asset/material/challenge-logo.png" alt="" />
                 </Link>
                 <Link to={"/newchallenge"} className="d-flex justify-content-center gap-0 align-items-center "
                  style={{width:"33%",height:'100%'}}>
                  <Button to={"/newchallenge"}
                   style={{fontSize:'14px',color:"#1b78cf",fontWeight:'900', width:"98%",height:'95%'
                     ,backgroundColor:'#403014',fontFamily:'Arsenal SC serif',border:"none"
                    }}>
                         New Challenge
                  </Button>
                 </Link>
                 <div className="d-flex   justify-content-center gap-0 align-items-center "
                  style={{width:"33%",height:'100%',backgroundColor:''}}>
                    <img style={{width:"60%",height:'70%',objectFit:"fill", color:'red'}}
                      src="../asset/material/notification.png" alt="" />
                 </div>
               
                
            </div>
            <div className="d-flex   justify-content-start align-items-end " 
                style={{fontSize:'10px',width:'100%',minHeight:"75%"}}>
                <div className="d-flex flex-column justify-content-center align-items-center gap-1  "
                    style={{fontSize:'10px',width:'30%',height:"100%"}}>
                        {/* <p style={{fontSize:'12px',color:"white"}}>  */}
                        <span className="lead text" style={{fontSize:'10px',color:"#232324",fontWeight:'800', 
                        fontFamily:'Arsenal SC serif',color:"white"
                        }}>  {user.name.toUpperCase().slice(0,20)}...</span>
                    
                    <Link to={"/profile/"+`${user._id}`} style={{width:'90%',height:"54%"}}>
                        <img   style={{fontSize:'10px',width:'100%',height:"100%",objectFit:'cover',borderRadius:'5px'}}
                            src={user.profile_img}  alt="" />
                    </Link>  
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center "
                    style={{fontSize:'10px',width:'70%',height:"100%",backgroundColor:''}}>

                    <div  className="d-flex justify-content-center text-center mt-2 align-items-center "
                        style={{fontSize:'10px',width:'90%',height:"100%",backgroundColor:''}} >   
                        <h4 style={{fontSize:'13px',color:"white",fontWeight:'800', 
                        fontFamily:'Arsenal SC'
                        }}>Explore your Notifications in this section</h4>
                    </div> 
                    {/* <div  className="d-flex justify-content-end mt-2 align-items-center "
                    style={{fontSize:'10px',width:'90%',height:"30%",backgroundColor:''}} >
                        <Select
                            style={{width:"100%",height:"100%",fontSize:'11px' ,border:"none",fontWeight:"600", backgroundColor:'',textAlign:"center"}}
                            defaultValue="ALL TYPE" 
                            >   
                            <Select.Option value = {"ALL CHALLENGES"} 
                                        style={{ color:'black',
                                        backgroundColor:"lightgray",width:"100%",height:"30px" }} >
                                        <p style={{ color:'black'}}>ALL TYPES</p> 
                            </Select.Option>
                            {challengeType.map((selection,index)=>{   
                                return ( 
                                    <Select.Option key={index} value = {selection.type}
                                        style={{ color:'black',
                                        backgroundColor:"lightgray",width:"100%",height:"30px" }} >
                                        <p style={{ color:'black'}}>{selection.type}</p> 
                                    </Select.Option> )
                            })} 
                        </Select>
                    </div> */}
                    {/* <div className="d-flex justify-content-evenly align-items-end "
                    style={{fontSize:'10px',width:'96%',height:"40%",backgroundColor:''}} >
                    
                        
                    </div> */}
                </div>
            </div>
            
            </div>

   <div className='d-flex flex-column mt-0 justify-content-start align-items-center star'
    style={{width:"100%",minHeight:"75%"}}>

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