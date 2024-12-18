import { useEffect } from 'react';
import './Page.css'
import { useState } from 'react';
import { follow, getUserById, isfollowing, STORAGE_URL } from '../../apiCalls';
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
    <>


      <div className=' d-flex flex-column justify-content-start align-items-center profilecontainer'>
              <div className='cover'>
                  <img src={"http://localhost:8080" +  user.profile_img} alt="samir" />
              </div>
              <div className='d-flex justify-content-center align-items-center profileimg'>
                  <img src={"http://localhost:8080" + user.profile_img } alt="" />
              </div>
      </div>   
      <div className='midk-container'>
             <div className="row">
                <div className="col-md-5">
                 <div className='container-fluid d-flex flex-column justify-content-start align-items-center'>
                   <div className="container-fluid text-dark-3 p-1  mt-3">
                      <div className="d-flex text-dark flex-column gap-2 p-md-4 justify-content-center align-items-center"> 
                          <span className="lead name mt-3">{user.name}</span> 
                          <span className="idd2">{user.email}</span> 
                          <div className="d-flex flex-row justify-content-center align-items-center gap-2"> 
                            <span className="idd5">{user.username}</span>
                          </div>
                         <div className="d-flex flex-row justify-content-center align-items-center mt-2">
                           <span className="number">{user.followers} <span className="follow">Followers</span></span> 
                         </div>  
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-2 d-flex justify-content-center align-item-center">
                {display}?(
                  <button onClick={handleFollowing} style={{
                  width:'70px', height:'40px',backgroundColor:'blueviolet',color:'white',borderRadius:'15px'
                }} className='mt-md-5'>
                    {(following.isFollowing)? "Unfollow" : "Follow" }   
                </button>
                ):(
                  <button onClick={handleFollowing} style={{
                  width:'70px', height:'40px',backgroundColor:'blueviolet',color:'white',borderRadius:'15px'
                ,display:"none" }} className='mt-md-5'>
                    
                </button>
                )
              
                
              </div>   
               <div className="col-md-5">
                  <div className='container-fluid d-flex flex-column justify-content-start align-items-center'>
                    <div className="container-fluid  text-dark-3 p-1  mt-md-5">
                    <div className="d-flex text-dark flex-column gap-md-1 p-md-4 justify-content-center align-items-center"> 
                      <span className="label  text mt-md-3">City :    <span className="follow">{user.city} </span></span> 
                      <span className="label  text mt-3">State :    <span className="follow">{user.state} </span></span> 
                      <span className="label  text mt-3">Country:    <span className="follow">United States </span></span> 

                    </div>
                   </div>
                  </div>
               </div>
             </div>
        
      </div>

      <video  className='post-size' style={{marginTop:'auto'}}
       src={ STORAGE_URL + "4973185-hd_1920_1080_30fps.mp4" } controls width='100%' />

  

   </>
  )
}

export default Profile