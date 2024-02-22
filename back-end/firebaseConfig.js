// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCrCnb5Q42-Xg7djhxLzMvvL4uEY76YL7M",
    authDomain: "formulario-de-interesse.firebaseapp.com",
    databaseURL: "https://formulario-de-interesse-default-rtdb.firebaseio.com",
    projectId: "formulario-de-interesse",
    storageBucket: "formulario-de-interesse.appspot.com",
    messagingSenderId: "533874230313",
    appId: "1:533874230313:web:10442f7304954923334838",
    measurementId: "G-VPZE6WK97G"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

async function addDocument() {
    try {
    const docRef = await addDoc(collection(db, "campos-obrigatorios"), {
        firstname: "Nome",
        lastname: "Sobrenome",
        email: "email@example.com"
    });
    console.log("Documento adicionado com ID: ", docRef.id);
    } catch (e) {
    console.error("Erro ao adicionar documento: ", e);
    }
}

addDocument();

/*FirebaseFirestore.initializeApp(firebaseConfig);
var contactFormDB = firebase.database().red("form");

document.getElementById("form").addEventListener("submit", submitForm )

function submitForm(e){
    e.preventdefault();

    var firstname = getElementVal('firstname');
    var lastname = getElementVal('lastname');
    var email = getElementVal('email');

    console.log(firstname, lastname, email);
}

const getElementVal = (id) => {
    return document.getElementById(id).value;
};*/