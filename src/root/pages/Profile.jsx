import { useEffect } from 'react';
import './Page.css'
import { useState } from 'react';
import { addFollowing, BASE_URL, getFollowData, getUserById, getUserFriendsData, STORAGE_URL, unFollowings } from '../../apiCalls';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, Toaster } from 'sonner';
import Challenges from './Challenges';
import { getMediaFireBase } from '../../firebase';
import Follower from '../../components/Follower';
import Following from '../../components/Following';
import Friend from '../../components/Friend';





const Profile = (props) => {

    const _id  =  useParams().id;
    const [user, setUser] = useState({})
    const [followerProfile , setFollowerProfile ] = useState(null)
    const [follow , setFollow ] = useState(null)
    const [follows , setFollows ] = useState([])
    const navigate = useNavigate('')
    const [userProfile,setUserProfile] = useState(props.user.profile_img)
    const [displayFollowers,setDisplayFollowers] = useState(false)
    const [displayFollowings,setDisplayFollowings] = useState(false)
    const [displayFriends,setDisplayFriends] = useState(false)
    const [friends,setFriends] = useState(null)


   
    const[followers,setFollowers] =useState({})

    useEffect ( () => {  
      getUserById(_id,setUser)
     } , [] )     
        
     useEffect ( () => {  
      getFollowData(props.user._id,setFollow)
     } , [user] )  
     

    useEffect ( () => {  
      getFollowData(_id,setFollowerProfile)
     } , [] ) 

    useEffect ( () => {     
      getFollowData(props.user._id,setFollow)
    } , [] ) 
    
    useEffect ( () => {     
      getUserFriendsData(_id , setFriends)
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
   
   const handleDisplayFollowers =()=> {
      switchSelect()
       setDisplayFollowers(true)
       console.log(follow)
    }

   const handleDisplayFollowings =()=> {
      switchSelect()
      setDisplayFollowings(true)
   }
   const handleDisplayFriends =()=> {
    switchSelect()
    setDisplayFriends(true)
    }


    const handleEdit = ()=> {
        navigate('/updateprofile')
    }

    useEffect ( () => {  
      getFollowData(_id,setFollowerProfile)
      getFollowData(props.user._id,setFollow)
      
     } , [follows]) 

    const switchSelect = ()=>{
      displayFollowers && setDisplayFollowers(!displayFollowers)
      displayFollowings &&  setDisplayFollowings(!displayFollowings)
      displayFriends &&  setDisplayFriends(!displayFriends)

    } 
        
   return(
    
    <div className='d-flex flex-column justify-content-start align-items-center '
      style={{backgroundColor:"lightgray", width:'100%',overflow:'scroll',height:"100%"}}>

      <div className=' d-flex flex-column justify-content-start align-items-center star'
        style={{maxWidth:'500px', height:'210px', width:'100%', backgroundColor:"rgb(25, 33, 39)"}}>
           
               <img style={{width:"100%",height:"150px",objectFit:"cover"}} src={user.cover_img} alt="" />
           
              {/* <div className='d-flex justify-content-center align-items-center profileimg'> */}
               <img className='profileimg' src={user.profile_img} alt="" />
              {/* </div> */}
      </div>   
    
      <div className='d-flex flex-column mt-0 gap-2 justify-content-start align-items-center star '
       style={{height:'700px' ,width:'100%'}}>

               <div className="d-flex flex-column mt-2  justify-content-start align-items-center">
                    <span style={{fontSize:'14px',fontWeight:"300",color:'white',fontFamily:'Arsenal SC serif'}}>{user.name}</span> 
                    <span style={{fontSize:'12px',fontWeight:"300",color:'white',fontFamily:'Arsenal SC serif'}}>{user.email}</span> 
               </div>
               <div className="d-flex flex-row  justify-content-center gap-3 align-items-center">
                   <p style={{fontSize:'13px',fontWeight:"300",color:'lightgray',fontFamily:'Arsenal SC seif'}}>City : <span style={{fontSize:'12px',fontWeight:"600",color:'white',fontFamily:'Arsenal SC serif'}}>{user.city}</span></p>
                   <p style={{fontSize:'13px',fontWeight:"300",color:'lightgray',fontFamily:'Arsenal SC serif'}}>State : <span style={{fontSize:'12px',fontWeight:"600",color:'white',fontFamily:'Arsenal SC serif'}}>{user.state}</span></p>
                   <p style={{fontSize:'13px',fontWeight:"300",color:'lightgray',fontFamily:'Arsenal SC serif '}}>City : <span style={{fontSize:'12px',fontWeight:"600",color:'white',fontFamily:'Arsenal SC serif'}}>USA</span></p>

               </div>
              
               <div className='d-flex justify-content-evenly mb-2 align-items-center mt-3 gap-0 '
                 style={{height:'40px' ,width:'100%'}} >
                    {(props.user._id === _id && follow) && (
                      <>
                       <button onClick={handleDisplayFollowers}
                       className="d-flex flex-column justify-content-center gap-0  align-items-center"
                       style={{height:'100%' ,width:'23%' ,backgroundColor:"blue" , borderRadius:'5px'}}  to={''}>
                          <span style={{fontSize:'12px',fontWeight:"300",color:'white',fontFamily:'Arsenal SC serif'}}>{followerProfile &&followerProfile.followers_count} </span> 
                          <span style={{fontSize:'11px',fontWeight:"700",color:'white',fontFamily:'Arsenal SC '}}>Followers</span>
                      </button>   
                      <button onClick={handleDisplayFollowings}
                       className="d-flex flex-column justify-content-center gap-0  align-items-center"
                       style={{height:'100%' ,width:'23%' ,backgroundColor:"#3832a8" , borderRadius:'5px'}}  to={''}>
                          <span style={{fontSize:'12px',fontWeight:"300",color:'white',fontFamily:'Arsenal SC serif'}}>{followerProfile && followerProfile.followings_count}</span> 
                          <span style={{fontSize:'11px',fontWeight:"700",color:'white',fontFamily:'Arsenal SC '}}>Followings</span>
                      </button>         
                      <button onClick={handleDisplayFriends}
                      className="d-flex flex-column justify-content-center gap-0  align-items-center"
                       style={{height:'100%' ,width:'23%' ,backgroundColor:"red" , borderRadius:'5px'}}  to={''}>
                          <span style={{fontSize:'12px',fontWeight:"300",color:'white',fontFamily:'Arsenal SC serif'}}>{friends && friends.friends_count}</span> 
                          <span style={{fontSize:'11px',fontWeight:"700",color:'white',fontFamily:'Arsenal SC '}}>Friends</span>
                      </button>        
                      </>
                    )}
                      
                 
                 {(props.user._id !== _id && follow) && (
                    <>
                     {(follow.followings.find(following => following.following_id == _id) )? 
                     (
                      <button onClick={handleUnFollowing} style={{ fontSize:'13px',
                        width:'40%', height:'100%',backgroundColor:'green',color:'white',borderRadius:'10px'
                        }} className='mt-md-2'>
                        Unfollow 
                     </button>
                     ):    
                     (
                      <button onClick={handleFollowing} style={{ fontSize:'13px',
                        width:'50%', height:'50%',backgroundColor:'green',color:'white',borderRadius:'10px'
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
                      width:'23%', height:'100%',backgroundColor:'green',color:'white',borderRadius:'5px'
                      }} className='mt-md-2'>
                        EDIT 
                   </button>
                 ) } 
               
               </div> 
               {displayFollowers && ( 
                    <>
                    <div className='d-flex justify-content-center mt-4 align-items-center'
                        style={{width:"100%",height:"20px" }}>
                        <p style={{fontSize:"13px",color:"white",fontWeight:"600", fontFamily:"Arsenal SC"}}>FOLLOWERS</p>
                    </div>
                    <div className='d-flex flex-wrap mt-0 p-1 justify-content-start gap-2 align-items-start border'
                      style={{width:'100%',minHeight:"180px",backgroundColor:"lightgray"}}>
                       { follow && follow.followers.map((follower,index)=>{
                        return (
                         <Follower follower={follower} key={index}/>
                        )
                       })}
                    </div>
                    </>
               )}
                 {displayFollowings && ( 
                    <>
                    <div className='d-flex justify-content-center mt-4 align-items-center'
                        style={{width:"100%",height:"20px" }}>
                        <p style={{fontSize:"13px",color:"white",fontWeight:"600", fontFamily:"Arsenal SC"}}>FOLLOWINGS</p>
                    </div>
                    <div className='d-flex flex-wrap mt-0 p-1 gap-2 justify-content-start align-items-start border'
                      style={{width:'100%',minHeight:"180px",backgroundColor:"lightgray"}}>
                       { follow && follow.followings.map((following,index)=>{
                        return (
                         <Following following={following} key={index}/>
                        )
                       })}
                    </div>
                    </>
               )}
                {displayFriends && ( 
                    <>
                    <div className='d-flex justify-content-center mt-4 align-items-center'
                        style={{width:"100%",height:"20px" }}>
                        <p style={{fontSize:"13px",color:"white",fontWeight:"600", fontFamily:"Arsenal SC"}}>FRIENDS</p>
                    </div>
                    <div className='d-flex flex-wrap mt-0 p-1 gap-2 justify-content-start align-items-start border'
                      style={{width:'100%',minHeight:"180px",backgroundColor:"lightgray"}}>
                       { friends && friends.friends.map((friend,index)=>{
                        return (
                         <Friend friend={friend} key={index}/>
                        )
                       })}
                    </div>
                    </>
               )}
              
         
        </div>
        
              {/* <h5 className='mt-0 mb-3' style={{fontSize:'12px',fontFamily:'',color:'gray'}}>Top Challenges</h5>

                {user && follow && props.user._id === _id && (<Challenges user = {user}/>)}     */}
        
         

     </div>
      
      
  )
}

export default Profile