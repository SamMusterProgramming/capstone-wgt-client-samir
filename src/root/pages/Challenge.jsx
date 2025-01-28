import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { AuthContent } from '../../context/AuthContent';
import { getChallengeById, getTopChallenges, getUserParticipateChallenges, quitChallenge } from '../../apiCalls';
import Participant from '../../components/Participant';
import DialogConfirm from '../../components/helper/DialogConfirm';
import { Button } from 'antd';

const Challenge = () => {
  const {user,setTopChallenges,setParticipateChallenges} = useContext(AuthContent)
  const  challenge_id  = useParams().id;
  const [topChallenger ,setTopChallenger] = useState("")
  const [ownChallenge , setOwnChallenge ] = useState(false)
  const [reRender,setReRender] = useState(false)
  const [challenge,setChallenge] = useState(null)
  const[isExpired,setIsExpired]= useState(false)

  const navigate = useNavigate("")

  
  useEffect(() => {
   challenge_id && getChallengeById(challenge_id,setChallenge,setIsExpired)
  }, [])  

  useEffect(() => { //logic here is to disable the add challenge button if the user has already participated  
    if(isExpired) { 
      navigate('/expired')
      setTimeout(() => {
          navigate('/notifications')
      }, 2000);
    }        
   }, [isExpired]) 
   
  useEffect(() => { //logic here is to disable the add challenge button if the user has already participated  
     challenge && challenge.participants.map(participant =>{
      if(participant.user_id === user._id) {
          setOwnChallenge(true)
       } 
    })
          
    }, [challenge])   
  
  useEffect(() => { 
    if(challenge){
    let obj = {
      topChallenger : challenge.participants[0].name,
      votes : challenge.participants[0].votes
    } 
    challenge.participants.forEach(participant => {
      if(participant.votes > obj.votes) obj = {
          ...obj,
          topChallenger:participant.name,
          votes:participant.votes
        }
    });
    setTopChallenger({...obj})
    console.log(challenge)
  }
  },[challenge] )

  const handleQuit = (e) => {
    quitChallenge(challenge._id,user._id).
    then(res => {
       const you =  challenge.participants.find(participant => participant.user_id == user._id)
       const fileRef = ref(storage,you.video_url); 
       deleteObject(fileRef)
        .then(() => {
         console.log("File deleted successfully!");
          navigate('/chpage/participatechallenges')
         })
        .catch((error) => {
        console.error("Error deleting file:", error);
         });  
         getTopChallenges(user._id,setTopChallenges)
         getUserParticipateChallenges(user._id,setParticipateChallenges)
         navigate('/home')

    })
  
  }

  return (
    <div className="d-flex flex-column  mt-0  bg-dark justify-content-start align-items-center star"
    style={{width:'100%',height:"100%",overflow:"scroll"}}>
        {challenge ? 
        (
        <>  

       <div className='d-flex justify-content-start   align-items-center '
          style={{minHeight:"3%",minWidth:"100%",backgroundColor:""}}>
            <div className='d-flex  justify-content-center gap-1 align-items-center'
               style={{height:"100%",minWidth:"25%",backgroundColor:""}}>
                <span style={{fontSize:'9px',fontWeight:"600",marginTop:'0px', fontFamily:'Arsenal SC serif'}}>By</span>
                <p style={{fontSize:'9px',fontWeight:"600",marginTop:'0px',color:'gold',fontFamily:'Arsenal SC serif'}}> {challenge.name}</p>
            </div>
            <div className='d-flex justify-content-center gap-1 align-items-center'
               style={{height:"100%",minWidth:"25%",backgroundColor:""}}>
                <span style={{fontSize:'10px',fontWeight:"600", fontFamily:'Arsenal SC serif'}}>Top  </span>
                <p style={{fontSize:'9px',fontWeight:"600",marginTop:'0px',color:'gold',fontFamily:'Arsenal SC serif'}}>{topChallenger.topChallenger}</p>
            </div>
            <div className='d-flex f justify-content-center gap-2 align-items-center'
               style={{height:"100%",minWidth:"25%",backgroundColor:""}}>
                {/* <span style={{fontSize:'10px',fontWeight:"600", fontFamily:'Arsenal SC serif'}}>Top Challenger </span> */}
                           <span style={{fontSize:'10px',fontWeight:"600",marginTop:'0px', fontFamily:'Arsenal SC serif'}}>{challenge.participants.length} </span>
                <p style={{fontSize:'9px',fontWeight:"600",marginTop:'0px',color:'gold',fontFamily:'Arsenal SC serif'}}>  Participants</p>
                {/* <p style={{fontSize:'9px',fontWeight:"600",marginTop:'0px',color:'gold',fontFamily:'Arsenal SC serif'}}>{topChallenger.topChallenger}</p> */}
            </div>
            <div className='d-flex flex-column justify-content-center gap align-items-center'
               style={{height:"100%",minWidth:"10%",backgroundColor:""}}>
                <span style={{fontSize:'10px',fontWeight:"600",marginTop:'0px',color:'gold',fontFamily:'Arsenal SC serif '}}> {challenge.privacy.toLowerCase()}</span>      
            </div>
            <div className='d-flex flex-column  justify-content-center  align-items-center'
               style={{height:"100%",minWidth:"15%",backgroundColor:""}}>
                 <span style={{fontSize:'10px',fontWeight:"600",color:'white',fontFamily:'Arsenal SC serif'}}> {challenge.type.toLowerCase()}</span> 
            </div>
        </div>
        
        <div className='d-flex gap-3 justify-content-start align-items-center '
                 style={{width:"100%",height:"4%"}}> 
                  <Link to={`/viewchallenge/${challenge._id}`} className='d-flex mt-0 justify-content-center align-items-center'
                      style={{width:"15%",minHeight:"100%",padding:'10px' ,backgroundColor:""}}>
                      <span style={{fontSize:'10px', color:'lightblue', fontFamily:'Arsenal SC serif',fontWeight:'900'}} >
                        Challenge
                      </span>
                  </Link>
                  <div className='d-flex mt-0 justify-content-center align-items-center '
                    style={{width:"75%",minHeight:"100%",padding:'0px',backgroundColor:''}}>
                        <p style={{fontSize:'10px',color:"white",fontFamily:'Arsenal SC serif',
                          fontWeight:"900"
                        }}> {challenge.desc}</p>
                  </div>
         </div>
        
        {/* replay to challenge here  */}

        
        {/* <hr style={{width:"100%", border: '3px solid yellow',backgroundColor:"white"}}/> */}

       
        {challenge.participants.map( participant =>{
            return <Participant participant={participant} setReRender ={setReRender} reRender={reRender}
            user={user} challenge_id ={challenge_id} challenge={challenge} />
        })
        }

       <div className='d-flex flex-row  justify-content-between align-items-center '  //#1f1e15
            style={{minHeight:'6%',width:'100%',backgroundColor:''}} >
              
                   {!ownChallenge? (    
                     <DialogConfirm handleAction={(e)=> navigate(`/matchchallenge/${challenge._id}`)} style={{width:'90px',color:"#0ddb82",textAlign:'center',
                      backgroundColor:'',height:'25%',fontSize:"12px",fontWeight:"800",border:'none', fontFamily:'Arsenal SC serif'
                    }}   action={"JOIN"} message ={'are you sure you want to replay to the challenge'}  />
                  ):(
                    <>
                    {challenge.participants.length == 1 ? 
                      (
                        <DialogConfirm 
                        // handleAction={handleDelete} 
                        style={{width:'25%',color:"#b81842",textAlign:'center',
                          backgroundColor:'',height:'100%',fontSize:"12px",fontWeight:"800",border:'none', fontFamily:'Arsenal SC serif'
                         }} action={"DELETE"} message ={'are you sure you want to delete  the challenge'} />
                      ):(
                        <DialogConfirm
                         handleAction={handleQuit} 
                         style={{width:'25%',color:"#b81842",textAlign:'center',
                          backgroundColor:'',height:'100%',fontSize:"12px",fontWeight:"800",border:'none', fontFamily:'Arsenal SC serif'
                         }} action={"RESIGN"} message ={'are you sure you want to resign from the challenge'} />
                      )} 
                    </>
                    )}
            
                   
                    <div className='d-flex  align-items-center gap-2 justify-content-start'
                      style={{widh:"50%" , height:"100%"}}>  
                     <button style={{backgroundColor:'',border:'none'
                      ,width:'100%',color:"white",height:'100%',fontSize:"13px",fontWeight:"800", fontFamily:'Arsenal SC serif'
                      }}>
                      Rate
                   </button>    
                    <p style={{fontSize:'11px',color:'white',marginTop:"0px"}}>4.5</p> 
                    <span style={{fontSize:'11px',color:'gold'}}> *****  </span>
                      {/* <p style={{fontSize:'11px',color:'white',marginTop:"-9px",marginLeft:"29px"}}> </p> */}
                   </div>

                   <button style={{backgroundColor:'',border:'none'
                      ,width:'25%',color:"#114fc2",height:'100%',fontSize:"11px",fontWeight:"800", fontFamily:'Arsenal SC serif'
                      }}>
                      FOLLOW
                   </button>
            
        </div>
        </>
        ): 
        (
          <div>
        
             {/* <Navigate ;to="/home" />  */}
          </div>
        )}
         
    </div>
  )
}

export default Challenge