// Importações necessárias
import express from 'express';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import admin from 'firebase-admin';


admin.initializeApp({
    credential: admin.credential.cert('serviceAccountKey.json')
});

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

// Inicializa o Firebase
initializeApp(firebaseConfig);

// Obtém uma referência ao Firestore
const db = getFirestore();

// Inicializa o Express
const app = express();
const port = 5500; // Alterado para a porta 5500



// Middleware para parsear o corpo da requisição em JSON
app.use(express.json());

/*app.post('/submit-form', (req, res) => {
    res.send("Teste bem-sucedido");
});*/


// Rota POST para receber dados do formulário e enviar para o Firestore
app.post('/submit-form', async (req, res) => {
    try {
        // Ajuste na chamada para adicionar documento
        const docRef = await addDoc(collection(db, "campos-obrigatorios"), {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email
        });
        console.log("Documento escrito com ID: ", docRef.id);
        res.send("Dados enviados com sucesso!");
    } catch (e) {
        console.error("Erro ao adicionar documento: ", e);
        res.status(500).send(e.message);
    }
});

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor ouvindo em http://localhost:${port}`);
});
