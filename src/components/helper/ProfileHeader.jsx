import { Link } from "react-router-dom"
import { challengeType } from "../../utilitise/typeSelectorData"
import { useEffect, useState } from "react"
import { Select } from "antd"





const ProfileHeader = (props) => {

const [selectedType,setSelectedType]= useState("ADVENTURE")
  
// useEffect(() => {
//   challengeType.push({type:"all"})
// }, [])


return (

    <div className="d-flex flex-column mb-4 mt-0 justify-content-start border align-items-center"
          style={{width:"100%",minHeight:'25%',backgroundColor:'#b6d1de'}}>
          
             <div className="d-flex  bg-light justify-content-between gap-0 align-items-center " 
                style={{fontSize:'10px',width:'100%',minHeight:"20%",padding:'10px'}}>
                  <div>
                      <p style={{fontSize:'10px',color:"#1f2426"}}> 
                      <span className="lead text" style={{fontSize:'10px',color:"#232324",fontWeight:'800', 
                        fontFamily:'monospace'
                      }}>  {props.user.name.toUpperCase()}</span>
                    </p>
                 </div>
                 <div>
                   <p style={{fontSize:'10px',color:"#1f2426",fontWeight:'500', 
                      fontFamily:'monospace'
                    }}>|_ {props.title} _|
                    </p>
                 </div>
                 <div>
                  <Link to={"/newchallenge"} style={{fontSize:'10px',color:"#1b78cf",fontWeight:'500', 
                      fontFamily:'revert'
                    }}>
                          Create New Challenge
                  </Link>
                 </div>
               
             </div>
             <div className="d-flex   justify-content-start align-items-center" 
                style={{fontSize:'10px',width:'100%',minHeight:"80%"}}>
                <div className="d-flex justify-content-center align-items-center "
                     style={{fontSize:'10px',width:'20%',height:"68%",borderRadius:'50%',backgroundColor:''}}>
                 <Link to={"/profile/"+`${props.user._id}`} style={{width:'90%',height:"90%"}}>
                   <img   style={{fontSize:'10px',width:'100%',height:'95%', objectFit:'cover',borderRadius:'50%'}}
                     src={props.user.profile_img}  alt="" />
                 </Link>  
                </div>
                <div className="d-flex flex-column justify-content-start align-items-center "
                     style={{fontSize:'10px',width:'85%',height:"100%",backgroundColor:''}}>

                     <div  className="d-flex justify-content-end mt-2 align-items-center "
                     style={{fontSize:'10px',width:'90%',height:"50%",backgroundColor:''}} >
                        <Select
                            style={{width:"100%",height:"90%",fontSize:'11px' ,border:"none",fontWeight:"600", backgroundColor:'',textAlign:"center"}}
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
                     <div className="d-flex justify-content-evenly align-items-center "
                     style={{fontSize:'10px',width:'96%',height:"40%",backgroundColor:''}} >
                        <Link to={"/challengers"}
                        style={{fontSize:'9px',color:"#1b78cf",fontWeight:'800', 
                            fontFamily:'revert'}}>
                             All Challenges
                        </Link>
                        <Link to={"/challengers"}
                        style={{fontSize:'9px',color:"#1b78cf",fontWeight:'800', 
                            fontFamily:'revert'}}>
                            Hot Challenges
                        </Link>
                        <Link to={"/challengers"}
                        style={{fontSize:'9px',color:"#1b78cf",fontWeight:'800', 
                            fontFamily:'revert'}}>
                          Friends Challenges
                        </Link>
                       
                     </div>
                </div>
             </div>
          </div>

  )
}

export default ProfileHeader