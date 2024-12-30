import React, { useState } from 'react'
import './Sign.css'
import logo from '/asset/material/guiness.jpeg'
import { useRef } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { authRegister } from '../../apiCalls'

export const Signup = ({setUser}) => {
   
  const email = useRef("")
  const name =useRef("")
  const password =useRef("")
  const profession  = useRef("")
  const confirmpassword = useRef("")
  const username = useRef("")

  const[errorMessage,setErrorMessage] =useState("")

  const handleSubmit = async(e)=> {

    e.preventDefault()
	if(password.current.value !== confirmpassword.current.value)  {
	  return	setErrorMessage(`passwords don't match`)
	}
	const body ={
		email:email.current.value,
		name:name.current.value ,
		profession : profession.current.value ,
		password : password.current.value,
		confirmpassword: confirmpassword.current.value,
		username:username.current.value
	}
    authRegister(body,setUser)
	
  }
     
  return (
	<div className="d-flex flex-column justify-content-center gap-1 align-items-center h-100 homepage "
	style={{backgroundColor:"#084569"}}>

		       	<div className="user_card">	
				  <div   className ='logo-header'>
                    <h1>Challengify</h1>
                  </div>
				  <div className="d-flex justify-content-center mt-1 text-center  form_container">
					<form> 
				     	<div className="d-flex mt-2 justify-content-center text-center">
                          <h1 style={{fontSize:'25px'}} >Register</h1>
                        </div>  
                        <div className="input-group mt-4 gap-3">
							<input type="text" name="fullname" ref={name} className="form-control  input_user" 
                                defaultValue="" placeholder="Fullname" 
                                />
						</div>
                        {/* <div className="input-group mb-3 gap-3">
							<div className="input-group-append">
								<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-align-top" viewBox="0 0 16 16">
									<rect width="4" height="12" rx="1" transform="matrix(1 0 0 -1 6 15)"/>
									<path d="M1.5 2a.5.5 0 0 1 0-1zm13-1a.5.5 0 0 1 0 1zm-13 0h13v1h-13z"/>
								</svg>
							</div>
							<input type="text" name="Talent" ref={profession} className="form-control input_user" 
                                defaultValue="" placeholder="Talent" 
                                />
						</div>     */}
						<div className="input-group mt-3 gap-3">
							
							<input type="email" name="email" ref={email} className="form-control input_user" 
                                defaultValue="samdouglas2020@gmail.com" placeholder="email"  required
                                />
						</div>

						<div className="input-group mt-3 gap-3">
					
							<input type="text" name="email" ref={username} className="form-control input_user" 
                                defaultValue="samdouglas2024" placeholder="username"  required
                                />
						</div>
						<div className="input-group mt-3 gap-3">
							<input type="password" name="password" className="form-control input_pass"
                                ref={password} defaultValue="samir" placeholder="password" 
                                />
						</div>  
                        <div className="input-group mt-3 gap-3">
							<input type="password" name="confirmpassword" className="form-control input_pass"
                                ref={confirmpassword} defaultValue="samir" placeholder="confirm" 
                                />
						</div>  
						<div className="d-flex justify-content-center mt-3 login_container">
				         	<button type="button" onClick={handleSubmit} name="button" className="btn login_btn"> Register</button>
				        </div>  
				  </form>    
				 
				</div>
		
				<div className="d-flex justify-content-center text-center links">
						<p style={{fontSize:'12px'}}>Already have an account ?
							<Link to ="/sign-in" style={{fontSize:'14px',marginLeft:'12px',color:'burlywood'}}
							className="text-primary-300 text-small-semibold ml-7"
							> Log in </Link>       
           			    </p> 
				</div>
					
 
                <div className="d-flex mt-3 gap-3 justify-content-center align-item-center "
				style={{width:"100%"}}>   
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
				<p style={{color:'red',fontSize:12}} >{errorMessage}</p>
			</div>

		
		</div>

  )
}
