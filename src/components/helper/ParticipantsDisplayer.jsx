import { useEffect, useRef, useState } from 'react'
import './Helper.css'
import {  BASE_URL, getUserById, liked, loadLikeVoteData, voted } from '../../apiCalls'
import PostFooter from './PostFooter';
import { useNavigate } from 'react-router-dom';
import { Select } from 'antd';
import { getDownloadURL, ref } from 'firebase/storage';
import { generateUserFolder, storage } from '../../firebase';



const ParticipantsDisplayer = (props) => {


    const [selectedOption, setSelectedOption] = useState(null);
    const [options,setOption] = useState ()
    const [video_url ,setVideo_url] = useState(props.participants[0].video_url)
    const [selectedUser ,setSelectedUser] = useState (props.participants[0])
    const [selectedParticipant ,setSelectedParticipant] = useState (props.participants[0])
    const [ownChallenge , setOwnChallenge ] = useState(false)
    const [isVotedColor,setIsVotedColor] = useState("lightpink")
    const [isLikedColor,setIsLikedColor] = useState("lightblue")
    const [userProfile,setUserProfile] = useState(props.user)
    const [topChallenger ,setTopChallenger] = useState("")
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
    console.log(obj)
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
    console.log(obj)
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


    useEffect(() => { //logic here is to disable the add challenge button if the user has already participated  
      props.participants.map(participant =>{
        if(participant.user_id === props.user._id) {
            setOwnChallenge( prev => !prev)
         } 
      })

      const imageRef = ref(storage, generateUserFolder(selectedParticipant.email) + selectedParticipant.video_url);
      console.log(imageRef.fullPath)
      getDownloadURL(imageRef)
      .then((url) => {
         setVideo_url(url)
      })
      .catch((error) => {
       console.error(error);
      });
      
      }, [])

    useEffect(() => {
      const imageRef = ref(storage, selectedParticipant.video_url);
      console.log(imageRef.fullPath)
      getDownloadURL(imageRef)
      .then((url) => {
         setVideo_url(url)
      })
      .catch((error) => {
       console.error(error);
      });
      
      //  setVideo_url(selectedParticipant.video_url)
       setLikesVotesData({like_count:selectedParticipant.likes,vote_count:selectedParticipant.votes})
       //apiCall.js  , load the like and vote data when loading new participant 
       loadLikeVoteData(ids,setLikesVotesData)   
  
    }, [selectedParticipant])
    

    
    const handleChange = async (value) =>{
      getUserById(value ,setUserProfile)
      setSelectedParticipant(props.participants.find(participant => participant.user_id === value))
      } 
   

  useEffect(() => {
    likesVotesData.isLiked ? 
         setIsLikedColor("blue")   
         : setIsLikedColor("lightblue")
    likesVotesData.isVoted ? 
         setIsVotedColor("red")   
         : setIsVotedColor("lightpink")    
  }, [likesVotesData])
  


  return (

    <div className="d-flex flex-column mb-0 mt-5 justify-content-start align-items-center challenges">
    
         <div className='d-flex flex-row  justify-content-between align-items-center '
            style={{height:'50px',width:'100%',backgroundColor:'#1f1e15'}} >
              
                   {!ownChallenge? (    
                    <button style={{width:'110px',color:"lightgreen",textAlign:'center',
                      backgroundColor:'#c29311',height:'100%',fontSize:"16px",fontWeight:"800"
                    }}               
                      onClick={(e) => navigate(`/matchchallenge/${props.challenge._id}`)} >
                        CHALLENGE      
                    </button> 
                  ):(
        
                    <button style={{width:'90px',color:"white",textAlign:'center',
                      backgroundColor:'#b81842',height:'100%',fontSize:"16px",fontWeight:"800"
                    }}  >
                        QUIT  
                    </button>
                    )}
            
                   <div className='d-flex flex-column align-items-center justify-content-start'
                      style={{widh:"180px" , height:"100%"}}>
                      <span>{props.participants.length}</span>
                      <p style={{fontSize:'12px'}}>CHALLENGERS</p>
                   </div>
                   <div className='d-flex flex-column align-items-center justify-content-center'
                      style={{widh:"180px" , height:"100%"}}>      
                    <p style={{fontSize:'18px',color:'white'}}>4.5<span style={{fontSize:'18px',color:'gold'}}>   *****</span></p> 
                      <p style={{fontSize:'11px',color:'white',marginTop:"-9px",marginLeft:"29px"}}>rating</p>
                   </div>
                   <button style={{backgroundColor:'#114fc2'
                      ,width:'90px',color:"lightblue",height:'100%',fontSize:"16px",fontWeight:"800"
                      }}>
                      Follow
                   </button>
            
        </div>
       
        <div key={props.key} className='d-flex mt-0 justify-content-center participantdisplayer'> 
          <Select
            style={{width:"100%",height:"43px",fontSize:' 35px' ,border:"none",fontWeight:"800", backgroundColor:'red',textAlign:"center"}}
              defaultValue="Select a Participant"
            onChange={handleChange} 
                >   

                {props.participants.map((participant,index)=>{    
                  return  (<Select.Option key={index} style={{ color:'black',fontWeight:"500",
                    backgroundColor:"lightgray",width:"100%",height:"45px"
                  }}  value = {participant.user_id} 
                   className="d-flex flex-row align-items-start gap3"
                  >
                    <div  className="d-flex flex-row align-items-center gap-2">

                    <div class="chip">
                          <img src={BASE_URL + participant.profile_img } alt="" />
                          <p style={{marginTop:'-5px'}} > {(props.user._id===participant.user_id)? participant.name + " - YOU": participant.name} </p> 
                    </div>
                    
                     <div className='d-flex flex-ro text-center gap-2  align-items-center showvote'>
                          <p>{participant.votes}</p> 
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"color='red' className="bi bi-heart-fill" viewBox="0 0 16 16">
                           <path fill-rule="evenodd"  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                          </svg>
                         <p style={{marginRight:'6px'}}>votes</p>
                     </div>
                    </div>
                     
                   
                    
                  </Select.Option>)
                }
              )}         
          </Select>
        </div>
        <div className=" d-flex flex-column videopost">
            <div className='videodisplayer'>
                <video
                    className='video'
                    style={{width:'100%',backgroundColor:'black'}}
                    width="100%"
                    height="100%"
                    autoPlay
                    // src={ BASE_URL + video_url}
                    src={video_url}
                    audio
                    controls />
                
            </div>
            <PostFooter challenge={props.challenge} likesVotesData={likesVotesData} handleLikes={handleLikes}
              handleVotes={handleVotes}  isLikedColor={isLikedColor} isVotedColor={isVotedColor} user={props.user}
               />
        </div> 
        <div className='d-flex justify-content-start  align-items-center '
          style={{height:"60px",width:"100%"}}>
            <div className='d-flex flex-column justify-content-start gap align-items-center'
               style={{height:"100%",width:"30%",backgroundColor:"#eb4f34"}}>
                <span style={{fontSize:'10px',fontWeight:"600",marginTop:'10px'}}>CREATED BY</span>
                <p style={{fontSize:'11px',fontWeight:"600",color:'gold'}}>{props.participants[0].name}</p>
                <p style={{fontSize:'11px',fontWeight:"600",color:'white'}}>{props.challenge.createdAt.substring(0,10)}</p>

            </div>
            <div className='d-flex flex-column justify-content-start gap align-items-center'
               style={{height:"100%",width:"40%",backgroundColor:"#3d34eb"}}>
                <span style={{fontSize:'10px',fontWeight:"600",marginTop:'10px'}}>TOP CHALLENGER</span>
                <p style={{fontSize:'11px',fontWeight:"600",color:'gold'}}>{topChallenger.topChallenger}</p>
                <p style={{fontSize:'11px',fontWeight:"600",color:'pink'}}>{topChallenger.votes} <span>  VOTES</span>  </p>
            </div>
            <div className='d-flex flex-column justify-content-start gap align-items-start'
               style={{height:"100%",width:"30%",backgroundColor:"#3d34eb"}}>
                 <p style={{fontSize:'11px',fontWeight:"600",color:'gold',marginTop:'10px'}}>TYPE : 
                 <span style={{fontSize:'10px',fontWeight:"300",marginTop:'10px',color:'white'}}> {props.challenge.type}</span>
                 </p>
                 <p style={{fontSize:'11px',fontWeight:"600",color:'gold'}}>CATEG : 
                 <span style={{fontSize:'10px',fontWeight:"300",marginTop:'10px',color:'white'}}> {props.challenge.category}</span>
                 </p>
                 <p style={{fontSize:'11px',fontWeight:"600",color:'gold'}}>PRIVACY : 
                 <span style={{fontSize:'10px',fontWeight:"300",marginTop:'10px',color:'white'}}> {props.challenge.privacy}</span>
                 </p>
             
            </div>
        </div>
    
    </div>
  )
}

export default ParticipantsDisplayer