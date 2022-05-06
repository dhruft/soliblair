// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

/*
console.log(process.env.REACT_APP_apiKey)
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};
*/

const firebaseConfig = {
    apiKey: "AIzaSyC-czWfsM4yZnGDC139gBPQD-zBlN__X50",
    authDomain: "soliblair.firebaseapp.com",
    projectId: "soliblair",
    storageBucket: "soliblair.appspot.com",
    messagingSenderId: "253194608464",
    appId: "1:253194608464:web:844137c329be8bfcd4d655",
    measurementId: "G-NKG1B345W2"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export default db