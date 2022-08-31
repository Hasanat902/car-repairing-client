// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1zbtO15RYenOBmSKfFze_1ycRMlbEYLY",
  authDomain: "genius-car-practice-33c39.firebaseapp.com",
  projectId: "genius-car-practice-33c39",
  storageBucket: "genius-car-practice-33c39.appspot.com",
  messagingSenderId: "662198780593",
  appId: "1:662198780593:web:a5b5b9ed27b743ead39890"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;