import { useContext, useEffect, useState } from 'react'
import './Page.css'
import axios from 'axios'
import ParticipantsDisplayer from '../../components/helper/ParticipantsDisplayer'
import { authLogin, getTopChallenges } from '../../apiCalls'
import { AuthContent } from '../../context/AuthContent'

const TopChallenges = ({user}) => {

const {topChallenges,setTopChallenges} = useContext(AuthContent)

useEffect(() => {
  getTopChallenges(user._id,setTopChallenges)
}, [])

  return (
   
    <div className=' d-flex gap-2 flex-wrap  mb-0 justify-content-center align-items-center '
    style={{width:"100%",height:"65%"}}>
       
   
    { topChallenges.map((challenge,index)=>{

         return  ( 
                         <ParticipantsDisplayer user={user}  participants={challenge.participants} key={index}
                         challenge={challenge} />
              ) 
             }
             )} 
   </div>
  )
}

export default TopChallenges