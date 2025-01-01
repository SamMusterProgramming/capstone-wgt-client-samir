import React, { useEffect, useRef, useState } from 'react'
import './Sign.css'   
import logo from '/asset/material/guiness.jpeg'
//  import  {Link, useNavigate}  from 'react-router-dom'
 import axios from 'axios'
 import { Link } from 'react-router-dom'
 import { authLogin} from '../../apiCalls'


 const url = import.meta.env.VITE_API_URL;        

  export const Signin = ({setUser}) => {

  const holdEmail = useRef();
  const holdPassword = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordWrong, setIsPasswordWrong] = useState(false); 
  const [isEmailWrong, setIsEmailWrong] = useState(false); 
  const [message,setMessage] = useState("")

 
  const handlePasswordChange = (event) => {
    setMessage("")
    setPassword(event.target.value);
    setIsPasswordWrong(false);
  };
  const handleEmailChange = (event) => {
    setMessage("")
    setEmail(event.target.value);
    setIsEmailWrong(false);
  };
 const handleSubmit = async (e) => {
   e.preventDefault()
   if(!validateEmail(email)) {
     setMessage('Invalid Email');
     return  setIsEmailWrong(true)
   }
   if(!validatePassword(password)) {
    setMessage('Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character.')
    return  setIsPasswordWrong(true)
  }
   const credentials = {email:email,password:password}
   authLogin(credentials,setUser,setMessage) // function from apiCalls.js
  }      
  
  function validateEmail(email) {
    const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return re.test(email);
  }
  function validatePassword(passwordRegex) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    return re.test(passwordRegex)
  }

  useEffect(() => {
     if(message === "user not found") {
      setIsEmailWrong(true)
     }
     if(message === "invalid password") {
      setIsPasswordWrong(true)
     }
  }, [message])
  
  useEffect(() => {
    setEmail(holdEmail.current.value)
    setPassword(holdPassword.current.value)
 }, [])
 
return (    

 <div className="d-flex flex-column justify-content-center gap-1 align-items-center h-100 homepage "
 style={{backgroundColor:"#084569"}}>
    
   
     
     <div className="user_card"> 
       <div className ='logo-header text-center'>
         <h1>Challengify</h1>
       </div>

      <div className="d-flex justify-content-center form_container">
       <form> 
          <div className="d-flex mb-3 justify-content-center">
           <h1 style={{fontSize:'25px'}}>Login</h1>
         </div> 
         <div className="input-group gap-3 mb-3 p-2 "
         style={{width:'100%'}}>
              <input type="text" name="email"
              ref={holdEmail}
              onChange={handleEmailChange}
               className= {'form-control input_user ' + (isEmailWrong ? 'shake-email' : '') }
           defaultValue="samcoeur2020@gmail.com" placeholder="username" 
           />
         </div>
         <div className="input-group gap-3 p-2  ">
               <input type="password" name="password"
                className= {'form-control input_pass ' + (isPasswordWrong ? 'shake-password' : '')  }
                  ref={holdPassword}
                  onChange={handlePasswordChange}
                   defaultValue="Samir@2025" placeholder="password" 
                  />
         </div>  
         <div className="form-group mt-3 d-flex align-items-center justify-content-start"
         style={{minWidth:'90%',marginLeft:'2%'}}
         >
           <div className="custom-control d-flex  gap-3 custom-checkbox">
             <input type="checkbox" className="custom-control-input"
                               id="customControlInline" />
             <label className="custom-control-label" >Remember me</label>
           </div>
         </div>    
         <div className="d-flex  justify-content-start mt-3 login_container">
           <button type="button" onClick={handleSubmit} name="button" className="btn login_btn">Login</button>
         </div>
         {message && (
            <p className='mt-2' style={{color:'red',fontSize:'11px'}}>{message}</p>
             )}
       </form>     
     </div>
 
     <div className=" d-flex mt-3 flex-column gap-2"
      style={{minWidth:'100%',marginLeft:'0%'}}
      >
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

     <div className="d-flex mt-4 gap-5 mb-5 justify-content-center align-item-center "
      style={{minWidth:'100%',marginLeft:'0%'}}>   
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
   
  </div> 
  
 
)
}
