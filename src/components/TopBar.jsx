import { Link } from "react-router-dom"
import './Components.css'
import ItemMenu from "./helper/ItemMenu"


const TopBar = ({user}) => {


  console.log(user)
      
  return (  
      <>
       <div className="container-fluid d-flex gap-5 justify-content-center  topbar">  
        
        {/* <div className="menu d-flex gap-4 justify-content-start"> */}
           {/* <Link to='/'>
             <img className="talent-logo" src="/asset/material/show.avif" alt="nature" />
           </Link>     */}

              
           <ItemMenu linkTo ={"/home"} styleObject={{marginLeft:50}} logo_src={"/asset/material/home.png"}  />
           <ItemMenu linkTo ={"/badge"} styleObject={{marginLeft:30}} logo_src={"/asset/material/badge.svg"} />
           <ItemMenu linkTo ={"/"} styleObject={{marginLeft:20}} logo_src={"/asset/material/bell.png"} />
           <ItemMenu linkTo ={"/talent"} styleObject={{marginLeft:20}} logo_src={"/asset/material/chat.png"} />
   

       
        {/* <div className="" style={{width:'30%'}}>
          <input className="search" type="text" placeholder="search" />
        </div> */}



        {/* <div className="d-flex gap-3 justify-content-start leftmenu">
           <div className="d-flex gap-3 ">
             <ItemMenu linkTo ={"/"} styleObject={{marginLeft:20}} logo_src={"/asset/material/bell.png"} />
             <ItemMenu linkTo ={"/talent"} styleObject={{marginLeft:20}} logo_src={"/asset/material/chat.png"} />
           </div>

          <div className="d-flex align-item-center justify-content-center profile">
            <Link to='/'>
              <img className="profile-img" src={user.profile_img} alt="profile" />
            </Link> 
          </div>
        
       </div> */}


      </div>

      </>
        
  )
}

export default TopBar