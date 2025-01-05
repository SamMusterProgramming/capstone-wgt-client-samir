import { useRef, useState ,useCallback, useEffect } from 'react';
import PostHeader from '../../components/helper/PostHeader';
import './Page.css'
import LiveWebcam from '../../components/helper/LiveWebcam';
import UploadVideo from '../../components/helper/UploadVideo';
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { BASE_URL, getChallengeById } from '../../apiCalls';
import { ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { generateUserFolder, getMediaFireBase, storage } from '../../firebase';
import { challengeType, privacyData } from '../../utilitise/typeSelectorData';
import { Select } from 'antd';
import { Toaster, toast } from 'sonner';
import { borderRadius } from '@mui/system';



const colourStyles = {
  control: (styles) => ({ 
    ...styles, 
    backgroundColor: 'lightgrey' 
  }),
  option: (styles, { isFocused }) => ({
    ...styles,
    backgroundColor: isFocused ? 'blue' : 'white',
    color: isFocused ? 'white' : 'black',
  })
};


const NewChallenge = (props) => {
  
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
  const [profileImg,setProfileImg] = useState("")
  // const [selectedValue, setSelectedValue] = useState('option1');

  const handleUploading = async () => {
    
    // const formData = new FormData();
    if(file){ // if video is recorded and ready to upload to data base
      console.log(file)
      const newFile = v4()+file.name 
      const CHALLENGE_VIDEO_URL = generateUserFolder(props.user.email)+ newFile;
      const videoRef = ref(storage,CHALLENGE_VIDEO_URL)

      uploadBytes(videoRef,file).then(()=> {
        toast.success('successfully added!',{
          position: 'top-center',
          duration: 5000,
        });
      })
      
     let challenge = {
       origin_id : props.user._id ,
       description: description,
       profile_img:props.user.profile_img,
       user_id : props.user._id,
       name:props.user.name,
       video_url : CHALLENGE_VIDEO_URL,
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
      await axios.post( BASE_URL + '/challenges/uploads', challenge).then( // when user challenge another user , we will insert his change to an existing challenge by challenge_id
        res =>  setTimeout(() => {
          navigate('/chpage/challenges')
       }, 8000)  
      )
    }else{
      await axios.post(BASE_URL +`/challenges/uploads/${challenge_id}`,challenge)
      .then(   res =>  setTimeout(() => {
         navigate('/chpage/participatechallenges')
      }, 8000)  
      )
    }
   
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
          style={{width:"100%",height:'20%',backgroundColor:'#b6d1de'}}>
          
             <div className="d-flex  bg-light justify-content-between gap-0 align-items-center " 
                style={{fontSize:'10px',width:'100%',height:"30%",padding:'10px'}}>
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
                     style={{fontSize:'10px',width:'23%',height:"90%",borderRadius:'50%',backgroundColor:'blue'}}>
                 <Link to={"/profile/"+`${props.user._id}`} style={{width:'90%',height:"90%"}}>
                   <img   style={{fontSize:'10px',width:'100%',height:"100%",objectFit:'cover',borderRadius:'50%'}}
                     src={props.user.profile_img}  alt="" />
                 </Link>  
                </div>
                <div className="d-flex flex-column justify-content-start align-items-center "
                     style={{fontSize:'10px',width:'85%',height:"100%",backgroundColor:''}}>

                     <div  className="d-flex justify-content-end mt-2 align-items-center "
                     style={{fontSize:'10px',width:'90%',height:"50%",backgroundColor:''}} >
                        <Select onChange={handleSelectedType}
                            style={{width:"100%",height:"80%",fontSize:'11px' ,border:"none",fontWeight:"600", backgroundColor:'',textAlign:"center"}}
                            defaultValue="SELECT TYPE" 
                             >   
                            {challengeType.map((selection,index)=>{   
                                return ( 
                                   <Select.Option key={index} value = {selection.type}
                                        style={{ color:'black',
                                        backgroundColor:"lightgray",width:"100%",height:"30px" }} >
                                       <p style={{ color:'black'}}>{selection.type}</p> 
                                    </Select.Option> )
                            })} 
                        </Select>
                     </div>
                     <div className="d-flex justify-content-evenly align-items-center "
                     style={{fontSize:'10px',width:'96%',height:"40%",backgroundColor:''}} >
          
                                        <div className="d-flex justify-content-center align-items-center gap-2">
                                        <input   style={{fontSize:'10px',width:"20px", height:"20px"}}
                                            type="radio" 
                                              value="PUBLIC" 
                                              checked={selectedPrivacy === 'PUBLIC'} 
                                              onChange={handleSelectedPrivacy} 
                                            />
                                        <label style={{fontSize:'12px',color:"black",fontWeight:'700',marginTop:'3px'}}>
                                              PUBLIC
                                          </label >
                                        </div>
                                        <div className="d-flex justify-content-center align-items-center gap-2">
                                        <input style={{fontSize:'10px',width:"20px", height:"20px"}}
                                              type="radio" 
                                              value="PRIVATE" 
                                              checked={selectedPrivacy === 'PRIVATE'} 
                                              onChange={handleSelectedPrivacy} 
                                            />
                                        <label style={{fontSize:'12px',color:"black",fontWeight:'700',marginTop:'3px'}}>
                                              PRIVATE
                                          </label >
                                        </div>
                                        
                                      
                     
                     </div>
                </div>
             </div>
          </div>
        </>
      ):(
        <>

          <div className="d-flex flex-column mb-0 mt-0 justify-content-start align-items-center"
          style={{width:"100%",height:'20%',backgroundColor:'#b6d1de'}}>
          
             <div className="d-flex  bg-light justify-content-between gap-0 align-items-center " 
                style={{fontSize:'10px',width:'100%',height:"30%",padding:'10px'}}>
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
             <div className="d-flex   justify-content-start align-items-center border" 
                style={{fontSize:'10px',width:'100%',height:"70%"}}>
                <div className="d-flex justify-content-center align-items-center "
                     style={{fontSize:'10px',width:'23%',height:"90%",borderRadius:'50%',backgroundColor:'blue'}}>
                 <Link to={"/profile/"+`${props.user._id}`} style={{width:'90%',height:"90%"}}>
                   <img   style={{fontSize:'10px',width:'100%',height:"100%",objectFit:'cover',borderRadius:'50%'}}
                     src={props.user.profile_img}  alt="" />
                 </Link>  
                </div>
                <div className="d-flex flex-column mt-3 justify-content-start align-items-center "
                     style={{fontSize:'10px',width:'85%',height:"100%",backgroundColor:''}}>

                     <div  className="d-flex justify-content-start  align-items-center "
                     style={{fontSize:'10px',width:'90%',backgroundColor:''}} >
                          <p style={{fontSize:'11px' ,border:"none",fontWeight:"300", color:'black',width:"90px"}}>Type :
                          </p>
                          <span style={{fontSize:'11px' ,border:"none",fontWeight:"700", color:'black'}}> {(challenge.type)}</span>
                     </div>

                     <div  className="d-flex justify-content-start align-items-center "
                      style={{fontSize:'10px',width:'90%',backgroundColor:''}} >
                          <p style={{fontSize:'11px',border:"none",width:"90px", fontWeight:"300", color:'black'}}>Privacy :
                          </p>
                          <span style={{fontSize:'11px' ,border:"none",fontWeight:"700", color:'black'}}> {(challenge.privacy)}</span>
                     </div>
                     <div  className="d-flex justify-content-start  align-items-center "
                     style={{fontSize:'10px',width:'90%',backgroundColor:''}} >
                          <p style={{fontSize:'11px',width:"90px",border:"none",fontWeight:"300", color:'black'}}>Originated-By:
                          </p>
                           <span style={{fontSize:'11px',border:"none",fontWeight:"700", color:'black'}}> {(challenge.name)}</span>
                     </div>

                     <div  className="d-flex justify-content-start align-items-center "
                     style={{fontSize:'10px',width:'90%',backgroundColor:''}} >
                          <p style={{fontSize:'11px' ,border:"none",fontWeight:"300", color:'black',textAlign:"center"}}>Title :
                            <span style={{fontSize:'11px' ,border:"none",fontWeight:"700"}}> {(challenge.desc)}</span>
                          </p>
                     </div>
                    
                </div>
             </div>
          </div>  

        </>
      )}
          
          
          <textarea style={{fontWeight:600, width:'100%',height:'45px',fontFamily:"Arsenal SC serif",border:'none'}}
           className="description " onChange={addDescrition}  name='description' placeholder='add title to your challenge'>
          </textarea>
         

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