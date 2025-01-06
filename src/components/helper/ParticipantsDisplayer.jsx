import { useContext, useEffect, useRef, useState } from 'react'
import './Helper.css'
import {  BASE_URL, getUserById,getFollowings, liked, loadLikeVoteData,
 quitChallenge, voted, addFollowing, unFollowings, friendRequest, 
 getUserFriendsData,
 getNotificationByUser} from '../../apiCalls'
import PostFooter from './PostFooter';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Button, Select } from 'antd';
import { getDownloadURL, ref } from 'firebase/storage';
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
  const[isFriend,setIsFriend]= useState(false)
  const[isPending,setIsPending]= useState(false)
  const {notifications,setNotifications} = useContext(AuthContent)





  const ids =[ props.user._id,
      selectedParticipant._id,
      props.challenge._id
      ]

    const [likesVotesData,setLikesVotesData] = useState({})  

    const navigate = useNavigate()
    

  useEffect(() => { 
  //apiCall.js  , load the like and vote data when nloading 
  loadLikeVoteData(ids,setLikesVotesData)    
 
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
      liked(ids,setLikesVotesData,likesVotesData)
  
    }
     
  const handleVotes = async(e)=> {
       //apiCall.js , when user vote like button
      voted(ids,setLikesVotesData,likesVotesData)   
    }


  const handleQuit = (e) => {
      quitChallenge(props.challenge._id,props.user._id)
      .then(data => { 
        res =>  setTimeout(() => {
          navigate('chpage/challenges')
       }, 5000)  
     
    })
  }

  useEffect(() => { //logic here is to disable the add challenge button if the user has already participated  
      props.participants.map(participant =>{
        if(participant.user_id === props.user._id) {
            setOwnChallenge( prev => !prev)
         } 
      })

  const videoRef = ref(storage, generateUserFolder(selectedParticipant.email) + selectedParticipant.video_url);
      getDownloadURL(videoRef)
      .then((url) => {
         setVideo_url(url)
      })
      .catch((error) => {
       console.error(error);
      });
      
      }, [])

  useEffect(() => {
        const imageRef = ref(storage, selectedParticipant.video_url); 
        getDownloadURL(imageRef)
        .then((url) => {
          setVideo_url(url)
        })
        .catch((error) => {
        console.error(error);
        });

       getMediaFireBase(selectedParticipant.profile_img,setUserProfileImg)
       setLikesVotesData({like_count:selectedParticipant.likes,vote_count:selectedParticipant.votes})
       loadLikeVoteData(ids,setLikesVotesData)   
       getUserFriendsData(selectedParticipant.user_id,setParticipantFriendData)
    }, [selectedParticipant])
    

  useEffect(() => {
    console.log(participantFriendData)
    if(participantFriendData){
    if(participantFriendData.friend_request_received)
    participantFriendData.friend_request_received.find(data => data.sender_id == props.user._id)
    ? setIsPending(true) : setIsPending(false)
    if(participantFriendData.friends)
    participantFriendData.friends.find(data => data.friend_id === props.user._id)
    ? setIsFriend(true) : setIsFriend(false)
    }
  }, [participantFriendData])
  
    
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
  //  setFollowings((prevItems) => [...prevItems,rawBody])
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

  // useEffect(() => {
    
  // }, [])
  
  useEffect(() => {
    if(props.user){
    getNotificationByUser(props.user._id ,notifications, setNotifications)
    console.log(notifications)  
    }
  }, [])

  return (

    <div className="d-flex flex-column mb-3 mt-0 justify-content-start align-items-center challenges">
         
         <div className='d-flex mt-0 justify-content-start align-items-center'
           style={{width:"100%",height:"50px"}}>
            <div className='d-flex mt-0 justify-content-start align-items-center'
              style={{width:"20%",height:"50px",padding:'10px' ,backgroundColor:"#3f7f8c"}}>
                <span style={{fontSize:'13px', color:'lightblue', fontFamily:'Arsenal SC serif',fontWeight:'900'}} >
                  Challenge
                </span>
            </div>
            <div className='d-flex mt-0 justify-content-start align-items-center'
              style={{width:"80%",height:"50px",padding:'10px'}}>
                   <p style={{fontSize:'12px',fontFamily:'Arsenal SC serif'}}> {props.challenge.desc}</p>
            </div>
            
         </div>
         <div className='d-flex mt-0 justify-content-center participantdisplayer'> 
          <Select
            style={{width:"100%",height:"43px",fontSize:' 25px' ,border:"none",fontWeight:"800", backgroundColor:'',textAlign:"center"}}
              defaultValue="Select a Participant"
            onChange={handleChange} value={selectedParticipant.user_id}
                >   

                {props.participants.map((participant,index)=>{    
                  return  (<Select.Option key={index} style={{ color:'black',fontWeight:"500",
                    backgroundColor:"lightgray",width:"100%",height:"45px"
                  }}  value = {participant.user_id} autoFocus
                   className="d-flex flex-row align-items-start gap3"
                  >
                    <div  className="d-flex flex-row align-items-center gap-2">

                    <div className="chip">
                          <img src={participant.profile_img} alt="" />
                          <p style={{marginTop:'-5px', fontFamily:'Arsenal SC serif'}} > {(props.user._id===participant.user_id)? participant.name + " - YOU": participant.name} </p> 
                    </div>
                    
                     <div className = 'd-flex flex-ro text-center gap-2  align-items-center showvote'>
                          <p>{participant.votes}</p> 
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"color='red' className="bi bi-heart-fill" viewBox="0 0 16 16">
                           <path fillRule="evenodd"  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                          </svg>
                         <p style={{marginRight:'6px'}}>votes</p>
                     </div>
                    </div>
                     
                   
                    
                  </Select.Option>)
                }
              )}         
          </Select>
        </div>



         <div className='d-flex justify-content-start align-items-center  '
           style={{height:'40px',width:'100%'}}>
             <div className="d-flex justify-content-start align-items-center border " 
               style={{height:'50px',width:'20%'}}>
                <Link  style={{height:'40px',width:'100%'}} to = {`/profile/${selectedParticipant.user_id}`} > 
                  <img  style={{height:'40px',width:'100%',objectFit:"fill"}} src={selectedParticipant.profile_img} alt="" />
                </Link>
            </div>
        
            <div className='d-flex flex-column justify-content-center gap align-items-center'
                   style={{height:"100%",width:"25%",backgroundColor:"white"}}>
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
                  <button style={{width:'100%',height:'100%', fontFamily:'Arsenal SC serif', backgroundColor:"#194ebf",fontSize:'12px',border:'none',fontWeight:"600"}}
                  onClick={handleUnFollowing}>
                     Unfollow
                  </button>
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
                   style={{height:"100%",width:"30%", backgroundColor:"white"}}>
               <button style={{width:'100%',border:'none', fontFamily:'Arsenal SC serif',height:'100%',color:'black', backgroundColor:"lightgray",fontSize:'12px',fontWeight:"600"}}
                 disabled onClick={sendFriendRequest}>
                     Add Friend
               </button>
            </div> 

            ):(
              <>
              {participantFriendData && (
                <>
                {isFriend && (
                   <div className='d-flex flex-column justify-content-center align-items-center'
                     style={{height:"100%",width:"30%", backgroundColor:"white"}}>
                      <button style={{width:'100%',border:'none', fontFamily:'Arsenal SC serif',height:'100%',color:'white', backgroundColor:"#de1051",fontSize:'12px',fontWeight:"600"}}
                       onClick={sendFriendRequest}>
                       Unfriend
                     </button>
                  </div> 
               )}
               {isPending&&(
                     <div className='d-flex flex-column justify-content-center align-items-center'
                       style={{height:"100%",width:"30%", backgroundColor:"white"}}>
                        <button style={{width:'100%',border:'none', fontFamily:'Arsenal SC serif',height:'100%',color:'white', backgroundColor:"#de1051",fontSize:'12px',fontWeight:"600"}}
                         onClick={sendFriendRequest}>
                          pending
                        </button>
                      </div> 
               )}
               {!(isPending||isFriend)&&(
                    <div className='d-flex flex-column justify-content-center align-items-center'
                    style={{height:"100%",width:"30%", backgroundColor:"white"}}>
                     <button style={{width:'100%',border:'none', fontFamily:'Arsenal SC serif',height:'100%',color:'white', backgroundColor:"#de1051",fontSize:'12px',fontWeight:"600"}}
                        onClick={sendFriendRequest}>
                          Add Friend
                      </button>
                  </div> 
               )}
                </>
              )}

              </>
           
            )
            }
            


            <div className='d-flex flex-column justify-content-center align-items-center'
                   style={{height:"100%",width:"25%"}}>
               <button style={{width:'100%',border:'none', fontFamily:'Arsenal SC serif',height:'100%',color:'white',fontSize:'12px',fontWeight:"800"}}>
                     Report
               </button>
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
                    src={video_url}
                    muted={false}
                    controls />
                
            </div>
            <PostFooter challenge={props.challenge} likesVotesData={likesVotesData} handleLikes={handleLikes}
              handleVotes={handleVotes}  isLikedColor={isLikedColor} isVotedColor={isVotedColor} user={props.user}
               />
        </div> 

      
        <div className='d-flex flex-row  justify-content-between align-items-center '
            style={{height:'40px',width:'100%',backgroundColor:'#1f1e15'}} >
              
                   {!ownChallenge? (    
                     <DialogConfirm handleAction={(e)=> navigate(`/matchchallenge/${props.challenge._id}`)} style={{width:'90px',color:"lightgreen",textAlign:'center',
                      backgroundColor:'#c29311',height:'100%',fontSize:"14px",fontWeight:"800",border:'none', fontFamily:'Arsenal SC serif'
                    }}   action={"REPLAY"} message ={'are you sure you want to replay to the challenge'}  />
                  ):(
                    <>
                    {props.participants.length == 1 ? 
                      (
                        <DialogConfirm handleAction={handleQuit} style={{width:'90px',color:"white",textAlign:'center',
                          backgroundColor:'#b81842',height:'100%',fontSize:"12px",fontWeight:"800",border:'none', fontFamily:'Arsenal SC serif'
                         }} action={"DELETE"} message ={'are you sure you want to delete  the challenge'} />
                      ):(
                        <DialogConfirm handleAction={handleQuit} style={{width:'90px',color:"white",textAlign:'center',
                          backgroundColor:'#b81842',height:'100%',fontSize:"12px",fontWeight:"800",border:'none', fontFamily:'Arsenal SC serif'
                         }} action={"RESIGN"} message ={'are you sure you want to resign from the challenge'} />
                      )} 
                    </>
                    )}
            
                   <div className='d-flex flex-column align-items-center justify-content-start'
                      style={{widh:"180px" , height:"100%"}}>
                      <span style={{fontSize:'10px' ,marginTop:"5px"}}>{props.participants.length}</span>
                      <p style={{fontSize:'9px'}}>CHALLENGERS</p>
                   </div>
                   <div className='d-flex flex-column align-items-center justify-content-center'
                      style={{widh:"180px" , height:"100%"}}>      
                    <p style={{fontSize:'12px',color:'white'}}>4.5<span style={{fontSize:'14px',color:'gold'}}>   *****</span></p> 
                      <p style={{fontSize:'11px',color:'white',marginTop:"-9px",marginLeft:"29px"}}>Rating</p>
                   </div>
                   <Button style={{backgroundColor:'#114fc2',border:'none'
                      ,width:'90px',color:"lightblue",height:'100%',fontSize:"12px",fontWeight:"800", fontFamily:'Arsenal SC serif'
                      }}>
                      FOLLOW
                   </Button>
            
        </div>


        <div className='d-flex justify-content-start  align-items-center '
          style={{height:"45px",width:"100%"}}>
            <div className='d-flex flex-column justify-content-start  align-items-center'
               style={{height:"100%",width:"30%",backgroundColor:"#eb4f34"}}>
                <span style={{fontSize:'10px',fontWeight:"600",marginTop:'5px', fontFamily:'Arsenal SC serif'}}>Created by</span>
                <p style={{fontSize:'11px',fontWeight:"600",color:'gold'}}>{props.challenge.name}</p>
                {/* <p style={{fontSize:'11px',fontWeight:"600",color:'white'}}>{props.challenge.createdAt.substring(0,10)}</p> */}

            </div>
            <div className='d-flex flex-column justify-content-start gap align-items-center'
               style={{height:"100%",width:"40%",backgroundColor:"#3d34eb"}}>
                <span style={{fontSize:'10px',fontWeight:"600",marginTop:'5px', fontFamily:'Arsenal SC serif'}}>Top Challenger</span>
                <p style={{fontSize:'11px',fontWeight:"600",color:'gold'}}>{topChallenger.topChallenger}</p>
                {/* <p style={{fontSize:'11px',fontWeight:"600",color:'pink'}}>{topChallenger.votes} <span>  VOTES</span>  </p> */}
            </div>
            <div className='d-flex flex-column  justify-content-center  align-items-center'
               style={{height:"100%",width:"30%",backgroundColor:"#de3c10"}}>
                 <p style={{fontSize:'10px',fontWeight:"600",color:'gold',marginTop:'0px', fontFamily:'Arsenal SC serif'}}>Type : 
                 <span style={{fontSize:'10px',fontWeight:"300",color:'white'}}> {props.challenge.type}</span>
                 </p>
                 {/* <p style={{fontSize:'11px',fontWeight:"600",color:'gold'}}>CATEG : 
                 <span style={{fontSize:'10px',fontWeight:"300",marginTop:'10px',color:'white'}}> {props.challenge.category}</span>
                 </p> */}
                 <p style={{fontSize:'10px',fontWeight:"600",color:'gold',marginTop:'0px', fontFamily:'Arsenal SC serif'}}>Privacy: 
                 <span style={{fontSize:'10px',fontWeight:"300",color:'white'}}> {props.challenge.privacy}</span>
                </p>
             
            </div>
        </div>
    
    </div>
  )
}

export default ParticipantsDisplayer