import { Link } from "react-router-dom"
import { challengeType } from "../../utilitise/typeSelectorData"
import { useEffect, useState } from "react"
import { Button, Select } from "antd"





const ProfileHeader = (props) => {

const [selectedType,setSelectedType]= useState("ADVENTURE")
const [lineAll,setLineAll] = useState(true)
const [lineHot,setLineHot] = useState(false)
const [lineFriend,setLineFriend] = useState(false)

useEffect(() => {
  if(lineAll) {
   setLineFriend(false)
   setLineHot(false)}
}, [lineAll])
useEffect(() => {
   if(lineHot) {
    setLineFriend(false)
    setLineAll(false)}
 }, [lineHot])
 useEffect(() => {
   if(lineFriend) {
    setLineAll(false)
    setLineHot(false)}
 }, [lineFriend])

return (

    <div className="d-flex flex-column mt-0 mb-0 justify-content-evenly align-items-center img-container "
          style={{width:"100%",height:'29%',backgroundColor:''}}>
        
             {/* <hr style={{height:"2px"}} /> */}
             <div className="d-flex  justify-content-start align-items-center " 
                style={{fontSize:'10px',width:'100%',height:"60%"}}>

                 <div className="d-flex flex-column justify-content-start align-items-center gap-1  "
                     style={{fontSize:'10px',width:'30%',height:"100%",backgroundColor:""}}>  
                      <div  className="d-flex flex-column justify-content-center text-center  align-items-center "
                        style={{fontSize:'10px',width:'90%',height:"30%",backgroundColor:''}} >   
                         <span className="lead text" style={{fontSize:'10px',color:"white",fontWeight:'800', 
                          fontFamily:'Arsenal SC serif'
                          }}>  {props.user.name.toUpperCase().slice(0,20)}...</span>
                      </div>    
                     <Link to={"/profile/"+`${props.user._id}`} style={{width:'90%',height:"70%"}}>
                        <img   style={{fontSize:'10px',width:'100%',height:"100%",objectFit:'cover',borderRadius:'5px'}}
                           src={props.user.profile_img}  alt="" />
                     </Link>  
                </div>


                <div className="d-flex flex-column justify-content-start align-items-center "
                     style={{fontSize:'10px',width:'70%',height:"100%",backgroundColor:''}}>
                     <div  className="d-flex flex-column justify-content-center text-center  align-items-center "
                        style={{fontSize:'10px',width:'90%',height:"30%",backgroundColor:''}} >   
                        <h4 style={{fontSize:'14px',color:"white",fontWeight:'800', 
                        fontFamily:'Arsenal SC serif'
                        }}>Explore and find challenges </h4>
                     </div>                          
                     <div  className="d-flex flex-column justify-content-end  align-items-center "
                        style={{fontSize:'10px',width:'90%',height:"30%"
                        ,borderRadius:"5px"}} >
                        <Select
                            style={{width:"98%",height:"100%",border:"solid 3px black",fontSize:'14px' ,border:"none",
                              fontWeight:"600", backgroundColor:'#d19f15',opacity:"70%",textAlign:"center"}}
                            defaultValue="All" 
                             >   
                            {/* <Select.Option value = {"ALL CHALLENGES"} 
                                        style={{ color:'black',fontFamily:'Arsenal SC',
                                        backgroundColor:"#d19f15",width:"100%",height:"30px",opacity:"70%" }} >
                                       <p style={{ color:'black'}}></p> 
                             </Select.Option> */}
                            {challengeType.map((selection,index)=>{   
                                return ( 
                                   <Select.Option key={index} value = {selection.type}
                                        style={{ color:'black',fontFamily:'Arsenal SC',
                                        backgroundColor:"",width:"100%",height:"30px" }} >
                                         <p style={{ color:'black', fontFamily:'Arsenal SC serif',fontWeight:"900",
                                        backgroundColor:"", width:"100%",fontSize:"14px"}}>{selection.type}</p> 
                                    </Select.Option> )
                            })} 
                        </Select>
                     </div>

                     <div className="d-flex   justify-content-between gap-0 align-items-center " 
                        style={{fontSize:'10px',width:'100%',height:"40%",padding:'0px',backgroundColor:''}}>

                          <div className="d-flex flex-column justify-content-end gap-0 align-items-center "
                          style={{width:"23%",height:'100%',backgroundColor:''}}>
                              <img style={{width:"80%",height:'70%',objectFit:"fill", backgroundColor:''}}
                              src="../asset/material/challenge-logo.png" alt="" />
                        </div>
                        <Link to={"/newchallenge"} className="d-flex flex-column justify-content-end gap-0 align-items-center "
                          style={{width:"47%",height:'100%'}}>
                          <Button to={"/newchallenge"}
                          style={{fontSize:'11px',color:"white",fontWeight:'900', width:"94%",height:'65%'
                            ,backgroundColor:'blue',fontFamily:'Arsenal SC ',border:"none"
                            }}>
                                NEW CHALLENGE
                          </Button>
                        </Link>
                        <div className="d-flex flex-column  justify-content-end gap-0 align-items-center "
                          style={{width:"30%",height:'100%',backgroundColor:''}}>
                            <img style={{width:"80%",height:'70%',objectFit:"cover", color:'red'}}
                              src="../asset/material/timeline1.webp" alt="" />
                        </div>
                      </div>
                   
                </div>

             </div>

               <div className="d-flex justify-content-evenly align-items-center "
                        style={{fontSize:'10px',width:'100%',height:"22%",backgroundColor:''
                           ,fontWeight:"500"
                        }}>

                         <Link  to={""}
                                  className="d-flex justify-content-center align-items-center  "
                                  style={{fontSize:'10px',width:'31%',height:"100%",backgroundColor:''
                                   ,fontWeight:"500" }}>
                               <button 
                                   className={lineAll ? "highlight1" : "nohighlight1"}
                                   onClick={(e)=>{setLineAll(true)}}
                                   style={{width:'99%',height:"95%" ,fontFamily:'Arsenal SC serif'
                                   ,borderRadius:"5px"  }}>
                                    
                                         TRENDING
                               </button>
                           </Link>
                           <Link  to={""}
                                  className="d-flex justify-content-center align-items-center "
                                  style={{fontSize:'10px',width:'31%',height:"100%",backgroundColor:''
                                    ,fontWeight:"500" }}>
                               <button className={lineHot? "highlight1" : "nohighlight1"}
                                  onClick={(e)=>{setLineHot(true)}}
                                  style={{width:'99%',height:"95%" ,fontFamily:'Arsenal SC serif'
                                  ,borderRadius:"5px"  }}>
                                    
                                      HOT
                               </button>
                           </Link>
                           <Link  to={""}
                                  className="d-flex justify-content-center align-items-center "
                                  style={{width:'31%',height:"100%",backgroundColor:''
                                    ,fontWeight:"500" }}>
                               <button className={lineFriend ? "highlight1" : "nohighlight1"}
                                  onClick={(e)=>{setLineFriend(true)}}
                                  style={{width:'99%',height:"95%"
                                  ,fontFamily:'Arsenal SC serif',borderRadius:"5px"  }}>
                                    
                                       FRIENDS
                               </button>
                           </Link>

               </div>


          </div>

  )
}

export default ProfileHeader