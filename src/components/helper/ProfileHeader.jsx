import { Link } from "react-router-dom"
import { challengeType } from "../../utilitise/typeSelectorData"
import { useEffect, useState } from "react"
import { Select } from "antd"





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

    <div className="d-flex flex-column mt-0 mb-2 justify-content-start border align-items-center"
          style={{width:"100%",minHeight:'25%',backgroundColor:'#'}}>
          
             <div className="d-flex  bg-light justify-content-between gap-0 align-items-center " 
                style={{fontSize:'10px',width:'100%',minHeight:"20%",padding:'10px'}}>
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

             <hr style={{height:"2px"}} />
             <div className="d-flex   justify-content-start align-items-center bg-light border" 
                style={{fontSize:'10px',width:'100%',minHeight:"80%"}}>

                <div className="d-flex flex-column justify-content-end gap-2 align-items-center "
                     style={{fontSize:'10px',width:'20%',height:"100%",backgroundColor:''}}>
                  <p style={{fontSize:'12px',color:"#1f2426"}}> 
                      <span style={{fontSize:'10px',color:"#232324",fontWeight:'800', 
                        fontFamily:'Arsenal SC'
                        }}>  {props.user.name.slice(0,15)}</span>
                  </p>
                 <Link to={"/profile/"+`${props.user._id}`} style={{width:'100%',height:"74%"}}>
                   <img   style={{fontSize:'10px',width:'100%',height:'100%', objectFit:'fill'}}
                     src={props.user.profile_img}  alt="" />
                 </Link>  
                </div>


                <div className="d-flex flex-column justify-content-start align-items-center "
                     style={{fontSize:'10px',width:'80%',height:"100%",backgroundColor:''}}>
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
                     <div className="d-flex justify-content-evenly align-items-end  "
                     style={{fontSize:'10px',width:'96%',height:"40%",backgroundColor:''}} >
                        <Link to={""} className={lineAll ? "highlight" : ""}
                        onClick={(e)=>{setLineAll(true)}}
                        style={{fontSize:'12px',color:"#1b78cf",
                            fontFamily:'Arsenal SC'}}>
                             All Challenges
                        </Link>
                        <Link to={""} className={lineHot ? "highlight" : ""}
                        onClick={(e)=>{setLineHot(true)}}
                        style={{fontSize:'12px',color:"#1b78cf" ,
                            fontFamily:'Arsenal SC ' }}>
                            <span>Hot Challenges</span> 
                        </Link>
                        <Link to={""} className={lineFriend ? "highlight" : ""}
                        onClick={(e)=>{setLineFriend(true)}}
                        style={{fontSize:'12px',color:"#1b78cf",
                            fontFamily:'Arsenal SC'}}>
                          Friends Challenges
                        </Link>
                       
                     </div>
                </div>
             </div>
          </div>

  )
}

export default ProfileHeader