// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9bNV1VWfpewQ43al3ZYxvVgtMFzjIMPM",
  authDomain: "automationweb-e08b5.firebaseapp.com",
  projectId: "automationweb-e08b5",
  storageBucket: "automationweb-e08b5.appspot.com",
  messagingSenderId: "560563663258",
  appId: "1:560563663258:web:6b75db6e634fc5922f8a23",
  measurementId: "G-6CYFVD3TR8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);