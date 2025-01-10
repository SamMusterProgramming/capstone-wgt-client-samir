import React, { useEffect, useState } from 'react'
import { getUserById } from '../apiCalls'
import { Link } from 'react-router-dom'

const Follower = (props) => {

  const [followProfile , setFollowProfile] = useState(null)

  useEffect(() => {
    getUserById(props.follower.follower_id,setFollowProfile)
  }, [])
  
  return (
    <>
       {followProfile && (
         <Link to={`/userprofile/${props.follower.follower_id}`} className='d-flex flex-column justify-content-center align-items-center '
            style={{height:'110px' ,width:'80px',backgroundColor:"white", borderRadius:"10px",
             boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}>
            <div className='d-flex flex-column justify-content-center align-items-center'
                style={{width:"70px",height:"70px",background:"lightblue" ,borderRadius:"50%" }}>
                 <img  style={{width:"92%",height:"92%" ,objectFit:"cover",borderRadius:"50%"}} src={followProfile.profile_img} alt="" />
            </div>
            <div className='d-flex justify-content-center align-items-center'
                style={{width:"100%",height:"25px" }}>
                  <p style={{fontSize:"10px",color:"black",fontWeight:"600", fontFamily:"Arsenal SC serif"}}>{followProfile.name.slice(0,13)}</p>
            </div>
        </Link>
       )}
        

     
    </>
    
  
  )
}

export default Follower