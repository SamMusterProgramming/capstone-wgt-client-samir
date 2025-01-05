import { useEffect, useState } from 'react'
import './Page.css'
import axios from 'axios'
import ParticipantsDisplayer from '../../components/helper/ParticipantsDisplayer'
import { getUserParticipateChallenges } from '../../apiCalls'
import { Link } from 'react-router-dom'

const ParticipateChallenge = ({user}) => {

    const [participateChallenges ,setParticipateChallenges] = useState([])  
    const [video_url ,setVideo_url] = useState()
    useEffect(() => {
    // apiCalls.js
    getUserParticipateChallenges(user._id,setParticipateChallenges) // 
           
    }, [])
    
      return (


       
        <div className=' d-flex gap-5 flex-wrap  mt-2 justify-content-center align-items-center '>
            
            { (participateChallenges.length > 0)?
                ( <>
                   { participateChallenges.map((challenge,index)=>{

                      return  ( 
                        <ParticipantsDisplayer user={user}  participants = {challenge.participants} key={index}
                        challenge={challenge} setVideo_url={setVideo_url} />

                         )
               }
               ) } 
               </> ) 
              :
           ( <div  className='d-flex flex-column gap-5 align-items-center mt-auto justify-content-center'>
              <div>
                 <img src="../../asset/material/empty.jpg" alt="" />
              </div>
              <Link to="/newChallenge">
                  <button style={{height:'45px',width:'240px',fontFamily:"Arsenal S ",backgroundColor:"lightblue",color:'black',borderRadius:'10px',fontSize:'12px'}} > create new challenge </button>
              </Link>  
           </div>
          )
          }  
       </div>
      )
}

export default ParticipateChallenge