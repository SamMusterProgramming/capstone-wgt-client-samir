import React from 'react'
import '../Components.css'
import { Link } from 'react-router-dom'


const ItemMenu = (props) => {
  return (   

    <div  className="d-flex menu-item ">
    <Link to={props.linkTo}>
      <img className="menu-logo" src={props.logo_src} alt="" />
    </Link>   
   </div>       
  )
}

export default ItemMenu