import { useCallback, useRef, useState } from "react"
import Webcam from "react-webcam";
import RecordRTC from 'recordrtc'
import VideoRecorder from "./VideoRecorder";


const LiveWebcam = (props) => {
    
  const webcamRef = useRef(null);
  const previewRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false)
  const [recordedChunks, setRecordedChunks] = useState([])
  const [blob ,setBlob] = useState(null)   
  const [facingMode, setFacingMode] = useState('user'); // Default to front camera
  const [volume, setVolume] = useState(1);

  const handleFlipCamera = () => {
    setFacingMode(facingMode === 'user' ? 'environment' : 'user');
  };
  const handleDataAvailable = useCallback(({data})=>{
    if(data.size > 0){
      setRecordedChunks(prev => prev.concat(data));
    }
  },[setRecordedChunks]) 
   
  const handleStartRecording = useCallback(()=>{
    setRecording(true);
    mediaRecorderRef.current = RecordRTC(webcamRef.current.stream,{
      mimeType: "video/webm"
    })
    mediaRecorderRef.current.startRecording();
    mediaRecorderRef.current.ondataavailable = handleDataAvailable;
  },[webcamRef , setRecording,mediaRecorderRef,handleDataAvailable])
 
  const handleStopRecording = useCallback(()=> {
    setRecording(false);
    mediaRecorderRef.current.stopRecording(()=>{
      const blob = mediaRecorderRef.current.getBlob();
      setRecordedChunks([blob])
      const url = URL.createObjectURL(blob)
      setBlob(url);
      props.setVideoSrc(url)   
    
      props.setFile(blob)
      props.setSwitchUploadLive(false)
    })
  },[setRecording,mediaRecorderRef]) 

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
      {!blob?(
        <>
         <Webcam
         className='post-size'
        //  onUserMedia={handleUserMedia}
         ref={webcamRef}
         videoConstraints = {{
          facingMode: facingMode
        }}
         audio={true}
         controls   
        />
       
        </>
      ):(
        <>
           
           <video
           className='post-size'
           onUserMedia={handleUserMedia}
           autoPlay
           volume="true"
           src={blob}
           controls
           />
           
          
          </>
      )}
     
   
          
     
    </div>
              <div className='container-fluid d-flex gap-2 justify-content-between 
              align-items-center postfooter'>
                 
                   { recording ?
                     (
                     <button id='stopCapture' onClick={handleStopRecording}
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" color="lightgreen" className="bi bi-camera-video-off-fill" viewBox="0 0 16 16">
                           <path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                           <path d="M9 6a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                           <path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"/>
                        </svg>
                     </button>
                     ):(
                       <button id='startCapture'  onClick={handleStartRecording}
                       >
                       <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-play" color='red'  viewBox="0 0 16 16">
                         <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M6 5.883a.5.5 0 0 1 .757-.429l3.528 2.117a.5.5 0 0 1 0 .858l-3.528 2.117a.5.5 0 0 1-.757-.43V5.884z"/>
                       </svg>
                      </button>
                     ) 
                  }

                      <button   onClick={handleFlipCamera}
                      style={{color:'white'}}>flip</button>
                  
                   <VideoRecorder   setSwitchUploadLive={props.setSwitchUploadLive}/>
                  </div>
                </>  
  )
}

export default LiveWebcam