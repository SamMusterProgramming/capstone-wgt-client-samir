import { Link } from "react-router-dom"
import TalentSelector from "../../components/helper/TalentSelector"
import { toast } from "sonner";
import { useEffect } from "react";


const Home = ({user}) => {


useEffect ( () => {   
   toast.success('successfully logged in !');
   
} , [] ) 

  return (
     <div className="d-flex flex-column align-items-center  justify-content-center" 
     style={{maxWidth:'500px',width:'100%',height:'85vh'}}>   
            {/* <div className="d-flex  mt-1"
               style={{minWidth:'350px', maxWidth:'10%'}}>     
               <div class="fancy-welcome">
                  <h1>Welcome to tyour Home page!</h1>
                  <p>Make your selection down Below </p>
               </div>    
            </div> 
            */} 
         
            <div  className ="d-flex justify-content-center mt-3 gap-3 flex-wrap selectcontainer"> 
      
              <div  className="card mt-2" 
                style={{borderRadius:'10%'}}>
                    <div className='d-flex justify-content-between align-items-center top'>
                      {/* <img className='logo-select' src={user.profile_img} alt="logo" /> */}
                      <h5 className="card-header text-center">profile</h5>
                    </div>
                    <div className="card-body d-flex flex-column text-center">   
                        <p className="card-text">
                           Access Profile
                        </p>     
                     <Link to ={`/profile/${user._id}`}>
                        <button 
                           style={{color:'White',backgroundColor:"black",fontSize:"11px",
                              width:"130px",height:'40px'
                           }}
                           type="button" >Your Profile
                        </button>
                     </Link>
                  </div>
             </div>
             {/* <TalentSelector  link="/challenges" type={"Challenges"} color={'teal'} 
                logo={'/asset/material/challenge.jpg'}
                quote="view your challenges" /> */}
              <TalentSelector  link="/chpage/challenges" type={"Challenges"} color={'teal'} 
                logo={'/asset/material/challenge.jpg'}
                quote="view your challenges" />   
             <TalentSelector  link="/" type={"Your Talent"} color={'tomato'} 
                logo={'/asset/material/show.avif'} 
                quote="access your Talents"
               />
             <TalentSelector  link="/" type={"Your Guiness"} color={'#1f2a5e'} 
                logo={'/asset/material/guiness.jpg'}
                quote="access your Guiness"
               />   
            <TalentSelector  link="/topchallenges" type={"Top challenges"} color={'#1f2a5e'} 
                logo={'/asset/material/guiness.jpg'}
                quote= " Hot Challenges " />   
            <TalentSelector  link="/topchallenges" type={"Talent Show"} color={'#1f2a5e'} 
                logo={'/asset/material/guiness.jpg'}
                quote= " Hot Talent Shows " />       

           </div>
           
           {/* <div className ="container-fluid border d-flex flex-wrap ">
               
           </div> */}
    </div>
  )
}

export default Home