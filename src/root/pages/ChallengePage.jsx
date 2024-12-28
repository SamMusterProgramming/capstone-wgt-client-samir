import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function ChallengePage() {
  return (
    <>
        <div className='d-flex mt-2 justify-content-between align-items-center  gap-2'
        style={{minWidth:'100%' ,height:'8%', background:'#141310'}}>
           <Link to ='challenges' style={ {width:"32%" ,height:"100%"} } >
           <button type='button' style={{border:'none',width:"100%",color:"black",background:"#639428",
                fontSize:'11px',height:"100%",fontWeight:"600"
            }} >Created By You </button>
           </Link>    
           <Link to ='participatechallenges' style={ {width:"32%", height:'100%'} } >
           <button type='button' style={{border:'none',width:"100%",color:"black",background:"#b5944c",
                fontSize:'11px',height:"100%",fontWeight:"600"
            }} > Participated in  </button>
           </Link>
           <Link to ='topchallenges' style={ {width:"32%", height:'100%'} } >
           <button type='button' style={{border:'none',width:"100%",color:"black",background:"#ad82bd",
                fontSize:'11px',height:"100%",fontWeight:"600"
            }} >Top Challenges </button>
           </Link>

        </div>
        <Outlet/>
    </>
  )
}

export default ChallengePage