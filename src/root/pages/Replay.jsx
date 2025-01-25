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
            style={{minHeight:"7%",minWidth:"100%"}}>
              <div className='d-flex flex-column justify-content-center  align-items-center'
                 style={{height:"100%",minWidth:"25%",backgroundColor:""}}>
                  <span style={{fontSize:'9px',fontWeight:"600",marginTop:'0px', fontFamily:'Arsenal SC'}}>By</span>
                  <p style={{fontSize:'10px',fontWeight:"600",marginTop:'-3px',color:'gold',fontFamily:'Arsenal SC serif'}}>{challenge.name}</p>
              </div>
              <div className='d-flex flex-column justify-content-center gap align-items-center'
                 style={{height:"100%",minWidth:"25%",backgroundColor:""}}>
                  <span style={{fontSize:'10px',fontWeight:"600", fontFamily:'Arsenal SC'}}>Top </span>
                  <p style={{fontSize:'10px',fontWeight:"600",marginTop:'-3px',color:'gold',fontFamily:'Arsenal SC serif'}}>{topChallenger.topChallenger}</p>
              </div>
              <div className='d-flex flex-column justify-content-center gap align-items-center'
                 style={{height:"100%",minWidth:"25%",backgroundColor:""}}>
                  <span style={{fontSize:'10px',fontWeight:"600",marginTop:'0px', fontFamily:'Arsenal SC'}}>{challenge.participants.length}</span>
                  <p style={{fontSize:'10px',fontWeight:"600",marginTop:'-3px',color:'gold',fontFamily:'Arsenal SC serif'}}>Challengers</p>
              </div>
              <div className='d-flex flex-column  justify-content-center  align-items-center'
                 style={{height:"100%",minWidth:"25%",backgroundColor:""}}>
                   <span style={{fontSize:'10px',fontWeight:"600",color:'white',fontFamily:'Arsenal SC'}}> {challenge.type}</span> 
                   <span style={{fontSize:'10px',fontWeight:"600",marginTop:'-3px',color:'gold',fontFamily:'Arsenal SC '}}> {challenge.privacy}</span>      
              </div>
          </div>
  
          <div className='d-flex mt-0 justify-content-start align-items-center bg-dark'
                   style={{width:"100%",height:"6%"}}> 
                    <div className='d-flex mt-0 justify-content-start align-items-center'
                        style={{width:"25%",height:"100%",padding:'10px' ,backgroundColor:"#3f7f8c"}}>
                        <span style={{fontSize:'13px', color:'lightblue', fontFamily:'Arsenal SC serif',fontWeight:'900'}} >
                          Challenge
                        </span>
                    </div>
                    <div className='d-flex mt-0 justify-content-center align-items-center'
                      style={{width:"75%",height:"100%",padding:'12px',backgroundColor:'lightgray'}}>
                          <p style={{fontSize:'10px',color:"black",fontFamily:'Arsenal SC serif',fontWeight:'900'}}> 
                            {challenge.desc}</p>
                    </div>
          </div>



          {/* replay video here  */}

          <div className="d-flex  justify-content-start align-items-center  " 
                    style={{height:'12%',width:'100%'}}>
                      <div className="d-flex flex-column justify-content-center align-items-center  " 
                          style={{height:'100%',width:'25%',backgroundColor:'lightblue'}}>
                            <Link  style={{height:'90%',width:'93%'}}
                             to = {`/userprofile/${props.user.user_id}`} > 
                              <img  style={{height:'100%',width:'100%',borderRadius:'15px',objectFit:"cover"}} src={props.user.profile_img} alt="" />
                            </Link>
                      </div>
                      <div className="d-flex flex-column justify-content-start align-items-center " 
                          style={{height:'100%',width:'75%',backgroundColor:'white'}}>
                    
                             <div className='d-flex mt-0 justify-content-center participantdisplayer'
                             style={{height:'40%',width:'75%',backgroundColor:'white'}}> 
                             
                                          <div  className="d-flex flex-row justify-content-center  align-items-center ">
                                                    <p style={{color:"black",fontSize:"12px", fontFamily:'Arsenal SC serif',fontWeight:"700"}} > 
                                                        {props.user.name}
                                                    </p> 
                                          </div>
                                          
                                        
                             </div>
                             <div className='d-flex mt-0 justify-content-center border participantdisplayer'
                                 style={{height:'60%',width:'75%',backgroundColor:'white'}}> 
                             
                                          <div  className="d-flex flex-row justify-content-center gap-4  align-items-center "
                                          style={{height:'100%',width:'50%',backgroundColor:'lightgray'}}>
                                                     <VideoUploader  onChange={handleUpload} /> 
                                                     {/* <p>upload</p> */}
                                          </div>
                                          
                                          <div  className="d-flex flex-row justify-content-center  align-items-center "
                                          style={{height:'100%',width:'50%',backgroundColor:'pink'}}>
                                                      <VideoRecorder setSwitchUploadLive={setSwitchUploadLive}  />

                                          </div>
                             </div>
               
                    </div>

            </div>
    
            <div className="d-flex flex-column  justify-content-start align-items-center  " 
            style={{width:"100%",minHeight:"75%"}}>
            { !swicthUploadLive ? (
                                          
                <UploadVideo videoSrc={videoSrc} handleUpload= {handleUpload} setSwitchUploadLive={setSwitchUploadLive} />


                ):(

                <>

                <LiveWebcam setSwitchUploadLive={setSwitchUploadLive} setFile={setFile} setVideoSrc={setVideoSrc} />
                </>

                )
      
                }
              <div className="d-flex  justify-content-center align-items-center  " 
                    style={{width:"100%",height:"8%"}}>
                      <button onClick={handleUploading}
                        className= {canSubmit ? 'submit-button-active':'submit-button'} 
                        style={{width:"100%",height:'100%',borderRadius:"2px"}}>
                         Submit
                      </button>
              </div>  

           </div>
          {/* participants challengers here */}
  
          {challenge.participants.map( participant =>{
              return <Participant participant={participant} setReRender ={setReRender} reRender={reRender}
              user={user} challenge_id ={challenge_id} challenge={challenge} />
          })
          }
  
         <div className='d-flex flex-row  justify-content-between align-items-center '  //#1f1e15
              style={{height:'42px',width:'100%',backgroundColor:'#0352fc'}} >
                
                       <button onClick={(e)=> navigate(`/home`)} style={{width:'90px',color:"white",textAlign:'center',
                        backgroundColor:'red',height:'98%',fontSize:"12px",fontWeight:"800",border:'none', fontFamily:'Arsenal SC serif'
                      }}     >
                        CANCEL
                      </button>
              
                     <div className='d-flex flex align-items-center gap-3 justify-content-evenly'
                        style={{widh:"180px" , height:"100%",backgroundColor:""}}>
                   
                        <button 
                        // style={{color:props.isLikedColor}}
                        //  onClick={props.handleLikes}
                          >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">
                            <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
                          </svg>
                        </button>
                        <span style={{fontSize:'12px',fontWeight:"700",color:'white',fontFamily:"Arsenal SC"}}>{challenge.like_count}  </span>
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