import React, { useEffect, useState } from 'react'
import './Sign.css'
import logo from '/asset/material/guiness.jpeg'
import { useRef } from 'react'
import axios from 'axios'
import { Link, Navigate ,useNavigate } from 'react-router-dom'
import { authRegister } from '../../apiCalls'
import { validate } from 'uuid'
import { ref, uploadBytes } from 'firebase/storage'
import { storage } from '../../firebase'
import { toast } from 'sonner'

export const Signup = (props) => {
   


  const [fullname,setFullname] = useState("")
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordWrong, setIsPasswordWrong] = useState(false); 
  const [isEmailWrong, setIsEmailWrong] = useState(false); 
  const [isFullnameWrong, setIsFullnameWrong] = useState(false); 
  const [isConfirmPasswordWrong, setIsConfirmPasswordWrong] = useState(false); 
  const [isSignupSuccess,setIsSignupSucess] = useState(false)
  const navigate = useNavigate()
  const[errorMessage,setErrorMessage] =useState("")

  const handleFullname =(event)=> {
	event.preventDefault()
    setErrorMessage("")
    setFullname(event.target.value);
    setIsFullnameWrong(false);
  }
  
  const handleEmail =(event) => {
    event.preventDefault()
    setErrorMessage("")
    setEmail(event.target.value);
    setIsEmailWrong(false);
  }

  const handlePassword=(event) => {
    event.preventDefault()
    setErrorMessage("")
    setPassword(event.target.value);
    setIsPasswordWrong(false);
  }
  
  const handleConfirmPassword=(event) => {
    event.preventDefault()
    setErrorMessage("")
    setConfirmPassword(event.target.value);
    setIsConfirmPasswordWrong(false);
  }


  function validateFrom() {
	if(!validateName(fullname)) {
		setErrorMessage("name should have more than  2")
        setIsFullnameWrong(true)
		return false
	}
    if(!validateEmail(email)) {
		setErrorMessage("not a valid email address")
        setIsEmailWrong(true)
		return false
	}
    if(!validatePassword(password)){
		setErrorMessage('Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character.')
        setIsPasswordWrong(true)
		return false
	}
	if(password !== confirmPassword) {
		setErrorMessage(`Password and confirm password don't match`)
        setIsConfirmPasswordWrong(true)
		return false
	}

	return true;
  } 
  const validateName =(name)=> {
     if(name.length <= 2){
		return false
	 }
	 return true;
  }

  function validateEmail(email) {
    const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return re.test(email);
  }

  function validatePassword(passwor) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    return re.test(password)
  }
  
  const handleSubmit = async(e)=> {
    e.preventDefault()
	const imageProf ="https://firebasestorage.googleapis.com/v0/b/challengify-wgt.firebasestorage.app/o/avatar%2Favatar.jpg?alt=media&token=25ae4701-e132-4f15-a522-5b9332d2c0b2"
	const imageCover ="https://firebasestorage.googleapis.com/v0/b/challengify-wgt.firebasestorage.app/o/avatar%2F67.jpg?alt=media&token=d32c765c-31bc-4f74-8925-de45b2640544"
	if(validateFrom()){
		  const body ={
			  email:email,
			  name:fullname ,
			  password : password,
			  username:email,
			  profile_img:imageProf,
			  cover_img:imageCover
		  }
		  authRegister(body,props.setUser)
	}
	
  }
     
  
  return (
	<div className="d-flex flex-column justify-content-center gap-1 align-items-center h-100 homepage cloud-bg "
	style={{backgroundColor:"#084569"}}>
		       	<div className="user_card star text-center">	
				  <div   className ='logo-header'>
                    <h1>Challengify</h1>
                  </div>
				  <div className="d-flex justify-content-center mt-1 text-center  form_container">
					<form> 
				     	<div className="d-flex mt-2 justify-content-center text-center">
                          <h1 style={{fontSize:'21px'}} >Register</h1>
                        </div>  
                        <div className="input-group mt-4 gap-3">
							<input type="text" name="fullname"
							//  ref={name}
							    onChange={handleFullname}
							    className={'form-control input_user ' + (isFullnameWrong ? 'shake-email' : '') }
                                defaultValue="" placeholder="Fullname" 
                                />
						</div>
                      
						<div className="input-group mt-3 gap-3">	
							<input type="email" name="email"
							 onChange={handleEmail}
							 className={'form-control input_user ' + (isEmailWrong ? 'shake-email' : '') }
                             defaultValue="samdouglas2020@gmail.com" placeholder="email"  required
                                />
						</div>

						<div className="input-group mt-3 gap-3">
							<input type="password" name="password" 
							onChange={handlePassword}
							className={'form-control input_pass ' + (isPasswordWrong ? 'shake-password' : '') }
                            defaultValue="samir"
						    placeholder="password" 
                                />
						</div>  
                        <div className="input-group mt-3 gap-3">
							<input type="password" name="confirmpassword"
							 onChange={handleConfirmPassword}
							 className={'form-control input_pass ' + (isConfirmPasswordWrong ? 'shake-password' : '') }
                             defaultValue="samir" 
							 placeholder="confirm" 
                                />
						</div>  
						<div className="d-flex justify-content-center mt-3 login_container">
				         	<button type="button" onClick={handleSubmit} name="button" className="btn login_btn"> Register</button>
				        </div>  
						<p style={{color:'gray',fontSize:12}} >{errorMessage}</p>
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
			</div>

		
		</div>

  )
}
