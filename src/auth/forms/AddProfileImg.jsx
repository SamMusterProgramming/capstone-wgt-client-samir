import { Button } from 'antd';
import React, { useEffect, useState } from 'react'
import DialogConfirm from '../../components/helper/DialogConfirm';
import { useNavigate } from 'react-router-dom';


export const AddProfileImg = (props) => {

  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImg ,setProfileImg] = useState("../asset/material/avatar.jpg")
  const [coverImg, setCoverImg] = useState("../asset/material/cover.jpg")
 const navigate = useNavigate()
  const handleProfileImgUpload =()=> {

  }

// useEffect(() => {

//   }, [])

  return (
    <div className='d-flex flex-column align-items-center  justify-content-start'
      style={{ width:'100%' ,height:'100%'}}>
           <div className='d-flex flex-column align-items-center  justify-content-center'
              style={{ width:'100%' ,height:'200px' }}>
               <img style={{width:'100%',height:'100%',objectFit:"cover"}} src={coverImg} alt="" />
           </div>
           <div className='d-flex flex-column align-items-center justify-content-center'
              style={{ width:'150px',height:'150px',position:'absolute',marginTop:'120px',borderRadius:'50%'}}>
               <img style={{ width:'100%'  ,objectFit:"cover" ,borderRadius:'50%'}} 
               src={profileImg} alt="" />
           </div>
     
           <div className='d-flex align-items-center justify-content-center gap-3' 
               style={{marginTop:"auto",height:'20%'}}>
                <DialogConfirm
                    handleAction={(e)=> { props.setUser({...props.user , isNewUser:false}); 
                    navigate(`/home`)}} 
                    style={{width:'90px',color:"lightblue",textAlign:'center',
                            backgroundColor:'white',height:'50%',fontSize:"14px",fontWeight:"800",border:'none'
                            }}   action={"SKIP"} message ={'are you sure you want to skip this section'} 
                />
                <Button
                  style={{width:'110px',color:"white",textAlign:'center',
                          backgroundColor:'#114fc2',height:'50%',fontSize:"12px",fontWeight:"800",border:'none'
                        }} onClick={handleProfileImgUpload}
                > PROFILE IMG </Button>
                  <DialogConfirm handleAction={(e)=> navigate(`/matchchallenge/${props.challenge._id}`)} 
                  style={{width:'110px',color:"white",textAlign:'center',
                      backgroundColor:'#114fc2',height:'50%',fontSize:"12px",fontWeight:"800",border:'none'
                    }}   action={"COVER IMG"} message ={'are you sure you want to replay to the challenge'} 
                />
           </div>
    </div>
   
  )
}
