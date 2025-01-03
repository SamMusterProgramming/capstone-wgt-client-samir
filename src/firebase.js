// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "challengify-wgt.firebaseapp.com",
  projectId: "challengify-wgt",
  storageBucket: "challengify-wgt.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage =  getStorage(app)

export const generateUserFolder = (email)=> {
  return  `videos/${email}/`;
}
export const generateUserProfileFolder = (email)=> {
  return  `images/${email}/`;
}

export const  getMediaFireBase = (filename,setFilename)=> {
     const fileRef = ref(storage, filename);
      getDownloadURL(fileRef).then(url => {
      setFilename(url)
     })
    .catch((error) => {
     console.error(error);
    });
}