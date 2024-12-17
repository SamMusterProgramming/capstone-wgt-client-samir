import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRef } from 'react'


const PostFooter = (props) => {

  
  return (
    <div className='d-flex flex-row text-light justify-content-evenly gap-4 align-items-center videofooter'>
    <div className='d-flex align-items-center gap-3'>
       <button style={{color:props.isLikedColor,marginLeft:'15px'}} onClick={props.handleLikes} >
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">
          <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
        </svg>
       </button>
      <span style={{fontSize:'11px',marginLeft:'0px'}}>{props.likesVotesData.like_count}</span> 
    </div>
    <div className='d-flex align-items-center gap-3'>
       <button style={{color:props.isVotedColor,marginLeft:'15px'}} onClick={props.handleVotes} >
         <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
           <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
         </svg>
       </button>
       <div className='d-flex text-center gap-2 flex-column'>
       <span style={{fontSize:'12px',color:'pink'}}>vote</span> 
       <span style={{fontSize:'11px',marginLeft:'0px'}}>{props.likesVotesData.vote_count}</span> 
       </div>
      
    </div>
    <div className='d-flex align-items-center gap-3'>
       <button style={{color:'pink',marginLeft:'15px'}} >
         <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-chat-left-dots-fill" viewBox="0 0 16 16">
          <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793zm5 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
         </svg>
       </button>
      <span style={{fontSize:'11px',marginLeft:'0px'}}>{props.challenge.comments.length}</span> 
    </div>
    <div className='d-flex align-items-center gap-1'>
       <button style={{color:'pink',marginLeft:'15px'}} >
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-share-fill" viewBox="0 0 16 16">
            <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5"/>
         </svg>
       </button>
      {/* <span style={{fontSize:'11px',marginLeft:'0px'}}>{props.challenge.comments.length}</span>  */}
    </div>
    </div>
   

   
  )
}

export default PostFooter