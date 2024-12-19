import { Link } from 'react-router-dom'
import './Helper.css'
import { useEffect } from 'react'
import { BASE_URL } from '../../apiCalls'

const PostHeader = (props) => {


  useEffect(() => {
    console.log(props.userProfile)
  }, [])
  


  return (
    <div className=" d-flex justify-content-start align-items-center gap-4 post-header">
        <Link to ={`/profile/${props.user._id}`}>
                <img src={BASE_URL+ props.user.profile_img} alt="Person"/>
        </Link> 
        <div className='d-flex  gap-1 flex-column  text-center'>
            <div className="user-name">{props.user.name}</div>
            <div className="post-time">5 mins ago</div>
        </div>
        <div className='d-flex text-light  text-center'>
        <p style={{fontSize:12}}>
          
        </p>    
        </div>
        <div style={{marginLeft:'auto'}} className='d-flex flex-column justify-content-center align-items-center'>
          <p style={{fontSize:12}}>Competition</p>
            <span className="talenttype">{props.talentType}</span>
        </div>
        <img style={{backgroundColor:'pink'}} src = "/asset/material/chalenge.png"  alt="User Avatar"/>
</div>
  )
}

export default PostHeader