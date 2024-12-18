import { Link } from "react-router-dom"
import './Components.css'
import ItemMenu from "./helper/ItemMenu"


const TopBar = ({user}) => {


  console.log(user)
      
  return (  
      <>
       <div className="container-fluid d-flex gap-5 justify-content-center  topbar">  
        
    

              
           <ItemMenu linkTo ={"/home"} styleObject={{marginLeft:50}} logo_src={"/asset/material/home.png"}  />
           <ItemMenu linkTo ={"/badge"} styleObject={{marginLeft:30}} logo_src={"/asset/material/badge.svg"} />
           <ItemMenu linkTo ={"/"} styleObject={{marginLeft:20}} logo_src={"/asset/material/bell.png"} />
           <ItemMenu linkTo ={"/talent"} styleObject={{marginLeft:20}} logo_src={"/asset/material/chat.png"} />
   

      


      </div>

      </>
        
  )
}

export default TopBar