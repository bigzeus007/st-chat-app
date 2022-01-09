import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDrsr63DkvNnQJD2iLqzG4yIUAA5TsdeZ8",
  authDomain: "st-chat-engine.firebaseapp.com",
  projectId: "st-chat-engine",
  storageBucket: "st-chat-engine.appspot.com",
  messagingSenderId: "806300775272",
  appId: "1:806300775272:web:651dde4c1b2e48859f5cdd",
  measurementId: "G-J25E503SJH"
};

// Initialize Firebase


export const auth = firebase.initializeApp(firebaseConfig).auth()
  
