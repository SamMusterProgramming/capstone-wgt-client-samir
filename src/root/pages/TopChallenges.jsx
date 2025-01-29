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
   
    <div className=' d-flex  flex-column  justify-content-start align-items-center bg-light '
    style={{width:"100%",height:"65%"}}>
       
   
    { topChallenges.map((challenge,index)=>{

         return  ( 
              <>
                        <hr style={{width:"100%", border: '3px solid green',backgroundColor:"white"}} />
                         <ParticipantsDisplayer user={user}  participants={challenge.participants} key={index}
                         challenge={challenge} />


            </>        
              ) 
             }
             )} 
            <hr style={{width:"100%", border: '3px solid green',backgroundColor:"white"}} />

   </div>
  )
}

export default TopChallenges