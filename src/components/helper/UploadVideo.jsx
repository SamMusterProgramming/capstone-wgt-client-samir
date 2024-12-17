import React from 'react'
import VideoUploader from './videoUploader'
import VideoRecorder from './VideoRecorder'



const UploadVideo = (props) => {
  return (
    <>
         <div className="postholder">

            { props.videoSrc ? 
            (
                <video 
                    className='post-size'
                    src={props.videoSrc}
                    fluid="true"
                    controls
                />
            ):
            (         
                <video 
                    className='post-size'
                    src= "" //{videoSrc}
                    fluid="true"  
                    width="100%"  
                    height='100%'
                   
                />
            ) 
            } 
         </div>
         <div className='container-fluid d-flex gap-5 justify-content-between 
              align-items-center postfooter'>
                  <VideoUploader  onChange={props.handleUpload} /> 
                  <VideoRecorder   setSwitchUploadLive={props.setSwitchUploadLive}/>

         </div>
   
      </>
  
  )
}

export default UploadVideo