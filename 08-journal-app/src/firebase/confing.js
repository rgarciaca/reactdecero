// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore} from 'firebase/firestore/lite';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCR9zf6Cw_Ql5cjKv-EY-8YJ8Ofpvydwfc",
  authDomain: "curso-react-rgc.firebaseapp.com",
  projectId: "curso-react-rgc",
  storageBucket: "curso-react-rgc.appspot.com",
  messagingSenderId: "460257300021",
  appId: "1:460257300021:web:f3473c6a814177dfb86b7c"
};

// Initialize Firebase
export const Firebaseapp = initializeApp( firebaseConfig );

export const FirebaseAuth = getAuth( Firebaseapp );

export const FirebaseDB = getFirestore( Firebaseapp );