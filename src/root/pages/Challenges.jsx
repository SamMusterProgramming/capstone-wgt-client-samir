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
  
     <div className=' d-flex gap-5 flex-wrap justify-content-center align-items-center ch-page'>
       
       { (challenges.length > 0)?
       ( <>
         { challenges.map((challenge,index)=>{

          return  ( 
                <ParticipantsDisplayer user={user}  participants={challenge.participants} key={index}
                challenge={challenge} setVideo_url={setVideo_url} />

          )
   
    }
    ) } 
     </> ) 
       :
       ( <div  className='d-flex flex-column gap-5 align-items-center justify-content-center'>
           <h3 style={{marginTop:"350px"}}>empty list </h3>
           <Link to="/newChallenge">
              <button style={{height:'45px',width:'240px',backgroundColor:"white",color:'black',borderRadius:'14px'}} > create new challenge </button>
           </Link>
           
         </div>
        )
      }
   
       {/* { challenges.map((challenge,index)=>{

            return  ( 
                            <ParticipantsDisplayer user={user}  participants={challenge.participants} key={index}
                            challenge={challenge} setVideo_url={setVideo_url} />

                      )
               
                }
                )} 
    </div> */}
    </div>

  )
}

export default Challenges