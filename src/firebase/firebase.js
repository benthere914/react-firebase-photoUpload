// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBgSKHJsSWpsZFWhgHD27C1Lo_SNfqHhdQ",
    authDomain: "photo-upload-7680b.firebaseapp.com",
    projectId: "photo-upload-7680b",
    storageBucket: "photo-upload-7680b.appspot.com",
    messagingSenderId: "1084182924669",
    appId: "1:1084182924669:web:d1e0e523a9995d6cfcd014"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export default app
