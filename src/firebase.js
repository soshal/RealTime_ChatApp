// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrp9vt2RU1TDT2ieYE1bFLmdTXMqJNDBE",
  authDomain: "chatapp-97483.firebaseapp.com",
  projectId: "chatapp-97483",
  storageBucket: "chatapp-97483.appspot.com",
  messagingSenderId: "266793236137",
  appId: "1:266793236137:web:9fa0f971f0cbdad7a9dbb8"
};

const ap = initializeApp(firebaseConfig);

// Initialize Firebase
export default ap;