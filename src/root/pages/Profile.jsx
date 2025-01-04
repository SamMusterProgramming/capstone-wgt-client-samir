import { useEffect } from 'react';
import './Page.css'
import { useState } from 'react';
import { addFollowing, BASE_URL, getFollowData, getUserById, STORAGE_URL, unFollowings } from '../../apiCalls';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast, Toaster } from 'sonner';
import Challenges from './Challenges';
import { getMediaFireBase } from '../../firebase';





const Profile = (props) => {

    const _id  =  useParams().id;
    const [user, setUser] = useState({})
    const [followerProfile , setFollowerProfile ] = useState(null)
    const [follow , setFollow ] = useState(null)
    const [follows , setFollows ] = useState([])
    const navigate = useNavigate('')
    const [userProfileImg,setUserProfileImg] = useState(props.user.profile_img)
    const [userCoverImg,setUserCoverImg] = useState(props.user.cover_img)

    
    useEffect ( () => {  
      getUserById(_id,setUser)
     } , [] )     
        
     useEffect ( () => {  
      //  if (Object.keys(user).length !== 0 && (props.user._id != _id)) {
      //   getMediaFireBase(user.profile_img,setUserProfileImg)
      //   getMediaFireBase(user.cover_img,setUserCoverImg)
      //  }

     } , [user] )  
     

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
   
    const handleEdit = ()=> {
        navigate('/updateprofile')
    }
    useEffect ( () => {  
      getFollowData(_id,setFollowerProfile)
      getFollowData(props.user._id,setFollow)
     } , [follows]) 
        
   return(
    
    <div className='d-flex flex-column justify-content-start align-items-center profilecontainer'
      style={{maxWidth:'500px', width:'100%',overflow:'scroll'}}>

      <div className=' d-flex flex-column justify-content-start align-items-center'
        style={{maxWidth:'500px', height:'250px', width:'100%', background:' transparent'}}>
           
               <img style={{width:"100%",height:"150px",objectFit:"cover"}} src={user.cover_img} alt="" />
           
              {/* <div className='d-flex justify-content-center align-items-center profileimg'> */}
               <img className='profileimg' src={user.profile_img} alt="" />
              {/* </div> */}
      </div>   
    
      <div className='d-flex flex-column mt-1 gap-2 justify-content-start align-items-center mid-container'>
               <span className="name mt-3 ">{user.name}</span> 
               <span className="link idd1">{user.email}</span> 

               <div className='d-flex justify-content-center align-items-center mt-3 gap-2 '
               style={{height:'90%' ,width:'100%'}} >
                  <div className="d-flex flex-column justify-content-start gap-1  align-items-center "
                    style={{height:'50%' ,width:'120px' ,backgroundColor:"#3832a8" , borderRadius:'10px'}}>
                        <span className="number">{followerProfile &&followerProfile.followers_count} </span> 
                        <span className="follow">FOLLOWERS</span>
                  </div>  
                  <div className="d-flex flex-column justify-content-start gap-1 align-items-center "
                   style={{height:'50%' ,width:'120px' ,backgroundColor:"#150bdb", borderRadius:'10px'}}>
                    <span className="number">{followerProfile && followerProfile.followings_count} </span> 
                    <span className="follow">FOLLOWINGS</span>
                 </div>  
                 
                 {(props.user._id !== _id && follow) && (
                    <>
                     {(follow.followings.find(following => following.following_id == _id) )? 
                     (
                      <button onClick={handleUnFollowing} style={{ fontSize:'13px',
                        width:'50%', height:'50%',backgroundColor:'green',color:'white',borderRadius:'10px'
                        }} className='mt-md-2'>
                        Unfollow 
                     </button>
                     ):    
                     (
                      <button onClick={handleFollowing} style={{ fontSize:'13px',
                        width:'50%', height:'100%',backgroundColor:'green',color:'white',borderRadius:'10px'
                        }} className='mt-md-2'>
                        Follow 
                     </button>
                     )
                    }
                    
                   </>
                  
                 )
                 } 

                 {props.user._id === _id && (
                     <button onClick={handleEdit} style={{ fontSize:'13px',
                      width:'100px', height:'50%',backgroundColor:'green',color:'white',borderRadius:'10px'
                      }} className='mt-md-2'>
                        EDIT 
                   </button>
                 ) } 
               
               </div> 
         
        </div>
        
              <h5 className='mt-0 mb-3' style={{fontSize:'12px',fontFamily:'',color:'gray'}}>Top Challenges</h5>

                {user && follow && props.user._id === _id && (<Challenges user = {user}/>)}    
        
       

     </div>
      
      
  )
}

export default Profile