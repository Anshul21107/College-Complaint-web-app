import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDKoUfGDBvCJ7M710Judgr4fDwyKCNeu18",
  authDomain: "college-complaint-app.firebaseapp.com",
  projectId: "college-complaint-app",
  storageBucket: "college-complaint-app.appspot.com",
  messagingSenderId: "982343809692",
  appId: "1:982343809692:web:5823d11d5558529e098b59"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { db, auth, storage };
