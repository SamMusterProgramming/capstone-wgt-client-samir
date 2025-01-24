import React, { useEffect, useState } from 'react'
import { getMediaFireBase } from '../../firebase'
import DialogConfirm from '../../components/helper/DialogConfirm'
import { Navigate, useNavigate } from 'react-router-dom'






const Demo = (props) => {
  const [demoUrl,setDemoUrl] = useState("")
 const navigate = useNavigate()

  useEffect(() => {
   getMediaFireBase("/demo/Screen_Recording_20250123_233839_Chrome.mp4",setDemoUrl)
  }, [])
  

  return (

    <div className='d-flex flex-column align-items-center  justify-content-center dark-bg'
    style={{width:'100%' ,height:'92%',backgroundColor:''}} >
            <div className='d-flex flex-column align-items-center  justify-content-start'
              style={{width:'90%' ,height:'90%',border:'5px solid white',borderRadius:"15px"}} >
                <video  src={demoUrl} controls autoPlay audio={true}
                style={{objectFit:"fill",width:'100%' ,height:'100%',borderRadius:"5px"}} />      
            </div>
    </div>        

  )
}

export default Demo