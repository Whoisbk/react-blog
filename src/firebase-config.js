// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1Ouy0Li4XITIuHrEjeCClnJNvGl3fBTY",
  authDomain: "blog-project-8d6f0.firebaseapp.com",
  projectId: "blog-project-8d6f0",
  storageBucket: "blog-project-8d6f0.appspot.com",
  messagingSenderId: "806053000461",
  appId: "1:806053000461:web:2ae5a5898da25abb7dec44",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

