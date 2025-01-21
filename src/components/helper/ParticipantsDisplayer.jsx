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
               getUserParticipateChallenges(props.user_id,setParticipateChallenges)
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
      // getUserById(value ,setUserProfile)
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
  
  return (

    <div className="d-flex flex-column mb-3 mt-0 justify-content-start align-items-center challenges">
         
          <div className='d-flex justify-content-start  align-items-center '
          style={{minHeight:"40px",minWidth:"100%",backgroundColor:"#0352fc"}}>
            <div className='d-flex flex-column justify-content-center  align-items-center'
               style={{height:"100%",minWidth:"25%",backgroundColor:""}}>
                <span style={{fontSize:'9px',fontWeight:"600",marginTop:'0px', fontFamily:'Arsenal SC'}}>By</span>
                <p style={{fontSize:'10px',fontWeight:"600",marginTop:'-3px',color:'gold',fontFamily:'Arsenal SC serif'}}>{props.challenge.name}</p>
            </div>
            <div className='d-flex flex-column justify-content-center gap align-items-center'
               style={{height:"100%",minWidth:"25%",backgroundColor:""}}>
                <span style={{fontSize:'10px',fontWeight:"600", fontFamily:'Arsenal SC'}}>Top </span>
                <p style={{fontSize:'10px',fontWeight:"600",marginTop:'-3px',color:'gold',fontFamily:'Arsenal SC serif'}}>{topChallenger.topChallenger}</p>
            </div>
            <div className='d-flex flex-column justify-content-center gap align-items-center'
               style={{height:"100%",minWidth:"25%",backgroundColor:""}}>
                <span style={{fontSize:'10px',fontWeight:"600",marginTop:'0px', fontFamily:'Arsenal SC'}}>{props.participants.length}</span>
                <p style={{fontSize:'10px',fontWeight:"600",marginTop:'-3px',color:'gold',fontFamily:'Arsenal SC serif'}}>Challengers</p>
            </div>
            <div className='d-flex flex-column  justify-content-center  align-items-center'
               style={{height:"100%",minWidth:"25%",backgroundColor:""}}>
                 <span style={{fontSize:'10px',fontWeight:"600",color:'white',fontFamily:'Arsenal SC'}}> {props.challenge.type}</span> 
                 <span style={{fontSize:'10px',fontWeight:"600",marginTop:'-3px',color:'gold',fontFamily:'Arsenal SC '}}> {props.challenge.privacy}</span>      
            </div>
        </div>

         <div className='d-flex flex-column justify-content-start align-items-center bg-light'
           style={{width:"100%",height:"120px"}}>

              <div className='d-flex mt-0 justify-content-start align-items-center bg-dark'
                 style={{width:"100%",height:"30px"}}> 
                  <div className='d-flex mt-0 justify-content-start align-items-center'
                      style={{width:"25%",height:"30px",padding:'10px' ,backgroundColor:"#3f7f8c"}}>
                      <span style={{fontSize:'13px', color:'lightblue', fontFamily:'Arsenal SC serif',fontWeight:'900'}} >
                        Challenge
                      </span>
                  </div>
                  <div className='d-flex mt-0 justify-content-start align-items-center'
                    style={{width:"75%",height:"30px",padding:'10px',backgroundColor:'lightgray'}}>
                        <p style={{fontSize:'12px',color:"black",fontFamily:'Arsenal SC serif'}}> {props.challenge.desc}</p>
                  </div>
              </div>
              <div className="d-flex  justify-content-start align-items-center  " 
                    style={{height:'90px',width:'100%'}}>
                      <div className="d-flex flex-column justify-content-center align-items-center  " 
                          style={{height:'90px',width:'25%',backgroundColor:'lightblue'}}>
                            <Link  style={{height:'80px',width:'93%'}}
                             to = {(props.user._id === selectedParticipant.user_id)?`/profile/${selectedParticipant.user_id}`:`/userprofile/${selectedParticipant.user_id}`} > 
                              <img  style={{height:'100%',width:'100%',borderRadius:'15px',objectFit:"cover"}} src={selectedParticipant.profile_img} alt="" />
                            </Link>
                      </div>
                      <div className="d-flex flex-column justify-content-start align-items-center " 
                          style={{height:'90px',width:'75%',backgroundColor:'white'}}>
                            
                            
                             <div className='d-flex mt-0 justify-content-center participantdisplayer'> 
                                <Select
                                  style={{width:"100%",height:"30px",fontSize:' 25px' ,borderRadius:"0px",fontWeight:"800", backgroundColor:'',textAlign:"center"}}
                                    defaultValue="Select a Participant"
                                    onChange={handleChange} value={selectedParticipant.user_id}
                                      >   
                                      {props.participants.map((participant,index)=>{    
                                        return  (<Select.Option key={index} style={{ color:'black',fontWeight:"500",
                                          backgroundColor:"lightgray",width:"100%",height:"35px"
                                        }}  value = {participant.user_id} autoFocus
                                        className="d-flex flex-row align-items-start gap3"
                                        >
                                          <div  className="d-flex flex-row justify-content-center  align-items-center gap-2">
                                              <div className="chip">
                                                    {/* <img src={participant.profile_img} alt="" /> */}
                                                    <p style={{marginTop:'-10px', fontFamily:'Arsenal SC serif'}} > {(props.user._id===participant.user_id)? participant.name + " - YOU": participant.name} </p> 
                                              </div>
                                          </div>
                                          
                                        
                                          
                                        </Select.Option>)
                                      }
                                    )}         
                                </Select>
                             </div>

                            
                             <div className='d-flex justify-content-start align-items-center '
                                style={{height:'30px',width:'100%'}}>
                                       <div className='d-flex justify-content-between align-items-center text-dark '
                                           style={{height:'30px',width:'50%',backgroundColor:"lightpink"}}>
                                              <div className='d-flex justify-content-center align-items-center text-dark '
                                                style={{height:'30px',minWidth:'50%'}}>
                                                     <p style={{ fontFamily:'Arsenal SC serif',
                                                      fontSize:'13px',border:'none',fontWeight:"600",borderRadius:'0px'}}
                                                      >{selectedParticipant.votes}</p> 
                                               </div>
                                               <div className='d-flex justify-content-center gap-1 align-items-center  '
                                                 style={{height:'30px',minWidth:'50%'}}>
                                                      <p style={{ fontFamily:'Arsenal SC serif',
                                                      fontSize:'10px',border:'none',fontWeight:"600",borderRadius:'0px'}}>VOTES</p> 
                                                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor"color='red' className="bi bi-heart-fill" viewBox="0 0 16 16">
                                                        <path fillRule="evenodd"  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                                                      </svg>
                                               </div>
                                                    
                                        </div>
                                        <div className='d-flex justify-content-between align-items-center text-dark '
                                           style={{height:'30px',width:'50%',backgroundColor:"lightblue"}}>
                                              <div className='d-flex justify-content-center align-items-center text-dark '
                                                style={{height:'30px',minWidth:'50%'}}>
                                                     <p style={{ fontFamily:'Arsenal SC serif',
                                                      fontSize:'13px',border:'none',fontWeight:"600",borderRadius:'0px'}}
                                                      >{selectedParticipant.likes}</p> 
                                               </div>
                                               <div className='d-flex justify-content-center gap-1 align-items-center  '
                                                 style={{height:'30px',minWidth:'50%'}}>
                                                      <p style={{ fontFamily:'Arsenal SC serif',
                                                      fontSize:'10px',border:'none',fontWeight:"600",borderRadius:'0px'}}>LIKES</p> 
                                                       <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="blue" className="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">
                                                        <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
                                                      </svg>
                                               </div>
                                                    
                                        </div>
                             </div>

                             <div className='d-flex justify-content-start align-items-center '
                                style={{height:'30px',width:'100%'}}>
                    
                              
                                  <div className='d-flex flex-column justify-content-center gap align-items-center'
                                        style={{height:"100%",width:"33%",backgroundColor:"white"}}>
                                    {(selectedParticipant.user_id === props.user._id)? 
                                    (
                                      <button style={{width:'100%',height:'100%', fontFamily:'Arsenal SC serif' ,backgroundColor:"gray",fontSize:'12px',fontWeight:"600",border:'none'}}
                                      disabled >
                                        Follow
                                      </button>
                                    ):
                                    ( 
                                      <>
                                      {followings.find(following => following.following_id === selectedParticipant.user_id)?(
                                      <Button style={{width:'100%',height:'100%', fontFamily:'Arsenal SC serif', backgroundColor:"#194ebf",
                                          fontSize:'9px',border:'none',color:'white',fontWeight:"600",borderRadius:'0px'}}
                                          onClick={handleUnFollowing}>
                                          UNFOLLOW
                                      </Button>
                                      ):(
                                        <button style={{width:'100%',height:'100%', fontFamily:'Arsenal SC serif', backgroundColor:"#194ebf",fontSize:'12px',fontWeight:"600"}}
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
                                    <div className='d-flex flex-column justify-content-center align-items-center'
                                        style={{height:"100%",width:"34%", backgroundColor:"white"}}>
                                    <Button style={{width:'100%',border:'none', fontFamily:'Arsenal SC serif',height:'100%',color:'black',
                                    borderRadius:'0px', backgroundColor:"lightgray",fontSize:'12px',fontWeight:"600"}}
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
                                          style={{height:"100%",width:"34%", backgroundColor:"white"}}>
                                              <DialogConfirm style={{width:'100%',border:'none',borderRadius:'0px', fontFamily:'Arsenal SC serif ',
                                                  height:'100%',color:'white', 
                                                  backgroundColor:"#de1051",fontSize:'10px',fontWeight:"600"}}
                                                  action={"Accept"} message ={`are you sure you want to accept ${selectedParticipant.name}'s friend request?`} 
                                                  handleAction={okFriendRequest}/>    
                                        </div> 
                                    )}
                                      {isFriend && (
                                        <div className='d-flex flex-column justify-content-center align-items-center'
                                          style={{height:"100%",width:"34%", backgroundColor:"white"}}>
                                              <DialogConfirm style={{width:'100%',border:'none',borderRadius:'0px', fontFamily:'Arsenal SC serif ',
                                                  height:'100%',color:'white', 
                                                  backgroundColor:"#de1051",fontSize:'10px',fontWeight:"600"}}
                                                  action={"Unfriend"} message ={`are you sure you want to remove ${selectedParticipant.name} from your friend list?`} 
                                                  handleAction={unfriendFriendRequest}/>    
                                        </div> 
                                    )}
                                    {isPending&&(
                                          <div className='d-flex flex-column justify-content-center align-items-center'
                                            style={{height:"100%",width:"34%", backgroundColor:"white"}}>
                                              <DialogConfirm style={{width:'100%',border:'none',borderRadius:'0px', fontFamily:'Arsenal SC serif ',
                                                  height:'100%',color:'white', 
                                                  backgroundColor:"#de1051",fontSize:'10px',fontWeight:"600"}}
                                                  action={"Pending"} message ={`are you sure you want to cancel friend request sent to ${selectedParticipant.name}?`} 
                                                  handleAction={cancelFriendRequest}/>    
                                          </div> 
                                    )}
                                    {!(isPending||isFriend||isAccept)&&(
                                        <div className='d-flex flex-column justify-content-center align-items-center'
                                          style={{height:"100%",width:"34%", backgroundColor:"white"}}>
                                          <DialogConfirm style={{width:'100%',border:'none',borderRadius:'0px', fontFamily:'Arsenal SC serif ',
                                              height:'100%',color:'white', 
                                              backgroundColor:"#de1051",fontSize:'10px',fontWeight:"600"}}
                                              action={"add friend"} message ={`are you sure you want to send a friend request to ${selectedParticipant.name} ?`} 
                                              handleAction={sendFriendRequest}/>
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
                                                  backgroundColor:"black",fontSize:'10px',fontWeight:"600"}}
                                                  action={"Report"} message ={`are you sure you want to cancel friend request sent to ${selectedParticipant.name}?`} 
                                                  handleAction={handleReportUser}/>    
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
                    // autoPlay
                    // src={ BASE_URL + video_url}
                    src={selectedParticipant.video_url}
                    muted={false}
                    controls />
                
            </div>
            <PostFooter challenge={props.challenge} likesVotesData={likesVotesData} handleLikes={handleLikes}
              handleVotes={handleVotes}  isLikedColor={isLikedColor} isVotedColor={isVotedColor} user={props.user}
               />
        </div> 

        <div className='d-flex flex-row  justify-content-between align-items-center '  //#1f1e15
            style={{height:'42px',width:'100%',backgroundColor:'#0352fc'}} >
              
                   {!ownChallenge? (    
                     <DialogConfirm handleAction={(e)=> navigate(`/matchchallenge/${props.challenge._id}`)} style={{width:'90px',color:"lightgreen",textAlign:'center',
                      backgroundColor:'#c29311',height:'100%',fontSize:"12px",fontWeight:"800",border:'none', fontFamily:'Arsenal SC serif'
                    }}   action={"REPLAY"} message ={'are you sure you want to replay to the challenge'}  />
                  ):(
                    <>
                    {props.participants.length == 1 ? 
                      (
                        <DialogConfirm handleAction={handleDelete} style={{width:'90px',color:"white",textAlign:'center',
                          backgroundColor:'#b81842',height:'100%',fontSize:"12px",fontWeight:"800",border:'none', fontFamily:'Arsenal SC serif'
                         }} action={"DELETE"} message ={'are you sure you want to delete  the challenge'} />
                      ):(
                        <DialogConfirm handleAction={handleQuit} style={{width:'90px',color:"white",textAlign:'center',
                          backgroundColor:'#b81842',height:'100%',fontSize:"12px",fontWeight:"800",border:'none', fontFamily:'Arsenal SC serif'
                         }} action={"RESIGN"} message ={'are you sure you want to resign from the challenge'} />
                      )} 
                    </>
                    )}
            
                   <div className='d-flex flex align-items-center gap-3 justify-content-evenly'
                      style={{widh:"180px" , height:"100%",backgroundColor:""}}>
                      {/* <span style={{fontSize:'10px' ,marginTop:"5px"}}>{props.participants.length}</span>
                      <p style={{fontSize:'9px'}}>CHALLENGERS</p> */}
                      <button style={{color:props.isLikedColor}} onClick={props.handleLikes} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">
                          <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
                        </svg>
                      </button>
                      <span style={{fontSize:'12px',fontWeight:"700",color:'white',fontFamily:"Arsenal SC"}}>{props.challenge.like_count}  </span>
                   </div>
                   <div className='d-flex flex-column align-items-center justify-content-start'
                      style={{widh:"180px" , height:"100%"}}>      
                    <p style={{fontSize:'10px',color:'white',marginTop:"5px"}}>4.5</p> 
                    <span style={{fontSize:'14px',color:'gold'}}> *****  </span>
                      {/* <p style={{fontSize:'11px',color:'white',marginTop:"-9px",marginLeft:"29px"}}> </p> */}
                   </div>
                   <Button style={{backgroundColor:'#114fc2',border:'none'
                      ,width:'90px',color:"lightblue",height:'100%',fontSize:"11px",fontWeight:"800", fontFamily:'Arsenal SC serif'
                      }}>
                      FOLLOW
                   </Button>
            
        </div>


        
    
    </div>
  )
}

export default ParticipantsDisplayer