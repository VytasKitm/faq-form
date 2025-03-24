  // Import the functions you need from the SDKs you need
  import { initializeApp } from "firebase/app";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  // import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js';
  import { getFirestore } from 'firebase/firestore';


  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDg7xQ9FvRAebByxlwzoLKpeToW6KFMWNw",
    authDomain: "faq-form-d7dce.firebaseapp.com",
    projectId: "faq-form-d7dce",
    storageBucket: "faq-form-d7dce.firebasestorage.app",
    messagingSenderId: "952564839330",
    appId: "1:952564839330:web:e221ecdc7e41151b96b8fb"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app)
