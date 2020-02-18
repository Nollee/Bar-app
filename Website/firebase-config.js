// ========== GLOBAL FIREBASE CONFIG ========== //
// Your web app's Firebase configuration
const _firebaseConfig = {
  apiKey: "AIzaSyCydzfHR1wmkYBY4WXjnZwOW625D4VYJyM",
    authDomain: "barhunt-80785.firebaseapp.com",
    databaseURL: "https://barhunt-80785.firebaseio.com",
    projectId: "barhunt-80785",
    storageBucket: "barhunt-80785.appspot.com",
    messagingSenderId: "627209044328",
    appId: "1:627209044328:web:e422ec94a2ec499361d6dd",
    measurementId: "G-KYY3GVPJGV"
};
// Initialize Firebase and database references
firebase.initializeApp(_firebaseConfig);
const _db = firebase.firestore();