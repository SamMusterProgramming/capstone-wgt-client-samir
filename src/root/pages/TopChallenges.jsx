import { useContext, useEffect, useState } from 'react'
import './Page.css'
import axios from 'axios'
import ParticipantsDisplayer from '../../components/helper/ParticipantsDisplayer'
import { authLogin, getTopChallenges } from '../../apiCalls'
import { AuthContent } from '../../context/AuthContent'

const TopChallenges = ({user}) => {

const {topChallenges} = useContext(AuthContent)

useEffect(() => {
       
}, [])

  return (
   
    <div className=' d-flex gap-2 flex-wrap  mb-2 justify-content-center align-items-center ch-page'>
       
   
    { topChallenges.map((challenge,index)=>{

         return  ( 
                         <ParticipantsDisplayer user={user}  participants={challenge.participants} key={index}
                         challenge={challenge}  />
              ) 
             }
             )} 
   </div>
  )
}

export default TopChallenges