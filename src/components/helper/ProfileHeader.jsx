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

    <div className="d-flex flex-column mt-0 mb-0 justify-content-evenly align-items-center bg-dark"
          style={{width:"100%",height:'35%',backgroundColor:'lightgray'}}>
          
             <div className="d-flex   justify-content-between gap-0 align-items-center " 
                style={{fontSize:'10px',width:'100%',height:"24%",padding:'10px',backgroundColor:'#f0aa7f'}}>
                  <div>
                      <p style={{fontSize:'12px',color:"#1f2426"}}> 
                      <span className="lead text" style={{fontSize:'12px',color:"#1877F2",fontWeight:'800', 
                        fontFamily:'Arsenal SC '
                      }}>SOCIAL-CHALLENGE</span>
                    </p>
                 </div>
                 <div>
                   <p style={{fontSize:'10px',color:"#1f2426",fontWeight:'700', 
                      fontFamily:'Arsenal SC '
                    }}>|_ {props.title} _|
                    </p>
                 </div>
                 <div>
                  <Link to={"/newchallenge"} style={{fontSize:'12px',color:"#1b78cf",fontWeight:'900', 
                      fontFamily:'Arsenal SC serif'
                    }}>
                         New Challenge
                  </Link>
                 </div>
               
             </div>
             {/* <hr style={{height:"2px"}} /> */}
             <div className="d-flex   justify-content-start align-items-center bg-light border" 
                style={{fontSize:'10px',width:'100%',height:"50%"}}>
                 <div className="d-flex flex-column justify-content-center align-items-center gap-1  "
                     style={{fontSize:'10px',width:'30%',height:"100%",backgroundColor:"#b09dcf"}}>
                      <p style={{fontSize:'11px',color:"#1f2426"}}> 
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
                     style={{fontSize:'10px',width:'70%',height:"100%",backgroundColor:'#b8def2'}}>
                     <div  className="d-flex justify-content-center text-center mt-2 align-items-center "
                        style={{fontSize:'10px',width:'90%',height:"25%",backgroundColor:''}} >   
                         <h4 style={{fontSize:'12px',color:"#232324",fontWeight:'800', 
                        fontFamily:'Arsenal SC'
                      }}>Explore and find challenges </h4>
                     </div> 
                     <div  className="d-flex justify-content-end mt-2 align-items-center "
                     style={{fontSize:'10px',width:'90%',height:"30%",backgroundColor:''}} >
                        <Select
                            style={{width:"100%",height:"100%",border:"solid 3px black",fontSize:'11px' ,border:"none",fontWeight:"600", backgroundColor:'',textAlign:"center"}}
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
                   
                </div>

             </div>

               <div className="d-flex justify-content-evenly align-items-center "
                        style={{fontSize:'10px',width:'100%',height:"24%",backgroundColor:'#b9cf9d'
                           ,fontWeight:"500"
                        }}>

                         <Link  to={""}
                                  className="d-flex justify-content-center align-items-center "
                                  style={{fontSize:'10px',width:'33%',height:"100%",backgroundColor:''
                                   ,fontWeight:"500" }}>
                               <button 
                                   className={lineAll ? "highlight" : "nohighlight"}
                                   onClick={(e)=>{setLineAll(true)}}
                                   style={{width:'99%',height:"95%" ,fontFamily:'Arsenal SC serif'
                                   ,borderRadius:"5px" ,color:"black"  }}>
                                    
                                         All Challenges
                               </button>
                           </Link>
                           <Link  to={""}
                                  className="d-flex justify-content-center align-items-center "
                                  style={{fontSize:'10px',width:'33%',height:"100%",backgroundColor:''
                                    ,fontWeight:"500" }}>
                               <button className={lineHot? "highlight" : "nohighlight"}
                                  onClick={(e)=>{setLineHot(true)}}
                                  style={{width:'99%',height:"95%" ,fontFamily:'Arsenal SC serif'
                                  ,borderRadius:"5px" ,color:"black" }}>
                                    
                                      Hot Challenges
                               </button>
                           </Link>
                           <Link  to={""}
                                  className="d-flex justify-content-center align-items-center "
                                  style={{width:'34%',height:"100%",backgroundColor:''
                                    ,fontWeight:"500" }}>
                               <button className={lineFriend ? "highlight" : "nohighlight"}
                                  onClick={(e)=>{setLineFriend(true)}}
                                  style={{width:'99%',height:"95%"
                                  ,fontFamily:'Arsenal SC serif',borderRadius:"5px" ,color:"black"  }}>
                                    
                                       Private
                               </button>
                           </Link>

                      {/* <Link to={""} className={lineAll? "highlight" : "nohighlight"}
                        onClick={(e)=>{setLineAll(true)}}
                        style={{fontSize:'12px',color:"#191c16",
                            fontFamily:'Arsenal SC serif'}}>
                             All Challenges
                        </Link>
                        <Link to={""} className={lineHot ? "highlight" : "nohighlight"}
                        onClick={(e)=>{setLineHot(true)}}
                        style={{fontSize:'12px',color:"#191c16" ,
                            fontFamily:'Arsenal SC serif' }}>
                            <span>Hot Challenges</span> 
                        </Link>
                        <Link to={""} className={lineFriend ? "highlight" : "nohighlight"}
                        onClick={(e)=>{setLineFriend(true)}}
                        style={{fontSize:'12px',color:"#191c16",
                            fontFamily:'Arsenal SC serif'}}>
                          Friend Challenges
                        </Link> */}
               </div>


          </div>

  )
}

export default ProfileHeader