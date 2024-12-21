// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB12LtMOPw2OPeiUS3DB4wtlpQKtTQ-FU8",
  authDomain: "challengify-wgt.firebaseapp.com",
  projectId: "challengify-wgt",
  storageBucket: "challengify-wgt.firebasestorage.app",
  messagingSenderId: "373653845536",
  appId: "1:373653845536:web:922f2f65a9a7718a92ee45"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage =  getStorage(app)
export const generateUserFolder = (email)=> {
  return  `videos/${email}/`;
}