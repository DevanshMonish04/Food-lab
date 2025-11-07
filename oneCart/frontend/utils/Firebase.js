import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

console.log("Loaded API Key:", import.meta.env.VITE_FIREBASE_APIKEY); // 👈 Add this

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "newlogin-afc52.firebaseapp.com",
  projectId: "newlogin-afc52",
  storageBucket: "newlogin-afc52.appspot.com",
  messagingSenderId: "268397493992",
  appId: "1:268397493992:web:9620409aa1b801fef4d35d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
