import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { AuthContent } from '../../context/AuthContent';
import { BASE_URL, getChallengeById } from '../../apiCalls';
import Participant from '../../components/Participant';
import DialogConfirm from '../../components/helper/DialogConfirm';
import { Button } from 'antd';
import UploadVideo from '../../components/helper/UploadVideo';
import LiveWebcam from '../../components/helper/LiveWebcam';
import { generateUserFolder, storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import VideoUploader from '../../components/helper/VideoUploader';
import VideoRecorder from '../../components/helper/VideoRecorder';
import { v4 } from 'uuid';
import axios from 'axios';

const Replay = (props) => {
    const {user} = useContext(AuthContent)
    const  challenge_id  = useParams().id;
    const [topChallenger ,setTopChallenger] = useState("")
    const [ownChallenge , setOwnChallenge ] = useState(false)
    const [reRender,setReRender] = useState(false)
    const [challenge,setChallenge] = useState(null)
    const[isExpired,setIsExpired]= useState(false)
    const [swicthUploadLive ,setSwitchUploadLive] = useState(false)
    const [videoSrc , setVideoSrc] = useState("");
    const [file,setFile] = useState(null)
    const [description , setDescription] = useState("")
    const [canSubmit, setCanSubmit] = useState(false)
    
    const navigate = useNavigate("")
  
    
    useEffect(() => {
     challenge_id && getChallengeById(challenge_id,setChallenge,setIsExpired)
    }, []) 

    useEffect(() => {
      if(file) {
        setCanSubmit(true)
      } else setCanSubmit(false)
     }, [file])   

    useEffect(() => { //logic here is to disable the add challenge button if the user has already participated  
      if(isExpired) { 
        navigate('/expired')
        setTimeout(() => {
            navigate('/notifications')
        }, 2000);
      }        
     }, [isExpired]) 
     
    useEffect(() => { //logic here is to disable the add challenge button if the user has already participated  
       challenge && challenge.participants.map(participant =>{
        if(participant.user_id === user._id) {
            setOwnChallenge(true)
         } 
      })
            
      }, [challenge])   
    
    useEffect(() => { 
      if(challenge){
      let obj = {
        topChallenger : challenge.participants[0].name,
        votes : challenge.participants[0].votes
      } 
      challenge.participants.forEach(participant => {
        if(participant.votes > obj.votes) obj = {
            ...obj,
            topChallenger:participant.name,
            votes:participant.votes
          }
      });
    setTopChallenger({...obj})
      console.log(challenge)
    }
    },[challenge] )
    

  const handleUploading = async () => {
    
      
      if(file){
        const newFile = v4()+file.name 
        const CHALLENGE_VIDEO_URL = generateUserFolder(props.user.email)+ newFile;
        const videoRef = ref(storage,CHALLENGE_VIDEO_URL)
        uploadBytes(videoRef,file).then(()=> {
              const videoRef = ref(storage, CHALLENGE_VIDEO_URL);
              getDownloadURL(videoRef)
              .then((url) => {
                let newChallenge = {
                  origin_id : props.user._id ,
                  description: challenge.desc,
                  profile_img:props.user.profile_img,
                  user_id : props.user._id,
                  name:props.user.name,
                  video_url : url,
                  email:props.user.email,
                }
  
                if(!challenge_id){ // when user creates new challenge
                  newChallenge = {...challenge,
                    type:selectedType,
                    // category:selectedCategory,
                    privacy:selectedPrivacy,
                    // audience:selectedAudience,
                    challengers:selectedChallenger,
                    name:props.user.name
                  }
                  axios.post( BASE_URL + '/challenges/uploads', newChallenge).then( // when user challenge another user , we will insert his change to an existing challenge by challenge_id
                    res =>  
                      navigate('/chpage/challenges')
                  )
                }else{
                   axios.post(BASE_URL +`/challenges/uploads/${challenge_id}`,newChallenge)
                  .then(   res =>  {
                     navigate('/chpage/participatechallenges')
                     setTimeout(() => {
                      navigate(`/viewchallenge/${challenge_id}`)
                     }, 1000);
                    }
                  )
                }
  
               
  
      
              })
            })
  
          navigate('/home')
     
    }; 
  }
  
  const handleUpload = ({file}) => {
    setFile(file.originFileObj) 
    setSwitchUploadLive(false)
    let url = URL.createObjectURL(file.originFileObj);
    setVideoSrc(url);
  };

  return (
      <div className="d-flex flex-column  mt-0  bg-dark justify-content-start align-items-center star"
      style={{width:'100%',height:"100%",overflow:"scroll"}}>
          {challenge ? 
          (
          <>  
          <div className='d-flex justify-content-start  align-items-center '
            style={{minHeight:"3%",minWidth:"100%"}}>
              <div className='d-flex  justify-content-center gap-1 align-items-center'
               style={{height:"100%",minWidth:"25%",backgroundColor:""}}>
                <span style={{fontSize:'9px',fontWeight:"600",marginTop:'0px', fontFamily:'Arsenal SC serif'}}>By</span>
                <p style={{fontSize:'9px',fontWeight:"600",marginTop:'0px',color:'gold',fontFamily:'Arsenal SC serif'}}> {challenge.name}</p>
              </div>
              <div className='d-flex justify-content-center gap-1 align-items-center'
               style={{height:"100%",minWidth:"25%",backgroundColor:""}}>
                <span style={{fontSize:'10px',fontWeight:"600", fontFamily:'Arsenal SC serif'}}>Top  </span>
                <p style={{fontSize:'9px',fontWeight:"600",marginTop:'0px',color:'gold',fontFamily:'Arsenal SC serif'}}>{topChallenger.topChallenger}</p>
              </div>
              <div className='d-flex f justify-content-center gap-2 align-items-center'
                style={{height:"100%",minWidth:"25%",backgroundColor:""}}>
                {/* <span style={{fontSize:'10px',fontWeight:"600", fontFamily:'Arsenal SC serif'}}>Top Challenger </span> */}
                           <span style={{fontSize:'10px',fontWeight:"600",marginTop:'0px', fontFamily:'Arsenal SC serif'}}>{challenge.participants.length} </span>
                <p style={{fontSize:'9px',fontWeight:"600",marginTop:'0px',color:'gold',fontFamily:'Arsenal SC serif'}}>  Participants</p>
                {/* <p style={{fontSize:'9px',fontWeight:"600",marginTop:'0px',color:'gold',fontFamily:'Arsenal SC serif'}}>{topChallenger.topChallenger}</p> */}
              </div>
              <div className='d-flex flex-column justify-content-center gap align-items-center'
               style={{height:"100%",minWidth:"10%",backgroundColor:""}}>
                <span style={{fontSize:'10px',fontWeight:"600",marginTop:'0px',color:'gold',fontFamily:'Arsenal SC serif '}}> {challenge.privacy.toLowerCase()}</span>      
              </div>
              <div className='d-flex flex-column  justify-content-center  align-items-center'
               style={{height:"100%",minWidth:"15%",backgroundColor:""}}>
                 <span style={{fontSize:'10px',fontWeight:"600",color:'white',fontFamily:'Arsenal SC serif'}}> {challenge.type.toLowerCase()}</span> 
              </div>
          </div>
  
          <div className='d-flex mt-0 justify-content-start align-items-center '
                   style={{width:"100%",height:"4%"}}> 
                  <Link to={`/viewchallenge/${challenge._id}`} className='d-flex mt-0 justify-content-center align-items-center'
                      style={{width:"15%",minHeight:"100%",padding:'10px' ,backgroundColor:""}}>
                      <span style={{fontSize:'10px', color:'lightblue', fontFamily:'Arsenal SC serif',fontWeight:'900'}} >
                        Challenge
                      </span>
                  </Link>
                  <div className='d-flex mt-0 justify-content-center align-items-center '
                    style={{width:"75%",minHeight:"100%",padding:'0px',backgroundColor:''}}>
                        <p style={{fontSize:'10px',color:"white",fontFamily:'Arsenal SC serif',
                          fontWeight:"900" }}>
                         {challenge.desc}
                        </p>
                  </div>
          </div>


          <hr style={{width:"100%", border: '3px solid yellow',backgroundColor:"white"}} />

          {/* replay video here  */}

          <div className="d-flex  justify-content-start align-items-center  " 
                    style={{minHeight:'8%',width:'100%'}}>

                      <div className="d-flex flex-column justify-content-center align-items-center  " 
                          style={{height:'100%',width:'15%',backgroundColor:''}}>
                            <Link  style={{height:'100%',width:'100%'}}
                            className="d-flex flex-column justify-content-center align-items-center  " 
                             to = {`/userprofile/${props.user.user_id}`} > 
                              <img  style={{height:'40px',width:'40px',borderRadius:'50px',objectFit:"cover"}} src={props.user.profile_img} alt="" />
                            </Link>
                      </div>

                      <div className="d-flex flex-column justify-content-start align-items-center " 
                          style={{height:'100%',width:'70%',backgroundColor:''}}>
                    

                             <div className='d-flex mt-0 justify-content-center participantdisplayer'
                                 style={{height:'100%',width:'100%',backgroundColor:''}}> 
                                
                                          <div  className="d-flex flex-row justify-content-center gap-1   align-items-center "
                                            style={{height:'100%',width:'30%',backgroundColor:''}}>
                                                     <p style={{color:"white",fontSize:"10px", fontFamily:'Arsenal SC serif',fontWeight:"700"}} > 
                                                        {props.user.name}
                                                    </p> 
                                          </div>
                                          <div  className="d-flex justify-content-center gap-1   align-items-center "
                                          style={{height:'100%',width:'35%',backgroundColor:''}}>
                                                     <VideoUploader  onChange={handleUpload} />
                                                     <p style={{fontSize:'10px',color:"white",fontFamily:'Arsenal SC serif',
                                                        fontWeight:"900",margingBottom:"50px" }}>
                                                         Upload
                                                     </p>
                                          </div>
                                          
                                          <div  className="d-flex flex-row justify-content-center gap-2 align-items-center "
                                          style={{height:'100%',width:'35%',backgroundColor:''}}>
                                                      <VideoRecorder setSwitchUploadLive={setSwitchUploadLive} />
                                                      <p style={{fontSize:'10px',color:"white",fontFamily:'Arsenal SC serif',
                                                        fontWeight:"900" }}>
                                                         Live
                                                     </p>

                                          </div>
                             </div>
               
                    </div>
                    <div className="d-flex flex-column justify-content-center align-items-center  " 
                         style= { canSubmit? {height:'100%',width:'15%',backgroundColor:'',opacity:"100%",marginLeft:"auto"} :
                           {height:'100%',width:'15%',backgroundColor:'',opacity:"50%",marginLeft:"auto"}
                        }
                
                        
                         >
                            <button onClick={handleUploading}
                            style={{height:'100%',width:'100%'}}
                            className="d-flex flex-column justify-content-center align-items-center " 
                                > 
                              <img  style={{height:'90%',width:'90%',borderRadius:'10px',objectFit:"cover"}}
                               src="/asset/material/submit.png" alt="" />
                            </button>
                    </div>

            </div>
    
            <div className="d-flex flex-column  justify-content-start align-items-center  " 
            style={{width:"100%",minHeight:"83%"}}>
            { !swicthUploadLive ? (
                                          
                <UploadVideo videoSrc={videoSrc} handleUpload= {handleUpload} setSwitchUploadLive={setSwitchUploadLive} />


                ):(

                <>

                <LiveWebcam setSwitchUploadLive={setSwitchUploadLive} setFile={setFile} setVideoSrc={setVideoSrc} />
                </>

                )
      
                }
              {/* <div className="d-flex  justify-content-center align-items-center  " 
                    style={{width:"100%",height:"8%"}}>
                      <button onClick={handleUploading}
                        className= {canSubmit ? 'submit-button-active':'submit-button'} 
                        style={{width:"100%",height:'100%',borderRadius:"2px"}}>
                         Submit
                      </button>
              </div>   */}

           </div>
          {/* participants challengers here */}
  
          {challenge.participants.map( participant =>{
              return <Participant participant={participant} setReRender ={setReRender} reRender={reRender}
              user={user} challenge_id ={challenge_id} challenge={challenge} />
          })
          }
  
         <div className='d-flex flex-row  justify-content-between align-items-center '  //#1f1e15
              style={{minHeight:'7%',width:'100%',backgroundColor:''}} >
                
                       <button onClick={(e)=> navigate(`/home`)} style={{width:'90px',color:"red",textAlign:'center',
                        backgroundColor:'',height:'98%',fontSize:"12px",fontWeight:"800",border:'none', fontFamily:'Arsenal SC serif'
                      }}     >
                        CANCEL
                      </button>
              
                    
                      <div className='d-flex  align-items-center gap-3 justify-content-start'
                      style={{widh:"50%" , height:"100%"}}>  
                     <button style={{backgroundColor:'',border:'none'
                      ,width:'100%',color:"white",height:'100%',fontSize:"13px",fontWeight:"800", fontFamily:'Arsenal SC serif'
                      }}>
                      Rate
                   </button>    
                    <p style={{fontSize:'11px',color:'white',marginTop:"0px"}}>4.5</p> 
                    <span style={{fontSize:'11px',color:'gold'}}> *****  </span>
                      {/* <p style={{fontSize:'11px',color:'white',marginTop:"-9px",marginLeft:"29px"}}> </p> */}
                   </div>
                     <button style={{backgroundColor:'',border:'none'
                        ,width:'90px',color:"#0352fc",height:'100%',fontSize:"11px",fontWeight:"800", fontFamily:'Arsenal SC serif'
                        }}>
                        FOLLOW
                     </button>
              
          </div>
          </>
          ): 
          (
            <div>
          
               {/* <Navigate ;to="/home" />  */}
            </div>
          )}
           
      </div>
    )
}

export default Replay