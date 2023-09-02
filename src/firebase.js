// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5hjz7SRkysOdm9T-lItiOtvdK-6SON5A",
  authDomain: "realtor-clone-react-86281.firebaseapp.com",
  projectId: "realtor-clone-react-86281",
  storageBucket: "realtor-clone-react-86281.appspot.com",
  messagingSenderId: "327250388674",
  appId: "1:327250388674:web:7de481f34ce3d6a2017d5b",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()