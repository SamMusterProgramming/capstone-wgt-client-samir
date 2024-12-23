import { useEffect } from 'react';
import './Page.css'
import { useState } from 'react';
import { BASE_URL, follow, getUserById, isfollowing, STORAGE_URL } from '../../apiCalls';
import { Link, useParams } from 'react-router-dom';





const Profile = (props) => {

    const _id  =  useParams().id;
    const [user, setUser] = useState({})
    const [follower,setFollower] = useState({})
    const [following,setFollowing] = useState({isFollowing:false})
    const [display , setDisplay] = useState(false)
    
    useEffect ( () => {
      
      getUserById(_id,setUser)
     } , [] )

     useEffect ( () => {
      
      isfollowing(_id,props.user._id,setFollowing)
      setDisplay(true)
     } , [] )
      
     
     useEffect ( () => {
         setDisplay(true)
     } , [following] ) 
     
const handleFollowing = ()=> { // add a follower , apiCall.js
    const rawBody = {
        follower_id : props.user._id,
        user_email:user.email,
        follower_email:props.user.email
    }
       follow (user._id,rawBody,setFollower) 
     }
     
        
   return(
    <div className=' d-flex flex-column justify-content-between align-items-center '
    style={{height:'84vh',maxWidth:'500px',background:' rgb(35, 21, 21)'}}>


      <div className=' d-flex flex-column justify-content-start align-items-center '>
              <div className='cover'>
                  <img src={BASE_URL +  user.profile_img} alt="samir" />
              </div>
              <div className='d-flex justify-content-center align-items-center profileimg'>
                  <img src={BASE_URL + user.profile_img } alt="" />
              </div>
      </div>   



      <div className='d-flex flex-column mt-4 gap-2 justify-content-start align-items-center mid-container'>
                  
             
               <span className="lead name mt-0">{user.name}</span> 
               <span className="link idd1">{user.email}</span> 
               <div className="d-flex flex-row justify-content-center align-items-center gap-2"> 
                      <span className="idd">{user.username}</span>
               </div>
               <div className="d-flex flex-column justify-content-center align-items-center mt-2">
                    <span className="number">{user.followers} </span> 
                    <span className="follow">Followers</span>
               </div>  
           
       
              <div className="col-md-2 d-flex mt-3 justify-content-center align-item-center">
       
                  <button onClick={handleFollowing} style={{
                  width:'70px', height:'40px',backgroundColor:'blueviolet',color:'white',borderRadius:'15px'
                }} className='mt-md-5'>
                    Follow 
                </button>
                
              </div>   
         
        
        </div>

      <video  className='' style={{marginTop:'auto'}} width='480px'
       src={ BASE_URL + "4973185-hd_1920_1080_30fps.mp4" } controls  />

     

     </div>
  )
}

export default Profile