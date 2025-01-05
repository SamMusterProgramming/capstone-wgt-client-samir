import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import ProfileHeader from '../../components/helper/ProfileHeader'
import { Select } from 'antd'
import { challengeType } from '../../utilitise/typeSelectorData'

function ChallengePage(props) {


const [lineCreated,setLineCreated] = useState(true)
const [lineParticipate,setLineParticipate] = useState(false)
const [lineFriend,setLineFriend] = useState(false)

useEffect(() => {
  if(lineCreated) {
   setLineParticipate(false)}
}, [lineCreated])

useEffect(() => {
   if(lineParticipate) {
    setLineCreated(false)
   }
 }, [lineParticipate])

  return (
    <>
        <div className="d-flex flex-column mb-0 mt-0 justify-content-start align-items-center "
          style={{width:"100%",minHeight:'25%',backgroundColor:'white'}}>
          
             <div className="d-flex  bg-light justify-content-between gap-0 align-items-center " 
                style={{fontSize:'10px',width:'100%',height:"25%",padding:'10px'}}>
                  <div>
                      <p style={{fontSize:'12px',color:"#1f2426"}}> 
                      <span className="lead text" style={{fontSize:'12px',color:"#1877F2",fontWeight:'800', 
                        fontFamily:'Arsenal SC '
                      }}>SOCIAL-CHALLENGE</span>
                    </p>
                 </div>
                 <div>
                   <p style={{fontSize:'10px',color:"#1f2426",fontWeight:'600', 
                      fontFamily:'Arsenal SC'
                    }}>|_ USER CHALLENGES _|
                    </p>
                 </div>
                 <div>
                  <Link to={"/newchallenge"} style={{fontSize:'12px',color:"#1b78cf",fontWeight:'700', 
                      fontFamily:'Arsenal SC serif'
                    }}>
                          Create New Challenge
                  </Link>
                 </div>
               
             </div>
             <hr style={{height:"2px"}} />
             <div className="d-flex   justify-content-start align-items-end " 
                style={{fontSize:'10px',width:'100%',minHeight:"75%"}}>
                <div className="d-flex flex-column justify-content-end align-items-center gap-1 bg-light "
                     style={{fontSize:'10px',width:'30%',height:"100%"}}>
                      <p style={{fontSize:'12px',color:"#1f2426"}}> 
                      <span className="lead text" style={{fontSize:'10px',color:"#232324",fontWeight:'800', 
                        fontFamily:'Arsenal SC serif'
                      }}>  {props.user.name.toUpperCase().slice(0,20)}...</span>
                    </p>
                     <Link to={"/profile/"+`${props.user._id}`} style={{width:'90%',height:"74%"}}>
                        <img   style={{fontSize:'10px',width:'100%',height:"100%",objectFit:'cover',borderRadius:'5px'}}
                           src={props.user.profile_img}  alt="" />
                     </Link>  
                </div>
                <div className="d-flex flex-column justify-content-start align-items-center "
                     style={{fontSize:'10px',width:'70%',height:"100%",backgroundColor:''}}>
 
                     <div  className="d-flex justify-content-center text-center mt-2 align-items-center "
                        style={{fontSize:'10px',width:'90%',height:"30%",backgroundColor:''}} >   
                         <h4 style={{fontSize:'12px',color:"#232324",fontWeight:'800', 
                        fontFamily:'Arsenal SC'
                      }}>Explore your challenges in this section</h4>
                     </div> 
                     <div  className="d-flex justify-content-end mt-2 align-items-center "
                     style={{fontSize:'10px',width:'90%',height:"30%",backgroundColor:''}} >
                        <Select
                            style={{width:"100%",height:"100%",fontSize:'11px' ,border:"none",fontWeight:"600", backgroundColor:'',textAlign:"center"}}
                            defaultValue="ALL TYPE" 
                             >   
                            <Select.Option value = {"ALL CHALLENGES"} 
                                        style={{ color:'black',
                                        backgroundColor:"lightgray",width:"100%",height:"30px" }} >
                                       <p style={{ color:'black'}}>ALL TYPES</p> 
                             </Select.Option>
                            {challengeType.map((selection,index)=>{   
                                return ( 
                                   <Select.Option key={index} value = {selection.type}
                                        style={{ color:'black',
                                        backgroundColor:"lightgray",width:"100%",height:"30px" }} >
                                       <p style={{ color:'black'}}>{selection.type}</p> 
                                    </Select.Option> )
                            })} 
                        </Select>
                     </div>
                     <div className="d-flex justify-content-evenly align-items-end "
                     style={{fontSize:'10px',width:'96%',height:"40%",backgroundColor:''}} >
                        <Link to={"/chpage/challenges"}
                        className={lineCreated ? "highlight" : ""}
                        onClick={(e)=>{setLineCreated(true)}}
                        style={{fontSize:'11px',color:"#1b78cf",
                            fontFamily:'Arsenal SC serif'}}>
                               CREATED BY YOU
                        </Link>
                        <Link to={"/chpage/participatechallenges"}
                        className={lineParticipate? "highlight" : ""}
                        onClick={(e)=>{setLineParticipate(true)}}
                        style={{fontSize:'11px',color:"#1b78cf",
                            fontFamily:'Arsenal SC serif'}}>
                              PARTICIPATED IN
                        </Link>
                     
                       
                     </div>
                </div>
             </div>
           
          </div>
          <Outlet/>
    </>
  )
}

export default ChallengePage