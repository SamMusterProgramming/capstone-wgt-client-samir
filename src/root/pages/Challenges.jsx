import { useEffect, useState } from 'react'
import './Page.css'
import axios from 'axios'
import ParticipantsDisplayer from '../../components/helper/ParticipantsDisplayer'
import { getUserChallenges ,BASE_URL } from '../../apiCalls' 



const Challenges = ({user}) => {
 
const [challenges ,setChallenges] = useState([])   
const [video_url ,setVideo_url] = useState()


 useEffect(() => {
 //apiCalls.js
  getUserChallenges(user._id,setChallenges) // get user challenges video when the page loads

 },[])
 
       

  return (
  
     <div className=' d-flex gap-5 flex-wrap justify-content-center align-items-center ch-page'>
       
   
       { challenges.map((challenge,index)=>{

            return  ( 
                            <ParticipantsDisplayer user={user}  participants={challenge.participants} key={index}
                            challenge={challenge} setVideo_url={setVideo_url} />

                      )
               
                }
                )} 
          </div>

  )
}

export default Challenges