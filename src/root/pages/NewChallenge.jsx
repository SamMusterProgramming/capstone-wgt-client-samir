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
import { Select } from 'antd';
import { Toaster, toast } from 'sonner';
import { borderRadius } from '@mui/system';
import { AuthContent } from '../../context/AuthContent';





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
  // const [selectedValue, setSelectedValue] = useState('option1');

  const handleUploading = async () => {
    
    // const formData = new FormData();
    if(file){ // if video is recorded and ready to upload to data base
      // console.log(file)
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
                  res =>  setTimeout(() => {
                    // navigate('/chpage/challenges')
                    navigate('/notifications')
          
                 }, 8000)  
                )
              }else{
                 axios.post(BASE_URL +`/challenges/uploads/${challenge_id}`,challenge)
                .then(   res =>  setTimeout(() => {
                   navigate('/chpage/participatechallenges')
                }, 8000)  
                )
              }


             
            })

      })

   
   
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
     getChallengeById(challenge_id,setChallenge)
     }
}, [])

  return (
  
    <div className="d-flex justify-content-start gap-0 align-items-center post-container">

     

      {(!challenge_id) ?  (
        <>
      <div className="d-flex flex-column mb-0 mt-0 justify-content-start align-items-center"
          style={{width:"100%",height:'20%',backgroundColor:'white'}}>
          
             <div className="d-flex  justify-content-between gap-0 align-items-center " 
                style={{fontSize:'10px',width:'100%',height:"30%",padding:'10px',backgroundColor:'lightgray'}}>
                  <div>
                      <p style={{fontSize:'10px',color:"#1f2426"}}> 
                      <span className="lead text" style={{fontSize:'12px',color:"#232324",fontWeight:'600', 
                        fontFamily:'Arsenal SC serif'
                      }}>  {props.user.name.toUpperCase().slice(0,10)}</span>
                    </p>
                 </div>
                 <div>
                   <p style={{fontSize:'10px',color:"#1f2426",fontWeight:'700', 
                      fontFamily:'Arsenal SC serif'
                    }}>|_ NEW CHALLENGE _|
                    </p>
                 </div>
                 <div>
                  <Link to={"/home"} style={{fontSize:'14px',color:"#1b78cf",fontWeight:'700', 
                      fontFamily:'Arsenal SC serif'
                    }}>
                          Home
                  </Link>
                 </div>
               
             </div>
             <div className="d-flex   justify-content-start align-items-center border" 
                style={{fontSize:'10px',width:'100%',height:"70%"}}>
                <div className="d-flex justify-content-center align-items-center "
                     style={{fontSize:'10px',width:'23%',height:"90%",borderRadius:'5px',backgroundColor:'lightblue'}}>
                 <Link to={"/profile/"+`${props.user._id}`} style={{width:'95%',height:"95%"}}>
                   <img   style={{fontSize:'10px',width:'100%',height:"100%",objectFit:'cover',borderRadius:'5px'}}
                     src={props.user.profile_img}  alt="" />
                 </Link>  
                </div>
                <div className="d-flex flex-column justify-content-start align-items-center "
                     style={{fontSize:'10px',width:'77%',height:"100%",backgroundColor:''}}>

                     <div  className="d-flex justify-content-end mt-2 align-items-center "
                     style={{fontSize:'10px',width:'90%',height:"35%",backgroundColor:''}} >
                        <Select onChange={handleSelectedType}
                            style={{width:"100%",height:"100%",fontSize:'11px',border:"none",fontWeight:"600", backgroundColor:'',textAlign:"center"
                             , color:'black',fontWeight:"600px",fontFamily:'Arsenal SC serif',fontSize:"11px"
                            }}
                            defaultValue="Adventure" 
                             >   
                            {type && type.sort().map((selection,index)=>{   
                                return ( 
                                   <Select.Option key={index} value = {selection.type}
                                        style={{ color:'black',fontFamily:'Arsenal SC serif',
                                        backgroundColor:"lightgray",width:"100%",height:"30px" }} >
                                       <p style={{ color:'black',fontWeight:"600px",fontFamily:'Arsenal SC serif',fontSize:"11px"}}>{selection.type}</p> 
                                    </Select.Option> )
                            })} 
                        </Select>
                     </div>
                     <div className="d-flex justify-content-evenly align-items-center "
                       style={{fontSize:'10px',width:'96%',height:"30%",backgroundColor:''}} >
          
                                        <div className="d-flex justify-content-center align-items-center gap-2">
                                        <input   style={{fontSize:'10px',width:"10px", height:"20px"}}
                                            type="radio" 
                                              value="PUBLIC" 
                                              checked={selectedPrivacy === 'PUBLIC'} 
                                              onChange={handleSelectedPrivacy} 
                                            />
                                        <label style={{fontSize:'10px',color:"black",fontWeight:'700',marginTop:'3px'}}>
                                              Public
                                          </label >
                                        </div>
                                        <div className="d-flex justify-content-center align-items-center gap-2">
                                        <input style={{fontSize:'10px',width:"10px", height:"20px"}}
                                              type="radio" 
                                              value="PRIVATE" 
                                              checked={selectedPrivacy === 'PRIVATE'} 
                                              onChange={handleSelectedPrivacy} 
                                            />
                                        <label style={{fontSize:'10px',color:"black",fontWeight:'700',marginTop:'3px'}}>
                                              Private
                                          </label >
                                        </div>            
                     </div>
                     <div className="d-flex justify-content-start align-items-center "
                       style={{fontSize:'10px',width:'90%',minHeight:"35%",backgroundColor:'',pasdding:"12px"}} >
                             <p style={{ color:'black',fontWeight:"600px",fontFamily:'Arsenal SC serif',fontSize:"9px"}}>
                             Keep it fun,
                             no graphic or inappropriate content!</p> 
          
                     </div>

                </div>

             </div>
          </div>
        </>
      ):(
        <>

          <div className="d-flex flex-column mb-0 mt-0 justify-content-start align-items-center"
          style={{width:"100%",height:'20%',backgroundColor:'gray'}}>
          
             <div className="d-flex  justify-content-between gap-0 align-items-center " 
                style={{fontSize:'10px',minWidth:'100%',minHeight:"30%",padding:'10px',backgroundColor:'lightgray'}}>
                  <div>
                      <p style={{fontSize:'10px',color:"#1f2426"}}> 
                      <span className="lead text" style={{fontSize:'10px',color:"#232324",fontWeight:'800', 
                        fontFamily:'monospace'
                      }}>  {props.user.name.toUpperCase()}</span>
                    </p>
                 </div>
                 <div>
                   <p style={{fontSize:'12px',color:"#1f2426",fontWeight:'700', 
                      fontFamily:'Arsenal SC serif'
                    }}>|_ REPLY TO CHALLENGE _|
                    </p>
                 </div>
                 <div>
                  <Link to={"/home"} style={{fontSize:'14px',color:"#1b78cf",fontWeight:'500', 
                      fontFamily:'Arsenal SC serif'
                    }}>
                          Home
                  </Link>
                 </div>
               
             </div>
             <div className="d-flex   justify-content-start align-items-center" 
                style={{fontSize:'10px',width:'100%',height:"70%",background:"white"}}>
                <div className="d-flex justify-content-center align-items-center "
                     style={{fontSize:'10px',width:'23%',height:"100%",borderRadius:'5px',backgroundColor:'lightblue'}}>
                    <Link to={"/profile/"+`${props.user._id}`} style={{width:'95%',height:"95%"}}>
                      <img   style={{fontSize:'10px',width:'100%',height:"100%",objectFit:'cover',borderRadius:'5px'}}
                        src={props.user.profile_img}  alt="" />
                    </Link>  
                </div>
                <div className="d-flex flex-column  justify-content-start align-items-center "
                     style={{fontSize:'10px',width:'85%',height:"100%",backgroundColor:''}}>
   
                     <div className="d-flex  justify-content-start align-items-start  "
                       style={{fontSize:'10px',minWidth:'100%',minHeight:"50%",backgroundColor:'',padding:"10px"}}>
                            <div className="d-flex flex-column justify-content-center align-items-start "
                              style={{fontSize:'10px',width:'30%',minHeight:"100%",backgroundColor:''}}>
                                <p style={{fontSize:'10px', fontFamily:'Arsenal SC serif' ,border:"none",fontWeight:"300", color:'black'}}>Type 
                                </p>
                                <span style={{fontSize:'10px', fontFamily:'Arsenal SC serif' ,border:"none",fontWeight:"700", color:'black'}}> {(challenge.type)}</span>
                            </div>
                            <div className="d-flex flex-column justify-content-center align-items-start "
                              style={{fontSize:'10px',width:'30%',minHeight:"100%",backgroundColor:''}}>
                                <p style={{fontSize:'10px', fontFamily:'Arsenal SC serif' ,border:"none",fontWeight:"300", color:'black'}}>Privacy 
                                </p>
                                <span style={{fontSize:'10px', fontFamily:'Arsenal SC serif' ,border:"none",fontWeight:"700", color:'black'}}> {(challenge.privacy)}</span>
                            </div>
                            <div className="d-flex flex-column justify-content-center align-items-start "
                              style={{fontSize:'10px',width:'40%',minHeight:"100%",backgroundColor:''}}>
                                <p style={{fontSize:'10px', fontFamily:'Arsenal SC serif' ,border:"none",fontWeight:"300", color:'black'}}>Originated-By
                                </p>
                                <span style={{fontSize:'10px', fontFamily:'Arsenal SC serif' ,border:"none",fontWeight:"700", color:'black'}}> {(challenge.name)}</span>
                            </div>
                     </div>

                     <div className="d-flex  justify-content-start align-items-center "
                       style={{fontSize:'9px',width:'100%',minHeight:"45%",color:'black',fontWeight:"600"
                       ,padding:"10px",fontFamily:'Arsenal SC serif',borderRadius:"10px",backgroundColor:"white"}}>
                           
                          Keep it fun, respectful, and within the context.
                          no graphic or inappropriate content! 
                       
                     </div>

                    
                    
                </div>
             </div>
          </div>  

        </>
      )}
          {(!challenge_id) ?  
             (
              <textarea style={{fontWeight:600, width:'100%',height:'45px',fontFamily:"Arsenal SC serif",border:'none'}}
              className="description " onChange={addDescrition}  name='description' placeholder='add title to your challenge'>
             </textarea>
             ):(
              <textarea disabled style={{fontWeight:600, width:'100%',height:'45px',fontFamily:"Arsenal SC serif",border:'none'}}
              className="description " onChange={addDescrition}  name='description' value={challenge.desc} placeholder='add title to your challenge'>
             </textarea>
             )}
          
          {/* <textarea style={{fontWeight:600, width:'100%',height:'45px',fontFamily:"Arsenal SC serif",border:'none'}}
           className="description " onChange={addDescrition}  name='description' placeholder='add title to your challenge'>
          </textarea> */}
         

              { !swicthUploadLive ? (

                  
                    <UploadVideo videoSrc={videoSrc} handleUpload= {handleUpload} setSwitchUploadLive={setSwitchUploadLive} />
              
                
                ):(
                  
                  <>
                  
                   <LiveWebcam setSwitchUploadLive={setSwitchUploadLive} setFile={setFile} setVideoSrc={setVideoSrc} />
                  </>
                
                )
          
              }
              
          <button onClick={handleUploading} className='mt-1 mb-3 submit-button'>
             <img style={{backgroundColor:'transparent',width:"100%",height:"100%",borderRadius:'10px'}} 
             src="../../asset/material/submit.png" alt="" />
          </button>

    </div> 

 
  )
}  

export default NewChallenge