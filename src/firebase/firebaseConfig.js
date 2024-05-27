import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyASfyWTEjarKSv5VyJ3n8RWKUmZPIYvT0M",
  authDomain: "jobbizz-project.firebaseapp.com",
  projectId: "jobbizz-project",
  storageBucket: "jobbizz-project.appspot.com",
  messagingSenderId: "431084026589",
  appId: "1:431084026589:web:88e68148dad13d7e6fb934",
  measurementId: "G-TBS15TC5QF"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };