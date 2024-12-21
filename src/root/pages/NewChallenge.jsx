import { useRef, useState ,useCallback } from 'react';
import PostHeader from '../../components/helper/PostHeader';
import './Page.css'
import LiveWebcam from '../../components/helper/LiveWebcam';
import UploadVideo from '../../components/helper/UploadVideo';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../apiCalls';
import { ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { generateUserFolder, storage } from '../../firebase';


const NewChallenge = (props) => {
  
  const [swicthUploadLive ,setSwitchUploadLive] = useState(false)
  const video = useRef()
  const [videoSrc , setVideoSrc] = useState("");
  const [file,setFile] = useState(null)
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [playReview , setPlayReview] = useState(false)
  const [description , setDescription] = useState("")
  const navigate = useNavigate();
  const  challenge_id  = useParams().id;
 





    const handleUploading = async () => {
    
    // const formData = new FormData();
    if(file){ // if video is recorded and ready to upload to data base
      const newFile = v4()+file.name 
      const CHALLENGE_VIDEO_URL = generateUserFolder(props.user.email)+ newFile;
      const videoRef = ref(storage,CHALLENGE_VIDEO_URL)

      uploadBytes(videoRef,file).then(()=> {
        alert("uploaded successfully to firestorage")
      })
      
     const challenge = {
       origin_id : props.user._id ,
       description: description,
       profile_img:props.user.profile_img,
       user_id : props.user._id,
       name:props.user.name,
       video_url : CHALLENGE_VIDEO_URL,
       email:props.user.email
     }

    if(!challenge_id){ // when user creates new challenge
      await axios.post( BASE_URL + '/challenges/uploads', challenge).then( // when user challenge another user , we will insert his change to an existing challenge by challenge_id
        res => navigate('/challenges')
      )
    }else{
      await axios.post(BASE_URL +`/challenges/uploads/${challenge_id}`,challenge)
      .then(   res => navigate('/challenges')
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
  console.log(challenge_id)
}

  return (
  
    <div className="d-flex justify-content-center gap-4 align-items-center post-container">

         
            <div class="fancy-welcome mt-1" 
            style={{height:'150px',padding:'15px', width:'90%' }}>
              <h1 style={{ marginTop:'0'}}>Welcome to the Challenge App!</h1>
              <p>Ready to take on new challenges and showcase your skills?</p>
              <p>Someone Else will pick the challenge </p>
            </div>
       
          
          <PostHeader user={props.user} talentType ="Challenge"/>
  
          <textarea style={{backgroundColor:'white',color:'black',fontWeight:500, width:'90%'}}
           className="description" onChange={addDescrition}  name='description' placeholder='add description to your challenge'>
          </textarea>



         

              { !swicthUploadLive ? (

                  
                    <UploadVideo videoSrc={videoSrc} handleUpload= {handleUpload} setSwitchUploadLive={setSwitchUploadLive} />
              
                
                ):(
                  
                  <>
                  
                   <LiveWebcam setSwitchUploadLive={setSwitchUploadLive} setVideoSrc={setVideoSrc} />
                  </>
                
                )
          
              }
              
          <button onClick={handleUploading} className='mt-1 mb-3 submit-button'>Submit</button>

    </div> 

 
  )
}  

export default NewChallenge