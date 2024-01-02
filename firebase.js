// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
import { getDatabase, ref, increment, update, get, child } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js"

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOdKyUdUZCQp0s7G8P1wQkgFIZG-wsyBo",
  authDomain: "heart-counter-cfd5f.firebaseapp.com",
  projectId: "heart-counter-cfd5f",
  storageBucket: "heart-counter-cfd5f.appspot.com",
  messagingSenderId: "32216464193",
  appId: "1:32216464193:web:71650e7bf0b2aacf6cffc0",
  measurementId: "G-EH9CJ1FRZB",
  databaseURL: "https://heart-counter-cfd5f-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Database reference
const dbRef = ref(getDatabase(app));

// Increment heartCount by 1 at database
export function addHeart() {
    const updates = {};
    updates['heartCount'] = increment(1);
    update(dbRef, updates);
}

// Read heartCount from database
export async function getHeartCount(){
    let data; 
    await get(child(dbRef, 'heartCount')).then((snapshot) => {
    if (snapshot.exists()) {
        data = snapshot.val();
    } else {
        data = -1;
        console.log("No data available");
    }
    }).catch((error) => {
        data = -1;
        console.error(error);
    });
    return data;
}