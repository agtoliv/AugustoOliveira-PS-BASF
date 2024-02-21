import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCrCnb5Q42-Xg7djhxLzMvvL4uEY76YL7M",
    authDomain: "formulario-de-interesse.firebaseapp.com",
    projectId: "formulario-de-interesse",
    storageBucket: "formulario-de-interesse.appspot.com",
    messagingSenderId: "533874230313",
    appId: "1:533874230313:web:10442f7304954923334838",
    measurementId: "G-VPZE6WK97G"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
