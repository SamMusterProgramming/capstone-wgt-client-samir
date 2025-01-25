import React, { useState } from 'react'
import VideoUploader from './VideoUploader'
import VideoRecorder from './VideoRecorder'



const UploadVideo = (props) => {
    const [volume, setVolume] = useState(1);

    const handleUserMedia = (stream) => {
        const audio = new Howl({
          src: [stream.getAudioTracks()[0]],
          html5: true, 
          volume: volume,
        });
        audio.play();
      };
      const handleVolumeChange = (event) => {
        const newVolume = parseFloat(event.target.value);
        setVolume(newVolume);
      };

  return (
    <>
         <div className="postholder">

            { props.videoSrc ? 
            (
                <video 
                    className='post-size'
                    src={props.videoSrc}
                    // fluid="true"
                    controls
                    audio ={true}
                    typeof='video'
                    
                />
            ):
            (         
                <video 
                    className='post-size'
                    src= "" //{videoSrc}
                    // fluid="true"  
                   
                    controls
                   
                />
            ) 
           
            }
     
         </div>
        
   
      </>
  
  )
}

export default UploadVideo