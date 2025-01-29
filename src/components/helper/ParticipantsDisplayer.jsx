import { useContext, useEffect, useRef, useState } from 'react'
import './Helper.css'
import {  BASE_URL, getUserById,getFollowings, liked, loadLikeVoteData,
 quitChallenge, voted, addFollowing, unFollowings, friendRequest, 
 getUserFriendsData,
 getNotificationByUser,
 removeFriendRequest,
 unfriendRequest,
 acceptFriendRequest,
 getUserChallenges,
 deleteChallenge,
 getUserParticipateChallenges,
 getTopChallenges} from '../../apiCalls'
import PostFooter from './PostFooter';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Button, Select } from 'antd';
import { deleteObject, getDownloadURL, ref } from 'firebase/storage';
import { generateUserFolder, getMediaFireBase, storage } from '../../firebase';
import DialogConfirm from './DialogConfirm';
import { AuthContent } from '../../context/AuthContent';
import ReactPlayer from 'react-player';
import { InView, useInView } from 'react-intersection-observer';


const ParticipantsDisplayer = (props) => {

  const [followings,setFollowings] = useState ([])
  const [video_url ,setVideo_url] = useState(props.participants[0].video_url)
  const [selectedUser ,setSelectedUser] = useState (props.participants[0])
  const [selectedParticipant ,setSelectedParticipant] = useState (props.participants[0])
  const [ownChallenge , setOwnChallenge ] = useState(false)
  const [isVotedColor,setIsVotedColor] = useState("lightpink")
  const [isLikedColor,setIsLikedColor] = useState("lightblue")
  const [topChallenger ,setTopChallenger] = useState("")
  const [userProfileImg,setUserProfileImg] = useState(props.user.profile_img)

  const [addFriendRequest , setAddFriendRequest] = useState(null)
  const [participantFriendData,setParticipantFriendData] = useState(null)
  const [userFriendData,setUserFriendData] = useState(null)

  const[isFriend,setIsFriend]= useState(false)
  const[isPending,setIsPending]= useState(false)
  const[isAccept,setIsAccept]= useState(false)
  const[isDeleted,setIsDeleted]= useState(false)
  const[isQuit,setIsQuit]= useState(false)
  const [isExpired,setIsExpired] = useState(false)
  const [autoPlay,setAutoPlay] = useState(false)
  const {notifications,setNotifications,userChallenges,setUserChallenges,
        participateChallenges,setParticipateChallenges,setTopChallenges} = useContext(AuthContent)





  const ids =[ props.user._id,
      selectedParticipant._id,
      props.challenge._id
      ]

  const [likesVotesData,setLikesVotesData] = useState({})  

  const navigate = useNavigate()
    

  useEffect(() => { 
  loadLikeVoteData(ids,setLikesVotesData,likesVotesData, isExpired)    
   },[] )

  useEffect(() => { // get top challenger for the challenge
    let obj = {
      topChallenger : props.participants[0].name,
      votes : props.participants[0].votes
    } 
    props.participants.forEach(participant => {
      if(participant.votes > obj.votes) obj = {
          ...obj,
          topChallenger:participant.name,
          votes:participant.votes
        }
    });
 
    setTopChallenger({...obj})
  },[] )
  
     
  useEffect(() => { // get top challenger for the challenge
    let obj = {
      topChallenger : props.participants[0].name,
      votes : props.participants[0].votes
    }       
    props.participants.forEach(participant => {
      if(participant.votes > obj.votes) obj = {
          ...obj,
          topChallenger:participant.name,
          votes:participant.votes
        }
    });
    setTopChallenger({...obj})
  },[likesVotesData] )

    
  const handleLikes = async(e) => {
    //apiCall.js , when user click like button 
      liked(ids,setLikesVotesData,likesVotesData,setIsExpired)
  
    }
     
  const handleVotes = async(e)=> {
       //apiCall.js , when user vote like button
      voted(ids,setLikesVotesData,likesVotesData,setIsExpired)   
    }


  const handleQuit = (e) => {
          quitChallenge(props.challenge._id,props.user._id).
          then(res => {
            const you = props.challenge.participants.find(participant => participant.user_id == props.user._id)
             const fileRef = ref(storage,you.video_url); 
             deleteObject(fileRef)
              .then(() => {
               console.log("File deleted successfully!");
                navigate('/chpage/participatechallenges')
               })
              .catch((error) => {
              console.error("Error deleting file:", error);
               });  
               getTopChallenges(props.user._id,setTopChallenges)
               getUserParticipateChallenges(props.user._id,setParticipateChallenges)
               navigate('/home')
     
          })
        
  }

  useEffect(() => {
      if(isExpired) {
          setIsExpired(false)  
          navigate("/")
      }
  }, [isExpired])
  

  const handleDelete = (e) => {
    deleteChallenge(props.challenge._id,props.user._id).
    then(res => {
          const you = props.challenge.participants.find(participant => participant.user_id == props.user._id);
          const fileRef = ref(storage,you.video_url); 
          deleteObject(fileRef)
            .then(() => {
              console.log("File deleted successfully!");
              navigate('/chpage/challenges')
            })
            .catch((error) => {
              console.error("Error deleting file:", error);
            });  
            if(props.user._id == props.challenge.origin_id)getUserChallenges(props.user_id,setUserChallenges)  
              else getUserParticipateChallenges(props.user_id,setParticipateChallenges)
            navigate('/home')
    })
  
}

  useEffect(() => { //logic here is to disable the add challenge button if the user has already participated  
      props.participants.map(participant =>{
        if(participant.user_id === props.user._id) {
            setOwnChallenge( prev => !prev)
         } 
      })
      }, [])
  
  useEffect(() => {
    getUserFriendsData(props.user._id,setUserFriendData)
  }, [])
  

  useEffect(() => {
       setLikesVotesData({like_count:selectedParticipant.likes,vote_count:selectedParticipant.votes})
       loadLikeVoteData(ids,setLikesVotesData,likesVotesData,setIsExpired)   
       getUserFriendsData(props.user._id,setUserFriendData)
       getUserFriendsData(selectedParticipant.user_id,setParticipantFriendData)
      //  setAutoPlay(true)
    }, [selectedParticipant])
    

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
         if(userFriendData.friend_request_received.find(data => data.sender_id == selectedParticipant.user_id))
         {
          setIsAccept(true)
          setIsPending(false)
          setIsFriend(false)
        } 
        else {setIsAccept(false)
        
      }}}
          
          }
  , [participantFriendData,userFriendData])
  
    
