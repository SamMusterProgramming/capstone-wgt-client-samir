import { useContext, useEffect, useState } from 'react'
import './Page.css'
import axios from 'axios'
import ParticipantsDisplayer from '../../components/helper/ParticipantsDisplayer'
import { getUserParticipateChallenges } from '../../apiCalls'
import { Link } from 'react-router-dom'
import { AuthContent } from '../../context/AuthContent'

const ParticipateChallenge = ({user}) => {

    const {participateChallenges ,setParticipateChallenges} = useContext(AuthContent)  
    const [video_url ,setVideo_url] = useState()
    useEffect(() => {
    // apiCalls.js
    getUserParticipateChallenges(user._id,setParticipateChallenges) 
    }, [])
    
      return (


       
        <div className='d-flex flex-column  justify-content-start align-items-center'
         style={{width:"100%",height:"65%"}}>
            
            { (participateChallenges.length > 0)?
                ( <>
                   { participateChallenges.map((challenge,index)=>{

                      return  ( 
                        <>
                       <hr style={{width:"100%", border: '3px solid yellow',backgroundColor:"white"}} /> 
                        <ParticipantsDisplayer user={user}  participants = {challenge.participants} key={index}
                        challenge={challenge} setVideo_url={setVideo_url} />
                       <hr style={{width:"100%", border: '3px solid yellow',backgroundColor:"white"}} /> 
 
                       </> 

                         )
               }
               ) } 
               </> ) 
              :
           ( <div  className='d-flex flex-column gap-5 align-items-center mt-auto justify-content-center'
            >
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