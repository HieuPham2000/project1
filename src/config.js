import Firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDqQCOY8z5s9eNf4bXt7trVtCm6dguGasU",
  authDomain: "project-1-79684.firebaseapp.com",
  databaseURL: "https://project-1-79684.firebaseio.com",
  projectId: "project-1-79684",
  storageBucket: "project-1-79684.appspot.com",
  messagingSenderId: "324851759341",
  appId: "1:324851759341:web:0c9646db8fc46ab562b4e4"
};

const app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();