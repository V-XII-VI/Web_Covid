// Initialize Cloud Firestore through Firebase
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyBVhzv5H6zS7wI_9of9pnRq7hupGYjIAQ8",
    authDomain: "web-covid-b9225.firebaseapp.com",
    projectId: "web-covid-b9225",
    storageBucket: "web-covid-b9225.appspot.com",
    messagingSenderId: "405519602616",
    appId: "1:405519602616:web:d45f7e298c93669920754d",
    measurementId: "G-7TH9Q535ML"
});

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
export { db, auth };