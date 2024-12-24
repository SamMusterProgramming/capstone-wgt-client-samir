import { useRef, useState ,useCallback, useEffect } from 'react';
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
import { challengeType, privacyData } from '../../utilitise/typeSelectorData';
import { Select } from 'antd';
import { Toaster, toast } from 'sonner';



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
  const [selectedType,setSelectedType]= useState("ADVENTURE")
  const [selectedCategory,setSelectedCategory] = useState("CLIMBING")
  const [categories,setCategories] = useState([])
  const [privacy ,setPrivacy] = useState([])
  const [selectedPrivacy , setSelectedPrivacy] = useState("PUBLIC")
  const [selectedAudience , setSelectAudience] =useState("EVERYONE")
  const [audience , setAudience] = useState([])
  const [challengers , setChallengers] = useState([])
  const [selectedChallenger , setSelectedChallenger] = useState("EVERYONE")
  



  const handleUploading = async () => {
    
    // const formData = new FormData();
    if(file){ // if video is recorded and ready to upload to data base
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
        category:selectedCategory,
        privacy:selectedPrivacy,
        audience:selectedAudience,
        challengers:selectedChallenger
      }
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

const handleSelectedType =(value)=> {
   const type = value ; 
   setSelectedType((prev) => type)
   
}

const handleSelectedCategory =(value) => {
  setSelectedCategory(value)

}
const handleSelectedPrivacy = (value) => {
  setSelectedPrivacy(value) 
}

const handleSelectedAudience = (value) => {
  setSelectAudience(value)
}
const handleSelectedChallenger = (value) => {
  setSelectedChallenger(value)
}

useEffect(() => {
  const categories = challengeType.find(selection => selection.type === selectedType).category
  setCategories((prev) => [...categories])
}, [selectedType])

useEffect(() => {
  setSelectedCategory((prev) => categories[0])
}, [categories])


useEffect(() => {
  if(selectedPrivacy == "PRIVATE") {
  const audiences = privacyData.find(selection => selection.privacy === selectedPrivacy).audience
  setAudience([...audiences])
  setSelectAudience(audience[0])
  }
  const challengers = privacyData.find(selection => selection.privacy === selectedPrivacy).challengers
  setChallengers(challengers)
}, [selectedPrivacy])


  return (
  
    <div className="d-flex justify-content-start gap-4 align-items-center post-container">

      {(!challenge_id) &&  (
           <div className='d-flex flex-wrap gap-1 mt-4 justify-content-evenly align-items-start'
           style={{height:'150px',width:'100%'}}>
             
             
              <div className='d-flex flex-column gap-2'
                style={{width:"29%",height:"80px",fontSize:'14px' ,border:"none",fontWeight:"800",textAlign:"center"}}>
                     <p style={{fontSize:'7px'}} >SELECT CHALLENGE TYPE</p>
                    <Select  onChange={handleSelectedType} defaultValue={selectedType}
                    style={{width:"100%",height:"45px",fontSize:'14px' ,border:"none",fontWeight:"1200",textAlign:"center"}}>
                  {challengeType.map((selection,index)=>{   
                   return ( <Select.Option key={index} value = {selection.type}
                               style={{ color:'black',fontWeight:"1000",fontSize:"14px",
                               backgroundColor:"white",width:"100%",height:"50px" }} >
                          <p style={{ color:'black',fontWeight:"900",fontSize:"13px"}}>{selection.type}</p> 
                     </Select.Option> )
                    })}
               </Select> 
              </div>
             
              <div className='d-flex flex-column gap-2'
                style={{width:"29%",height:"80px",fontSize:'14px' ,border:"none",fontWeight:"800",textAlign:"center"}}>
                     <p style={{fontSize:'7px'}} >SELECT CHALLENGE CATEGORY</p> 
              <Select  onChange={handleSelectedCategory} defaultValue={selectedCategory}
                 style={{width:"100%",height:"45px",fontSize:'14px' ,border:"none",fontWeight:"800",textAlign:"center"}} >
                  {categories.map((category,index)=>{   
                   return ( <Select.Option key={index} value = {category}
                     style={{ color:'black',fontWeight:"1000",fontSize:"14px",
                       backgroundColor:"white",width:"100%",height:"40px" }} >
                          <p style={{ color:'black',fontWeight:"700",fontSize:"13px"}}>{category}</p> 
                     </Select.Option> )
                    })}
               </Select> 
             </div>
             
             <div className='d-flex flex-column gap-2'
                style={{width:"29%",height:"80px",fontSize:'12px' ,border:"none",fontWeight:"800",textAlign:"center"}}>
                     <p style={{fontSize:'7px'}} >SET UP CHALLENGE PRIVACY</p> 
               <Select  onChange={handleSelectedPrivacy} defaultValue={selectedPrivacy}
                 style={{width:"100%",height:"45px",fontSize:' 14px' ,border:"none",fontWeight:"800",textAlign:"center"}} >
                  {privacyData.map((selection,index)=>{   
                   return ( <Select.Option key={index} value = {selection.privacy}
                     style={{ color:'black',fontWeight:"500",
                       backgroundColor:"white",width:"100%",height:"40px" }} >
                          <p style={{ color:'black',fontWeight:"700",fontSize:"13px"}}>{selection.privacy}</p> 
                     </Select.Option> )
                    })}
               </Select> 
              </div>  
                
               { (selectedPrivacy === "PRIVATE") &&  (
                   <div className='d-flex flex-column gap-2'
                   style={{width:"40%",height:"80px",fontSize:'12px' ,border:"none",fontWeight:"800",textAlign:"center"}}>
                        <p style={{fontSize:'7px'}} >WHO CAN SEE YOUR CHALLENGE</p> 
              
                  <Select  onChange={handleSelectedAudience} defaultValue={selectedAudience}
                     style={{width:"100%",height:"45px",fontSize:' 12px' ,border:"none",fontWeight:"800",textAlign:"center"}} >
                       {audience.map((audience,index)=>{   
                       return ( <Select.Option key={index} value = {audience}
                             style={{ color:'black',fontWeight:"500",
                               backgroundColor:"white",width:"100%",height:"40px" }} >
                                   <p  style={{ color:'black',fontWeight:"600",fontSize:"13px"}} >{audience}</p> 
                         </Select.Option> )
                         })}
                 </Select> 
                </div>
               ) 

               } 

              <div className='d-flex flex-column gap-2'
                   style={{width:"40%",height:"80px",fontSize:'12px' ,border:"none",fontWeight:"800",textAlign:"center"}}>
                     <p style={{fontSize:'7px'}} >WHO CAN CHALLENGE YOU</p> 
             
                   <Select  onChange={handleSelectedChallenger} defaultValue={selectedChallenger}
                     style={{width:"100%",height:"45px",fontSize:' 12px' ,border:"none",fontWeight:"800", textAlign:"center"}} >
                       {challengers.map((challenger,index)=>{   
                       return ( <Select.Option key={index} value = {challenger}
                         style={{ color:'black',fontWeight:"500",
                           backgroundColor:"white",width:"100%",height:"40px" }} >
                               <p  style={{ color:'black',fontWeight:"700",fontSize:"13px"}} >{challenger}</p> 
                         </Select.Option> )
                         })}
                   </Select> 
             </div>   

         </div>
      )}
  
        {/* <div className='d-flex flex-wrap gap-1 mt-4 justify-content-evenly align-items-start'
            style={{height:'150px',width:'100%'}}>
              
              
               <div className='d-flex flex-column gap-2'
                 style={{width:"29%",height:"80px",fontSize:'14px' ,border:"none",fontWeight:"800",textAlign:"center"}}>
                      <p style={{fontSize:'7px'}} >SELECT CHALLENGE TYPE</p>
                     <Select  onChange={handleSelectedType} defaultValue={selectedType}
                     style={{width:"100%",height:"45px",fontSize:'14px' ,border:"none",fontWeight:"1200",textAlign:"center"}}>
                   {challengeType.map((selection,index)=>{   
                    return ( <Select.Option key={index} value = {selection.type}
                                style={{ color:'black',fontWeight:"1000",fontSize:"14px",
                                backgroundColor:"white",width:"100%",height:"50px" }} >
                           <p style={{ color:'black',fontWeight:"900",fontSize:"13px"}}>{selection.type}</p> 
                      </Select.Option> )
                     })}
                </Select> 
               </div>
              
               <div className='d-flex flex-column gap-2'
                 style={{width:"29%",height:"80px",fontSize:'14px' ,border:"none",fontWeight:"800",textAlign:"center"}}>
                      <p style={{fontSize:'7px'}} >SELECT CHALLENGE CATEGORY</p> 
               <Select  onChange={handleSelectedCategory} defaultValue={selectedCategory}
                  style={{width:"100%",height:"45px",fontSize:'14px' ,border:"none",fontWeight:"800",textAlign:"center"}} >
                   {categories.map((category,index)=>{   
                    return ( <Select.Option key={index} value = {category}
                      style={{ color:'black',fontWeight:"1000",fontSize:"14px",
                        backgroundColor:"white",width:"100%",height:"40px" }} >
                           <p style={{ color:'black',fontWeight:"700",fontSize:"13px"}}>{category}</p> 
                      </Select.Option> )
                     })}
                </Select> 
              </div>
              
              <div className='d-flex flex-column gap-2'
                 style={{width:"29%",height:"80px",fontSize:'12px' ,border:"none",fontWeight:"800",textAlign:"center"}}>
                      <p style={{fontSize:'7px'}} >SET UP CHALLENGE PRIVACY</p> 
                <Select  onChange={handleSelectedPrivacy} defaultValue={selectedPrivacy}
                  style={{width:"100%",height:"45px",fontSize:' 14px' ,border:"none",fontWeight:"800",textAlign:"center"}} >
                   {privacyData.map((selection,index)=>{   
                    return ( <Select.Option key={index} value = {selection.privacy}
                      style={{ color:'black',fontWeight:"500",
                        backgroundColor:"white",width:"100%",height:"40px" }} >
                           <p style={{ color:'black',fontWeight:"700",fontSize:"13px"}}>{selection.privacy}</p> 
                      </Select.Option> )
                     })}
                </Select> 
               </div>  
                 
                { (selectedPrivacy === "PRIVATE") &&  (
                    <div className='d-flex flex-column gap-2'
                    style={{width:"40%",height:"80px",fontSize:'12px' ,border:"none",fontWeight:"800",textAlign:"center"}}>
                         <p style={{fontSize:'7px'}} >WHO CAN SEE YOUR CHALLENGE</p> 
               
                   <Select  onChange={handleSelectedAudience} defaultValue={selectedAudience}
                      style={{width:"100%",height:"45px",fontSize:' 12px' ,border:"none",fontWeight:"800",textAlign:"center"}} >
                        {audience.map((audience,index)=>{   
                        return ( <Select.Option key={index} value = {audience}
                              style={{ color:'black',fontWeight:"500",
                                backgroundColor:"white",width:"100%",height:"40px" }} >
                                    <p  style={{ color:'black',fontWeight:"600",fontSize:"13px"}} >{audience}</p> 
                          </Select.Option> )
                          })}
                  </Select> 
                 </div>
                ) 

                } 

               <div className='d-flex flex-column gap-2'
                    style={{width:"40%",height:"80px",fontSize:'12px' ,border:"none",fontWeight:"800",textAlign:"center"}}>
                      <p style={{fontSize:'7px'}} >WHO CAN CHALLENGE YOU</p> 
              
                    <Select  onChange={handleSelectedChallenger} defaultValue={selectedChallenger}
                      style={{width:"100%",height:"45px",fontSize:' 12px' ,border:"none",fontWeight:"800", textAlign:"center"}} >
                        {challengers.map((challenger,index)=>{   
                        return ( <Select.Option key={index} value = {challenger}
                          style={{ color:'black',fontWeight:"500",
                            backgroundColor:"white",width:"100%",height:"40px" }} >
                                <p  style={{ color:'black',fontWeight:"700",fontSize:"13px"}} >{challenger}</p> 
                          </Select.Option> )
                          })}
                    </Select> 
              </div>   

          </div> */}
            
          
          <PostHeader user={props.user} talentType ={selectedType} category ={selectedCategory}/>
  
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