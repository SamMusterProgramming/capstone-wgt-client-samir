import { useEffect } from 'react';
import './Page.css'
import { useState } from 'react';
import { acceptFriendRequest, addFollowing, BASE_URL, friendRequest, getFollowData, getUserById, getUserFriendsData, removeFriendRequest, STORAGE_URL, unFollowings, unfriendRequest } from '../../apiCalls';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, Toaster } from 'sonner';
import Challenges from './Challenges';
import { getMediaFireBase } from '../../firebase';
import Follower from '../../components/Follower';
import Following from '../../components/Following';
import Friend from '../../components/Friend';
import DialogConfirm from '../../components/helper/DialogConfirm';





const UserProfile = (props) => {

    const _id  =  useParams().id;
    const [user, setUser] = useState({})
    const [followerProfile , setFollowerProfile ] = useState(null)
    const [follow , setFollow ] = useState(null)
    const [follows , setFollows ] = useState([])
    const [addFriendRequest , setAddFriendRequest] = useState(null)
    const [friendData , setFriendData] = useState(null)
    const [currentFriendData , setCurrentFriendData] = useState(null)


    const[isFriend,setIsFriend]= useState(false)
    const[isPending,setIsPending]= useState(false)
    const[isAccept,setIsAccept]= useState(false)

    const navigate = useNavigate('')
    
    // const [friends,setFriends] = useState(null)


   
    const[followers,setFollowers] = useState({})

     useEffect ( () => {  
      getUserById(_id,setUser)
     } , [] )     
     
     useEffect ( () => {  
        getUserFriendsData(props.user._id,setFriendData)
    } , [] )   

    useEffect ( () => {  
        getUserFriendsData(_id,setCurrentFriendData)
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
    
     
    const handleFollowing = ()=> { // add a follower , apiCall.js
       const rawBody = {
        following_id :_id,
        following_email:user.email   
       }
       addFollowing(props.user._id,rawBody,setFollows)
    }
    const handleUnFollowing = ()=> { //  apiCall.js
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


     const sendFriendRequest = () => {   
        const rawBody = props.user;
        friendRequest(_id,rawBody,setAddFriendRequest)
     }   
     
   const unfriendFriendRequest = () => {
       console.log(props.user)
       const rawBody = props.user;
       unfriendRequest(_id,rawBody,setAddFriendRequest)
    }
   
   const okFriendRequest = () => {
     const rawBody ={
       _id:_id,
       name:user.name,
       email:user.email,
       profile_img:user.profile_img
     }
     acceptFriendRequest(props.user._id,rawBody,setAddFriendRequest)
   }
   
   const cancelFriendRequest = () => {
    removeFriendRequest(_id,props.user,setAddFriendRequest)
    }
    
    useEffect(() => {

        if(currentFriendData){ 
          if(currentFriendData.friend_request_received)
            currentFriendData.friend_request_received.find(data => data.sender_id == props.user._id)
          ? setIsPending(true) : setIsPending(false)
          if(currentFriendData.friends)
            currentFriendData.friends.find(data => data.sender_id === props.user._id)
            ? setIsFriend(true) : setIsFriend(false)
          }
    
        if( friendData){
          if(friendData.friend_request_received) {
             if(friendData.friend_request_received.find(data => data.sender_id == _id))
             {
              setIsAccept(true)
              setIsPending(false)
              setIsFriend(false)
            } 
            else {setIsAccept(false)
            
          }}}  
              }
      , [currentFriendData,friendData]) 


      useEffect(() => {
        getUserFriendsData(_id,setCurrentFriendData)
        getUserFriendsData(props.user._id,setFriendData)
        }, [addFriendRequest])

   return(
    
    <div className='d-flex flex-column justify-content-start align-items-center '
      style={{backgroundColor:"lightgray", width:'100%',overflow:'scroll',height:"100%"}}>

      <div className=' d-flex flex-column justify-content-start align-items-center'
        style={{maxWidth:'500px', height:'210px', width:'100%', backgroundColor:"rgb(25, 33, 39)"}}>
           
               <img style={{width:"100%",height:"150px",objectFit:"cover"}} src={user.cover_img} alt="" />
               <img className='profileimg' src={user.profile_img} alt="" />
        
      </div>   
    
      <div className='d-flex flex-column mt-0 gap-2 justify-content-start align-items-center  '
       style={{height:'400px' ,width:'100%', backgroundColor:"rgb(25, 33, 39)"}}>

               <div className="d-flex flex-column mt-2  justify-content-start align-items-center">
                    <span style={{fontSize:'14px',fontWeight:"300",color:'white',fontFamily:'Arsenal SC serif'}}>{user.name}</span> 
                    <span style={{fontSize:'12px',fontWeight:"300",color:'white',fontFamily:'Arsenal SC serif'}}>{user.email}</span> 
               </div>
               <div className="d-flex flex-row  justify-content-center gap-3 align-items-center">
                   <p style={{fontSize:'13px',fontWeight:"300",color:'lightgray',fontFamily:'Arsenal SC serif'}}>City : <span style={{fontSize:'12px',fontWeight:"600",color:'white',fontFamily:'Arsenal SC serif'}}>{user.city}</span></p>
                   <p style={{fontSize:'13px',fontWeight:"300",color:'lightgray',fontFamily:'Arsenal SC serif '}}>State : <span style={{fontSize:'12px',fontWeight:"600",color:'white',fontFamily:'Arsenal SC serif'}}>{user.state}</span></p>
                   <p style={{fontSize:'13px',fontWeight:"300",color:'lightgray',fontFamily:'Arsenal SC seif '}}>City : <span style={{fontSize:'12px',fontWeight:"600",color:'white',fontFamily:'Arsenal SC serif'}}>USA</span></p>

               </div>
              
               <div className='d-flex justify-content-evenly  align-items-center mt-1 gap-0 '
                 style={{height:'40px' ,width:'100%'}} >
                     
                     
                                    
                                    {currentFriendData && (
                                      <>
                                      {isAccept && (
                                        <div className='d-flex flex-column justify-content-center align-items-center'
                                          style={{height:"100%",width:"40%", backgroundColor:""}}>
                                              <DialogConfirm style={{width:'100%',border:'none', fontFamily:'Arsenal SC serif ',
                                                  height:'100%',color:'white', 
                                                  backgroundColor:"#de1051",fontSize:'12px',fontWeight:"600"}}
                                                  action={"Accept"} message ={`are you sure you want to accept ${user.name}'s friend request?`} 
                                                  handleAction={okFriendRequest}/>    
                                        </div> 
                                    )}
                                      {isFriend && (
                                        <div className='d-flex flex-column justify-content-center align-items-center'
                                          style={{height:"100%",width:"40%", backgroundColor:""}}>
                                              <DialogConfirm style={{width:'100%',border:'none', fontFamily:'Arsenal SC serif ',
                                                  height:'100%',color:'white', 
                                                  backgroundColor:"#de1051",fontSize:'12px',fontWeight:"600"}}
                                                  action={"Unfriend"} message ={`are you sure you want to remove ${user.name} from your friend list?`} 
                                                  handleAction={unfriendFriendRequest}/>    
                                        </div> 
                                    )}
                                    {isPending&&(
                                          <div className='d-flex flex-column justify-content-center align-items-center'
                                            style={{height:"100%",width:"40%"}}>
                                              <DialogConfirm style={{width:'100%',border:'none', fontFamily:'Arsenal SC serif ',
                                                  height:'100%',color:'white', 
                                                  backgroundColor:"#de1051",fontSize:'12px',fontWeight:"600"}}
                                                  action={"Pending"} message ={`are you sure you want to cancel friend request sent to ${user.name}?`} 
                                                  handleAction={cancelFriendRequest}/>    
                                          </div> 
                                    )}
                                    {!(isPending||isFriend||isAccept)&&(
                                        <div className='d-flex flex-column justify-content-center align-items-center'
                                          style={{height:"100%",width:"40%", backgroundColor:""}}>
                                          <DialogConfirm style={{width:'100%',border:'none', fontFamily:'Arsenal SC serif ',
                                              height:'100%',color:'white', 
                                              backgroundColor:"#de1051",fontSize:'10px',fontWeight:"600"}}
                                              action={"add friend"} message ={`are you sure you want to send a friend request to ${user.name} ?`} 
                                              handleAction={sendFriendRequest}/>
                                        </div> 
                                    )}
                                      </>
                                    )}

                                   
                     
                     {follow &&(follow.followings.find(following => following.following_id == _id) )? 
                     (
                      <DialogConfirm 
                        style={{width:'40%',border:'none', fontFamily:'Arsenal SC serif ',
                            height:'100%', color:'white',
                            backgroundColor:"green",fontSize:'12px',fontWeight:"600"}}
                            action={"Unfollow"} message ={`are you sure you want to unfollow ${user.name} ?`} 
                            handleAction={handleUnFollowing}/>
                        
                     ):    
                     (
                     <DialogConfirm 
                        style={{width:'40%',border:'none', fontFamily:'Arsenal SC serif ',
                            height:'100%', color:'white',
                            backgroundColor:"green",fontSize:'12px',fontWeight:"600"}}
                            action={"Follow"} message ={`are you sure you want to follow ${user.name} ?`} 
                            handleAction={handleFollowing}/>
                       
                     )
                    }
                    
                    
                   
               </div> 
              
               
        
         
        </div>
        
              {/* <h5 className='mt-0 mb-3' style={{fontSize:'12px',fontFamily:'',color:'gray'}}>Top Challenges</h5>

                {user && follow && props.user._id === _id && (<Challenges user = {user}/>)}     */}
        
         

     </div>
      
      
  )
}

export default UserProfile