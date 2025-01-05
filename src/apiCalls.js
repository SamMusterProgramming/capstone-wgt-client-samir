
import axios from 'axios'
import { Navigate } from 'react-router-dom'


 const baseURL_DEVOLOPMENT = "http://localhost:8000"
 const baseURL_PRODUCTION = import.meta.env.VITE_BASE_URL
 export const STORAGE_URL = import.meta.env.VITE_BASE_STORAGE


 export const BUCKET_NAME = import.meta.env.VITE_BUCKET_NAME
 const BUCKET_REGION = import.meta.env.VITE_BUCKET_REGION;
 const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY
 const SECRET_KEY = import.meta.env.VITE_SECRET_KEY



const  PURL = baseURL_PRODUCTION;   
 
export const BASE_URL =  baseURL_PRODUCTION; 

export const setLoadingBarAxios =(loadingRef) => {
  axios.interceptors.request.use((config) => {
    loadingRef.current.continuousStart();
  
  }, (error) => {
    loadingRef.current.complete();

  });
  
  axios.interceptors.response.use((response) => {
    loadingRef.current.complete();

  }, (error) => {
    loadingRef.current.complete();

  });
}



// *********************************** AUTHENTIFICATION *************************

export const authLogin = async(credentiels,setUser,setMessage)=>{

    try {
      await axios.post(BASE_URL +'/users/login',credentiels)
      .then(res => { 
                 if (res.data.email && res.data.password) 
                   setUser({...res.data,isNewUser:false});
                 else setMessage(res.data.error)  
     
          })
    } catch (error) {
       console.log(error)     
    }
   
}

export const authRegister= async(credentiels,setUser)=>{
   
  await axios.post( BASE_URL +'/users/',credentiels)
	.then(res => {
		if(res.status == 200 ) {
      setUser({...res.data ,isNewUser:true})
     }
		})
}

export const getUserById = async(user_id,setUserProfile) =>{
    try {
        await axios.get(BASE_URL+`/users/user/${user_id}`)
        .then(res => 
          { 
            setUserProfile({...res.data})
          } )
    } catch (error) {
        console.log(error)
    }

}

export const updateUser = async(user_id,rawBody,setUser,user)=> {
  try {
     await axios.patch(BASE_URL + `/users/user/${user_id}`,rawBody)
     .then(res =>{
      setUser( {...user,profile_img:res.data.profile_img,cover_img:res.data.cover_img} )
    } )
  } catch (error) {
     console.error(error)
  }
}
// *********************************** getChallenge by id *************************


export const getChallengeById = async(id,setChallenge)=>{
   try {
    await axios.get(BASE_URL+ `/challenges/find/${id}`)
    .then(res => {setChallenge(res.data)} )
   } catch (error) {
      console.log(error)
   }
}


// *********************************** new Challenge /top challenger *************************


export const getUserChallenges = async( user_id , setChallenges)=>{
 
    try {
        await axios.get( BASE_URL + `/challenges/original/${user_id}`)
        .then(res => {
            setChallenges(res.data) 
        }
         )
    } catch (error) {
        console.log(error)
    }
  }  

  export const getUserParticipateChallenges = async( user_id , setChallenges)=>{
    console.log(user_id)
     try {
         await axios.get( BASE_URL + `/challenges/participate/${user_id}`)
         .then(res => {
             setChallenges(res.data) 
         }
          )
     } catch (error) {
         console.log(error)
     }
   }  

  //top challenges 

  export const getTopChallenges = async( user_id , setChallenges)=>{
  
     try {
         await axios.get( BASE_URL + `/challenges/top/${user_id}`)
         .then(res => {
             setChallenges(res.data) 
         }
          )
     } catch (error) {
         console.log(error)
     }
   }  
  
  // quit a challenge 
  
  export const quitChallenge = async(challenge_id, user_id)=> {
      try {
         await axios.patch(BASE_URL + `/challenges/quit/${challenge_id}`,{user_id:user_id}).
         then(res => res.data)
      } catch (error) {
         console.log(error)
      }
  }

   // *********************************** likes and votes data *************************

     
    export const loadLikeVoteData= async(ids,setLikesVotesData)=> {

    try {
      await axios.get( BASE_URL + '/challenges/load/like/', {
        params:{
            ids: ids.join(',')
        }
     } )
      .then(res => setLikesVotesData({...res.data}) )
    } catch (error) {
      console.log(error)
    }
  }

  export const liked = async(ids,setLikesVotesData,likesVotesData)=>{
    try {
        await axios.get( BASE_URL + `/challenges/challenge/like/`, {
          params:{
              ids: ids.join(',')
          }
       } )
        .then(res =>  { setLikesVotesData({...likesVotesData,isLiked:res.data.isLiked,like_count:res.data.like_count})} )
      } catch (error) {
        console.log(error)
      }
  }

  export const voted = async(ids,setLikesVotesData,likesVotesData)=>{
    try {
        await axios.get( BASE_URL + `/challenges/challenge/vote/`, {
          params:{
              ids: ids.join(',')
          }
       } )
        .then(res =>  { setLikesVotesData({...likesVotesData,isVoted:res.data.isVoted,vote_count:res.data.vote_count})} )
      } catch (error) {
        console.log(error)
      }
  }

  // *********************************** follower and following *************************


    export const getFollowData = async(user_id ,setFollower)=>{
      try {
        await axios.get( BASE_URL + `/users/follow/data/${user_id}`)
        .then(res =>  { const data = res.data
          setFollower( {...data} ) 
      } )
      } catch (error) {
        console.log(error)
      }
     }


    export const isfollowing = async(user_id , follower_id, setIsFollowing)=>{
      try {
        await axios.post( BASE_URL + `/users/followers/${user_id}` ,{follower_id:follower_id} )
        .then(res =>  { 
          setIsFollowing({isfollowing:res.data.isfollowing})
      } )
      } catch (error) {
        console.log(error)
      }
     }


     // followings 

    export const addFollowing = async(user_id , rawBody , setFollow) =>{
      try {
        await axios.post( BASE_URL + `/users/followings/add/${user_id}`, rawBody )
        .then(res =>  { 
          setFollow([...res.data]);
          } )
       
      } catch (error) {
        console.log(error)
      }
     }
 

    export const getFollowings = async(user_id , setFollowings)=>{
      try {
        await axios.get( BASE_URL + `/users/followings/${user_id}` )
        .then(res =>  { 
          setFollowings(res.data)
      } )
      } catch (error) {
        console.log(error)
      }
     }

     export const unFollowings = async(user_id ,rawBody, setFollow)=>{
      try {
        await axios.patch( BASE_URL + `/users/unfollowing/${user_id}`,rawBody )
        .then(res =>  { 
          setFollow([...res.data])
      } )
      } catch (error) {
        console.log(error)
      }
     }