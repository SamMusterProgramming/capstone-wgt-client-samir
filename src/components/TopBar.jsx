import { Link, Navigate } from "react-router-dom"
import './Components.css'
import ItemMenu from "./helper/ItemMenu"
import { useEffect, useState } from "react"
import { BASE_URL } from "../apiCalls"


const TopBar = ({user}) => {


  
  return (  
      <>
       
       <div className="container-fluid d-flex gap-5 justify-content-center  topbar">  
        
     
           <ItemMenu linkTo = {"/home"} styleObject={{marginLeft:50}} logo_src={"/asset/material/home.png"}  />
           <ItemMenu linkTo ={"/badge"} styleObject={{marginLeft:30}} logo_src={"/asset/material/badge.svg"} />
           <ItemMenu linkTo ={"/"} styleObject={{marginLeft:20}} logo_src={"/asset/material/bell.png"} />
           <ItemMenu linkTo ={"/talent"} styleObject={{marginLeft:20}} logo_src={"/asset/material/chat.png"} />
           {/* <ItemMenu linkTo ={`/profile/${user._id}`} styleObject={{marginLeft:20}} logo_src={BASE_URL + user.profile_img} /> */}
         
          {/* {user ? (
              <div  className="d-flex menu-item ">
              <Link
               to= "/signin">
                <img style={{height:"30px" ,width:'40px'}} className="menu-logo"  src={BASE_URL + user.profile_img} alt="" />
              </Link>   
           </div> 
          ):(
            <div  className="d-flex menu-item ">
              <Link
               to= "/signin">
                <img className="menu-logo" src={"/asset/material/avatar.jpg"} alt="" />
              </Link>   
           </div> 
          )} */}
           

      </div>

      </>
        
  )
}

export default TopBar