import React, { useEffect, useState } from 'react'
import { getMediaFireBase } from '../../firebase'
import DialogConfirm from '../../components/helper/DialogConfirm'
import { Navigate, useNavigate } from 'react-router-dom'






const Demo = (props) => {
  const [demoUrl,setDemoUrl] = useState("")
 const navigate = useNavigate()

  useEffect(() => {
   getMediaFireBase("/demo/demo.mp4",setDemoUrl)
  }, [])
  

  return (
    <div className='d-flex flex-column align-items-center  justify-content-center'
        style=  {{ width:'100%',height:'100%'}}>
            <div className='d-flex flex-column align-items-center justify-content-center p-2 '
                style={{width:'100%',height:'12%',backgroundColor:'white'}}>
                <h4 style={{color:'black',fontSize:'13px'}}> welcome , <span style={{color:'#0a140d',fontSize:'13px'}}>{props.user.name} !</span></h4>
                <p style={{color:'black',fontSize:'12px' ,fontFamily:"Arsenal SC serif"}}>bellow , a Demo Video to help you  familiarise yourself with the Challengify app </p> 
            </div>
        
            <div className='d-flex flex-column align-items-center  justify-content-center'
              style={{width:'100%' ,height:'77%',backgroundColor:'gray'}} >
                <video  src={demoUrl} controls autoPlay muted={true}
                style={{objectFit:"fill",width:'250px' ,height:'100%'}} />      
            </div>
            
            <div className='d-flex flex-column align-items-center justify-content-center p-2 '
            style={{width:'100%',height:'11%',backgroundColor:'white'}}>
                <DialogConfirm handleAction={(e)=> navigate(`/home`)} style={{width:'90px', height:'40px',textAlign:'center',
                      backgroundColor:'#c29311',fontSize:"14px",fontWeight:"800",border:'none'
                    }}   action={"SKIP"} message ={'are you sure you want to Skip the Demo'} />
               </div>
            

        

    </div>
  )
}

export default Demo