const handleChange = async (value) =>{
      const newParticipant =  props.participants.find(participant => participant.user_id === value);
      setSelectedParticipant( { ...selectedParticipant,
                                   _id:newParticipant._id,
                                   name:newParticipant.name,
                                   profile_img:newParticipant.profile_img,
                                   user_id:newParticipant.user_id,
                                   video_url:newParticipant.video_url,
                                   likes:newParticipant.likes,
                                   votes:newParticipant.votes,
                                   email:newParticipant.email })
                                   setAutoPlay(true)
      } 
   
useEffect(() => {
    likesVotesData.isLiked ? 
         setIsLikedColor("blue")   
         : setIsLikedColor("lightblue")
    likesVotesData.isVoted ? 
         setIsVotedColor("red")   
         : setIsVotedColor("lightpink")    
  }, [likesVotesData])
  
  
  useEffect(() => {
    getFollowings(props.user._id ,setFollowings)
  }, [])
  
const handleFollowing =  ()=> {
    const rawBody = {
      following_id : selectedParticipant.user_id,
      following_email:selectedParticipant.email
   }
  addFollowing(props.user._id,rawBody, setFollowings)
  // setFollowings((prevItems) => [...prevItems,rawBody])
  }
  
const handleUnFollowing =  ()=> {
    const rawBody = {
      following_id : selectedParticipant.user_id,
      following_email:selectedParticipant.email
   }
   unFollowings(props.user._id,rawBody, setFollowings)
  }
  
  
const sendFriendRequest = () => {
     console.log(props.user)    
     const rawBody = props.user;
     friendRequest(selectedParticipant.user_id,rawBody,setAddFriendRequest)
  }   
  
const unfriendFriendRequest = () => {
    console.log(props.user)
    const rawBody = props.user;
    unfriendRequest(selectedParticipant.user_id,rawBody,setAddFriendRequest)
 }

const okFriendRequest = () => {
  const rawBody ={
    _id:selectedParticipant.user_id,
    name:selectedParticipant.name,
    email:selectedParticipant.email,
    profile_img:selectedParticipant.profile_img
  }
  acceptFriendRequest(props.user._id,rawBody,setAddFriendRequest)
}

