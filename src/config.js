import Firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBV60yZBuybTanZU_U_eXuEaOJquCujGfc",
  authDomain: "test-6efd3.firebaseapp.com",
  databaseURL: "https://test-6efd3.firebaseio.com",
  projectId: "test-6efd3",
  storageBucket: "test-6efd3.appspot.com",
  messagingSenderId: "975579716365",
  appId: "1:975579716365:web:508d7c95ce2b8c112eae44",
  measurementId: "G-92NLMVY13N"
};

const app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();