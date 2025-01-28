import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { addFollowing, getFollowings, getNotificationByUser, getUserFriendsData, liked, loadLikeVoteData, unFollowings, voted } from '../apiCalls'
import DialogConfirm from './helper/DialogConfirm'
import { AuthContent } from '../context/AuthContent'
import PostFooter from './helper/PostFooter'
import { Button } from 'antd'

const Participant = (props) => {

    const [followings,setFollowings] = useState([])
    const [video_url ,setVideo_url] = useState(props.participant.video_url)
    const [selectedUser ,setSelectedUser] = useState (props.participant)
    const [selectedParticipant ,setSelectedParticipant] = useState (props.participant)
    const [ownChallenge , setOwnChallenge ] = useState(false)
    const [isVotedColor,setIsVotedColor] = useState("lightpink")
    const [isLikedColor,setIsLikedColor] = useState("lightblue")
    const [userProfileImg,setUserProfileImg] = useState(props.user.profile_img)
  
    const [addFriendRequest , setAddFriendRequest] = useState(null)
    const [participantFriendData,setParticipantFriendData] = useState(null)
    const [userFriendData,setUserFriendData] = useState(null)
    
    const[isFriend,setIsFriend]= useState(false)
    const[isPending,setIsPending]= useState(false)
    const[isAccept,setIsAccept]= useState(false)
    const[isExpired,setIsExpired]= useState(false)
    const[isQuit,setIsQuit]= useState(false)

    const {notifications,setNotifications,userChallenges,setUserChallenges,
        participateChallenges,setParticipateChallenges,setTopChallenges} = useContext(AuthContent)
    

    const ids =[ props.user._id,
        props.participant._id,
        props.challenge_id
        ]
  
      const [likesVotesData,setLikesVotesData] = useState(null)  
  
      const navigate = useNavigate()
    
      const videoRef = useRef(null);
      const [isPlaying, setIsPlaying] = useState(false);
    
    useEffect(() => {
        // const observer = new IntersectionObserver(
        //   ([entry]) => {
        //     if (entry.isIntersecting) {
        //       setIsPlaying(true);
        //     } else {
        //       setIsPlaying(false);
        //     }
        //   },
        //   { threshold: 0.3 } 
        // );
    
        // if (videoRef.current) {
        //   observer.observe(videoRef.current);
        // }
    
        // return () => {   
        //   if (videoRef.current) {
        //     observer.unobserve(videoRef.current);
        //   }
        // };    
        console.log(ids)
      }, []);  

      
     
    useEffect(() => { 
      console.log("i am here   cdcdc   dcdcdc d cdcdc")
        loadLikeVoteData(ids,setLikesVotesData,likesVotesData,setIsExpired)    
     },[] )  

    useEffect(() => { 
      console.log(likesVotesData)
       props.setReRender(!props.reRender)  
    },[likesVotesData] )  
  
    const handleLikes = async(e) => {
        liked(ids,setLikesVotesData,likesVotesData,setIsExpired)  
        }
         
    const handleVotes = async(e)=> {
          voted(ids,setLikesVotesData,likesVotesData,setIsExpired)   
        }
        
    useEffect(() => {
            getUserFriendsData(props.user._id,setUserFriendData)
        }, [])
       
    useEffect(() => {
          if(isExpired) {
            navigate('/expired')
            setTimeout(() => {
              navigate(`/viewchallenge/${props.challenge_id}`)
            }, 2000);  
          }
      }, [isExpired])   

    useEffect(() => {
     
        if(participantFriendData){ 
              if(participantFriendData.friend_request_received)
              participantFriendData.friend_request_received.find(data => data.sender_id == props.user._id)
              ? setIsPending(true) : setIsPending(false)
              if(participantFriendData.friends)
                participantFriendData.friends.find(data => data.sender_id === props.user._id)
                ? setIsFriend(true) : setIsFriend(false)
              }
        
        if( userFriendData){
              if(userFriendData.friend_request_received) {
                 if(userFriendData.friend_request_received.find(data => data.sender_id == props.participant.user_id))
                 {
                  setIsAccept(true)
                  setIsPending(false)
                  setIsFriend(false)
                } 
                else {setIsAccept(false)
                
              }}}
                  
                  }
    , [participantFriendData,userFriendData])    

    useEffect(() => {
      if(likesVotesData){
        likesVotesData.isLiked ? 
             setIsLikedColor("blue")   
             : setIsLikedColor("lightblue")
        likesVotesData.isVoted ? 
             setIsVotedColor("red")   
             : setIsVotedColor("lightpink") 
      }   
      }, [likesVotesData])
      
      
      useEffect(() => {
        getFollowings(props.user._id ,setFollowings)
      }, [])
      
    const handleFollowing =  ()=> {
        const rawBody = {
          following_id : props.participant.user_id,
          following_email:props.participant.email
       }
      addFollowing(props.user._id,rawBody, setFollowings)
      // setFollowings((prevItems) => [...prevItems,rawBody])
      }
      
    const handleUnFollowing =  ()=> {
        const rawBody = {
          following_id : props.participant.user_id,
          following_email:props.participant.email
       }
       unFollowings(props.user._id,rawBody, setFollowings)
      }


      

    useEffect(() => {
        getUserFriendsData(props.user._id,setUserFriendData)
        getUserFriendsData(props.participant.user_id,setParticipantFriendData)
        }, [addFriendRequest])
        
    useEffect(() => {
          if(props.user){
          getNotificationByUser(props.user._id , setNotifications)
          }
        }, [])  
      

return (<>
    {likesVotesData &&
         
    (
     <>
      <hr style={{width:"100%", border: '3px solid yellow',backgroundColor:"white"}} />
      <div className='d-flex flex-column justify-content-start align-items-center '
           style={{width:"100%",minHeight:"8%"}}>
              
              <div className="d-flex  justify-content-start align-items-center  " 
                    style={{height:'100%',width:'100%'}}>
                      <Link  to = {(props.user._id === props.participant.user_id)?`/profile/${props.participant.user_id}`:`/userprofile/${props.participant.user_id}`}
                         className="d-flex flex-column justify-content-center align-items-center  " 
                          style={{height:'100%',width:'15%',backgroundColor:''}}>
                               <img  style={{height:'40px',width:'40px',borderRadius:'50px',objectFit:"cover"}} src={props.participant.profile_img} alt="" />
                      </Link>
                      <div className="d-flex flex-column justify-content-start align-items-center " 
                          style={{height:'100%',width:'85%',backgroundColor:''}}>
                    
                             <div className='d-flex mt-0 justify-content-center participantdisplayer'
                              style={{height:'50%',width:'100%',backgroundColor:''}}> 
                             
                                          <div  className="d-flex flex-row justify-content-center  align-items-center "
                                           style={{height:'100%',width:'40%',backgroundColor:''}}>
                                                    <p style={{color:"#f2ebec",fontSize:"11px", fontFamily:'Arsenal SC serif',fontWeight:"700"}} > 
                                                        {(props.user._id === props.participant.user_id)? props.participant.name + " - YOU": props.participant.name} 
                                                    </p> 
                                          </div>
                                          <div  className="d-flex flex-row justify-content-start  align-items-center "
                                           style={{height:'100%',width:'60%',backgroundColor:''}}>

                                              <div className='d-flex justify-content-center gap-2 align-items-center text-light '
                                                style={{height:'100%',width:'50%'}}>
                                                     <p style={{ fontFamily:'Arsenal SC serif',
                                                      fontSize:'10px',border:'none',fontWeight:"600",borderRadius:'0px'}}
                                                      >{props.participant.votes}</p> 
                                                       <p style={{ fontFamily:'Arsenal SC serif',
                                                      fontSize:'10px',border:'none',fontWeight:"600",borderRadius:'0px'}}>Votes</p> 
                                                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor"color='red' className="bi bi-heart-fill" viewBox="0 0 16 16">
                                                        <path fillRule="evenodd"  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                                                      </svg>
                                              </div>
                                              <div className='d-flex justify-content-center gap-2 align-items-center text-light '
                                                style={{height:'100%',width:'50%'}}>
                                                      <p style={{ fontFamily:'Arsenal SC serif',
                                                      fontSize:'10px',border:'none',fontWeight:"600",borderRadius:'0px'}}
                                                      >{props.participant.likes}</p> 
                                                        <p style={{ fontFamily:'Arsenal SC serif',
                                                      fontSize:'10px',border:'none',fontWeight:"600",borderRadius:'0px'}}>Likes</p> 
                                                       <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="blue" className="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">
                                                        <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
                                                      </svg> 
                                              </div>       


                                          </div>
                                        
                             </div>
                            

                             <div className='d-flex justify-content-start align-items-center '
                                style={{height:'50%',width:'100%'}}>
                    
                              
                                  <div className='d-flex flex-column justify-content-center gap align-items-center'
                                        style={{height:"100%",width:"33%",backgroundColor:""}}>
                                    {(props.participant.user_id === props.user._id)? 
                                    (
                                      <button style={{width:'100%',height:'100%', fontFamily:'Arsenal SC serif' ,backgroundColor:"",fontSize:'12px',fontWeight:"600",border:'none'}}
                                      disabled >
                                        Follow
                                      </button>
                                    ):
                                    ( 
                                      <>
                                      {followings.find(following => following.following_id === props.participant.user_id)?(
                                      <button style={{width:'100%',height:'100%', fontFamily:'Arsenal SC serif', backgroundColor:"",
                                          fontSize:'12px',border:'none',color:'#194ebf',fontWeight:"600",borderRadius:'0px'}}
                                          onClick={handleUnFollowing}>
                                          Unfollow
                                      </button>
                                      ):(
                                        <button style={{width:'100%',height:'100%',color:"#194ebf", fontFamily:'Arsenal SC serif', backgroundColor:"",fontSize:'12px',fontWeight:"600"}}
                                        onClick={handleFollowing}>
                                          Follow
                                        </button>
                                      )
                                      }
                                      </>
                                  
                                    )}      
                                    
                                  </div> 


                                  {(props.user._id === props.participant.user_id)? 
                                  (
                                    <div className='d-flex flex-column justify-content-center align-items-center'
                                        style={{height:"100%",width:"34%", backgroundColor:""}}>
                                    <Button style={{width:'100%',border:'none', fontFamily:'Arsenal SC serif',height:'100%',color:'lightgray',
                                    borderRadius:'0px', backgroundColor:"",fontSize:'12px',fontWeight:"600"}}
                                      disabled >
                                          Add Friend
                                    </Button>
                                  </div> 

                                  ):(
                                    <>
                                    {participantFriendData && (
                                      <>
                                      {isAccept && (
                                        <div className='d-flex flex-column justify-content-center align-items-center'
                                          style={{height:"100%",width:"34%", backgroundColor:""}}>
                                              <DialogConfirm style={{width:'100%',border:'none',borderRadius:'0px', fontFamily:'Arsenal SC serif ',
                                                  height:'100%',color:'', 
                                                  backgroundColor:"#de1051",fontSize:'12px',fontWeight:"600"}}
                                                  action={"Accept"} message ={`are you sure you want to accept ${props.participant.name}'s friend request?`} 
                                                //   handleAction={okFriendRequest}
                                                  />    
                                        </div> 
                                    )}
                                      {isFriend && (
                                        <div className='d-flex flex-column justify-content-center align-items-center'
                                          style={{height:"100%",width:"34%", backgroundColor:""}}>
                                              <DialogConfirm style={{width:'100%',border:'none',borderRadius:'0px', fontFamily:'Arsenal SC serif ',
                                                  height:'100%',color:'#de1051', 
                                                  backgroundColor:"",fontSize:'12px',fontWeight:"600"}}
                                                  action={"Unfriend"} message ={`are you sure you want to remove ${props.participant.name} from your friend list?`} 
                                                //   handleAction={unfriendFriendRequest}
                                                />    
                                        </div> 
                                    )}
                                    {isPending&&(
                                          <div className='d-flex flex-column justify-content-center align-items-center'
                                            style={{height:"100%",width:"34%", backgroundColor:""}}>
                                              <DialogConfirm style={{width:'100%',border:'none',borderRadius:'0px', fontFamily:'Arsenal SC serif ',
                                                  height:'100%',color:'#de1051', 
                                                  backgroundColor:"",fontSize:'12px',fontWeight:"600"}}
                                                  action={"Pending"} message ={`are you sure you want to cancel friend request sent to ${props.participant.name}?`} 
                                                //   handleAction={cancelFriendRequest}
                                                />    
                                          </div> 
                                    )}
                                    {!(isPending||isFriend||isAccept)&&(
                                        <div className='d-flex flex-column justify-content-center align-items-center'
                                          style={{height:"100%",width:"34%", backgroundColor:""}}>
                                          <DialogConfirm style={{width:'100%',border:'none',borderRadius:'0px', fontFamily:'Arsenal SC serif ',
                                              height:'100%',color:'#de1051', 
                                              backgroundColor:"",fontSize:'12px',fontWeight:"600"}}
                                              action={"Add Friend"} message ={`are you sure you want to send a friend request to ${props.participant.name} ?`} 
                                            //   handleAction={sendFriendRequest}
                                            />
                                        </div> 
                                    )}
                                      </>
                                    )}

                                    </>
                                
                                  )
                                  }
                                  <div className='d-flex flex-column justify-content-center align-items-center'
                                        style={{height:"100%",width:"33%"}}>
                                        <DialogConfirm style={{width:'100%',border:'none',borderRadius:'0px', fontFamily:'Arsenal SC serif ',
                                                  height:'100%',color:'white', 
                                                  backgroundColor:"",fontSize:'12px',fontWeight:"600"}}
                                                  action={"Report"} message ={`are you sure you want to cancel friend request sent to ${props.participant.name}?`} 
                                                //   handleAction={handleReportUser}
                                                  />    
                                  </div> 
                                  
                              </div>

                             

                      </div>
               </div>
            </div>
        

            <div className=" d-flex flex-column videopost">
            <div className='videodisplayer'>
                <video
                    className='video'
                    style={{width:'100%',backgroundColor:'black'}}
                    width="100%"
                    height="100%"
                    ref={videoRef}
                    src={props.participant.video_url}
                    autoPlay={isPlaying}
                    muted={false}
                    controls />
                
            </div>
            <PostFooter challenge={props.challenge} likesVotesData={likesVotesData} handleLikes={handleLikes}
              handleVotes={handleVotes}  isLikedColor={isLikedColor} isVotedColor={isVotedColor} user={props.user}
               />
         </div> 
         <hr style={{width:"100%", border: '3px solid yellow',backgroundColor:"white"}} />
     </>
    )
    }
              
       </>
    
  
  )
}

export default Participant