const cancelFriendRequest = () => {
    removeFriendRequest(selectedParticipant.user_id,props.user,setAddFriendRequest)
 }
const handleReportUser = ()=>{

}
useEffect(() => {
  getUserFriendsData(props.user._id,setUserFriendData)
  getUserFriendsData(selectedParticipant.user_id,setParticipantFriendData)
  }, [addFriendRequest])
  
  useEffect(() => {
    if(props.user){
    getNotificationByUser(props.user._id , setNotifications)
    }
  }, [])
  
 const  handleEnd =()=>{
   const index = props.challenge.participants.findIndex(el=> el.user_id === selectedParticipant.user_id)
   const newParticipant =  props.participants[(index+1)%props.challenge.participants.length];
      setSelectedParticipant( { ...selectedParticipant,
                                   _id:newParticipant._id,
                                   name:newParticipant.name,
                                   profile_img:newParticipant.profile_img,
                                   user_id:newParticipant.user_id,
                                   video_url:newParticipant.video_url,
                                   likes:newParticipant.likes,
                                   votes:newParticipant.votes,
                                   email:newParticipant.email })
      setAutoPlay(true)
 }

 const handleStart =()=> {
  // setAutoPlay(true)
 }


 
 const videoRef = useRef(null);
 const { ref, inView } = useInView({
  threshold: 0.5 
    });

    useEffect(() => {
      if (inView && !autoPlay &&videoRef.current) {
        // videoRef.current.play();
        setAutoPlay(true);
      } else if (!inView && autoPlay) {
        // videoRef.current.pause();
        setAutoPlay(false);
      }
    }, [inView, autoPlay]);


    // const [isFullscreen, setIsFullscreen] = useState(false);

    // const handlePlay = () => {
    //   console.log("hello")
    //   if (!isFullscreen) {
    //     videoRef.current.wrapper.requestFullscreen();
    //     setIsFullscreen(true);
    //   }
    // };
  
    // const handleFullscreenChange = () => {
    //   setIsFullscreen(document.fullscreenElement !== null);
    // };
  
    



  return (
  

    <div className="d-flex flex-column  justify-content-start align-items-center  challenges sky-bg">
         
          <div className='d-flex justify-content-start   align-items-center '
          style={{minHeight:"5%",minWidth:"100%",backgroundColor:""}}>
            <div className='d-flex  justify-content-center gap-1 align-items-center'
               style={{height:"100%",minWidth:"25%",backgroundColor:""}}>
                <span style={{fontSize:'9px',fontWeight:"600",marginTop:'0px', fontFamily:'Arsenal SC serif'}}>By</span>
                <p style={{fontSize:'9px',fontWeight:"600",marginTop:'0px',color:'gold',fontFamily:'Arsenal SC serif'}}> {props.challenge.name}</p>
            </div>
            <div className='d-flex justify-content-center gap-1 align-items-center'
               style={{height:"100%",minWidth:"25%",backgroundColor:""}}>
                <span style={{fontSize:'10px',fontWeight:"600", fontFamily:'Arsenal SC serif'}}>Top  </span>
                <p style={{fontSize:'9px',fontWeight:"600",marginTop:'0px',color:'gold',fontFamily:'Arsenal SC serif'}}>{topChallenger.topChallenger}</p>
            </div>
            <div className='d-flex f justify-content-center gap-2 align-items-center'
               style={{height:"100%",minWidth:"25%",backgroundColor:""}}>
                {/* <span style={{fontSize:'10px',fontWeight:"600", fontFamily:'Arsenal SC serif'}}>Top Challenger </span> */}
                           <span style={{fontSize:'10px',fontWeight:"600",marginTop:'0px', fontFamily:'Arsenal SC serif'}}>{props.participants.length} </span>
                <p style={{fontSize:'9px',fontWeight:"600",marginTop:'0px',color:'gold',fontFamily:'Arsenal SC serif'}}>  Participants</p>
                {/* <p style={{fontSize:'9px',fontWeight:"600",marginTop:'0px',color:'gold',fontFamily:'Arsenal SC serif'}}>{topChallenger.topChallenger}</p> */}
            </div>
            <div className='d-flex flex-column justify-content-center gap align-items-center'
               style={{height:"100%",minWidth:"10%",backgroundColor:""}}>
                <span style={{fontSize:'10px',fontWeight:"600",marginTop:'0px',color:'gold',fontFamily:'Arsenal SC serif '}}> {props.challenge.privacy.toLowerCase()}</span>      
            </div>
            <div className='d-flex flex-column  justify-content-center  align-items-center'
               style={{height:"100%",minWidth:"15%",backgroundColor:""}}>
                 <span style={{fontSize:'10px',fontWeight:"600",color:'white',fontFamily:'Arsenal SC serif'}}> {props.challenge.type.toLowerCase()}</span> 
            </div>
        </div>

         <div className='d-flex flex-column justify-content-center  align-items-center '
           style={{width:"100%",minHeight:"11%"}}>

              <div className='d-flex gap-3 justify-content-center align-items-center '
                 style={{width:"100%",height:"40%"}}> 
                  <Link to={`/viewchallenge/${props.challenge._id}`} className='d-flex mt-0 justify-content-center align-items-center'
                      style={{width:"15%",minHeight:"100%",padding:'10px' ,backgroundColor:""}}>
                      <span style={{fontSize:'12px', color:'lightblue', fontFamily:'Arsenal SC serif',fontWeight:'900'}} >
                        Challenge
                      </span>
                  </Link>
                  <div className='d-flex mt-0 justify-content-center align-items-center '
                    style={{width:"75%",minHeight:"100%",padding:'0px',backgroundColor:''}}>
                        <p style={{fontSize:'11px',color:"white",fontFamily:'Arsenal SC serif',
                          fontWeight:"900"
                        }}> {props.challenge.desc}</p>
                  </div>
              </div>

              <div className="d-flex  justify-content-start gap-2 align-items-center star " 
                    style={{height:'50%',width:'100%'}}>
                      <Link  to = {(props.user._id === selectedParticipant.user_id)?`/profile/${selectedParticipant.user_id}`:`/userprofile/${selectedParticipant.user_id}`}
                       className="d-flex flex-column justify-content-center align-items-center  " 
                          style={{height:'90%',width:'15%',backgroundColor:''}}>
                             <img  style={{height:'30px',width:'30px',borderRadius:'50px',objectFit:"cover"}} src={selectedParticipant.profile_img} alt="" />
                        
                      </Link>
                      <div className="d-flex flex-column justify-content-center align-items-center " 
                          style={{height:'100%',width:'40%',backgroundColor:''}}>
                            
                            
                             <div className='d-flex flex-column justify-content-center participantdisplayer star'
                             style={{height:'100%',width:'100%',backgroundColor:''}}> 
                                <Select
                                  style={{width:"100%",height:"70%",fontSize:' 25px' ,borderRadius:"0px",opacity:"70%",
                                    fontWeight:"800", color:'white',textAlign:"center"}}
                                    defaultValue="Select a Participant"
                                    onChange={handleChange} value={selectedParticipant.user_id}
                                      >   
                                      {props.participants.map((participant,index)=>{    
                                        return  (<Select.Option  key={index} style={{ color:'white',fontWeight:"700",
                                          backgroundColor:"",width:"100%",height:"30px",borderRadius:"0px"
                                        }}  value = {participant.user_id} autoFocus
                                        // className="d-flex flex-row align-items-start gap3"
                                        >
                                          <div  className="d-flex flex-row justify-content-center  align-items-center gap-2">
                                              <div className="chip">
                                                    {/* <img src={participant.profile_img} alt="" /> */}
                                                    <p style={{marginTop:'-10px',opacity:"80%", fontSize:"10px",color:'black',fontWeight:"700", fontFamily:'Arsenal SC serif'}} > 
                                                      {(props.user._id===participant.user_id)? participant.name + " - YOU": participant.name} </p> 
                                              </div>
                                          </div>
                                          
                                        
                                          
                                        </Select.Option>)
                                      }
                                    )}         
                                </Select>
                             </div>

                      
                      </div>

                      <div className='d-flex justify-content-center  align-items-center '
                                style={{height:'100%',width:'45%'}}>
                    
                              
                                  <div className='d-flex flex-column justify-content-end gap align-items-center'
                                        style={{height:"100%",width:"30%",backgroundColor:"transparent"}}>
                                    {(selectedParticipant.user_id === props.user._id)? 
                                    (
                                      <button style={{width:'100%',height:'60%', fontFamily:'Arsenal SC serif' ,opacity:"50%",backgroundColor:"transparent",
                                        fontSize:'11px',fontWeight:"800",border:'none'}}
                                      disabled >
                                        Follow
                                      </button>
                                    ):
                                    ( 
                                      <>
                                      {followings.find(following => following.following_id === selectedParticipant.user_id)?(
                                      <Button style={{width:'100%',height:'60%', fontFamily:'Arsenal SC serif', backgroundColor:"transparent",
                                          fontSize:'11px',border:'none',color:'#0f4ff2',fontWeight:"800",borderRadius:'0px'}}
                                          onClick={handleUnFollowing}>
                                          Unfollow
                                      </Button>
                                      ):(
                                        <button style={{width:'100%',height:'60%', fontFamily:'Arsenal SC serif', color:"#0f4ff2",
                                          fontSize:'11px',fontWeight:"800"}}
                                        onClick={handleFollowing}>
                                          Follow
                                        </button>
                                      )
                                      }
                                      </>
                                  
                                    )}      
                                    
                                  </div> 


                                  {(props.user._id === selectedParticipant.user_id)? 
                                  (
                                    <div className='d-flex flex-column justify-content-end align-items-center'
                                        style={{height:"100%",width:"40%", backgroundColor:""}}>
                                    <Button style={{width:'100%',border:'none', fontFamily:'Arsenal SC serif',height:'60%',color:'white',opacity:"50%",
                                    borderRadius:'0px', backgroundColor:"",fontSize:'10px',fontWeight:"800"}}
                                      disabled >
                                          Add Friend
                                    </Button>
                                  </div> 

                                  ):(
                                    <>
                                    {participantFriendData && (
                                      <>
                                      {isAccept && (
                                        <div className='d-flex flex-column justify-content-end align-items-center'
                                          style={{height:"100%",width:"30%", backgroundColor:""}}>
                                              <DialogConfirm style={{width:'100%',border:'none',borderRadius:'0px', fontFamily:'Arsenal SC serif ',
                                                  height:'60%',color:'#e32b62', 
                                                  backgroundColor:"",fontSize:'10px',fontWeight:"800"}}
                                                  action={"Accept"} message ={`are you sure you want to accept ${selectedParticipant.name}'s friend request?`} 
                                                  handleAction={okFriendRequest}/>    
                                        </div> 
                                    )}
                                      {isFriend && (
                                        <div className='d-flex flex-column justify-content-end align-items-center'
                                          style={{height:"100%",width:"34%", backgroundColor:""}}>
                                              <DialogConfirm style={{width:'100%',border:'none',borderRadius:'0px', fontFamily:'Arsenal SC serif',
                                                  height:'60%',color:'#e32b62', 
                                                  backgroundColor:"",fontSize:'11px',fontWeight:"800"}}
                                                  action={"Unfriend"} message ={`are you sure you want to remove ${selectedParticipant.name} from your friend list?`} 
                                                  handleAction={unfriendFriendRequest}/>    
                                        </div> 
                                    )}
                                    {isPending&&(
                                          <div className='d-flex flex-column justify-content-end align-items-center'
                                            style={{height:"100%",width:"34%", backgroundColor:""}}>
                                              <DialogConfirm style={{width:'100%',border:'none',borderRadius:'0px', fontFamily:'Arsenal SC serif ',
                                                  height:'60%',color:'#e32b62', 
                                                  backgroundColor:"",fontSize:'11px',fontWeight:"800"}}
                                                  action={"Pending"} message ={`are you sure you want to cancel friend request sent to ${selectedParticipant.name}?`} 
                                                  handleAction={cancelFriendRequest}/>    
                                          </div> 
                                    )}
                                    {!(isPending||isFriend||isAccept)&&(
                                        <div className='d-flex flex-column justify-content-end align-items-center'
                                          style={{height:"100%",width:"34%", backgroundColor:""}}>
                                          <DialogConfirm style={{width:'100%',border:'none',borderRadius:'0px', fontFamily:'Arsenal SC serif ',
                                              height:'60%',color:'#e32b62', 
                                              backgroundColor:"",fontSize:'10px',fontWeight:"800"}}
                                              action={"Add Friend"}
                                               message ={`are you sure you want to send a friend request to ${selectedParticipant.name} ?`} 
                                              handleAction={sendFriendRequest}/>
                                        </div> 
                                    )}
                                      </>
                                    )}

                                    </>
                                
                                  )
                                  }
                                  <div className='d-flex flex-column justify-content-end align-items-center'
                                        style={{height:"100%",width:"30%"}}>
                                        <DialogConfirm style={{width:'100%',border:'none',borderRadius:'0px', fontFamily:'Arsenal SC serif ',
                                                  height:'60%',color:'lightgray', 
                                                  backgroundColor:"",fontSize:'10px',fontWeight:"800"}}
                                                  action={"Report"} message ={`are you sure you want to cancel friend request sent to ${selectedParticipant.name}?`} 
                                                  handleAction={handleReportUser}/>    
                                  </div> 
                                  
                              </div> 

              </div>
                    

         </div>


      
        <div className=" d-flex flex-column  videopost">
            <div className='videodisplayer' ref={ref}
             style={{position:"relative"}}>
 
                <ReactPlayer
                    className='video'
                    style={{width:'100%',backgroundColor:'black',position:"relative"}}
                    width='100%'
                    height='100%'
                    ref={videoRef}
                    // autoPlay
                    // src={ BASE_URL + video_url}
                    url={selectedParticipant.video_url}
                    onReady={handleStart}
                    // muted={false}
                    // autoPlay
                    // playsInline
                    playing={autoPlay}
                    // light={true}
                    controls
                    onEnded={handleEnd}
                    // muted 
                    // playsInline
                    // onClick={handlePlay}
                    // onPause=
                    // onExitFullscreen={handleFullscreenChange}
                    // onFullScreen={handleFullscreenChange}
                    />
     
                 <p style={{position:"absolute",marginTop:"100%"}}>hello samir</p>
                
            </div>
            <PostFooter challenge={props.challenge} likesVotesData={likesVotesData} handleLikes={handleLikes}
              handleVotes={handleVotes}  isLikedColor={isLikedColor} isVotedColor={isVotedColor} user={props.user}
               />
        </div> 

        <div className='d-flex flex-row  justify-content-between align-items-center sky-bg ' 
            style={{height:'6%',width:'100%',backgroundColor:''}} >
              
                   {!ownChallenge? (    
                     <DialogConfirm handleAction={(e)=> navigate(`/matchchallenge/${props.challenge._id}`)} style={{width:'90px',color:"#269e32",textAlign:'center',
                      backgroundColor:'',height:'100%',fontSize:"12px",fontWeight:"800",border:'none', fontFamily:'Arsenal SC serif'
                    }}   action={"JOIN"} message ={'are you sure you want to join  the challenge'}  />
                  ):(
                    <>
                    {props.participants.length == 1 ? 
                      (
                        <DialogConfirm handleAction={handleDelete} style={{width:'90px',color:"#b81842",textAlign:'center',
                          backgroundColor:'',height:'100%',fontSize:"12px",fontWeight:"800",border:'none', fontFamily:'Arsenal SC serif'
                         }} action={"DELETE"} message ={'are you sure you want to delete  the challenge'} />
                      ):(
                        <DialogConfirm handleAction={handleQuit} style={{width:'90px',color:"#bd5167",textAlign:'center',
                          backgroundColor:'',height:'100%',fontSize:"12px",fontWeight:"800",border:'none', fontFamily:'Arsenal SC serif'
                         }} action={"RESIGN"} message ={'are you sure you want to resign from the challenge'} />
                      )} 
                    </>
                    )}
            
                 
                   <div className='d-flex  align-items-center gap-2 justify-content-start'
                      style={{widh:"180px" , height:"100%"}}>  
                     <button style={{backgroundColor:'',border:'none'
                      ,width:'90px',color:"white",height:'100%',fontSize:"13px",fontWeight:"800", fontFamily:'Arsenal SC serif'
                      }}>
                      Rate
                   </button>    
                    <p style={{fontSize:'11px',color:'white',marginTop:"0px"}}>4.5</p> 
                    <span style={{fontSize:'11px',color:'gold'}}> *****  </span>
                      {/* <p style={{fontSize:'11px',color:'white',marginTop:"-9px",marginLeft:"29px"}}> </p> */}
                   </div>
                   <button style={{backgroundColor:'',border:'none'
                      ,width:'90px',color:"#114fc2",height:'100%',fontSize:"13px",fontWeight:"800", fontFamily:'Arsenal SC'
                      }}>
                      FOLLOW
                   </button>
            
        </div>


        
    
    </div>
  )
}

export default ParticipantsDisplayer