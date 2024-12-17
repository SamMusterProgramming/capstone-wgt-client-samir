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
    <div className="d-flex flex-column justify-content-center align-items-center  h-100 login  ">
	
	     	<img style={{width:'100%',height:'70px',objectFit:'cover'}} 
             src="/asset/material/gotTalent.jpg" alt="" />  
			<div style={{marginTop:'-30px'}} className="user_card">
		     	<div className="d-flex justify-content-center">
                  <h3>Register</h3>
                </div>  
				<div className="d-flex justify-content-center form_container">
					<form> 
                        <div className="input-group mb-3 gap-3">
							<div className="input-group-append">
							        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                                    </svg>
							</div>
							<input type="text" name="fullname" ref={name} className="form-control  input_user" 
                                defaultValue="" placeholder="Fullname" 
                                />
						</div>
                        <div className="input-group mb-3 gap-3">
							<div className="input-group-append">
								<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-align-top" viewBox="0 0 16 16">
									<rect width="4" height="12" rx="1" transform="matrix(1 0 0 -1 6 15)"/>
									<path d="M1.5 2a.5.5 0 0 1 0-1zm13-1a.5.5 0 0 1 0 1zm-13 0h13v1h-13z"/>
								</svg>
							</div>
							<input type="text" name="Talent" ref={profession} className="form-control input_user" 
                                defaultValue="" placeholder="Talent" 
                                />
						</div>    
						<div className="input-group mb-3 gap-3">
							<div className="input-group-append">
							  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-envelope-at-fill" viewBox="0 0 16 16">
                               <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2zm-2 9.8V4.698l5.803 3.546zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.5 4.5 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586zM16 9.671V4.697l-5.803 3.546.338.208A4.5 4.5 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671"/>
                               <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791"/>
                              </svg>
							</div>
							<input type="email" name="email" ref={email} className="form-control input_user" 
                                defaultValue="samdouglas2020@gmail.com" placeholder="email"  required
                                />
						</div>
						<div className="input-group mb-3 gap-3">
							<div className="input-group-append">
								<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-person-fill-add" viewBox="0 0 16 16">
									<path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
									<path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
								</svg>
							</div>
							<input type="text" name="email" ref={username} className="form-control input_user" 
                                defaultValue="samdouglas2024" placeholder="username"  required
                                />
						</div>
						<div className="input-group mb-3 gap-3">
							<div className="input-group-append">
								<svg xmlns="http://www.w3.org/2000/svg" width="36" height="30" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 16 16">
									<path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2"/>
								</svg>
							</div>
							<input type="password" name="password" className="form-control input_pass"
                                ref={password} defaultValue="samir" placeholder="password" 
                                />
						</div>  
                        <div className="input-group mb-3 gap-3">
							<div className="input-group-append">
								<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" classname="bi bi-lock-fill" viewBox="0 0 16 16">
									<path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2"/>
								</svg>
							</div>
							<input type="password" name="confirmpassword" className="form-control input_pass"
                                ref={confirmpassword} defaultValue="samir" placeholder="confirm" 
                                />
						</div>  
						<div style={{marginLeft:'7%'}} className="d-flex justify-content-center  login_container">
				         	<button type="button" onClick={handleSubmit} name="button" className="btn login_btn"> Register</button>
				        </div>  
				  </form>    
				 
				</div>
		
				<div className="d-flex justify-content-center links">
						<p style={{fontSize:'12px'}}>Already have an account ?
							<Link to ="/sign-in" style={{fontSize:'14px',marginLeft:'12px',color:'burlywood'}}
							className="text-primary-300 text-small-semibold ml-7"
							> Log in </Link>       
           			    </p> 
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
				<p style={{color:'red',fontSize:12}} >{errorMessage}</p>
			</div>

			<img style={{width:'100%',height:'70px',objectFit:'fill',marginTop:'auto'}} 
            src="/asset/material/contest.png" alt="" /> 
		</div>

  )
}
