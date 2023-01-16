// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8AxMs24WDxm2_sLMxam5-R5ibdM_Pb5Y",
  authDomain: "soundkafe-webapp.firebaseapp.com",
  projectId: "soundkafe-webapp",
  storageBucket: "soundkafe-webapp.appspot.com",
  messagingSenderId: "185681695301",
  appId: "1:185681695301:web:156110d018537969df892c",
  measurementId: "G-GLYF7X8LR6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider()
const db = getFirestore(app);
const storage = getStorage();

export { auth, provider, db, storage }