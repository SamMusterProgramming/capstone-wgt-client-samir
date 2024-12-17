import React, { useRef } from 'react'
import './Sign.css'   
import logo from '/asset/material/guiness.jpeg'
//  import  {Link, useNavigate}  from 'react-router-dom'
 import axios from 'axios'
 import { Link } from 'react-router-dom'
 import { authLogin} from '../../apiCalls'

 const url = import.meta.env.VITE_API_URL;        

  export const Signin = ({setUser}) => {

  const email = useRef();
  const password = useRef();


 const handleSubmit = async (e) => {

   e.preventDefault()
   const credentials = {email:email.current.value,password:password.current.value}
   authLogin(credentials,setUser) // function from apiCalls.js
    
  }         
 
return (    

 <div className="d-flex flex-column justify-content-center align-items-center h-100 login ">
     <img style={{width:'100%',height:'70px',objectFit:'cover'}} 
       src="/asset/material/gotTalent.jpg" alt="" />   
   <div className="user_card"> 
     
     <div className="d-flex justify-content-center form_container">
       <form> 
          <div className="d-flex mb-3 justify-content-center">
           <h2>Login</h2>
         </div> 
         <div className="input-group gap-2 mb-3 p-2">
           <div className="input-group-append ">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-person-add" viewBox="0 0 16 16">
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
                <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z"/>
              </svg>
           </div>
           <input type="text" name="email" ref={email} className="form-control input_user" 
           defaultValue="samcoeur2020@gmail.com" placeholder="username" 
           />
         </div>
         <div className="input-group gap-2 p-2  ">
           <div className="input-group-append">
                   <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-unlock-fill" viewBox="0 0 16 16">
                    <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2"/>
                   </svg>
           </div>
           <input type="password" name="password" className="form-control input_pass"
           ref={password} defaultValue="samir" placeholder="password" 
           />
         </div>  
         <div className="form-group m-3 ">
           <div className="custom-control d-flex  gap-3 custom-checkbox">
             <input type="checkbox" className="custom-control-input"
                               id="customControlInline" />
             <label className="custom-control-label" >Remember me</label>
           </div>
         </div>    
         <div className="d-flex justify-content-center m-3 login_container">
           <button type="button" onClick={handleSubmit} name="button" className="btn login_btn">Login</button>
         </div>
       </form>     
     </div>
 
     <div className=" d-flex flex-column gap-2">
       <div className="d-flex justify-content-center links">
          <p style={{fontSize:'12px'}}> 
              Don't have an account ?  
              <Link to ="/sign-up" className="text-primary-500"
              style={{fontSize:'14px',marginLeft:'12px',color:'burlywood'}} >  Sign up</Link>    
          </p>   
       </div>
       <div style={{fontSize:'11px', color:'ButtonHighlight'}} 
            className="d-flex justify-content-center links">
            <a href="#">Forgot your password?</a>
       </div>   
     </div>

     <div className="d-flex mt-3 gap-3 justify-content-center align-item-center ">   
          <img src="/asset/material/you.png" alt="" 
              style={{height:'40px',width:'40px',objectFit:'fill' 
          }} />
          <img src="/asset/material/vs.jpeg" alt="" 
              style={{height:'40px',width:'40px',objectFit:'fill' 
          }} />
          <img src="/asset/material/world.jpg" alt="" 
              style={{height:'40px',width:'40px',objectFit:'fill' 
          }} />
     </div>
        
    </div>
         <img style={{width:'100%',height:'70px',objectFit:'fill',marginTop:'auto'}} 
         src="/asset/material/contest.png" alt="" /> 
  </div>
 

 
)
}
