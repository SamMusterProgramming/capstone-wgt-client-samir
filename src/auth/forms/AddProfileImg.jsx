import { Button, Upload } from 'antd';
import React, { useEffect, useState } from 'react'
import DialogConfirm from '../../components/helper/DialogConfirm';
import { useNavigate } from 'react-router-dom';
import { generateUserProfileFolder, getMediaFireBase, storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { updateUser } from '../../apiCalls';
import { v4 } from 'uuid';
import { toast } from 'sonner';


export const AddProfileImg = (props) => {

  const [selectedFile, setSelectedFile] = useState(null);   
  const [profileImg ,setProfileImg] = useState("")
  const [coverImg, setCoverImg] = useState("") 
  const [ profileImgFile,setProfileImgFile] = useState("")
  const [ coverImgFile,setCoverImgFile] = useState("")
  const [showSubmit , setShowSubmit] = useState(false)
  const [ready,setReady] = useState(false)

  const [loadReady,setLoadReady] = useState(false)

  const navigate = useNavigate()

  const[profileImgDisplay,setProfileImgDisplay]= useState(props.user.profile_img)
  const[coverImgDisplay,setCoverImgDisplay]= useState(props.user.cover_img)

  const handleProfileImgUpload =({file})=> {
        setProfileImgFile(file.originFileObj) 
        let url = URL.createObjectURL(file.originFileObj);
        setProfileImgDisplay(url) 
      };
  
 
  const handleCoverImgUpload =({file})=> {
    setCoverImgFile(file.originFileObj) 
    let url = URL.createObjectURL(file.originFileObj);
    setCoverImgDisplay(url) 
  }

  const submitUpdate =()=> {

    let COVER_IMAGE_URL = coverImg;
    let PROFILE_IMAGE_URL = profileImg;

    if(coverImgFile) {
        const newFile =  v4()+ coverImgFile.name   
        COVER_IMAGE_URL = generateUserProfileFolder(props.user.email) + newFile;
        const imageRef = ref(storage,COVER_IMAGE_URL)
        uploadBytes(imageRef,coverImgFile).then(()=> {
            setCoverImg(COVER_IMAGE_URL)  
            setLoadReady(!loadReady)       
          }) 
            
        }
    if(profileImgFile) {
            const newFile =  v4()+profileImgFile.name   
            PROFILE_IMAGE_URL = generateUserProfileFolder(props.user.email) + newFile;
            const imageRef = ref(storage,PROFILE_IMAGE_URL)
            uploadBytes(imageRef,profileImgFile).then(()=> {
                setProfileImg(PROFILE_IMAGE_URL)
                setLoadReady(!loadReady) 
              }) 
            
         }
     return new Promise(resolve => setTimeout(resolve, 3000));  
      
  }

    
  useEffect(() => {
    if(loadReady){
    if(profileImg) {
        const fileRef = ref(storage,profileImg);
        getDownloadURL(fileRef).then((url) => {
           setProfileImg(url)
           setReady(true)   
        })   
    }
    if(coverImg) {
        const fileRef = ref(storage,coverImg);
        getDownloadURL(fileRef).then((url) => {
           setCoverImg(url)
           setReady(true)   
        })   
    }
   }
   
  }, [loadReady])

  
  useEffect(() => {
     
          if(ready){  

        let rawBody = {}
        if(coverImg) rawBody = {...rawBody,cover_img:coverImg}
        if(profileImg) rawBody = {...rawBody,profile_img:profileImg}
           console.log(rawBody)
           updateUser(props.user._id,rawBody,props.setUser,props.user)
          .finally(navigate(`/profile/${props.user._id}`))    
        }

   
  }, [ready])

  useEffect(() => {
      if(coverImgFile || profileImgFile)  setShowSubmit(true)
   }, [coverImgFile,profileImgFile])
  

  return (
    <div className='d-flex flex-column align-items-center  justify-content-start'
      style={{ width:'100%' ,minHeight:'100%'}}>
  
           <div className='d-flex  align-items-center  justify-content-center'
              style={{ width:'100%' ,height:'200px' }}>
               <img style={{width:'100%',height:'100%',objectFit:"fill"}} src={coverImgDisplay} alt="" />
           </div>
           <div className='d-flex flex-column align-items-center justify-content-center bg-light'
              style={{ width:'150px',height:'150px',position:'relative',marginTop:'-80px',borderRadius:'50%'}}>
               <img style={{ width:'95%',height:"95%"  ,objectFit:"fill" ,borderRadius:'50%'}} 
               src={profileImgDisplay} alt="" />
           </div>
     
           <div className='d-flex align-items-center justify-content-center gap-3' 
               style={{marginTop:"auto",minHeight:'20%'}}>

                {props.user.isNewUser? (
                   <DialogConfirm
                   handleAction={(e)=> { props.setUser({...props.user , isNewUser:false}); 
                   navigate(`/home`)}} 
                   style={{width:'90px',color:"blue",textAlign:'center',
                           backgroundColor:'white',height:'60px',fontSize:"12px",fontWeight:"800",border:'none'
                           }}   action={"SKIP"} message ={'are you sure you want to skip this section'} 
                 />
                ):(
                    <DialogConfirm
                    handleAction={(e)=> { props.setUser({...props.user , isNewUser:false}); 
                    navigate(`/profile/${props.user._id}`)}} 
                    style={{width:'90px',color:"red",textAlign:'center',
                            backgroundColor:'white',height:'60px',fontSize:"12px",fontWeight:"800",border:'none'
                            }}  action={"CANCEL"} message ={'are you sure you want to Cancel this section'} 
                />
                )}
              
                <Upload 
                  showUploadList={false}
                  accept="image/*"
                  onChange={handleProfileImgUpload}
                  maxCount={1}
                  >
                    <Button 
                    style={{width:'100%',color:"white",textAlign:'center',backgroundColor: 'blue'
                        ,height:'60px',fontSize:"10px",fontWeight:"800",border:'none'
                            }} 
                    > UPDATE IMG </Button>
                </Upload>

                <Upload 
                  showUploadList={false}
                  accept="image/*"
                  onChange={handleCoverImgUpload}
                  maxCount={1}
                  >
                      <Button
                         style={{width:'100%',color:"white",textAlign:'center',backgroundColor: 'blue'
                            ,height:'60px',fontSize:"10px",fontWeight:"800",border:'none'
                                }} 
                     > UPDATE COVER </Button>
           
                </Upload>
              
           </div>
              {showSubmit ? (
                   <Button   
                     onClick={submitUpdate}
                     style={{width:'100%',color:"white",textAlign:'center',backgroundColor: 'green'
                           ,height:'60px',fontSize:"15px",fontWeight:"800",border:'none'
                           }} >
                     Submit
                   </Button>
              ):(
                <Button   disabled
                   style={{width:'100%',color:"white",textAlign:'center',backgroundColor: 'gray'
                        ,height:'60px',fontSize:"15px",fontWeight:"800",border:'none', 
                        }} >
                  Submit
                </Button>
              )}
               
    </div>
   
  )
}
