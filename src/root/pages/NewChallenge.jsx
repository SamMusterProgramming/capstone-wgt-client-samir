import { useRef, useState ,useCallback, useEffect, useContext } from 'react';
import PostHeader from '../../components/helper/PostHeader';
import './Page.css'
import LiveWebcam from '../../components/helper/LiveWebcam';
import UploadVideo from '../../components/helper/UploadVideo';
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { BASE_URL, getChallengeById, getUserChallenges, getUserParticipateChallenges } from '../../apiCalls';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { generateUserFolder, getMediaFireBase, storage } from '../../firebase';
import { challengeType, privacyData } from '../../utilitise/typeSelectorData';
import { Button, Select } from 'antd';
import { Toaster, toast } from 'sonner';
import { borderRadius } from '@mui/system';
import { AuthContent } from '../../context/AuthContent';
import VideoUploader from '../../components/helper/VideoUploader';
import VideoRecorder from '../../components/helper/VideoRecorder';





const NewChallenge = (props) => {
  
  const {participateChallenges,setParticipateChallenges,userChallenges,setUserChallenges} = useContext(AuthContent)
  const [swicthUploadLive ,setSwitchUploadLive] = useState(false)
  const [videoSrc , setVideoSrc] = useState("");
  const [file,setFile] = useState(null)
  const [description , setDescription] = useState("")
  const navigate = useNavigate();
  const  challenge_id  = useParams().id;
  const [selectedType,setSelectedType]= useState("ADVENTURE")
  const [selectedCategory,setSelectedCategory] = useState("climbing")
  const [categories,setCategories] = useState("climbing")
  const [privacy ,setPrivacy] = useState([])
  const [selectedPrivacy , setSelectedPrivacy] = useState("PUBLIC")
  const [selectedAudience , setSelectAudience] =useState("EVERYONE")
  const [audience , setAudience] = useState([])
  const [challengers , setChallengers] = useState([])
  const [selectedChallenger , setSelectedChallenger] = useState("EVERYONE")
  const [challenge,setChallenge] = useState({})
  const [type,setType] = useState(null)
  const [canSubmit, setCanSubmit] = useState(false)

  // const [selectedValue, setSelectedValue] = useState('option1');

  const handleUploading = async () => {
    
    // const formData = new FormData();
    if(file && canSubmit){ // if video is recorded and ready to upload to data base
      const newFile = v4()+file.name 
      const CHALLENGE_VIDEO_URL = generateUserFolder(props.user.email)+ newFile;
      const videoRef = ref(storage,CHALLENGE_VIDEO_URL)

      uploadBytes(videoRef,file).then(()=> {
            const videoRef = ref(storage, CHALLENGE_VIDEO_URL);
            getDownloadURL(videoRef)
            .then((url) => {
              let challenge = {
                origin_id : props.user._id ,
                description: description,
                profile_img:props.user.profile_img,
                user_id : props.user._id,
                name:props.user.name,
                video_url : url,
                email:props.user.email,
              }

              if(!challenge_id){ // when user creates new challenge
                challenge = {...challenge,
                  type:selectedType,
                  // category:selectedCategory,
                  privacy:selectedPrivacy,
                  // audience:selectedAudience,
                  challengers:selectedChallenger,
                  name:props.user.name
                }
                axios.post( BASE_URL + '/challenges/uploads', challenge).then( // when user challenge another user , we will insert his change to an existing challenge by challenge_id
                  res =>  
                    navigate('/chpage/challenges')
                )
              }else{
                 axios.post(BASE_URL +`/challenges/uploads/${challenge_id}`,challenge)
                .then(   res =>  
                   navigate('/chpage/participatechallenges')
           
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

const addDescrition =(e)=> {
  e.preventDefault(e)
  setDescription(e.target.value)
}

const handleSelectedType = (value) => {
   const type = value ; 
   console.log("here"+type)
   setSelectedType((prev) => type)
}


const handleSelectedPrivacy = (event) => {
  setSelectedPrivacy(event.target.value) 
}


useEffect(() => {
   setType(challengeType.sort())
   setSelectedType("ADVENTURE")
}, [])

useEffect(() => {
  if(challenge_id) {
      getChallengeById(challenge_id ,setChallenge)
      setDescription(challenge.desc)
     }
}, [])

useEffect(() => {
  if(file && description) {
    setCanSubmit(true)
  } else setCanSubmit(false)
 }, [file,description]) 
  return (
  
    <div className="d-flex justify-content-start gap-0 align-items-center  post-container star">

     
{/* 
      {(!challenge_id) ?  (
        <> */}
      <div className='d-flex gap-3 justify-content-start align-items-center '
                 style={{width:"100%",height:"5%"}}> 
                  <Link  className='d-flex mt-0 justify-content-center align-items-center'
                      style={{width:"25%",minHeight:"100%",padding:'10px' ,backgroundColor:""}}>
                      <span style={{fontSize:'10px', color:'lightblue', fontFamily:'Arsenal SC serif',fontWeight:'900'}} >
                        New Challenge
                      </span>
                  </Link>
                  <div className='d-flex mt-0 justify-content-center align-items-center '
                    style={{width:"75%",minHeight:"100%",padding:'0px',backgroundColor:''}}>
                        <input style={{fontWeight:600,textAlign:"center", width:'100%',height:'45px',
                        fontFamily:"Arsenal SC serif",backgroundColor:"transparent",padding:"10px",fontSize:"11px",
                        border:'none',textDecoration:"none",fontFamily:"Arsenal SC serif",color:"white"}}
                        className="description" onChange={addDescrition}  name='description'  placeholder='Add title to your challenge'/>
                  </div>
      </div>
       
      

      <div className="d-flex  mb-0 mt-0 justify-content-start align-items-center star"
          style={{width:"100%",height:'14%',backgroundColor:''}}>

              <div className="d-flex flex-column justify-content-start align-items-center gap-0  "
                        style={{fontSize:'10px',width:'25%',height:"100%"}}>
                       
                            <div  className="d-flex flex-column  justify-content-center text-center  align-items-center "
                              style={{fontSize:'10px',width:'100%',height:"20%",backgroundColor:''}} >   
                                <span className="lead text" style={{fontSize:'8px',color:"#232324",fontWeight:'800', 
                                  fontFamily:'Arsenal SC serif',color:"white"
                                  }}> {props.user.name.toUpperCase().slice(0,15)}</span>
                            </div> 
                            <Link className="d-flex flex-column  justify-content-center text-center  align-items-center "
                             to={"/profile/"+`${props.user._id}`} style={{width:'90%',height:"80%"}}>
                                <img   style={{fontSize:'10px',width:'50px',height:"50px",objectFit:'cover',borderRadius:'50px'}}
                                      src={props.user.profile_img} alt="" />
                            </Link>  
              </div> 

              <div className="d-flex flex-column justify-content-start   align-items-center "
                        style={{fontSize:'10px',width:'75%',height:"100%",backgroundColor:''}}>

                                    <div className="d-flex justify-content-center  gap-4 align-items-start "
                                      style={{fontSize:'10px',width:'100%',height:"50%",backgroundColor:''
                                      ,opacity:"100%"}} >
                                    
                                            <Select onChange={handleSelectedType}
                                                style={{width:"50%",height:"70%",fontSize:'12px',border:"none",fontWeight:"1200", backgroundColor:'',textAlign:"center"
                                                , color:'black',fontWeight:"600px",fontFamily:'Arsenal SC serif',fontSize:"12px",opacity:"80%"
                                                }}
                                                defaultValue="Adventure" 
                                                >   
                                                {type && type.sort().map((selection,index)=>{   
                                                    return ( 
                                                      <Select.Option key={index} value = {selection.type}
                                                            style={{ color:'black',fontFamily:'Arsenal SC serif',
                                                            backgroundColor:"",width:"100%",height:"30px" }} >
                                                          <p style={{ color:'black',fontWeight:"800px",fontFamily:'Arsenal SC serif',fontSize:"12px"}}>{selection.type}</p> 
                                                        </Select.Option> )
                                                })} 
                                            </Select>
                                  
                                    
                                            <div className="d-flex justify-content-center  gap-2 align-items-center "
                                              style={{fontSize:'10px',width:'50%',height:"100%",backgroundColor:''}} >
                              
                                                            <div className="d-flex justify-content-end align-items-center gap-1">
                                                                <input   style={{fontSize:'10px',width:"15px", height:"15px"}}
                                                                  type="radio" 
                                                                    value="PUBLIC" 
                                                                    checked={selectedPrivacy === 'PUBLIC'} 
                                                                    onChange={handleSelectedPrivacy} 
                                                                  />
                                                                <label style={{fontSize:'9px',color:"white",fontWeight:'700',marginTop:'3px'}}>
                                                                    Public
                                                                </label >
                                                            </div>
                                                            <div className="d-flex justify-content-end align-items-center gap-1">
                                                                <input style={{fontSize:'9px',width:"12px", height:"12px"}}
                                                                      type="radio" 
                                                                      value="PRIVATE" 
                                                                      checked={selectedPrivacy === 'PRIVATE'} 
                                                                      onChange={handleSelectedPrivacy} 
                                                                    />
                                                                <label style={{fontSize:'10px',color:"white",fontWeight:'700',marginTop:'3px'}}>
                                                                      Private
                                                                </label >
                                          
                                                            </div>   
                                                          
                                            </div>
                                    </div>

                                    <div  className="d-flex justify-content-startalign-items-center "
                                       style={{fontSize:'10px',width:'100%',height:"50%",backgroundColor:''}} >

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

                                          <div  className="d-flex flex-row justify-content-center align-items-center "
                                                  style= { canSubmit? {height:'100%',width:'30%',backgroundColor:'',opacity:"100%",marginLeft:"auto"} :
                                                  {height:'100%',width:'30%',backgroundColor:'',opacity:"50%",marginLeft:"auto"}
                                               }
                                                 >
                                                      <button onClick={handleUploading} 
                                                        style={{height:'100%',width:'100%'}}
                                                        className="d-flex flex-column justify-content-center align-items-center " 
                                                          > 
                                                        <img  style={{height:'90%',width:'90%',borderRadius:'10px',objectFit:"fill"}}
                                                        src="/asset/material/submit.png" alt="" />
                                                      </button>

                                          </div>

                                   </div>

                                    
                      
              </div>
           
          </div>
        
              { !swicthUploadLive ? (

                  
                    <UploadVideo videoSrc={videoSrc} handleUpload= {handleUpload} setSwitchUploadLive={setSwitchUploadLive} />
              
                
                ):(
                  
                  <>
                  
                   <LiveWebcam setSwitchUploadLive={setSwitchUploadLive} setFile={setFile} setVideoSrc={setVideoSrc} />
                  </>
                
                )
          
              }

            
         

    </div> 

 
  )
}  

export default NewChallenge