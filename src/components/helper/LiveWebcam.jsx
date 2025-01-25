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
  const [isFullscreen, setIsFullscreen] = useState(false);

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
    // setIsFullscreen(true);
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
        <div style={{width:"100%",height:"100%"}}>
         <Webcam
         className='post-size'
        // style={{
        //   width: isFullscreen ? '100vw' : '100%',
        //   height: isFullscreen ? '100vh' : '100%',
        //   objectFit:"cover"
        // }}
        //  onUserMedia={handleUserMedia}
         ref={webcamRef}
         videoConstraints = {{
          facingMode: facingMode
        }}
         audio={true}
         controls   
        />

            {recording ?
                     (
                     <button id='stopCapture' onClick={handleStopRecording}
                      style={{position:"absolute", top:"22%",left:"8%",transform:"translate(-50%, 0%)"}}    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="86" height="46" fill="lightgreen" class="bi bi-record-btn-fill" viewBox="0 0 16 16">
                          <path d="M0 12V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2m8-1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                        </svg>
                        <p style={{fontSize:"10px"}}> recording...</p> 
                     </button>
                     
                     ):(
                       <button id='startCapture'  onClick={handleStartRecording}
                       style={{position:"absolute", top:"50%",left:"50%",transform:"translate(-50%, 0%)"}}    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentcolor" class="bi bi-play-fill" viewBox="0 0 16 16">
                         <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
                        </svg>
                        <p style={{fontSize:"10px"}}>start</p> 
                      </button>
                      
                     ) 
                  }
  
                  <button   onClick={handleFlipCamera}
                       style={{position:"absolute", top:"23%",left:"93%",transform:"translate(-50%, 0%)"}}    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="30" fill="white" className="bi bi-phone-flip" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M11 1H5a1 1 0 0 0-1 1v6a.5.5 0 0 1-1 0V2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v6a.5.5 0 0 1-1 0V2a1 1 0 0 0-1-1m1 13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-2a.5.5 0 0 0-1 0v2a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2a.5.5 0 0 0-1 0zM1.713 7.954a.5.5 0 1 0-.419-.908c-.347.16-.654.348-.882.57C.184 7.842 0 8.139 0 8.5c0 .546.408.94.823 1.201.44.278 1.043.51 1.745.696C3.978 10.773 5.898 11 8 11q.148 0 .294-.002l-1.148 1.148a.5.5 0 0 0 .708.708l2-2a.5.5 0 0 0 0-.708l-2-2a.5.5 0 1 0-.708.708l1.145 1.144L8 10c-2.04 0-3.87-.221-5.174-.569-.656-.175-1.151-.374-1.47-.575C1.012 8.639 1 8.506 1 8.5c0-.003 0-.059.112-.17.115-.112.31-.242.6-.376Zm12.993-.908a.5.5 0 0 0-.419.908c.292.134.486.264.6.377.113.11.113.166.113.169s0 .065-.13.187c-.132.122-.352.26-.677.4-.645.28-1.596.523-2.763.687a.5.5 0 0 0 .14.99c1.212-.17 2.26-.43 3.02-.758.38-.164.713-.357.96-.587.246-.229.45-.537.45-.919 0-.362-.184-.66-.412-.883s-.535-.411-.882-.571M7.5 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z"/>
                        </svg>
                  </button>
       
        </div>
      ):(
        <>
           
           <video
           className='post-size'
          //  onUserMedia={handleUserMedia}
           autoPlay
           volume="true"
           src={blob}
           controls
           />
           
          
          </>
      )}
     
   
          
     
    </div>
              <div className=' d-flex  justify-content-center gap-5 
              align-items-center postfooter'
              style={{width:"95%", height:"5%"}}>
{/*                  
                   { recording ?
                     (
                     <button id='stopCapture' onClick={handleStopRecording}
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" color="lightgreen" className="bi bi-camera-video-off-fill" viewBox="0 0 16 16">
                           <path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                           <path d="M9 6a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                           <path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"/>
                        </svg>
                     </button>
                     ):(
                       <button id='startCapture'  onClick={handleStartRecording}
                       >
                       <svg xmlns="http://www.w3.org/2000/svg" width="40" height="30" fill="red" className="bi bi-play" color='red'  viewBox="0 0 16 16">
                         <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M6 5.883a.5.5 0 0 1 .757-.429l3.528 2.117a.5.5 0 0 1 0 .858l-3.528 2.117a.5.5 0 0 1-.757-.43V5.884z"/>
                       </svg>
                      </button>
                     ) 
                  } */}

                      {/* <button   onClick={handleFlipCamera}
                      style={{color:'white'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="30" fill="white" className="bi bi-phone-flip" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M11 1H5a1 1 0 0 0-1 1v6a.5.5 0 0 1-1 0V2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v6a.5.5 0 0 1-1 0V2a1 1 0 0 0-1-1m1 13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-2a.5.5 0 0 0-1 0v2a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2a.5.5 0 0 0-1 0zM1.713 7.954a.5.5 0 1 0-.419-.908c-.347.16-.654.348-.882.57C.184 7.842 0 8.139 0 8.5c0 .546.408.94.823 1.201.44.278 1.043.51 1.745.696C3.978 10.773 5.898 11 8 11q.148 0 .294-.002l-1.148 1.148a.5.5 0 0 0 .708.708l2-2a.5.5 0 0 0 0-.708l-2-2a.5.5 0 1 0-.708.708l1.145 1.144L8 10c-2.04 0-3.87-.221-5.174-.569-.656-.175-1.151-.374-1.47-.575C1.012 8.639 1 8.506 1 8.5c0-.003 0-.059.112-.17.115-.112.31-.242.6-.376Zm12.993-.908a.5.5 0 0 0-.419.908c.292.134.486.264.6.377.113.11.113.166.113.169s0 .065-.13.187c-.132.122-.352.26-.677.4-.645.28-1.596.523-2.763.687a.5.5 0 0 0 .14.99c1.212-.17 2.26-.43 3.02-.758.38-.164.713-.357.96-.587.246-.229.45-.537.45-.919 0-.362-.184-.66-.412-.883s-.535-.411-.882-.571M7.5 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z"/>
                        </svg>
                      </button> */}
                  
                   {/* <VideoRecorder   setSwitchUploadLive={props.setSwitchUploadLive}/> */}
                  </div>
              
                </>  
  )
}

export default LiveWebcam