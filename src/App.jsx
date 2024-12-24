
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import './App.css'
import './globals.css'
import { Route,Routes } from 'react-router-dom'
import AuthLayout from './auth/authLayout.jsx'
import { Signin } from './auth/forms/Signin.jsx'
import { Signup } from './auth/forms/Signup.jsx'
import RootLayout from './root/RootLayout.jsx'
import Home from './root/pages/Home.jsx'
import Challenge from './root/pages/NewChallenge.jsx'
import Talent from './root/pages/Talent.jsx'
import Homepage from './root/pages/Homepage.jsx'
import NewChallenge from './root/pages/NewChallenge.jsx'
import Challenges from './root/pages/Challenges.jsx'
import TopBar from './components/TopBar.jsx'
import RightSideBar from './components/RightSideBar.jsx'
import TopChallenges from './root/pages/TopChallenges.jsx'
import Profile from './root/pages/Profile.jsx'
import { AuthContent } from './context/AuthContent.jsx'
import { Toaster } from 'sonner'
export default function App() {
  // const [user, setUser] = useState(null)

  const {user,setUser} = useContext(AuthContent)

  return (
  
   
       <Routes>
           
      
         <Route element={<AuthLayout user={user} />}>
            <Route path="/sign-in" element={ <Signin setUser={setUser}/>} /> 
            <Route path="/sign-up" element={ <Signup setUser={setUser}/>} /> 
         </Route>
         <Route path="" element={<RootLayout />}>
              <Route path="/" element={ <Homepage user = {user}/>} >
                <Route path="home" element={ <Home user={user}/>} />
                <Route path="challenges" element ={<Challenges user={user}/>} /> 
                <Route path="topchallenges" element ={<TopChallenges user={user}/>} /> 
                <Route path="profile/:id" element={<Profile user={user}/>} />
              </Route>

             <Route path="newchallenge" element={ <NewChallenge user={user}/>} />
             <Route path="matchchallenge/:id" element={ <NewChallenge user={user}/>} />
                {/* <Route path="challenge" element={ <Challenge user={user}/>} />
                <Route path="about" element ={<Signin />} /> 
             </Route> */}
            <Route path="newtalent" element={ <Talent/>} /> 
         </Route>
         
      </Routes>  
  




  )  
}   
  

