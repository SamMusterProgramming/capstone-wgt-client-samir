import { useEffect, useState } from 'react'
import './Page.css'
import axios from 'axios'
import ParticipantsDisplayer from '../../components/helper/ParticipantsDisplayer'
import { getTopChallenges } from '../../apiCalls'

const TopChallenges = ({user}) => {

const [topChallenges ,setTopChallenges] = useState([])  
const [video_url ,setVideo_url] = useState()
useEffect(() => {
// apiCalls.js
getTopChallenges(user._id,setTopChallenges) // get top challenges for user 
       
}, [])

  return (
   
    <div className=' d-flex gap-5 flex-wrap mb-5 mt-5  justify-content-center align-items-center ch-page'>
       
   
    { topChallenges.map((challenge,index)=>{

         return  ( 
                         <ParticipantsDisplayer user={user}  participants={challenge.participants} key={index}
                         challenge={challenge} setVideo_url={setVideo_url} />
              ) 
             }
             )} 
   </div>
  )
}

export default TopChallenges