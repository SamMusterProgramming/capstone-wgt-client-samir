import { Link } from 'react-router-dom'
import './Helper.css'
import { useEffect } from 'react'

const PostHeader = (props) => {


  useEffect(() => {
    console.log(props.userProfile)
  }, [])
  


  return (
    <div className=" d-flex justify-content-start align-items-center gap-4 post-header">
        <Link to ={`/profile/${props.user._id}`}>
                <img src={"http://localhost:8080" + props.user.profile_img} alt="Person"/>
        </Link> 
    <img src = {"http://localhost:8080"+props.user.profile_img}  alt=""/>  
    <div className='d-flex  gap-1 flex-column  text-center'>
        <div className="user-name">{props.user.name}</div>
        <div className="post-time">5 mins ago</div>
    </div>
    <div className='d-flex text-light  text-center'>
     <p style={{fontSize:12}}>
       
     </p>    
    </div>
    <div style={{marginLeft:'auto'}} className='d-flex flex-column justify-content-center align-items-center'>
       <p style={{fontSize:12}}>Competition Type</p>
        <span className="talenttype">{props.talentType}</span>
    </div>
    <img style={{backgroundColor:'pink'}} src = "/asset/material/chalenge.png"  alt="User Avatar"/>
</div>
  )
}

export default PostHeader