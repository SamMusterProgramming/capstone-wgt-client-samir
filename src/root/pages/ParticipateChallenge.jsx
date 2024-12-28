import { useEffect, useState } from 'react'
import './Page.css'
import axios from 'axios'
import ParticipantsDisplayer from '../../components/helper/ParticipantsDisplayer'
import { getUserParticipateChallenges } from '../../apiCalls'

const ParticipateChallenge = ({user}) => {

    const [participateChallenges ,setParticipateChallenges] = useState([])  
    const [video_url ,setVideo_url] = useState()
    useEffect(() => {
    // apiCalls.js
    getUserParticipateChallenges(user._id,setParticipateChallenges) // get top challenges for user 
           
    }, [])
    
      return (
       
        <div className=' d-flex gap-3 flex-wrap  mt-2 justify-content-center align-items-center ch-page'>
           
       
        { participateChallenges.map((challenge,index)=>{
    
             return  ( 
                             <ParticipantsDisplayer user={user}  participants={challenge.participants} key={index}
                             challenge={challenge} setVideo_url={setVideo_url} />
                  ) 
                 }
                 )} 
       </div>
      )
}

export default ParticipateChallenge