import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import ProfileHeader from '../../components/helper/ProfileHeader'
import { Button, Select } from 'antd'
import { challengeType } from '../../utilitise/typeSelectorData'

function ChallengePage(props) {


const [lineCreated,setLineCreated] = useState(true)
const [lineParticipate,setLineParticipate] = useState(false)
const [lineFriend,setLineFriend] = useState(false)


useEffect(() => {
  if(lineCreated) {
   setLineParticipate(false)
   setLineFriend(false)
  }
}, [lineCreated])

useEffect(() => {
   if(lineParticipate) {
    setLineCreated(false)
    setLineFriend(false)
   }
 }, [lineParticipate])
 useEffect(() => {
   if(lineFriend) {
    setLineCreated(false)
    setLineParticipate(false)
   }
 }, [lineFriend])

  return (
    <>
        <div className="d-flex flex-column mb-0 mt-0 justify-content-evenly align-items-center star"
          style={{width:"100%",height:'29%',backgroundColor:''}}>
          
          
             <div className="d-flex   justify-content-start align-items-end  " 
                style={{fontSize:'10px',width:'100%',height:"60%"}}>

                <div className="d-flex flex-column justify-content-start  align-items-center  "
                     style={{fontSize:'10px',width:'30%',height:"100%"}}>

                     
                     <div  className="d-flex flex-column justify-content-center text-center  align-items-center "
                        style={{fontSize:'10px',width:'90%',height:"30%",backgroundColor:''}} >   
                        <h4 style={{fontSize:'13px',color:"white",fontWeight:'900', 
                        fontFamily:'Arsenal SC'
                      }}>{props.user.name.slice(0,15)}</h4>
                     </div> 
                     <Link to={"/profile/"+`${props.user._id}`} style={{width:'90%',height:"70%"}}>
                        <img   style={{fontSize:'10px',width:'100%',height:"100%",objectFit:'cover',borderRadius:'5px'}}
                           src={props.user.profile_img}  alt="" />
                     </Link>  
                </div>
                <div className="d-flex flex-column justify-content-start gap-0   align-items-center  "
                     style={{fontSize:'10px',width:'70%',height:"100%"}}>
 
                     <div  className="d-flex flex-column justify-content-center text-center  align-items-center "
                        style={{fontSize:'10px',width:'90%',height:"30%",backgroundColor:''}} >   
                         <h4 style={{fontSize:'12px',color:"#f3f2f7",fontWeight:'1000', 
                        fontFamily:'Arsenal SC serif'
                      }}>Explore your challenges in this section</h4>
                     </div> 
                     <div  className="d-flex justify-content-start mt-0 align-items-center "
                     style={{fontSize:'10px',width:'90%',height:"30%",backgroundColor:'gold',opacity:"70%",borderRadius:"5px"}} >
                        <Select
                            style={{width:"100%",height:"100%",fontSize:'13px' ,color:"black",
                              border:"none",fontWeight:"1400", 
                               backgroundColor:'',textAlign:"center",opacity:"70%", fontFamily:'Arsenal SC'}}
                            defaultValue="All" 
                             >   
                        
   
                            {challengeType.map((selection,index)=>{   
                                return ( 
                                   <Select.Option key={index} value = {selection.type}
                                        style={{ borderRadius:"0px",color:'black',
                                        backgroundColor:"", width:"100%",height:"100%" ,opacity:"70%"}} >
                                       <p style={{ color:'black', fontFamily:'Arsenal SC serif',fontWeight:"900",
                                        backgroundColor:"", width:"100%",fontSize:"14px"}}>{selection.type}</p> 
                                    </Select.Option> )
                            })} 
                        </Select>
                     </div>

                 <div className="d-flex   justify-content-between gap-0 align-items-center " 
                     style={{fontSize:'10px',width:'100%',height:"40%",backgroundColor:''}}>
                      <div className="d-flex flex-column justify-content-end gap-0 align-items-center "
                          style={{width:"23%",height:'100%',backgroundColor:''}}>
                            <img style={{width:"80%",height:'70%',objectFit:"fill", backgroundColor:'transparent'}}
                            src="../asset/material/challenge-logo.png" alt="" />
                      </div>
                      <Link to={"/newchallenge"} className="d-flex flex-column justify-content-end gap-0 align-items-center "
                        style={{width:"47%",height:'100%'}}>
                        <Button to={"/newchallenge"}
                        style={{fontSize:'11px',color:"white",fontWeight:'600', width:"98%",height:'65%',borderRadius:"10px",
                          backgroundColor:'blue',fontFamily:'Arsenal SC serif',border:"none",opacity:"60%"
                          }}>
                              NEW CHALLENGE
                        </Button>
                      </Link>
                      <div className="d-flex  flex-column  justify-content-end gap-0 align-items-center "
                        style={{width:"30%",height:'100%',backgroundColor:''}}>
                          <img style={{width:"50%",height:'80%',objectFit:"fill", color:'red'}}
                            src="../asset/material/social-challenge.png" alt="" />
                      </div>
                  </div> 



                </div>

             </div>
             
      

             <div className="d-flex justify-content-center gap-2 align-items-center "
                        style={{fontSize:'10px',width:'100%',height:"22%",backgroundColor:''
                           ,fontWeight:"500"
                        }}>
                           <Link  to={"/chpage/challenges"}
                                  className="d-flex justify-content-center align-items-center dark-bg "
                                  style={{fontSize:'10px',width:'31%',height:"100%",backgroundColor:''
                                   ,fontWeight:"500" }}>
                               <button 
                                style={{width:'99%',height:"95%" ,fontFamily:'Arsenal SC serif'
                                  ,borderRadius:"5px"   }}
                                   onClick={(e)=>{setLineCreated(true)}}
                                   className={lineCreated ? "highlight" : "nohighlight"}
                                  >
                                    
                                          CHALLENGES
                               </button>
                           </Link>
                           <Link  to={"/chpage/participatechallenges"}
                                  className="d-flex justify-content-center align-items-center "
                                  style={{fontSize:'10px',width:'31%',height:"100%"
                                    ,fontWeight:"500" }}>
                               <button 
                                  className={lineParticipate ? "highlight" : "nohighlight"}
                                  onClick={(e)=>{setLineParticipate(true)}}
                                  style={{width:'99%',height:"95%" ,fontFamily:'Arsenal SC serif'
                                  ,borderRadius:"5px" }}>
                                    
                                       PARTICIPATES
                               </button>
                           </Link>
                           <Link  to={"/chpage/challenges"}
                                  className="d-flex justify-content-center align-items-center "
                                  style={{width:'31%',height:"100%"
                                    ,fontWeight:"500" }}>
                               <button className={lineFriend ? "highlight" : "nohighlight"}
                                  onClick={(e)=>{setLineFriend(true)}}
                                  style={{width:'99%',height:"95%"
                                  ,fontFamily:'Arsenal SC serif ',borderRadius:"5px"  }}>
                                    
                                      PRIVATE
                               </button>
                           </Link>
                    
            </div>

           
          </div>
          <Outlet/>
    </>
  )
}

export default ChallengePage