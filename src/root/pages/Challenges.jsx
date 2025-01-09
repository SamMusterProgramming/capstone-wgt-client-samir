import { useEffect, useState } from 'react'
import './Page.css'
import axios from 'axios'
import ParticipantsDisplayer from '../../components/helper/ParticipantsDisplayer'
import { getUserChallenges ,BASE_URL } from '../../apiCalls' 
import {Link} from 'react-router-dom'


const Challenges = ({user}) => {
 
const [challenges ,setChallenges] = useState([])   
const [video_url ,setVideo_url] = useState()


 useEffect(() => {
  //apiCalls.js
  getUserChallenges(user._id,setChallenges) // get user challenges video when the page loads

 },[])
 
       

  return (
  
     <div className=' d-flex gap-0 flex-wrap mt-0 justify-content-center align-items-center '>
       
       { (challenges.length > 0)?
       ( <>
         { challenges.map((challenge,index)=>{

          return  ( 
                <ParticipantsDisplayer user={user}  participants = {challenge.participants} key={index}
                challenge={challenge} setVideo_url={setVideo_url} />

          )
   
    }
    ) } 
     </> ) 
       :
       ( <div  className='d-flex flex-column gap- align-items-center mt-auto justify-content-center '
       >
             
                 <img style={{minHeight:'100%',width:'100%',objectFit:'fill'}} src="../../asset/material/empty.jpg" alt="" />
             
           <Link to="/newChallenge">
              <button style={{height:'45px',width:'240px',fontFamily:"Arsenal S ",backgroundColor:"lightblue",color:'black',borderRadius:'10px',fontSize:'13px'}} > create new challenge </button>
           </Link>
           
         </div>
        )
      }
    </div>

  )
}

export default Challenges