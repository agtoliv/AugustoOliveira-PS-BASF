const firebase = require('firebase/app');
require('firebase/firestore'); 

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCrCnb5Q42-Xg7djhxLzMvvL4uEY76YL7M",
    authDomain: "formulario-de-interesse.firebaseapp.com",
    projectId: "formulario-de-interesse",
    storageBucket: "formulario-de-interesse.appspot.com",
    messagingSenderId: "533874230313",
    appId: "1:533874230313:web:10442f7304954923334838",
    measurementId: "G-VPZE6WK97G"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

module.exports = db;
