import { useEffect } from 'react';
import './Page.css'
import { useState } from 'react';
import { addFollowing, BASE_URL, getFollowData, getUserById, STORAGE_URL, unFollowings } from '../../apiCalls';
import { Link, useParams } from 'react-router-dom';
import { toast, Toaster } from 'sonner';
import Challenges from './Challenges';





const Profile = (props) => {

    const _id  =  useParams().id;
    const [user, setUser] = useState({})
    const [followerProfile , setFollowerProfile ] = useState(null)
    const [follow , setFollow ] = useState(null)
    const [follows , setFollows ] = useState([])
    
    useEffect ( () => {  
      getUserById(_id,setUser)
     } , [] )     
                
    useEffect ( () => {  
      getFollowData(_id,setFollowerProfile)
     } , [] ) 

    useEffect ( () => {     
      getFollowData(props.user._id,setFollow)
    } , [] ) 
         
     
    const handleFollowing = ()=> { // add a follower , apiCall.js
       const rawBody = {
        following_id :_id,
        following_email:user.email   
       }
       addFollowing(props.user._id,rawBody,setFollows)

    }
    const handleUnFollowing = ()=> { // add a follower , apiCall.js
      const rawBody = {
       following_id :_id,
       following_email:user.email
      }
      unFollowings(props.user._id,rawBody,setFollows)
    }

    useEffect ( () => {  
      getFollowData(_id,setFollowerProfile)
      getFollowData(props.user._id,setFollow)
     } , [follows]) 
        
   return(
    
    <div className='d-flex flex-column justify-content-start align-items-center '
      style={{maxWidth:'500px', width:'100%', height:"100%", background:' rgb(35, 21, 21)',overflow:'scroll'}}>

      <div className=' d-flex flex-column justify-content-start align-items-center'
        style={{maxWidth:'500px', height:'200px', width:'100%', background:' rgb(35, 21, 21)'}}>
              <div className='cover'>
                  <img src={BASE_URL +  user.profile_img} alt="samir" />
              </div>
              <div className='d-flex justify-content-center align-items-center profileimg'>
                  <img src={BASE_URL + user.profile_img } alt="" />
              </div>
      </div>   

      <div className='d-flex flex-column mt-5 gap-2 justify-content-start align-items-center mid-container'>
               <span className="name mt-3 ">{user.name}</span> 
               <span className="link idd1">{user.email}</span> 
               <div className="d-flex flex-row justify-content-center align-items-center gap-2"> 
                      <span className="idd">{user.username}</span>
               </div>
               <div className='d-flex justify-content-center align-items-center gap-5 '>
                  <div className="d-flex flex-column justify-content-center align-items-center mt-2">
                        <span className="number">{followerProfile &&followerProfile.followers_count} </span> 
                        <span className="follow">Followers</span>
                  </div>  
                  <div className="d-flex flex-column justify-content-center align-items-center mt-2">
                    <span className="number">{followerProfile && followerProfile.followings_count} </span> 
                    <span className="follow">Followings</span>
                 </div>  
                 
                 {(props.user._id !== _id && follow) && (
                    <>
                     {(follow.followings.find(following => following.following_id === user._id) )? 
                     (
                      <button onClick={handleUnFollowing} style={{ fontSize:'13px',
                        width:'70px', height:'40px',backgroundColor:'green',color:'white',borderRadius:'10px'
                        }} className='mt-md-2'>
                        Unfollow 
                     </button>
                     ):    
                     (
                      <button onClick={handleFollowing} style={{ fontSize:'13px',
                        width:'70px', height:'40px',backgroundColor:'green',color:'white',borderRadius:'10px'
                        }} className='mt-md-2'>
                        Follow 
                     </button>
                     )
                    }
                    
                   </>
                  
                 )} 
                
               </div> 
         
               
        </div>
        
        <div className='d-flex' style={{width:'100%', maxWidth:'500px',minHeight:'800px'}}>
            {user && follow && (<Challenges user = {user}/>)}    
        </div>
    
       

     </div>
      
      
  )
}

export default Profile