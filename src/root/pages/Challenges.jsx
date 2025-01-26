import { useContext, useEffect, useState } from 'react'
import './Page.css'
import axios from 'axios'
import ParticipantsDisplayer from '../../components/helper/ParticipantsDisplayer'
import { getUserChallenges ,BASE_URL } from '../../apiCalls' 
import {Link} from 'react-router-dom'
import { AuthContent } from '../../context/AuthContent'
import { Button } from 'antd'


const Challenges = ({user}) => {
 
const {userChallenges ,setUserChallenges} = useContext(AuthContent) 
const [video_url ,setVideo_url] = useState()


 useEffect(() => {
  //apiCalls.js
  getUserChallenges(user._id,setUserChallenges)
 },[])
 
       

  return (
  
     <div className=' d-flex gap-4 flex-column mt-0 justify-content-start align-items-center'
     style={{width:"100%",height:"65%"}}>
       
       { (userChallenges.length > 0)?
       ( <>
         { userChallenges.map((challenge,index)=>{

          return  ( 
                <ParticipantsDisplayer user={user}  participants = {challenge.participants} key={index}
                challenge={challenge} setVideo_url={setVideo_url} />

          )
   
    }
    ) } 
     </> ) 
       :
       ( 
        <> 
           <img style={{minHeight:'86%',width:'100%',objectFit:'cover'}} src="../../asset/material/empty.jpg" alt="" />      
           <Link  style={{height:'14%',width:'100%'}}
            to="/newChallenge">
               <Button style={{height:'100%',width:'100%',fontFamily:"Arsenal CS ",backgroundColor:"#6b3d4b",color:'white',borderRadius:'10px',fontSize:'13px'}} >
                 Create New Challenge
               </Button>
           </Link>
           
        </>
        )
      }
    </div>

  )
}

export default Challenges